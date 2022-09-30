const insertMessageThreadsId = `
  INSERT INTO message_threads (id)
  VALUES
    (1),
    (2),
    (3),
    (4),
    (5),
    (6),
    (7),
    (8),
    (9),
    (10);
`;

const insertMessageThreadsParticipants = `
  INSERT INTO message_thread_participants (thread_id, user_id)
  VALUES
    -- Message thread between Hermione Granger and User
    (1, 1),
    (1, $1),

    -- Message thread between Neville Longbottom and User
    (2, 2),
    (2, $1),

    -- Message thread between Ron Weasley and User
    (3, 3),
    (3, $1),

    -- Message thread between Ginny Weasley and User
    (4, 4),
    (4, $1),

    -- Message thread between Sirius Black and User
    (5, 5),
    (5, $1),

    -- Message thread between Rubeus Hagrid and User
    (6, 6),
    (6, $1),

    -- Message thread between Harry Potter and User
    (7, 7),
    (7, $1),

    -- Message thread between Luna Lovegood and User
    (8, 8),
    (8, $1),

    -- Message thread between Albus Dumbledore and User
    (9, 9),
    (9, $1),

    -- Message thread between Minerva McGonagall and User
    (10, 10),
    (10, $1);
`;

const insertMessageThreadsMessages = `
  INSERT INTO messages (thread_id, sending_user_id, text, timestamp)
  VALUES
    (1, 1, 'He''s at perfect liberty to kiss whomever he likes.', CURRENT_DATE - interval '25 minutes'),
    (1, 1, 'I really couldn''t care less.', CURRENT_DATE - interval '24 minutes'),
    (1, 1, 'And incidentally, you need to be careful.', CURRENT_DATE - interval '23 minutes'),
    (1, $1, 'I am not giving back this book. I''ve learned more from the Halfblood prince than Snape or Slughorn have taught me in years.', CURRENT_DATE - interval '20 minutes'),
    (1, 1, 'I''m not talking about your stupid so called prince.', CURRENT_DATE - interval '19 minutes'),
    (1, 1, 'I''m talking about earlier. I went into the girl''s bathroom just before I came in here and there were about 
    a dozen girls in there, including that Romilda Vane trying to decide how to slip you a love potion. 
    They''re all hoping they''re going to get you to take them to Slughorn''s party.', CURRENT_DATE - interval '17 minutes'),
    (1, $1, 'Why didn''t you confiscate them then?', CURRENT_DATE - interval '15 minutes'),
    (1, 1, 'They didn''t have the potions with them in the bathroom. They were just discussing tactics.
    As I doubt the Halfblood prince could dream up an antidote for a dozen different love potions at once, 
    I''d just invite someone to go with you, that''ll stop all the others thinking they''ve still got a chance. 
    It''s tomorrow night, they''re getting desperate.', CURRENT_DATE - interval '11 minutes'),
    (1, $1, 'There isn''t anyone I want to invite.', CURRENT_DATE - interval '8 minutes'),
    (1, 1, 'Well, just be careful what you drink, because Romilda Vane looked like she meant business.', CURRENT_DATE - interval '4 minutes'),

    (2, 2, 'I knew you''d come back! I knew it!', CURRENT_DATE - interval '31 minutes'),
    (2, $1, 'How???', CURRENT_DATE - interval '30 minutes'),
    (2, 2, 'I knew you''d come! Kept telling Seamus it was a matter of time!', CURRENT_DATE - interval '30 minutes'),
    (2, 2, 'Is it true? Did you break into Gringotts? Did you escape on a dragon? It''s everywhere, everyone''s talking about it, 
    Terry Boot got beaten up by Carrow for yelling about it in the Great Hall at dinner!', CURRENT_DATE - interval '28 minutes'),
    (2, $1, 'Yeah, it''s true.', CURRENT_DATE - interval '27 minutes'),
    (2, 2, 'What did you do with the dragon?', CURRENT_DATE - interval '27 minutes'),
    (2, $1, 'Released it into the wild. Hermione was all for keeping it as a pet.', CURRENT_DATE - interval '25 minutes'),
    (2, 2, 'But what have you been doing? People have been saying you''ve just been on the run but I don''t think so. 
    I think you''ve been up to something', CURRENT_DATE - interval '22 minutes'),
    (2, $1, 'You''re right but tell us about Hogwarts, Neville, we haven''t heard anything.', CURRENT_DATE - interval '21 minutes'),
    (2, 2, 'It''s been....Well, it''s not really like Hogwarts anymore...Do you know about the Carrows?', CURRENT_DATE - interval '19 minutes'),
    (2, $1, 'Those 2 Death Eaters who teach here?', CURRENT_DATE - interval '19 minutes'),
    (2, 2, 'They do more than teach...', CURRENT_DATE - interval '18 minutes'),
    (2, 2, 'They''re in charge of all discipline. They like punishment the Carrows.', CURRENT_DATE - interval '18 minutes'),
    (2, $1, 'Like Umbridge?', CURRENT_DATE - interval '17 minutes'),
    (2, 2, 'Nah, they make her look tame.', CURRENT_DATE - interval '15 minutes'),
    (2, 2, 'The other teachers are all supposed to refer us to the Carrows if we do anything wrong. They don''t, though, if they can avoid it. You can tell they all hate them as much as we do.', CURRENT_DATE - interval '15 minutes'),
    (2, 2, 'Amycus, the bloke, he teaches what used to be Defense Against the Dark Arts, except now it''s just the Dark Arts. We''re supposed 
    to practice the Cruciatus Curse on people who''ve earned detentions.', CURRENT_DATE - interval '14 minutes'),
    (2, $1, 'What???', CURRENT_DATE - interval '12 minutes'),
    (2, 2, 'Yeah...I''ll tell you all about it later when we''re upstairs.', CURRENT_DATE - interval '10 minutes'),

    (3, 3, 'We''ll be there', CURRENT_DATE - interval '61 minutes'),
    (3, $1, 'What?', CURRENT_DATE - interval '57 minutes'),
    (3, 3, 'At your aunt and uncle''s house.', CURRENT_DATE - interval '50 minutes'),
    (3, 3, 'And then we''ll go with you, wherever you''re going', CURRENT_DATE - interval '45 minutes'),
    (3, $1, 'No!', CURRENT_DATE - interval '30 minutes'),
    (3, 3, 'Hermione and I are with you whatever happens.', CURRENT_DATE - interval '25 minutes'),
    (3, 3, 'But mate you''re going to have to come round my mum and dad''s house before we do anything else', CURRENT_DATE - interval '20 minutes'),
    (3, 3, '...even Godric''s Hollow.', CURRENT_DATE - interval '20 minutes'),
    (3, $1, 'Why?', CURRENT_DATE - interval '17 minutes'),
    (3, 3, 'Bill and Fleur''s wedding remember?', CURRENT_DATE - interval '17 minutes'),
    (3, $1, 'Oh yeah...', CURRENT_DATE - interval '15 minutes'),
    (3, $1, 'We shouldn''t miss that!', CURRENT_DATE - interval '14 minutes'),

    (4, 4, 'I suppose I''m just going to have to accept', CURRENT_DATE - interval '202 minutes'),
    (4, 4, 'that he really is going to marry her.', CURRENT_DATE - interval '202 minutes'),
    (4, $1, 'She''s not that bad.', CURRENT_DATE - interval '195 minutes'),
    (4, $1, 'Ugly though!', CURRENT_DATE - interval '191 minutes'),
    (4, 4, 'Well, I suppose if Mum can stand it, I can.', CURRENT_DATE - interval '187 minutes'),
    (4, 4, 'I''m going to have a nap now.', CURRENT_DATE - interval '184 minutes'),
    (4, 4, 'I haven''t been sleeping that well since...well...', CURRENT_DATE - interval '182 minutes'),
    (4, 4, 'I could do with some sleep.', CURRENT_DATE - interval '182 minutes'),
    (4, $1, 'Sleep well!', CURRENT_DATE - interval '178 minutes'),

    (5, $1, 'I miss my parents...', CURRENT_DATE - interval '7 hours'),
    (5, 5, 'I know. I miss them too.', CURRENT_DATE - interval '410 minutes'),
    (5, 5, 'It''s not fair that I got to spend so much time with them and you didn''t...', CURRENT_DATE - interval '409 minutes'),
    (5, $1, 'Why did they have to die Sirius?', CURRENT_DATE - interval '406 minutes'),
    (5, 5, 'I don''t know. I wish I did but I don''t...', CURRENT_DATE - interval '401 minutes'),
    (5, 5, 'I know I am not your father but I will always be there for you if I can help it...', CURRENT_DATE - interval '398 minutes'),
    (5, $1, 'Thanks.', CURRENT_DATE - interval '392 minutes'),

    (6, 6, 'I am what I am, an'' I''m not ashamed.', CURRENT_DATE - interval '10 hours'),
    (6, 6, 'Never be ashamed my ol'' dad used ter say, there''s some who''ll hold it against you but they''re not worth botherin'' with.', CURRENT_DATE - interval '552 minutes'),
    (6, 6, 'An'' he was right. I''ve bin an idiot.', CURRENT_DATE - interval '548 minutes'),
    (6, 6, 'I''m not botherin'' with her no more, I promise yeh that. ', CURRENT_DATE - interval '543 minutes'),
    (6, 6, 'Big bones...I''ll give her big bones...', CURRENT_DATE - interval '540 minutes'),
    (6, 6, 'Yeh know wha? When I firs'' met you, you reminded me o'' me a bit. Mum an'' Dad gone an'' you was feelin'' like 
    yeh wouldn'' fit in at Hogwarts, remember? Not sure yeh were really up to it...an'' now look at yeh!', CURRENT_DATE - interval '537 minutes'),
    (6, 6, 'How you doin'' with that egg?', CURRENT_DATE - interval '531 minutes'),
    (6, $1, 'Great. Really great.', CURRENT_DATE - interval '514 minutes'),
    (6, 6, 'You show em''! Beat ''em all!', CURRENT_DATE - interval '511 minutes'),

    (7, 7, 'Listen...', CURRENT_DATE - interval '13 hours'),
    (7, 7, 'I can''t be involved with you anymore. We''ve got to stop seeing each other. We can''t be together.', CURRENT_DATE - interval '775 minutes'),
    (7, $1, 'It''s for some stupid noble reason isn''t it?', CURRENT_DATE - interval '760 minutes'),
    (7, 7, 'It''s been like something out of someone else''s life these last few weeks with you', CURRENT_DATE - interval '754 minutes'),
    (7, 7, 'But I can''t ... we can''t ... I''ve got things to do alone now.', CURRENT_DATE - interval '750 minutes'),
    (7, 7, 'Voldemort uses people his enemies are close to. He''s already used you as bait once, and that was just 
    because you''re my best friend''s sister. Think how much danger you''ll be in if we keep this up. He''ll know, 
    he''ll find out. He''ll try and get to me through you.', CURRENT_DATE - interval '747 minutes'),
    (7, $1, 'What if I don''t care?', CURRENT_DATE - interval '740 minutes'),
    (7, 7, 'I care. How do you think I''d feel if this was your funeral...and it was my fault...', CURRENT_DATE - interval '735 minutes'),
    (7, $1, 'I never really gave up on you...Not really. I always hoped...Hermione told me to get on with life, 
    maybe go out with some other people, relax a bit around you because I never used to be able to talk if 
    you were in the room, remember? And she thought you might take a bit more notice if I was a bit more myself.', CURRENT_DATE - interval '730 minutes'),
    (7, 7, 'Smart girl that Hermione.', CURRENT_DATE - interval '728 minutes'),
    (7, 7, 'I just wish I''d asked you sooner. We could havee had ages...months...years maybe...', CURRENT_DATE - interval '723 minutes'),
    (7, $1, 'But you''ve been too busy saving the wizarding world. Well ... I can''t say I''m surprised. I knew this would happen
    in the end. I knew you wouldn''t be happy unless you were hunting Voldemort. Maybe that''s why I like you so much.', CURRENT_DATE - interval '721 minutes'),
    (7, 7, 'Bye for now...', CURRENT_DATE - interval '716 minutes'),
    (7, $1, 'Bye...', CURRENT_DATE - interval '714 minutes'),

    (8, $1, 'Hello', CURRENT_DATE - interval '20 hours'),
    (8, $1, 'How come you''re not at the feast?', CURRENT_DATE - interval '1198 minutes'),
    (8, 8, 'Well, I''ve lost most of my possessions.', CURRENT_DATE - interval '1190 minutes'),
    (8, 8, 'People take them and hide them, you know. But as it''s the last night, I really do need them back, so I''ve been putting up signs.', CURRENT_DATE - interval '1187 minutes'),
    (8, $1, 'How come people hide your stuff?', CURRENT_DATE - interval '1176 minutes'),
    (8, 8, 'Oh...well...', CURRENT_DATE - interval '1167 minutes'),
    (8, 8, 'I think they think I''m a bit odd, you know. Some people call me Loony Lovegood actually.', CURRENT_DATE - interval '1165 minutes'),
    (8, $1, 'That''s no reason for them to take your things. Do you want help finding them?', CURRENT_DATE - interval '1160 minutes'),
    (8, 8, 'Oh no, They''ll come back, they always do in the end.', CURRENT_DATE - interval '1155 minutes'),

    (9, 9, 'So tell me.', CURRENT_DATE - interval '1 day'),
    (9, 9, 'Your scar...has it been hurting at all?', CURRENT_DATE - interval '23 hours'),
    (9, $1, 'No and I''ve been wondering about that.', CURRENT_DATE - interval '1363 minutes'),
    (9, $1, 'I thought it would be burning all the time now Voldemort''s getting so powerful again.', CURRENT_DATE - interval '1363 minutes'),
    (9, 9, 'I on the other hand thought otherwise.', CURRENT_DATE - interval '1360 minutes'),
    (9, 9, 'Lord Voldemort has finally realized the dangerous access to his thoughts and feelings you have been enjoying.', CURRENT_DATE - interval '1359 minutes'),
    (9, 9, 'It appears that he is now employing Occlumency against you.', CURRENT_DATE - interval '1358 minutes'),
    (9, $1, 'Well I''m not complaining.', CURRENT_DATE - interval '1280'),

    (10, 10, 'You''re back! What??? How? That was foolish earlier!', CURRENT_DATE - interval '2 days'),
    (10, $1, 'But he spat at you!', CURRENT_DATE - interval '2855 minutes'),
    (10, 10, 'That was very gallant of you but don''t you realize?', CURRENT_DATE - interval '2845 minutes'),
    (10, $1, 'Yeah I do.', CURRENT_DATE - interval '2843 minutes'),
    (10, $1, 'Professor McGonagall, Voldemort''s on the way.', CURRENT_DATE - interval '2842 minutes'),
    (10, 10, 'You must flee', CURRENT_DATE - interval '2839 minutes'),
    (10, 10, 'Now, as quickly as you can!', CURRENT_DATE - interval '2839 minutes'),
    (10, $1, 'I can''t there''s something I need to do. Professor, do you know where the diadem of Ravenclaw is?', CURRENT_DATE - interval '2837 minutes'),
    (10, 10, 'The diadem of Ravenclaw? Of course not hasn''t it been lost for centuries? It was utter madness for you to enter this castle!', CURRENT_DATE - interval '2835 minutes'),
    (10, $1, 'Time''s running out...Voldemort''s getting nearer Professor', CURRENT_DATE - interval '2832 minutes'),
    (10, $1, 'I''m acting on Dumbledore''s orders. I must find what he wanted me to find! ', CURRENT_DATE - interval '2831 minutes'),
    (10, $1, 'But we''ve got to get the students out while I''m searching the castle.', CURRENT_DATE - interval '2831 minutes'),
    (10, $1, 'It''s me Voldemort wants, but he won''t care about killing a few more or less, not now.', CURRENT_DATE - interval '2831 minutes'),
    (10, $1, 'Not now he knows I''m attacking Horcruxes...', CURRENT_DATE - interval '2830 minutes'),
    (10, 10, 'We shall secure the school against He-Who-Must-Not-Be-Named while you search for this object.', CURRENT_DATE - interval '2831 minutes'),
    (10, 10, 'Come. We must alert the other Heads of House. You''d better bring your Cloak.', CURRENT_DATE - interval '2830 minutes');
`;

module.exports = {
  insertMessageThreadsId,
  insertMessageThreadsParticipants,
  insertMessageThreadsMessages
}