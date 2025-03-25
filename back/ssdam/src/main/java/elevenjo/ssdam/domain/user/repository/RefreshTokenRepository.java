package elevenjo.ssdam.domain.user.repository;

import org.springframework.data.repository.CrudRepository;

import elevenjo.ssdam.domain.user.entity.RefreshTokenEntity;

public interface RefreshTokenRepository extends CrudRepository<RefreshTokenEntity, String> {
}