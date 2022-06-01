package hello.hellospring.service;

import hello.hellospring.domain.Member;
import hello.hellospring.repository.MemberRepository;
import hello.hellospring.repository.MemoryMemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class MemberServiceTest {

    MemberService memberService;
    MemoryMemberRepository memberRepository;

    @BeforeEach
    public void beforeEach() {
        memberRepository = new MemoryMemberRepository();
        memberService = new MemberService(memberRepository);
    }

    @AfterEach
    public void afterEach() {
        memberRepository.clearStore();
    }

    @Test
    void join() {
        // given
        Member member = new Member();
        member.setName("Spring");

        // when
        Long id = memberService.join(member);

        // then
        Member result = memberService.findMemberById(id).get();
        Assertions.assertThat(result.getName()).isEqualTo(member.getName());
    }

    @Test
    void joinValidation() {
        // given
        Member member1 = new Member();
        member1.setName("Spring");
        Member member2 = new Member();
        member2.setName("Spring");

        // when
        memberService.join(member1);

        // then
        IllegalStateException err = assertThrows(IllegalStateException.class, () -> memberService.join(member2));

        try {
            memberService.join(member2);
            fail();
        } catch (IllegalStateException e) {
            Assertions.assertThat(e.getMessage()).isEqualTo("Spring already exists. Try another name.");
        }
    }

    @Test
    void findMembers() {
        // given
        Member member1 = new Member();
        member1.setName("Spring1");
        memberService.join(member1);

        Member member2 = new Member();
        member2.setName("Spring2");
        memberService.join(member2);

        // when
        List<Member> result = memberService.findMembers();

        // then
        Assertions.assertThat(result.size()).isEqualTo(2);
    }

    @Test
    void findMemberById() {
        // given
        Member member1 = new Member();
        member1.setName("Spring1");
        memberService.join(member1);

        Member member2 = new Member();
        member2.setName("Spring2");
        memberService.join(member2);

        // when
        Optional<Member> result = memberService.findMemberById(member1.getId());

        // then
        Assertions.assertThat(result).isPresent();
        Assertions.assertThat(result.get().getName()).isEqualTo(member1.getName());
    }
}