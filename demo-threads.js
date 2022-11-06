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
    (DEFAULT),
    (DEFAULT),
    (DEFAULT),
    (DEFAULT),
    (DEFAULT),
    (DEFAULT),
    (DEFAULT),
    (DEFAULT),
    (DEFAULT),
    (DEFAULT)
  RETURNING *;
`;

const insertMessageThreadsParticipants = `
  INSERT INTO message_thread_participants (thread_id, user_id)
  VALUES
    -- Message thread between Hermione Granger and User
    ($2, 1),
    ($2, $1),

    -- Message thread between Neville Longbottom and User
    ($3, 2),
    ($3, $1),

    -- Message thread between Ron Weasley and User
    ($4, 3),
    ($4, $1),

    -- Message thread between Ginny Weasley and User
    ($5, 4),
    ($5, $1),

    -- Message thread between Sirius Black and User
    ($6, 5),
    ($6, $1),

    -- Message thread between Rubeus Hagrid and User
    ($7, 6),
    ($7, $1),

    -- Message thread between Harry Potter and User
    ($8, 7),
    ($8, $1),

    -- Message thread between Luna Lovegood and User
    ($9, 8),
    ($9, $1),

    -- Message thread between Albus Dumbledore and User
    ($10, 9),
    ($10, $1),

    -- Message thread between Minerva McGonagall and User
    ($11, 10),
    ($11, $1);
