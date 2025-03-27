package elevenjo.ssdam.domain.saving.external;

import elevenjo.ssdam.domain.saving.dto.OptionDto;
import elevenjo.ssdam.domain.saving.dto.ProductDto;
import lombok.SneakyThrows;
import org.springframework.stereotype.Component;
import org.w3c.dom.*;
import org.xml.sax.InputSource;

import javax.xml.parsers.DocumentBuilderFactory;
import java.io.StringReader;
import java.util.*;

@Component
public class FssXmlParser {

    @SneakyThrows
    public Map<String, String> parseCompanyUrls(String xml) {
        Map<String, String> result = new HashMap<>();
        Document doc = DocumentBuilderFactory.newInstance().newDocumentBuilder()
                .parse(new InputSource(new StringReader(xml)));

        NodeList nodeList = doc.getElementsByTagName("company");
        for (int i = 0; i < nodeList.getLength(); i++) {
            Element el = (Element) nodeList.item(i);
            String finCoNo = getTag(el, "fin_co_no");
            String hompUrl = getTag(el, "homp_url");
            result.put(finCoNo, hompUrl);
        }
        return result;
    }

    @SneakyThrows
    public List<ProductDto> parseSavingProducts(String xml) {
        List<ProductDto> result = new ArrayList<>();
        Document doc = DocumentBuilderFactory.newInstance().newDocumentBuilder()
                .parse(new InputSource(new StringReader(xml)));

        NodeList productList = doc.getElementsByTagName("product");

        for (int i = 0; i < productList.getLength(); i++) {
            Element el = (Element) productList.item(i);

            // BaseInfo 추출
            ProductDto.BaseInfo baseInfo = new ProductDto.BaseInfo(
                    getTag(el, "fin_co_no"),
                    getTag(el, "kor_co_nm"),
                    getTag(el, "fin_prdt_cd"),
                    getTag(el, "fin_prdt_nm"),
                    getTag(el, "mtrt_int"),
                    getTag(el, "spcl_cnd"),
                    getTag(el, "join_deny"),
                    getTag(el, "join_member"),
                    getTag(el, "etc_note"),
                    getTag(el, "max_limit")
            );

            // Options 추출
            List<OptionDto> options = new ArrayList<>();
            NodeList optionList = el.getElementsByTagName("option");
            for (int j = 0; j < optionList.getLength(); j++) {
                Element op = (Element) optionList.item(j);
                options.add(new OptionDto(
                        getTag(op, "intr_rate_type"),
                        getTag(op, "intr_rate_type_nm"),
                        getTag(op, "rsrv_type"),
                        getTag(op, "rsrv_type_nm"),
                        Integer.parseInt(getTag(op, "save_trm")),
                        parseDouble(getTag(op, "intr_rate")),
                        parseDouble(getTag(op, "intr_rate2"))
                ));
            }

            result.add(new ProductDto(baseInfo, options));
        }

        return result;
    }

    private String getTag(Element el, String tag) {
        NodeList list = el.getElementsByTagName(tag);
        if (list.getLength() == 0) return "";
        return list.item(0).getTextContent();
    }

    private double parseDouble(String text) {
        try {
            return Double.parseDouble(text);
        } catch (NumberFormatException e) {
            return 0;
        }
    }
}
