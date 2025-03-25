package elevenjo.ssdam.domain.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import elevenjo.ssdam.domain.user.entity.User;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	User getUserByNickname(String nickname);
}
