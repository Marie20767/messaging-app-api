// TODO: Fix the time zone

const insertDemoFriends = `
  INSERT INTO friends (user_id_1, user_id_2)
  VALUES
    (1, $1),
    ($1, 1),
    (2, $1),
    ($1, 2),
    (3, $1),
    ($1, 3),
    (4, $1),
    ($1, 4),
    (5, $1),
    ($1, 5),
    (6, $1),
    ($1, 6),
    (7, $1),
    ($1, 7),
    (8, $1),
    ($1, 8),
    (9, $1),
    ($1, 9),
    (10, $1),
    ($1, 10);
`;

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
  INSERT INTO messages (thread_id, sending_user_id, recipient_user_id, text, timestamp)
  VALUES
    (1, 1, $1, 'He''s at perfect liberty to kiss whomever he likes.', NOW() - interval '25 minutes'),
    (1, 1, $1, 'I really couldn''t care less.', NOW() - interval '24 minutes'),
    (1, 1, $1, 'And incidentally, you need to be careful.', NOW() - interval '23 minutes'),
    (1, $1, 1, 'I am not giving back this book. I''ve learned more from the Halfblood prince than Snape or Slughorn have taught me in years.', NOW() - interval '20 minutes'),
    (1, 1, $1, 'I''m not talking about your stupid so called prince.', NOW() - interval '19 minutes'),
    (1, 1, $1, 'I''m talking about earlier.', NOW() - interval '17 minutes'),
    (1, 1, $1, 'I went into the girl''s bathroom just before I came in here...', NOW() - interval '17 minutes'),
    (1, 1, $1, 'There were about a dozen girls in there, including that Romilda Vane trying to decide how to slip you a love potion.', NOW() - interval '16 minutes'),
    (1, 1, $1, 'They''re all hoping they''re going to get you to take them to Slughorn''s party.', NOW() - interval '16 minutes'),
    (1, $1, 1, 'Why didn''t you confiscate them then?', NOW() - interval '15 minutes'),
    (1, 1, $1, 'They didn''t have the potions with them in the bathroom. They were just discussing tactics.', NOW() - interval '11 minutes'),
    (1, 1, $1, 'As I doubt the Halfblood prince could dream up an antidote for a dozen different love potions at once, I''d just invite someone to go with you', NOW() - interval '10 minutes'),
    (1, 1, $1, 'That will stop all the others thinking they''ve still got a chance. It''s tomorrow night, they''re getting desperate.', NOW() - interval '9 minutes'),
    (1, $1, 1, 'There isn''t anyone I want to invite.', NOW() - interval '8 minutes'),
    (1, 1, $1, 'Well, just be careful what you drink, because Romilda Vane looked like she meant business.', NOW() - interval '4 minutes'),

    (2, 2, $1, 'I knew you''d come back! I knew it!', NOW() - interval '31 minutes'),
    (2, $1, 2, 'How???', NOW() - interval '30 minutes'),
    (2, 2, $1, 'I knew you''d come! Kept telling Seamus it was a matter of time!', NOW() - interval '30 minutes'),
    (2, 2, $1, 'Is it true? Did you break into Gringotts? Did you escape on a dragon? It''s everywhere, everyone''s talking about it.', NOW() - interval '28 minutes'),
    (2, 2, $1, 'Terry Boot got beaten up by Carrow for yelling about it in the Great Hall at dinner!', NOW() - interval '28 minutes'),
    (2, $1, 2, 'Yeah, it''s true.', NOW() - interval '27 minutes'),
    (2, 2, $1, 'What did you do with the dragon?', NOW() - interval '27 minutes'),
    (2, $1, 2, 'Released it into the wild. Hermione was all for keeping it as a pet.', NOW() - interval '25 minutes'),
    (2, 2, $1, 'But what have you been doing? People have been saying you''ve just been on the run but I don''t think so.', NOW() - interval '22 minutes'),
    (2, 2, $1, ' I think you''ve been up to something.', NOW() - interval '22 minutes'),
    (2, $1, 2, 'You''re right but tell us about Hogwarts, Neville, we haven''t heard anything.', NOW() - interval '21 minutes'),
    (2, 2, $1, 'It''s been....Well, it''s not really like Hogwarts anymore...Do you know about the Carrows?', NOW() - interval '19 minutes'),
    (2, $1, 2, 'Those 2 Death Eaters who teach here?', NOW() - interval '19 minutes'),
    (2, 2, $1, 'They do more than teach...', NOW() - interval '18 minutes'),
    (2, 2, $1, 'They''re in charge of all discipline. They like punishment the Carrows.', NOW() - interval '18 minutes'),
    (2, $1, 2, 'Like Umbridge?', NOW() - interval '17 minutes'),
    (2, 2, $1, 'Nah, they make her look tame.', NOW() - interval '15 minutes'),
    (2, 2, $1, 'The other teachers are all supposed to refer us to the Carrows if we do anything wrong. They don''t, though, if they can avoid it.', NOW() - interval '15 minutes'),
    (2, 2, $1, 'You can tell they all hate them as much as we do.', NOW() - interval '14 minutes'),
    (2, 2, $1, 'Amycus, the bloke, he teaches what used to be Defense Against the Dark Arts, except now it''s just the Dark Arts.', NOW() - interval '14 minutes'),
    (2, 2, $1, 'We''re supposed to practice the Cruciatus Curse on people who''ve earned detentions.', NOW() - interval '13 minutes'),
    (2, $1, 2, 'What???', NOW() - interval '12 minutes'),
    (2, 2, $1, 'Yeah...I''ll tell you all about it later when we''re upstairs.', NOW() - interval '10 minutes'),

    (3, 3, $1, 'We''ll be there', NOW() - interval '61 minutes'),
    (3, $1, 3, 'What?', NOW() - interval '57 minutes'),
    (3, 3, $1, 'At your aunt and uncle''s house.', NOW() - interval '50 minutes'),
    (3, 3, $1, 'And then we''ll go with you, wherever you''re going', NOW() - interval '45 minutes'),
    (3, $1, 3, 'No!', NOW() - interval '30 minutes'),
    (3, 3, $1, 'Hermione and I are with you whatever happens.', NOW() - interval '25 minutes'),
    (3, 3, $1, 'But mate you''re going to have to come round my mum and dad''s house before we do anything else', NOW() - interval '20 minutes'),
    (3, 3, $1, '...even Godric''s Hollow.', NOW() - interval '20 minutes'),
    (3, $1, 3, 'Why?', NOW() - interval '17 minutes'),
    (3, 3, $1, 'Bill and Fleur''s wedding remember?', NOW() - interval '17 minutes'),
    (3, $1, 3, 'Oh yeah...', NOW() - interval '15 minutes'),
    (3, $1, 3, 'We shouldn''t miss that!', NOW() - interval '14 minutes'),

    (4, 4, $1, 'I suppose I''m just going to have to accept', NOW() - interval '202 minutes'),
    (4, 4, $1, 'that he really is going to marry her.', NOW() - interval '202 minutes'),
    (4, $1, 4, 'She''s not that bad.', NOW() - interval '195 minutes'),
    (4, $1, 4, 'Ugly though!', NOW() - interval '191 minutes'),
    (4, 4, $1, 'Well, I suppose if Mum can stand it, I can.', NOW() - interval '187 minutes'),
    (4, 4, $1, 'I''m going to have a nap now.', NOW() - interval '184 minutes'),
    (4, 4, $1, 'I haven''t been sleeping that well since...well...', NOW() - interval '182 minutes'),
    (4, 4, $1, 'I could do with some sleep.', NOW() - interval '182 minutes'),
    (4, $1, 4, 'Sleep well!', NOW() - interval '178 minutes'),

    (5, $1, 5, 'I miss my parents...', NOW() - interval '7 hours'),
    (5, 5, $1, 'I know. I miss them too.', NOW() - interval '410 minutes'),
    (5, 5, $1, 'It''s not fair that I got to spend so much time with them and you didn''t...', NOW() - interval '409 minutes'),
    (5, $1, 5, 'Why did they have to die Sirius?', NOW() - interval '406 minutes'),
    (5, 5, $1, 'I don''t know. I wish I did but I don''t...', NOW() - interval '401 minutes'),
    (5, 5, $1, 'I know I am not your father but I will always be there for you if I can help it...', NOW() - interval '398 minutes'),
    (5, $1, 5, 'Thanks.', NOW() - interval '392 minutes'),

    (6, 6, $1, 'I am what I am, an'' I''m not ashamed.', NOW() - interval '10 hours'),
    (6, 6, $1, 'Never be ashamed my ol'' dad used ter say, there''s some who''ll hold it against you but they''re not worth botherin'' with.', NOW() - interval '591 minutes'),
    (6, 6, $1, 'An'' he was right. I''ve bin an idiot.', NOW() - interval '588 minutes'),
    (6, 6, $1, 'I''m not botherin'' with her no more, I promise yeh that. ', NOW() - interval '587 minutes'),
    (6, 6, $1, 'Big bones...I''ll give her big bones...', NOW() - interval '587 minutes'),
    (6, 6, $1, 'Yeh know wha? When I firs'' met you, you reminded me o'' me a bit. Mum an'' Dad gone an'' you was feelin'' like 
    yeh wouldn'' fit in at Hogwarts, remember?', NOW() - interval '555 minutes'),
    (6, 6, $1, 'Not sure yeh were really up to it...an'' now look at yeh!', NOW() - interval '553 minutes'),
    (6, 6, $1, 'How you doin'' with that egg?', NOW() - interval '531 minutes'),
    (6, $1, 6, 'Great. Really great.', NOW() - interval '514 minutes'),
    (6, 6, $1, 'You show em''! Beat ''em all!', NOW() - interval '511 minutes'),

    (7, 7, $1, 'Listen...', NOW() - interval '13 hours'),
    (7, 7, $1, 'I can''t be involved with you anymore. We''ve got to stop seeing each other. We can''t be together.', NOW() - interval '775 minutes'),
    (7, $1, 7, 'It''s for some stupid noble reason isn''t it?', NOW() - interval '760 minutes'),
    (7, 7, $1, 'It''s been like something out of someone else''s life these last few weeks with you', NOW() - interval '754 minutes'),
    (7, 7, $1, 'But I can''t ... we can''t ... I''ve got things to do alone now.', NOW() - interval '750 minutes'),
    (7, 7, $1, 'Voldemort uses people his enemies are close to.', NOW() - interval '747 minutes'),
    (7, 7, $1, 'He''s already used you as bait once, and that was just because you''re my best friend''s sister.', NOW() - interval '746 minutes'),
    (7, 7, $1, 'Think how much danger you''ll be in if we keep this up.', NOW() - interval '746 minutes'),
    (7, 7, $1, 'He''ll know, he''ll find out.', NOW() - interval '745 minutes'),
    (7, 7, $1, 'He''ll try and get to me through you.', NOW() - interval '745 minutes'),
    (7, $1, 7, 'What if I don''t care?', NOW() - interval '740 minutes'),
    (7, 7, $1, 'I care. How do you think I''d feel if this was your funeral...and it was my fault...', NOW() - interval '735 minutes'),
    (7, $1, 7, 'I never really gave up on you...Not really.', NOW() - interval '730 minutes'),
    (7, $1, 7, 'I always hoped...', NOW() - interval '730 minutes minutes'),
    (7, $1, 7, 'Hermione told me to get on with life, maybe go out with some other people...', NOW() - interval '730 minutes minutes'),
    (7, $1, 7, '...relax a bit around you because I never used to be able to talk if you were in the room, remember?', NOW() - interval '729 minutes minutes'),
    (7, $1, 7, 'And she thought you might take a bit more notice if I was a bit more myself.', NOW() - interval '729 minutes minutes'),
    (7, 7, $1, 'Smart girl that Hermione.', NOW() - interval '727 minutes'),
    (7, 7, $1, 'I just wish I''d asked you sooner. We could have had ages...months...years maybe...', NOW() - interval '723 minutes'),
    (7, $1, 7, 'But you''ve been too busy saving the wizarding world.', NOW() - interval '721 minutes'),
    (7, $1, 7, 'Well...I can''t say I''m surprised. I knew this would happen in the end.', NOW() - interval '720 minutes'),
    (7, $1, 7, 'I knew you wouldn''t be happy unless you were hunting Voldemort.', NOW() - interval '720 minutes'),
    (7, $1, 7, 'Maybe that''s why I like you so much.', NOW() - interval '719 minutes'),
    (7, 7, $1, 'Bye for now...', NOW() - interval '716 minutes'),
    (7, $1, 7, 'Bye...', NOW() - interval '714 minutes'),

    (8, $1, 8, 'Hello', NOW() - interval '20 hours'),
    (8, $1, 8, 'How come you weren''t at the feast?', NOW() - interval '1198 minutes'),
    (8, 8, $1, 'Well, I''ve lost most of my possessions.', NOW() - interval '1190 minutes'),
    (8, 8, $1, 'People take them and hide them, you know. But as it''s the last night, I really do need them back, so I''ve been putting up signs.', NOW() - interval '1187 minutes'),
    (8, $1, 8, 'How come people hide your stuff?', NOW() - interval '1176 minutes'),
    (8, 8, $1, 'Oh...well...', NOW() - interval '1167 minutes'),
    (8, 8, $1, 'I think they think I''m a bit odd, you know. Some people call me Loony Lovegood actually.', NOW() - interval '1165 minutes'),
    (8, $1, 8, 'That''s no reason for them to take your things. Do you want help finding them?', NOW() - interval '1160 minutes'),
    (8, 8, $1, 'Oh no, They''ll come back, they always do in the end.', NOW() - interval '1155 minutes'),

    (9, 9, $1, 'So tell me.', NOW() - interval '1 day'),
    (9, 9, $1, 'Your scar...has it been hurting at all?', NOW() - interval '1432 minutes'),
    (9, $1, 9, 'No and I''ve been wondering about that.', NOW() - interval '1363 minutes'),
    (9, $1, 9, 'I thought it would be burning all the time now Voldemort''s getting so powerful again.', NOW() - interval '1363 minutes'),
    (9, 9, $1, 'I on the other hand thought otherwise.', NOW() - interval '1360 minutes'),
    (9, 9, $1, 'Lord Voldemort has finally realized the dangerous access to his thoughts and feelings you have been enjoying.', NOW() - interval '1359 minutes'),
    (9, 9, $1, 'It appears that he is now employing Occlumency against you.', NOW() - interval '1358 minutes'),
    (9, $1, 9, 'Well I''m not complaining.', NOW() - interval '1301 minutes'),

    (10, 10, $1, 'You''re back! What??? How? That was foolish earlier!', NOW() - interval '2 days'),
    (10, $1, 10, 'But he spat at you!', NOW() - interval '2855 minutes'),
    (10, 10, $1, 'That was very gallant of you but don''t you realize?', NOW() - interval '2845 minutes'),
    (10, $1, 10, 'Yeah I do.', NOW() - interval '2843 minutes'),
    (10, $1, 10, 'Professor McGonagall, Voldemort''s on the way.', NOW() - interval '2842 minutes'),
    (10, 10, $1, 'You must flee', NOW() - interval '2839 minutes'),
    (10, 10, $1, 'Now, as quickly as you can!', NOW() - interval '2839 minutes'),
    (10, $1, 10, 'I can''t there''s something I need to do. Professor, do you know where the diadem of Ravenclaw is?', NOW() - interval '2837 minutes'),
    (10, 10, $1, 'The diadem of Ravenclaw? Of course not hasn''t it been lost for centuries? It was utter madness for you to enter this castle!', NOW() - interval '2835 minutes'),
    (10, $1, 10, 'Time''s running out...Voldemort''s getting nearer Professor', NOW() - interval '2832 minutes'),
    (10, $1, 10, 'I''m acting on Dumbledore''s orders. I must find what he wanted me to find! ', NOW() - interval '2831 minutes'),
    (10, $1, 10, 'But we''ve got to get the students out while I''m searching the castle.', NOW() - interval '2831 minutes'),
    (10, $1, 10, 'It''s me Voldemort wants, but he won''t care about killing a few more or less, not now.', NOW() - interval '2831 minutes'),
    (10, $1, 10, 'Not now he knows I''m attacking Horcruxes...', NOW() - interval '2830 minutes'),
    (10, 10, $1, 'We shall secure the school against He-Who-Must-Not-Be-Named while you search for this object.', NOW() - interval '2829 minutes'),
    (10, 10, $1, 'Come. We must alert the other Heads of House. You''d better bring your Cloak.', NOW() - interval '2829 minutes');
`;

module.exports = {
  insertDemoFriends,
  insertMessageThreadsId,
  insertMessageThreadsParticipants,
  insertMessageThreadsMessages
}