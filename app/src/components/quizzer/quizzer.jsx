/// -*- encoding: utf-8 -*-
///
/// (c) Joshua Petrin, 2024. All rights reserved.
///
/// File creation date: 13 October 2024
/// File creator: Joshua Petrin

import React from 'react';

import QuizText from './quiz_text';
import QuizSidebar from './quiz_sidebar';

const Quizzer = ({reference}) => {
    return <div className="quizzer">
        <QuizText title={reference}>
            <p>In the beginning was the Word, and the Word was with God, and the
            Word was God. <em className='incorrect'>He was in the</em> beginning
            with God. All things were made through him, and without him was not
            any thing made that was made. In him was life, and the life was the
            light of men. The light shines in the darkness, and the darkness has
            not overcome it.</p>
            
            <p>There was a man sent from God, whose name was John. He came as a
            witness, to bear witness about the light, that all might believe
            through him. He was not the light, but came to bear witness about
            the light.</p>
            
            <p>The true light, which gives light to everyone, was coming into
            the world. He was in the world, and the world was made through him,
            yet the world did not know him. He came to his own, and his own
            people did not receive him. But to all who did receive him, who
            believed in his name, he gave the right to become children of God,
            who were born, not of blood nor of the will of the flesh nor of the
            will of man, but of God.</p>
            
            <p>And the Word became flesh and dwelt among us, and we have seen
            his glory, glory as of the only Son from the Father, full of grace
            and truth. (John bore witness about him, and cried out, "This was he
            of whom I said, 'He who comes after me ranks before me, because he
            was before me.'") For from his fullness we have all received, grace
            upon grace. For the law was given through Moses; grace and truth
            came through Jesus Christ. No one has ever seen God; the only God,
            who is at the Father's side, he has made him known.</p>
        </QuizText>
        <QuizSidebar />
    </div>
}

export default Quizzer;
