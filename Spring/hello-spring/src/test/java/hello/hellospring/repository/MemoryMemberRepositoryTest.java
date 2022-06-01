package hello.hellospring.repository;

import hello.hellospring.domain.Member;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.List;


class MemoryMemberRepositoryTest {

    MemberRepository repository = new MemoryMemberRepository();
    MemoryMemberRepository memoryRepository = (MemoryMemberRepository) repository;

    @AfterEach
    public void afterEach() {
        memoryRepository.clearStore();
    }

    @Test
    public void save() {
        Member member = new Member();
        member.setName("Spring");

        repository.save(member);

        Member result = repository.findById(member.getId()).get();
        Assertions.assertEquals(member, result);
        org.assertj.core.api.Assertions.assertThat(result).isEqualTo(member);
    }

    @Test
    public void findByName() {
        Member member1 = new Member();
        member1.setName("Spring1");
        repository.save(member1);

        Member member2 = new Member();
        member2.setName("Spring2");
        repository.save(member2);

        Member result = repository.findByName(member1.getName()).get();

        Assertions.assertEquals(member1, result);
    }

    @Test
    public void findAll() {
        Member member1 = new Member();
        member1.setName("Spring1");
        repository.save(member1);

        Member member2 = new Member();
        member2.setName("Spring2");
        repository.save(member2);

        List<Member> result = repository.findAll();

        Assertions.assertEquals(2, result.size());
    }
}