`;

const insertMessageThreadsMessages = `
  INSERT INTO messages (thread_id, sending_user_id, recipient_user_id, text, timestamp, read)
  VALUES
    ($2, 1, $1, 'Viktor Krum is not even good-looking!', NOW() - interval '3 days 13 hours 5 minutes', true),
    ($2, 1, $1, 'Those girls only like him because he''s famous!', NOW() - interval '3 days 13 hours 3 minutes', true),
    ($2, 1, $1, 'They wouldn''t look twice at him if he couldn''t do that WonkyFaint thing', NOW() - interval '3 days 13 hours 3 minutes', true),
    ($2, $1, 1, 'Wronski Feint!', NOW() - interval '3 days 12 hours 48 minutes', true),
    ($2, $1, 1, 'What about Ron, though?', NOW() - interval '3 days 12 hours 19 minutes', true),
    ($2, $1, 1, 'Don''t you want to go with him to Hogsmeade?', NOW() - interval '3 days 12 hours 18 minutes', true),
    ($2, 1, $1, 'Oh well...', NOW() - interval '3 days 12 hours 3 minutes', true),
    ($2, 1, $1, 'I thought we might meet up with him in the Three Broomsticks...', NOW() - interval '3 days 12 hours 2 minutes', true),
    ($2, $1, 1, 'No!', NOW() - interval '3 days 11 hours 53 minutes', true),
    ($2, 1, $1, 'Oh this is so stupid', NOW() - interval '3 days 11 hours 43 minutes', true),
    ($2, $1, 1, 'I''ll come but I''m not meeting Ron', NOW() - interval '3 days 11 hours 34 minutes', true),
    ($2, $1, 1, 'And I''m wearing my Invisibility Cloak.', NOW() - interval '3 days 11 hours 33 minutes', true),
    ($2, 1, $1, 'Oh all right then...', NOW() - interval '3 days 11 hours 27 minutes', true),
    ($2, 1, $1, 'I hate talking to you in that cloak. I never know if I''m looking at you or not.', NOW() - interval '3 days 11 hours 18 minutes', true),
    ($2, $1, 1, 'I didn''t start this.', NOW() - interval '1 day', true),
    ($2, 1, $1, 'You miss him!', NOW() - interval '23 hours 10 minutes', true),
    ($2, 1, $1, 'And I know he misses you...', NOW() - interval '23 hours 3 minutes', true),
    ($2, $1, 1, 'Miss him?', NOW() - interval '22 hours 54 minutes', true),
    ($2, $1, 1, 'I don''t miss him...', NOW() - interval '22 hours 54 minutes', true),
    ($2, 1, $1, 'He''s at perfect liberty to kiss whomever he likes.', NOW() - interval '25 minutes', true),
    ($2, 1, $1, 'I really couldn''t care less.', NOW() - interval '24 minutes', true),
    ($2, 1, $1, 'And incidentally, you need to be careful.', NOW() - interval '23 minutes', true),
    ($2, $1, 1, 'I am not giving back this book. I''ve learned more from the Halfblood prince than Snape or Slughorn have taught me in years.', NOW() - interval '20 minutes', true),
    ($2, 1, $1, 'I''m not talking about your stupid so called prince.', NOW() - interval '19 minutes', true),
    ($2, 1, $1, 'I''m talking about earlier.', NOW() - interval '17 minutes', true),
    ($2, 1, $1, 'I went into the girl''s bathroom just before I came in here...', NOW() - interval '17 minutes', true),
    ($2, 1, $1, 'There were about a dozen girls in there, including that Romilda Vane trying to decide how to slip you a love potion.', NOW() - interval '16 minutes', true),
    ($2, 1, $1, 'They''re all hoping they''re going to get you to take them to Slughorn''s party.', NOW() - interval '16 minutes', true),
    ($2, $1, 1, 'Why didn''t you confiscate them then?', NOW() - interval '15 minutes', true),
    ($2, 1, $1, 'They didn''t have the potions with them in the bathroom. They were just discussing tactics.', NOW() - interval '11 minutes', true),
    ($2, 1, $1, 'As I doubt the Halfblood prince could dream up an antidote for a dozen different love potions at once, I''d just invite someone to go with you', NOW() - interval '10 minutes', true),
    ($2, 1, $1, 'That will stop all the others thinking they''ve still got a chance. It''s tomorrow night, they''re getting desperate.', NOW() - interval '9 minutes', true),
    ($2, $1, 1, 'There isn''t anyone I want to invite.', NOW() - interval '8 minutes', true),
    ($2, 1, $1, 'Well, just be careful what you drink, because Romilda Vane looked like she meant business.', NOW(), false),

    ($3, 2, $1, 'I knew you''d come back! I knew it!', NOW() - interval '31 minutes', true),
    ($3, $1, 2, 'How???', NOW() - interval '30 minutes', true),
    ($3, 2, $1, 'I knew you''d come! Kept telling Seamus it was a matter of time!', NOW() - interval '30 minutes', true),
    ($3, 2, $1, 'Is it true? Did you break into Gringotts? Did you escape on a dragon? It''s everywhere, everyone''s talking about it.', NOW() - interval '28 minutes', true),
    ($3, 2, $1, 'Terry Boot got beaten up by Carrow for yelling about it in the Great Hall at dinner!', NOW() - interval '28 minutes', true),
    ($3, $1, 2, 'Yeah, it''s true.', NOW() - interval '27 minutes', true),
    ($3, 2, $1, 'What did you do with the dragon?', NOW() - interval '27 minutes', true),
    ($3, $1, 2, 'Released it into the wild. Hermione was all for keeping it as a pet.', NOW() - interval '25 minutes', true),
    ($3, 2, $1, 'But what have you been doing? People have been saying you''ve just been on the run but I don''t think so.', NOW() - interval '22 minutes', true),
    ($3, 2, $1, ' I think you''ve been up to something.', NOW() - interval '22 minutes', true),
    ($3, $1, 2, 'You''re right but tell us about Hogwarts, Neville, we haven''t heard anything.', NOW() - interval '21 minutes', true),
    ($3, 2, $1, 'It''s been....Well, it''s not really like Hogwarts anymore...Do you know about the Carrows?', NOW() - interval '19 minutes', true),
    ($3, $1, 2, 'Those 2 Death Eaters who teach here?', NOW() - interval '19 minutes', true),
    ($3, 2, $1, 'They do more than teach...', NOW() - interval '18 minutes', true),
    ($3, 2, $1, 'They''re in charge of all discipline. They like punishment the Carrows.', NOW() - interval '18 minutes', true),
    ($3, $1, 2, 'Like Umbridge?', NOW() - interval '17 minutes', true),
    ($3, 2, $1, 'Nah, they make her look tame.', NOW() - interval '15 minutes', true),
    ($3, 2, $1, 'The other teachers are all supposed to refer us to the Carrows if we do anything wrong. They don''t, though, if they can avoid it.', NOW() - interval '15 minutes', true),
    ($3, 2, $1, 'You can tell they all hate them as much as we do.', NOW() - interval '14 minutes', true),
    ($3, 2, $1, 'Amycus, the bloke, he teaches what used to be Defense Against the Dark Arts, except now it''s just the Dark Arts.', NOW() - interval '14 minutes', true),
    ($3, 2, $1, 'We''re supposed to practice the Cruciatus Curse on people who''ve earned detentions.', NOW() - interval '13 minutes', true),
    ($3, $1, 2, 'What???', NOW() - interval '12 minutes', true),
    ($3, 2, $1, 'Yeah...I''ll tell you all about it later when we''re upstairs.', NOW() - interval '1 minutes', false),

    ($4, $1, 3, 'What''s up?', NOW() - interval '10 days 16 hours 12 minutes', true),
    ($4, 3, $1, 'Did you know?', NOW() - interval '10 days 16 hours 4 minutes', true),
    ($4, 3, $1, 'About Hagrid being half-giant?', NOW() - interval '10 days 16 hours 4 minutes', true),
    ($4, $1, 3, 'No. So what?', NOW() - interval '10 days 16 hours 2 minutes', true),
    ($4, $1, 3, 'What''s the problem with giants?', NOW() - interval '10 days 15 hours 52 minutes', true),
    ($4, 3, $1, 'Well...They''re not very nice', NOW() - interval '10 days 15 hours 44 minutes', true),
    ($4, $1, 3, 'Who cares?', NOW() - interval '10 days 15 hours 41 minutes', true),
    ($4, $1, 3, 'There''s nothing wrong with Hagrid!', NOW() - interval '10 days 15 hours 40 minutes', true),
    ($4, 3, $1, 'I know there isn''t but blimey...no wonder he keeps it quiet', NOW() - interval '10 days 15 hours 32 minutes', true),
    ($4, 3, $1, 'I always thought he''d got in the way of a bad Engorgement Charm when he was a kid or something...', NOW() - interval '10 days 15 hours 30 minutes', true),
    ($4, $1, 3, 'But what''s it matter if his mother was a giantess?', NOW() - interval '10 days 15 hours 25 minutes', true),
    ($4, 3, $1, 'Well...no one who knows him will care because they''ll know he''s not dangerous', NOW() - interval '10 days 15 hours 21 minutes', true),
    ($4, 3, $1, 'But they''re just vicious, giants. It''s like Hagrid said. It''s in their natures, they''re like trolls...', NOW() - interval '10 days 15 hours 20 minutes', true),
    ($4, 3, $1, 'They just like killing, everyone knows that. There aren''t any left in Britain now though.', NOW() - interval '10 days 15 hours 17 minutes', true),
    ($4, $1, 3, 'What happened to them?', NOW() - interval '10 days 15 hours 13 minutes', true),
    ($4, 3, $1, 'Well they were dying out anyway and then loads got themselves killed by Aurors.', NOW() - interval '10 days 15 hours 9 minutes', true),
    ($4, 3, $1, 'There are supposed to be giants abroad though...They hide out in mountains mostly...', NOW() - interval '10 days 15 hours 6 minutes', true),
    ($4, 3, $1, 'We''ll be there', NOW() - interval '61 minutes', true),
    ($4, $1, 3, 'What?', NOW() - interval '57 minutes', true),
    ($4, 3, $1, 'At your aunt and uncle''s house.', NOW() - interval '50 minutes', true),
    ($4, 3, $1, 'And then we''ll go with you, wherever you''re going', NOW() - interval '45 minutes', true),
    ($4, $1, 3, 'No!', NOW() - interval '30 minutes', true),
    ($4, 3, $1, 'Hermione and I are with you whatever happens.', NOW() - interval '25 minutes', true),
    ($4, 3, $1, 'But mate you''re going to have to come round my mum and dad''s house before we do anything else', NOW() - interval '20 minutes', true),
    ($4, 3, $1, '...even Godric''s Hollow.', NOW() - interval '20 minutes', true),
    ($4, $1, 3, 'Why?', NOW() - interval '17 minutes', true),
    ($4, 3, $1, 'Bill and Fleur''s wedding remember?', NOW() - interval '17 minutes', true),
    ($4, $1, 3, 'Oh yeah...', NOW() - interval '15 minutes', true),
    ($4, $1, 3, 'We shouldn''t miss that!', NOW() - interval '14 minutes', true),

    ($5, 4, $1, 'You''d think people had better things to gossip about than your tattoos', NOW() - interval '12 days 10 hours 5 minutes', true),
    ($5, $1, 4, 'What did you tell her?', NOW() - interval '12 days 9 hours 45 minutes', true),
    ($5, 4, $1, 'I told her it''s a Hungarian Horntail tattoo', NOW() - interval '12 days 9 hours 40 minutes', true),
    ($5, 4, $1, 'Much more macho', NOW() - interval '12 days 9 hours 40 minutes', true),
    ($5, $1, 4, 'Thanks haha', NOW() - interval '12 days 9 hours 37 minutes', true),
    ($5, $1, 4, 'And what did you tell her Ron''s got?', NOW() - interval '12 days 9 hours 35 minutes', true),
    ($5, 4, $1, 'A Pygmy Puff, but I didn''t say where.', NOW() - interval '12 days 9 hours 30 minutes', true),
    ($5, $1, 4, 'Haha don''t tell him that!', NOW() - interval '12 days 9 hours 29 minutes', true),
    ($5, 4, $1, 'I suppose I''m just going to have to accept', NOW() - interval '202 minutes', true),
    ($5, 4, $1, 'that he really is going to marry her.', NOW() - interval '202 minutes', true),
    ($5, $1, 4, 'She''s not that bad.', NOW() - interval '195 minutes', true),
    ($5, $1, 4, 'Ugly though!', NOW() - interval '191 minutes', true),
    ($5, 4, $1, 'Well, I suppose if Mum can stand it, I can.', NOW() - interval '187 minutes', true),
    ($5, 4, $1, 'I''m going to have a nap now.', NOW() - interval '184 minutes', true),
    ($5, 4, $1, 'I haven''t been sleeping that well since...well...', NOW() - interval '182 minutes', true),
    ($5, 4, $1, 'I could do with some sleep.', NOW() - interval '182 minutes', true),
    ($5, $1, 4, 'Sleep well!', NOW() - interval '178 minutes', true),

    ($6, 5, $1, 'You know what this means?', NOW() - interval '16 days 2 hours 10 minutes', true),
    ($6, 5, $1, 'Turning Pettigrew in?', NOW() - interval '16 days 2 hours 10 minutes', true),
    ($6, $1, 5, 'You''re free...', NOW() - interval '16 days 2 hours 3 minutes', true),
    ($6, 5, $1, 'Yes...But I''m also...I don''t know if anyone ever told you this', NOW() - interval '16 days 1 hours 55 minutes', true),
    ($6, 5, $1, 'I''m your godfather', NOW() - interval '16 days 1 hours 54 minutes', true),
    ($6, $1, 5, 'Yeah I knew that', NOW() - interval '16 days 1 hours 50 minutes', true),
    ($6, 5, $1, 'Well...your parents appointed me your guardian', NOW() - interval '16 days 1 hours 47 minutes', true),
    ($6, 5, $1, 'If anything happened to them...', NOW() - interval '16 days 1 hours 47 minutes', true),
    ($6, 5, $1, 'I''ll understand of course if you want to stay with your aunt and uncle. But...', NOW() - interval '16 days 1 hours 46 minutes', true),
    ($6, 5, $1, 'Think about it...Once my name''s cleared...if you wanted a different home...', NOW() - interval '16 days 1 hours 46 minutes', true),
    ($6, $1, 5, 'What? Live with you? Leave the Dursleys?', NOW() - interval '16 days 1 hours 43 minutes', true),
    ($6, 5, $1, 'Of course I thought you wouldn''t want to. I understand.', NOW() - interval '16 days 1 hours 41 minutes', true),
    ($6, $1, 5, 'Are you insane?', NOW() - interval '16 days 1 hours 40 minutes', true),
    ($6, $1, 5, 'Of course I want to leave the Dursleys! Have you got a house? When can I move in?', NOW() - interval '16 days 1 hours 40 minutes', true),
    ($6, 5, $1, 'You want to??? You mean it?', NOW() - interval '16 days 1 hours 37 minutes', true),
    ($6, $1, 5, 'Yeah I mean it!', NOW() - interval '16 days 1 hours 34 minutes', true),
    ($6, $1, 5, 'I miss my parents...', NOW() - interval '7 hours', true),
    ($6, 5, $1, 'I know. I miss them too.', NOW() - interval '410 minutes', true),
    ($6, 5, $1, 'It''s not fair that I got to spend so much time with them and you didn''t...', NOW() - interval '409 minutes', true),
    ($6, $1, 5, 'Why did they have to die Sirius?', NOW() - interval '406 minutes', true),
    ($6, 5, $1, 'I don''t know. I wish I did but I don''t...', NOW() - interval '401 minutes', true),
    ($6, 5, $1, 'I know I am not your father but I will always be there for you if I can help it...', NOW() - interval '398 minutes', true),
    ($6, $1, 5, 'Thanks.', NOW() - interval '392 minutes', true),

    ($7, 6, $1, '''Spect it''s a record. Don'' reckon they''ve ever had a teacher who lasted on''y a day before.', NOW() - interval '21 days 20 hours 2 minutes', true),
    ($7, $1, 6, 'You haven''t been fired Hagrid!', NOW() - interval '21 days 18 hours 49 minutes', true),
    ($7, 6, $1, 'Not yet but''s only a matter o'' time. I''n''t after Malfoy...', NOW() - interval '21 days 18 hours 29 minutes', true),
    ($7, $1, 6, 'How is he? It wasn''t serious was it?', NOW() - interval '21 days 18 hours 22 minutes', true),
    ($7, 6, $1, 'Madam Pomfrey fixed him best she could', NOW() - interval '21 days 18 hours 20 minutes', true),
    ($7, 6, $1, 'But he''s sayin'' it''s still agony...covered in bandages...moanin''', NOW() - interval '21 days 18 hours 19 minutes', true),
    ($7, $1, 6, 'He''s faking it. Madam Pomfrey can mend anything', NOW() - interval '21 days 18 hours 14 minutes', true),
    ($7, $1, 6, 'She regrew half my bones last year. Trust Malfoy to milk it for all it''s worth.', NOW() - interval '21 days 18 hours 13 minutes', true),
    ($7, 6, $1, 'School gov''nors have bin told o'' course', NOW() - interval '21 days 18 hours 11 minutes', true),
    ($7, 6, $1, 'They reckon I started too big. Shoulda left Hippogriffs fer later...one flobberworms or summat...', NOW() - interval '21 days 18 hours 10 minutes', true),
    ($7, 6, $1, 'Jus'' thought it''d make a good firs'' lesson...s'' all my fault', NOW() - interval '21 days 18 hours 9 minutes', true),
    ($7, $1, 6, 'It''s all Malfoy''s fault Hagrid!', NOW() - interval '21 days 18 hours 7 minutes', true),
    ($7, $1, 6, 'We''re all witnesses. You said Hippogriffs attack if you insult them.', NOW() - interval '21 days 18 hours 7 minutes', true),
    ($7, $1, 6, 'It''s Malfoy''s problem that he wasn''t listening. We''ll tell Dumbledore what really happened', NOW() - interval '21 days 18 hours 7 minutes', true),
    ($7, 6, $1, 'Thanks...', NOW() - interval '21 days 18 hours 2 minutes', true),
    ($7, 6, $1, 'I am what I am, an'' I''m not ashamed.', NOW() - interval '10 hours', true),
    ($7, 6, $1, 'Never be ashamed my ol'' dad used ter say, there''s some who''ll hold it against you but they''re not worth botherin'' with.', NOW() - interval '591 minutes', true),
    ($7, 6, $1, 'An'' he was right. I''ve bin an idiot.', NOW() - interval '588 minutes', true),
    ($7, 6, $1, 'I''m not botherin'' with her no more, I promise yeh that. ', NOW() - interval '587 minutes', true),
    ($7, 6, $1, 'Big bones...I''ll give her big bones...', NOW() - interval '587 minutes', true),
    ($7, 6, $1, 'Yeh know wha? When I firs'' met you, you reminded me o'' me a bit. Mum an'' Dad gone an'' you was feelin'' like 
    yeh wouldn'' fit in at Hogwarts, remember?', NOW() - interval '555 minutes', true),
    ($7, 6, $1, 'Not sure yeh were really up to it...an'' now look at yeh!', NOW() - interval '553 minutes', true),
    ($7, 6, $1, 'How you doin'' with that egg?', NOW() - interval '531 minutes', true),
    ($7, $1, 6, 'Great. Really great.', NOW() - interval '514 minutes', true),
    ($7, 6, $1, 'You show em''! Beat ''em all!', NOW() - interval '511 minutes', true),

    ($8, 7, $1, 'Listen...', NOW() - interval '13 hours', true),
    ($8, 7, $1, 'I can''t be involved with you anymore. We''ve got to stop seeing each other. We can''t be together.', NOW() - interval '775 minutes', true),
    ($8, $1, 7, 'It''s for some stupid noble reason isn''t it?', NOW() - interval '760 minutes', true),
    ($8, 7, $1, 'It''s been like something out of someone else''s life these last few weeks with you', NOW() - interval '754 minutes', true),
    ($8, 7, $1, 'But I can''t ... we can''t ... I''ve got things to do alone now.', NOW() - interval '750 minutes', true),
    ($8, 7, $1, 'Voldemort uses people his enemies are close to.', NOW() - interval '747 minutes', true),
    ($8, 7, $1, 'He''s already used you as bait once, and that was just because you''re my best friend''s sister.', NOW() - interval '746 minutes', true),
    ($8, 7, $1, 'Think how much danger you''ll be in if we keep this up.', NOW() - interval '746 minutes', true),
    ($8, 7, $1, 'He''ll know, he''ll find out.', NOW() - interval '745 minutes', true),
    ($8, 7, $1, 'He''ll try and get to me through you.', NOW() - interval '745 minutes', true),
    ($8, $1, 7, 'What if I don''t care?', NOW() - interval '740 minutes', true),
    ($8, 7, $1, 'I care. How do you think I''d feel if this was your funeral...and it was my fault...', NOW() - interval '735 minutes', true),
    ($8, $1, 7, 'I never really gave up on you...Not really.', NOW() - interval '730 minutes', true),
    ($8, $1, 7, 'I always hoped...', NOW() - interval '730 minutes', true),
    ($8, $1, 7, 'Hermione told me to get on with life, maybe go out with some other people...', NOW() - interval '730 minutes', true),
    ($8, $1, 7, '...relax a bit around you because I never used to be able to talk if you were in the room, remember?', NOW() - interval '729 minutes', true),
    ($8, $1, 7, 'And she thought you might take a bit more notice if I was a bit more myself.', NOW() - interval '729 minutes', true),
    ($8, 7, $1, 'Smart girl that Hermione.', NOW() - interval '727 minutes', true),
    ($8, 7, $1, 'I just wish I''d asked you sooner. We could have had ages...months...years maybe...', NOW() - interval '723 minutes', true),
    ($8, $1, 7, 'But you''ve been too busy saving the wizarding world.', NOW() - interval '721 minutes', true),
    ($8, $1, 7, 'Well...I can''t say I''m surprised. I knew this would happen in the end.', NOW() - interval '720 minutes', true),
    ($8, $1, 7, 'I knew you wouldn''t be happy unless you were hunting Voldemort.', NOW() - interval '720 minutes', true),
    ($8, $1, 7, 'Maybe that''s why I like you so much.', NOW() - interval '719 minutes', true),
    ($8, 7, $1, 'Bye for now...', NOW() - interval '716 minutes', true),
    ($8, $1, 7, 'Bye...', NOW() - interval '714 minutes', true),

    ($9, 8, $1, 'Ron can laugh. But my father has done a lot of research on Gernumbli magic.', NOW() - interval '31 days 18 hours 12 minutes', true),
    ($9, $1, 8, 'Really? Are you sure you don''t want to put anything on your bite though?', NOW() - interval '31 days 18 hours 7 minutes', true),
    ($9, 8, $1, 'Oh it''s fine...', NOW() - interval '31 days 18 hours 3 minutes', true),
    ($9, 8, $1, 'You look smart', NOW() - interval '17 days 23 hours 13 minutes', true),
    ($9, 8, $1, 'I told Daddy most people would probably wear dress robes, but he believes you ought to wear sun colors to a wedding', NOW() - interval '17 days 23 hours 12 minutes', true),
    ($9, 8, $1, 'For luck you know', NOW() - interval '17 days 23 hours 12 minutes', true),
    ($9, $1, 8, 'Is it alright if I join you later?', NOW() - interval '17 days 22 hours 53 minutes', true),
    ($9, 8, $1, 'Oh yes!', NOW() - interval '17 days 22 hours 50 minutes', true),
    ($9, 8, $1, 'Daddy''s just gone to give Bill and Fleur our present.', NOW() - interval '17 days 22 hours 47 minutes', true),
    ($9, $1, 8, 'Hello', NOW() - interval '20 hours', true),
    ($9, $1, 8, 'How come you weren''t at the feast?', NOW() - interval '1198 minutes', true),
    ($9, 8, $1, 'Well, I''ve lost most of my possessions.', NOW() - interval '1190 minutes', true),
    ($9, 8, $1, 'People take them and hide them, you know. But as it''s the last night, I really do need them back, so I''ve been putting up signs.', NOW() - interval '1187 minutes', true),
    ($9, $1, 8, 'How come people hide your stuff?', NOW() - interval '1176 minutes', true),
    ($9, 8, $1, 'Oh...well...', NOW() - interval '1167 minutes', true),
    ($9, 8, $1, 'I think they think I''m a bit odd, you know. Some people call me Loony Lovegood actually.', NOW() - interval '1165 minutes', true),
    ($9, $1, 8, 'That''s no reason for them to take your things. Do you want help finding them?', NOW() - interval '1160 minutes', true),
    ($9, 8, $1, 'Oh no, They''ll come back, they always do in the end.', NOW() - interval '1155 minutes', true),
  
    ($10, $1, 9, 'Ron and I will go get our stuff...', NOW() - interval '90 days 22 hours 15 minutes', true),
    ($10, 9, $1, 'What are you talking about?', NOW() - interval '90 days 21 hours 42 minutes', true),
    ($10, $1, 9, 'Well you''re expelling us aren''t you?', NOW() - interval '90 days 21 hours 42 minutes', true),
    ($10, 9, $1, 'Not today', NOW() - interval '90 days 21 hours 28 minutes', true),
    ($10, 9, $1, 'But I must impress upon both of you the seriousness of what you have done.', NOW() - interval '90 days 21 hours 26 minutes', true),
    ($10, 9, $1, 'I will be writing to both your families tonight. I must also warn you that if you do anything like this again...', NOW() - interval '90 days 21 hours 26 minutes', true),
    ($10, 9, $1, 'I will have no choice but to expel you', NOW() - interval '90 days 21 hours 26 minutes', true),
    ($10, $1, 9, 'Professor, when we took the car term hadn''t started, so...Gryffindor shouldn''t really have points taken from it should it?', NOW() - interval '90 days 21 hours 22 minutes', true),
    ($10, 9, $1, 'I will not take any points from Gryffindor', NOW() - interval '90 days 21 hours 12 minutes', true),
    ($10, 9, $1, 'But you will both get a detention', NOW() - interval '90 days 21 hours 11 minutes', true),
    ($10, $1, 9, 'Professor! Your bird! I couldn''t do anything...he just caught fire', NOW() - interval '44 days 22 hours 51 minutes', true),
    ($10, 9, $1, 'About time too. He''s been looking dreadful for days. I''ve been telling him to get a move on.', NOW() - interval '44 days 22 hours 32 minutes', true),
    ($10, 9, $1, 'Fawkes is a phoenix. Phoenixes burst into flame when it''s time for them to die', NOW() - interval '44 days 22 hours 27 minutes', true),
    ($10, 9, $1, 'They are reborn from the ashes. You can come watch him later', NOW() - interval '44 days 22 hours 27 minutes', true),
    ($10, 9, $1, 'It''s a shame you had to see him on a Burning Day.', NOW() - interval '44 days 22 hours 24 minutes', true),
    ($10, 9, $1, 'He''s really very handsome most of the time, wonderful red and gold plumage. Fascinating creatures...', NOW() - interval '44 days 22 hours 24 minutes', true),
    ($10, 9, $1, 'I do not think you attacked those people by the way', NOW() - interval '44 days 22 hours 20 minutes', true),
    ($10, $1, 9, 'Oh good...', NOW() - interval '44 days 22 hours 16 minutes', true),
    ($10, 9, $1, 'So tell me.', NOW() - interval '1 day', true),
    ($10, 9, $1, 'Your scar...has it been hurting at all?', NOW() - interval '1432 minutes', true),
    ($10, $1, 9, 'No and I''ve been wondering about that.', NOW() - interval '1363 minutes', true),
    ($10, $1, 9, 'I thought it would be burning all the time now Voldemort''s getting so powerful again.', NOW() - interval '1363 minutes', true),
    ($10, 9, $1, 'I on the other hand thought otherwise.', NOW() - interval '1360 minutes', true),
    ($10, 9, $1, 'Lord Voldemort has finally realized the dangerous access to his thoughts and feelings you have been enjoying.', NOW() - interval '1359 minutes', true),
    ($10, 9, $1, 'It appears that he is now employing Occlumency against you.', NOW() - interval '1358 minutes', true),
    ($10, $1, 9, 'Well I''m not complaining.', NOW() - interval '1301 minutes', true),

    ($11, 10, $1, 'You''re back! What??? How? That was foolish earlier!', NOW() - interval '2 days', true),
    ($11, $1, 10, 'But he spat at you!', NOW() - interval '2855 minutes', true),
    ($11, 10, $1, 'That was very gallant of you but don''t you realize?', NOW() - interval '2845 minutes', true),
    ($11, $1, 10, 'Yeah I do.', NOW() - interval '2843 minutes', true),
    ($11, $1, 10, 'Professor McGonagall, Voldemort''s on the way.', NOW() - interval '2842 minutes', true),
    ($11, 10, $1, 'You must flee', NOW() - interval '2839 minutes', true),
    ($11, 10, $1, 'Now, as quickly as you can!', NOW() - interval '2839 minutes', true),
    ($11, $1, 10, 'I can''t there''s something I need to do. Professor, do you know where the diadem of Ravenclaw is?', NOW() - interval '2837 minutes', true),
    ($11, 10, $1, 'The diadem of Ravenclaw? Of course not hasn''t it been lost for centuries? It was utter madness for you to enter this castle!', NOW() - interval '2835 minutes', true),
    ($11, $1, 10, 'Time''s running out...Voldemort''s getting nearer Professor', NOW() - interval '2832 minutes', true),
    ($11, $1, 10, 'I''m acting on Dumbledore''s orders. I must find what he wanted me to find! ', NOW() - interval '2831 minutes', true),
    ($11, $1, 10, 'But we''ve got to get the students out while I''m searching the castle.', NOW() - interval '2831 minutes', true),
    ($11, $1, 10, 'It''s me Voldemort wants, but he won''t care about killing a few more or less, not now.', NOW() - interval '2831 minutes', true),
    ($11, $1, 10, 'Not now he knows I''m attacking Horcruxes...', NOW() - interval '2830 minutes', true),
    ($11, 10, $1, 'We shall secure the school against He-Who-Must-Not-Be-Named while you search for this object.', NOW() - interval '2829 minutes', true),
    ($11, 10, $1, 'Come. We must alert the other Heads of House. You''d better bring your Cloak.', NOW() - interval '2829 minutes', true);
`;

module.exports = {
  insertDemoFriends,
  insertMessageThreadsId,
  insertMessageThreadsParticipants,
  insertMessageThreadsMessages,
};
