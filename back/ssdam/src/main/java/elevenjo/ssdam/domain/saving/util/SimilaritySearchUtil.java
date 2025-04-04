package elevenjo.ssdam.domain.saving.util;

import elevenjo.ssdam.domain.saving.entity.Saving;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.commons.text.similarity.LevenshteinDistance;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class SimilaritySearchUtil {

    private final LevenshteinDistance levenshtein = new LevenshteinDistance();
    private final int threshold = 1;
    private final double normalizedThreshold = 0.5;

    public List<Saving> searchWithKeyword(String keyword, List<Saving> all) {
        String refinedKeyword = keyword.toLowerCase().replaceAll(" ", "");
        String engToKorComposed = joinHangul(convertEngToKor(refinedKeyword));
        String keywordAsJamo = toJamo(
                refinedKeyword.matches(".*[a-zA-Z].*") ? engToKorComposed : refinedKeyword
        );

        List<Pair<Saving, Integer>> matched = new ArrayList<>();

        for (Saving s : all) {
            List<String> candidates = List.of(
                    s.getFinPrdtNm(),
                    s.getFinCoNm(),
                    s.getEtcNote(),
                    s.getSpclCnd()
            );

            boolean directMatch = candidates.stream().anyMatch(field ->
                    field.replaceAll(" ", "").contains(refinedKeyword) ||
                            toJamo(field).contains(keywordAsJamo)
            );
            if (directMatch) {
                matched.add(Pair.of(s, -9999));
                continue;
            }

            int minScore = Integer.MAX_VALUE;
            for (String field : candidates) {
                String fieldRefined = field.toLowerCase().replaceAll(" ", "");
                String fieldJamo = toJamo(fieldRefined);

                int dist1 = levenshtein.apply(refinedKeyword, fieldRefined);
                int dist2 = levenshtein.apply(engToKorComposed, fieldRefined);
                int dist3 = levenshtein.apply(keywordAsJamo, fieldJamo);

                int matchCount = 0;
                for (char c : keywordAsJamo.toCharArray()) {
                    if (fieldJamo.indexOf(c) >= 0) matchCount++;
                }

                int minDist = Math.min(dist1, Math.min(dist2, dist3));
                double normalized = (double) minDist / Math.max(refinedKeyword.length(), 1);
                double jamoMatchRatio = (double) matchCount / keywordAsJamo.length();

                if ((jamoMatchRatio >= 0.6) || (minDist <= threshold || normalized <= normalizedThreshold)) {
                    int adjustedScore = minDist - matchCount;
                    minScore = Math.min(minScore, adjustedScore);
                }
            }

            if (minScore != Integer.MAX_VALUE) {
                matched.add(Pair.of(s, minScore));
            }
        }

        matched.sort(Comparator.comparingInt(Pair::getRight));
        return matched.stream().map(Pair::getLeft).toList();
    }



    private String convertEngToKor(String input) {
        Map<Character, String> map = Map.ofEntries(
                Map.entry('r', "ㄱ"), Map.entry('s', "ㄴ"), Map.entry('e', "ㄷ"), Map.entry('f', "ㄹ"),
                Map.entry('a', "ㅁ"), Map.entry('q', "ㅂ"), Map.entry('t', "ㅅ"), Map.entry('d', "ㅇ"),
                Map.entry('w', "ㅈ"), Map.entry('c', "ㅊ"), Map.entry('z', "ㅋ"), Map.entry('x', "ㅌ"),
                Map.entry('v', "ㅍ"), Map.entry('g', "ㅎ"), Map.entry('k', "ㅏ"), Map.entry('o', "ㅐ"),
                Map.entry('i', "ㅑ"), Map.entry('j', "ㅓ"), Map.entry('p', "ㅔ"), Map.entry('u', "ㅕ"),
                Map.entry('h', "ㅗ"), Map.entry('y', "ㅛ"), Map.entry('n', "ㅜ"), Map.entry('b', "ㅠ"),
                Map.entry('m', "ㅡ"), Map.entry('l', "ㅣ")
        );
        StringBuilder sb = new StringBuilder();
        for (char ch : input.toCharArray()) sb.append(map.getOrDefault(ch, String.valueOf(ch)));
        return sb.toString();
    }

    // 한글 자모 조합
    private String joinHangul(String jamo) {
        String[] cho = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ".split("");
        String[] jung = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ".split("");
        String[] jong = {"", "ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"};

        List<Character> buf = new ArrayList<>();
        for (char c : jamo.toCharArray()) buf.add(c);

        StringBuilder result = new StringBuilder();
        int i = 0;
        while (i + 1 < buf.size()) {
            int ci = Arrays.asList(cho).indexOf(String.valueOf(buf.get(i)));
            int ji = Arrays.asList(jung).indexOf(String.valueOf(buf.get(i + 1)));
            if (ci == -1 || ji == -1) { i++; continue; }

            int ti = 0;
            boolean hasTail = false;

            if (i + 2 < buf.size()) {
                String third = String.valueOf(buf.get(i + 2));
                boolean isVowel = Arrays.asList(jung).contains(third);
                int tmp = Arrays.asList(jong).indexOf(third);

                // 다음 글자가 초성+중성 조합 가능한 경우 받침 아님
                boolean nextIsSyllable = false;
                if (i + 3 < buf.size()) {
                    int nextCho = Arrays.asList(cho).indexOf(String.valueOf(buf.get(i + 2)));
                    int nextJung = Arrays.asList(jung).indexOf(String.valueOf(buf.get(i + 3)));
                    nextIsSyllable = nextCho != -1 && nextJung != -1;
                }

                if (tmp > 0 && !isVowel && !nextIsSyllable) {
                    ti = tmp;
                    hasTail = true;
                }
            }

            result.append((char)(0xAC00 + (ci * 21 * 28) + (ji * 28) + ti));
            i += hasTail ? 3 : 2;
        }

        while (i < buf.size()) result.append(buf.get(i++));
        return result.toString();
    }


    private String toJamo(String input) {
        StringBuilder sb = new StringBuilder();
        for (char ch : input.toCharArray()) {
            if (ch >= 0xAC00 && ch <= 0xD7A3) {
                int uni = ch - 0xAC00;
                sb.append("ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ".charAt(uni / (21 * 28)));
                sb.append("ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ".charAt((uni % (21 * 28)) / 28));
                int tail = uni % 28;
                if (tail > 0) sb.append(" ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ".charAt(tail));
            } else sb.append(ch);
        }
        return sb.toString();
    }
}
