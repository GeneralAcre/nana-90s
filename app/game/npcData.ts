export type Choice = {
  text: string;
  response: string;
  clue: string | null;
};

export type DialogueTurn = {
  npcLine: string;
  choices: Choice[];
};

export type NPC = {
  id: string;
  name: string;
  isLadyboy: boolean;
  outfitColor: string;
  hairColor: string;
  reveal: string;
  dialogues: DialogueTurn[];
};

export const storeNPCs: Record<string, NPC[]> = {
  playboy: [
    {
      id: "nong",
      name: "Nuclear",
      isLadyboy: false,
      outfitColor: "#FF69B4",
      hairColor: "#1a0a00",
      reveal:
        "Nong is a real girl from Khon Kaen. Her mom still calls her every day, and the story about her younger sister's school fees was genuine.",
      dialogues: [
        {
          npcLine: "Hey! First time here? Don't be shy na ka~",
          choices: [
            {
              text: '"Where are you from?"',
              response:
                "Khon Kaen! Came to Bangkok three years ago. My mom still calls me every single day — she worries too much.",
              clue: "Her mom calls daily. Sounds like a natural family bond.",
            },
            {
              text: '"How long have you worked here?"',
              response:
                "Two years already. I send money home every month so my younger sister can stay in school.",
              clue: "Pays for her younger sister's school. Feels like a real sibling bond.",
            },
          ],
        },
        {
          npcLine: "You seem different from the usual guys. More... thoughtful.",
          choices: [
            {
              text: '"Tell me about your childhood."',
              response:
                "I was such a tomboy! Always climbing trees with the boys. My mom was so frustrated with me.",
              clue: "Laughs about being a tomboy naturally. Comfortable childhood memory.",
            },
            {
              text: '"What do you do on days off?"',
              response:
                "Cook. My grandmother taught me her secret papaya salad recipe before she passed. I make it every Sunday.",
              clue: "Learned cooking from her grandmother. Warm, specific memory.",
            },
          ],
        },
        {
          npcLine: "One more drink and I might tell you my secrets... maybe.",
          choices: [
            {
              text: '"What\'s your biggest secret?"',
              response:
                "I can eat a whole mango sticky rice alone and still be hungry. Don't tell anyone!",
              clue: "Laughs easily, joke feels natural and playful.",
            },
            {
              text: '"I want to know the real you."',
              response:
                "I'm just a simple girl from Isaan with big dreams. No mysteries — just hard work.",
              clue: "Says 'simple girl' without any hesitation or extra emphasis.",
            },
          ],
        },
      ],
    },
    {
      id: "mint",
      name: "Mint",
      isLadyboy: true,
      outfitColor: "#9B59B6",
      hairColor: "#3D1F00",
      reveal:
        "Mint is a ladyboy. 'The real Mint took a long time to come out', her family needing time to understand her, and the slip in her laugh were all clues.",
      dialogues: [
        {
          npcLine: "Hello ka~ You have good taste, coming to talk to me first~",
          choices: [
            {
              text: '"Where are you from?"',
              response:
                "Chiang Mai. Beautiful city. I... changed a lot since I left there. My family needed time to understand me.",
              clue: "Says she 'changed a lot.' Her family 'needed time to understand her.'",
            },
            {
              text: '"You look amazing."',
              response:
                "Thank you ka~ Everything you see took a lot of effort and sacrifice. Worth every baht.",
              clue: "'Everything you see took effort and sacrifice.' Unusual way to describe appearance.",
            },
          ],
        },
        {
          npcLine: "I feel like I can trust you. You don't look at me like other guys.",
          choices: [
            {
              text: '"Tell me about your past."',
              response:
                "Let's just say I wasn't always this happy. The real Mint took a long time to come out. I'm proud of who I am now.",
              clue: "'The real Mint took a long time to come out.' Sounds like a coming-out story.",
            },
            {
              text: '"What makes you happiest?"',
              response:
                "Being accepted. When my old school friends saw me two years ago they couldn't believe how much I'd changed.",
              clue: "Old friends 'couldn't believe how much she changed.' Suggests major transformation.",
            },
          ],
        },
        {
          npcLine:
            "*laughs a little deeper than expected* Oops! Sorry, I do that when I laugh too hard~",
          choices: [
            {
              text: '"That laugh is cute."',
              response:
                "Thank you! I used to be so self-conscious about it. People teased me when I was young. But I learned to love everything about myself.",
              clue: "Was teased about her laugh (which just dropped in pitch). Self-conscious about it.",
            },
            {
              text: '"Are you hiding something from me?"',
              response:
                "*smiles* Everyone has secrets. Mine just... show sometimes. But I am 100% woman in every way that matters to me.",
              clue: "'Secrets that show sometimes.' '100% woman in every way that matters to ME.'",
            },
          ],
        },
      ],
    },
    {
      id: "wan",
      name: "Wan",
      isLadyboy: false,
      outfitColor: "#FFD700",
      hairColor: "#0d0020",
      reveal:
        "Wan is a real girl — a university student working temporarily. Her mother calling her 'luuk sao' and her office dreams were both genuine.",
      dialogues: [
        {
          npcLine: "I don't usually approach first. But you seem nice.",
          choices: [
            {
              text: '"Why are you here?"',
              response:
                "University fees. I study accounting at Ramkhamhaeng. My parents think I work at a restaurant.",
              clue: "Hiding this job from parents. Real student pressure — very relatable.",
            },
            {
              text: '"You seem nervous."',
              response:
                "Is it obvious? My roommate talked me into this two months ago. I'm still not used to it.",
              clue: "Only started 2 months ago. A real newcomer.",
            },
          ],
        },
        {
          npcLine:
            "I keep imagining my professor walking in here. That would be a nightmare.",
          choices: [
            {
              text: '"What do you study?"',
              response:
                "Accounting. I want a proper office job someday. This is temporary, I promise myself that every night.",
              clue: "Clear career ambition. Working temporarily to fund her studies.",
            },
            {
              text: '"How do you handle the stress?"',
              response:
                "I call my mom. Not about this, obviously. She always says 'suay, suay, luuk sao' — beautiful, my daughter.",
              clue: "Her mother calls her 'luuk sao' — daughter in Thai. Very natural maternal reference.",
            },
          ],
        },
        {
          npcLine: "If you could be anywhere right now, where would it be?",
          choices: [
            {
              text: '"Where would YOU be?"',
              response:
                "Home. Mom making tom kha soup, my little brother annoying me about video games. Normal boring life.",
              clue: "Describes normal domestic family life. Brother and mom feel real and specific.",
            },
            {
              text: '"What\'s your biggest dream?"',
              response:
                "Wearing a suit to work someday. My name on a badge. Boring dream, right? But it's mine.",
              clue: "Dreams of professional normalcy. Totally consistent with a girl working to pay tuition.",
            },
          ],
        },
      ],
    },
  ],

  obsession: [
    {
      id: "rose",
      name: "Rose",
      isLadyboy: true,
      outfitColor: "#8E44AD",
      hairColor: "#4A0080",
      reveal:
        "Rose is a ladyboy. She referred to her 'old self' in photos and said her aunt 'still calls her by the wrong name' — both strong tells.",
      dialogues: [
        {
          npcLine: "Dark in here, right? I like it. Easier to be yourself in the dark.",
          choices: [
            {
              text: '"Is this your kind of place?"',
              response:
                "Very much. Places like this... accept you without questions. That means everything to some of us.",
              clue: "'Accept you without questions.' Sounds personal, not just a preference.",
            },
            {
              text: '"Are you from Bangkok?"',
              response:
                "No. Ayutthaya. My family still lives there. My aunt still calls me by... an old name sometimes. It hurts.",
              clue: "Aunt calls her by 'an old name.' Clear sign of a name change.",
            },
          ],
        },
        {
          npcLine: "You're staring. Most people can't figure me out.",
          choices: [
            {
              text: '"You\'re very mysterious."',
              response:
                "I've had years of practice. Being mysterious is easier than explaining yourself.",
              clue: "Being mysterious is easier than 'explaining herself.' Suggests a complex identity story.",
            },
            {
              text: '"I\'m just trying to understand you."',
              response:
                "Most people don't try. They just assume. Trust me, I know what it's like to be misread.",
              clue: "Knows what it's like to be 'misread.' Could mean gender assumptions.",
            },
          ],
        },
        {
          npcLine:
            "I found an old photo of me last week. I almost didn't recognize the person.",
          choices: [
            {
              text: '"Old photos are funny like that."',
              response:
                "It wasn't funny for me. It was like looking at a stranger. I've come so far from that person.",
              clue: "Old photo feels like a 'stranger.' Major personal transformation implied.",
            },
            {
              text: '"Do you miss your old self?"',
              response:
                "No. That version of me was never real. This is real. *touches her hair* This is who I always was inside.",
              clue: "'That version was never real.' A clear statement about identity transition.",
            },
          ],
        },
      ],
    },
    {
      id: "bam",
      name: "Bam",
      isLadyboy: false,
      outfitColor: "#C0392B",
      hairColor: "#1a0a00",
      reveal:
        "Bam is a real girl. She talked about her period cramps keeping her from work last week — not something you fake.",
      dialogues: [
        {
          npcLine: "Hey, you look confused. It's your first time at Obsession?",
          choices: [
            {
              text: '"Is it always this dark?"',
              response:
                "Always! I hated it the first week. Now I love it. Like wearing a costume every night.",
              clue: "Adjusted over time. 'First week' suggests a normal onboarding experience.",
            },
            {
              text: '"You look like you own this place."',
              response:
                "Ha! I wish. I'd change the music. Less deep house, more vintage Thai pop. Nobody asked me though.",
              clue: "Has casual aesthetic opinions. Normal, relaxed personality.",
            },
          ],
        },
        {
          npcLine: "I missed two shifts last week. Boss was furious.",
          choices: [
            {
              text: '"What happened?"',
              response:
                "Period cramps. Absolute worst this month. I could barely move. Women's problems, you know?",
              clue: "Mentions period cramps casually and specifically. Very matter-of-fact.",
            },
            {
              text: '"Hope you\'re feeling better."',
              response:
                "Much better, thanks. My older sister dropped off painkillers and stayed over. She's the best.",
              clue: "Older sister came to help. Natural sibling relationship.",
            },
          ],
        },
        {
          npcLine: "What do you actually do for work? I always wonder about the guys who come here.",
          choices: [
            {
              text: '"I\'ll tell you if you tell me your dream job."',
              response:
                "Deal. I want to be a vet. I have three rescue cats at home. My landlord doesn't know.",
              clue: "Has rescue cats and a secret from her landlord. Specific, funny, real.",
            },
            {
              text: '"Do you like meeting new people here?"',
              response:
                "Depends on the person. You? Not bad so far.",
              clue: "Direct and confident. Normal female self-assurance.",
            },
          ],
        },
      ],
    },
    {
      id: "yui",
      name: "Yui",
      isLadyboy: true,
      outfitColor: "#E74C3C",
      hairColor: "#2C0A0A",
      reveal:
        "Yui is a ladyboy. She mentioned her 'procedure' abroad and said her younger brother now 'introduces her as his sister' — implying it wasn't always the case.",
      dialogues: [
        {
          npcLine: "You look like someone who appreciates real beauty. Am I right?",
          choices: [
            {
              text: '"Absolutely. Tell me about yourself."',
              response:
                "I've invested a lot in myself. Traveled abroad twice for... procedures. I believe in being the best version of yourself.",
              clue: "Traveled abroad for 'procedures' twice. Clear cosmetic/surgical references.",
            },
            {
              text: '"You\'re very confident."',
              response:
                "I wasn't always. Confidence was something I had to build, piece by piece, year by year.",
              clue: "'Built confidence piece by piece, year by year.' Sounds like a long personal journey.",
            },
          ],
        },
        {
          npcLine: "My family used to worry about me so much. Now they just... accept.",
          choices: [
            {
              text: '"Worry about what?"',
              response:
                "Everything. My choices. My lifestyle. My... appearance at the time. It took years but they came around.",
              clue: "Family worried about her 'appearance at the time.' Implies past looked different.",
            },
            {
              text: '"Family acceptance is everything."',
              response:
                "It is. My little brother now introduces me as his sister to his friends. That took five years to happen.",
              clue: "Brother introduces her as his 'sister' — implies this is relatively new.",
            },
          ],
        },
        {
          npcLine: "Sometimes I wonder what my life would look like if I'd been born different.",
          choices: [
            {
              text: '"Different how?"',
              response:
                "Just... easier from the start. Not having to fight for every little thing that others take for granted.",
              clue: "'Fight for things others take for granted.' Suggests fought for her identity.",
            },
            {
              text: '"Do you have regrets?"',
              response:
                "Zero regrets. Only regret is not starting sooner. Every year I waited was a year I wasn't myself.",
              clue: "'Not starting sooner.' Regrets the delay in transitioning.",
            },
          ],
        },
      ],
    },
  ],

  spectrum: [
    {
      id: "ice",
      name: "Ice",
      isLadyboy: false,
      outfitColor: "#00BFFF",
      hairColor: "#0d0020",
      reveal:
        "Ice is a real girl. She complained about her menstrual cycle timing ruining her weekend plans — completely natural and specific.",
      dialogues: [
        {
          npcLine: "You want a drink or you just here to look?",
          choices: [
            {
              text: '"Both. Tell me about Spectrum."',
              response:
                "Best sound system on the strip. I specifically chose this place because of the music. I DJ on Sundays.",
              clue: "Has a specific reason for this job — the music. DJs on Sundays.",
            },
            {
              text: '"Direct, I like it. What\'s your name?"',
              response: "Ice. Like the drink, not the weather.",
              clue: "Quick, confident reply. Normal female personality.",
            },
          ],
        },
        {
          npcLine: "I had big weekend plans last week. Completely ruined.",
          choices: [
            {
              text: '"What happened?"',
              response:
                "My cycle decided Sunday was the perfect time to arrive. Cramps, the whole disaster. I was so annoyed.",
              clue: "Mentions her menstrual cycle timing ruining plans. Specific and natural.",
            },
            {
              text: '"That sounds rough."',
              response:
                "My best friend brought me chocolate and bad movies. She's been my friend since we were seven.",
              clue: "Close female friendship since childhood. Normal girl dynamic.",
            },
          ],
        },
        {
          npcLine: "Music is everything to me. What kind do you like?",
          choices: [
            {
              text: '"I want to know what YOU like."',
              response:
                "House music. Detroit style. My dad had a massive vinyl collection — that's where it started.",
              clue: "Passion inherited from her father. Specific music knowledge.",
            },
            {
              text: '"Do you produce your own tracks?"',
              response:
                "Working on it. Have three half-finished songs on my laptop. Always distracted by life.",
              clue: "Has real creative projects in progress. Authentic ambition.",
            },
          ],
        },
      ],
    },
    {
      id: "pim",
      name: "Pim",
      isLadyboy: true,
      outfitColor: "#00CED1",
      hairColor: "#003333",
      reveal:
        "Pim is a ladyboy. She referred to a 'hormone schedule' and said she 'spent years becoming who she is' — clear transition references.",
      dialogues: [
        {
          npcLine: "This song reminds me of when I started becoming who I am.",
          choices: [
            {
              text: '"When was that?"',
              response:
                "About six years ago. I spent years becoming who I am. It was the best and hardest thing I've ever done.",
              clue: "'Spent years becoming who I am.' A personal transformation over many years.",
            },
            {
              text: '"Who are you now?"',
              response:
                "Finally myself. It sounds cliché but it's true. I look in the mirror now and recognize the person looking back.",
              clue: "'Finally' herself. Implies not always feeling like herself.",
            },
          ],
        },
        {
          npcLine: "I forgot my pills at home tonight. So annoyed at myself.",
          choices: [
            {
              text: '"What pills?"',
              response:
                "Hormones. I have a strict schedule — can't miss them. A day late and I feel completely off.",
              clue: "Takes hormones on a strict schedule. Clear indication of HRT.",
            },
            {
              text: '"Does that happen often?"',
              response:
                "Never. I'm usually so careful. My body depends on that routine. Trust me, you don't want to see me when it's disrupted.",
              clue: "'My body depends on that routine.' Not a normal contraceptive comment.",
            },
          ],
        },
        {
          npcLine: "Do you judge people for the choices they make about their own bodies?",
          choices: [
            {
              text: '"No. Why do you ask?"',
              response:
                "Because I've made a lot of choices others didn't understand. But every one of them was right for me.",
              clue: "Made 'choices about her body' others didn't understand. Self-determination language.",
            },
            {
              text: '"I think people should do what makes them happy."',
              response:
                "Good answer. That's exactly what I did. And I've never been happier.",
              clue: "Did what made her happy — in the context of body choices.",
            },
          ],
        },
      ],
    },
    {
      id: "nam",
      name: "Nam",
      isLadyboy: false,
      outfitColor: "#1E90FF",
      hairColor: "#0a0010",
      reveal:
        "Nam is a real girl. Her late mother taught her to pray at the temple each morning, and she mentioned her school uniform and the boys who teased her — authentic female memories.",
      dialogues: [
        {
          npcLine: "You look like you need someone to talk to. Lucky you found me.",
          choices: [
            {
              text: '"Do you talk to everyone like this?"',
              response:
                "Only the ones who look lonely. My mom said I always picked up strays — cats, friends, both.",
              clue: "Compassionate nature learned from her mom. Specific, warm detail.",
            },
            {
              text: '"I\'m just observing."',
              response:
                "Dangerous habit. You might see too much. I don't mind though.",
              clue: "Confident and self-aware. Natural feminine directness.",
            },
          ],
        },
        {
          npcLine: "I go to the temple every morning before work. People think it's strange.",
          choices: [
            {
              text: '"That\'s actually beautiful."',
              response:
                "My mother taught me. She passed three years ago. Going there feels like talking to her still.",
              clue: "Deceased mother taught her to pray. Deeply personal and specific grief.",
            },
            {
              text: '"Does it help you?"',
              response:
                "Every single day. I ask for patience mostly. This job requires a lot of it.",
              clue: "Normal, grounded spiritual practice. No drama around identity.",
            },
          ],
        },
        {
          npcLine: "Sometimes I think about how different my life could've been.",
          choices: [
            {
              text: '"Different how?"',
              response:
                "I was top of my class in school. The boys used to steal my notes because my handwriting was so neat. Life took different turns.",
              clue: "Top of class, boys stole her school notes. Clear female school memory.",
            },
            {
              text: '"Do you have regrets?"',
              response:
                "Some. But they made me who I am. I can live with that.",
              clue: "Measured, mature response. No dramatic identity-related regret.",
            },
          ],
        },
      ],
    },
  ],

  dollhouse: [
    {
      id: "belle",
      name: "Belle",
      isLadyboy: true,
      outfitColor: "#FF4500",
      hairColor: "#5C0A00",
      reveal:
        "Belle is a ladyboy. She said she 'used to have a different name' and that her voice 'took work to sound this way.'",
      dialogues: [
        {
          npcLine: "Welcome to the Dollhouse. I'm Belle. And you are...?",
          choices: [
            {
              text: '"Is Belle your real name?"',
              response:
                "It is now. I used to have a different name. One that didn't fit at all. Belle suits me perfectly.",
              clue: "'Used to have a different name.' Classic sign of transitioning.",
            },
            {
              text: '"You seem very... put together."',
              response:
                "Years of practice. Presentation is everything here. I take that very seriously.",
              clue: "'Years of practice' on presentation. Implies it wasn't always natural.",
            },
          ],
        },
        {
          npcLine: "People always say my voice is so feminine. I take that as the best compliment.",
          choices: [
            {
              text: '"You do have a lovely voice."',
              response:
                "Thank you! It took work. A lot of practice to sound this way. I watch videos, I trained. Worth every hour.",
              clue: "'Took work to sound this way.' Voice training — ladyboys often practice voice.",
            },
            {
              text: '"Feminine how?"',
              response:
                "Soft. Controlled. Before, I wasn't always this... calm. My voice used to betray me sometimes.",
              clue: "'My voice used to betray me.' Clear reference to voice before transition.",
            },
          ],
        },
        {
          npcLine: "The Dollhouse is special. Everyone here reinvented themselves.",
          choices: [
            {
              text: '"Did you reinvent yourself?"',
              response:
                "Completely. The person who grew up in my village... they would not recognize me. And that is wonderful.",
              clue: "Village persona vs. current self — unrecognizable transformation.",
            },
            {
              text: '"What does reinvention mean to you?"',
              response:
                "Freedom. Becoming what you were always supposed to be, no matter what the world told you.",
              clue: "'Becoming what you were always supposed to be.' Classic trans identity language.",
            },
          ],
        },
      ],
    },
    {
      id: "fern",
      name: "Fern",
      isLadyboy: false,
      outfitColor: "#FF6B6B",
      hairColor: "#1C0000",
      reveal:
        "Fern is a real girl. She talked about her pregnancy scare two years ago and her younger cousin looking up to her — completely authentic female experiences.",
      dialogues: [
        {
          npcLine: "You look confused. Everyone does their first time at the Dollhouse.",
          choices: [
            {
              text: '"Is it always like this?"',
              response:
                "Wild? Yes. My first week I called my cousin and said 'I can't believe this place exists.'",
              clue: "Called her cousin in surprise. Normal reaction to an unfamiliar environment.",
            },
            {
              text: '"How long have you been here?"',
              response:
                "Three years. Started right after my breakup. Best rebound decision I ever made.",
              clue: "Started after a breakup — relatable and very human reason.",
            },
          ],
        },
        {
          npcLine: "I almost quit two years ago. Had a real scare that changed everything.",
          choices: [
            {
              text: '"What kind of scare?"',
              response:
                "Pregnancy scare. Turned out to be nothing, but those three days... I reassessed everything in my life.",
              clue: "Pregnancy scare. A specifically female biological experience.",
            },
            {
              text: '"What kept you going?"',
              response:
                "My little cousin. She looks up to me for some reason. I can't let her down.",
              clue: "Younger cousin who looks up to her. Normal family motivation.",
            },
          ],
        },
        {
          npcLine: "If I'm being honest, I want out of Bangkok within two years.",
          choices: [
            {
              text: '"Where would you go?"',
              response:
                "Krabi. Open a dive shop. I got certified last year. The ocean makes everything smaller.",
              clue: "Specific realistic plan — dive certification and location. Grounded ambition.",
            },
            {
              text: '"What\'s stopping you now?"',
              response:
                "Money. And my mom doesn't want me so far away. She already cried when I moved to Bangkok.",
              clue: "Mom cried when she moved. Normal mother-daughter separation anxiety.",
            },
          ],
        },
      ],
    },
    {
      id: "dao",
      name: "Dao",
      isLadyboy: false,
      outfitColor: "#E91E63",
      hairColor: "#2E0014",
      reveal:
        "Dao is a real girl. She mentioned heavy flow days making her miss practice and talked casually about her older sister's pregnancy — real female life details.",
      dialogues: [
        {
          npcLine: "You're quiet. I like that. Too many loud ones in here.",
          choices: [
            {
              text: '"What do you do when you\'re not here?"',
              response:
                "Practice traditional dance. I've been doing it since I was five. My instructor is harder than any boss I've ever had.",
              clue: "Traditional dance since age five. Specific and serious female childhood activity.",
            },
            {
              text: '"Do you enjoy working here?"',
              response:
                "It's complex. Some nights are great. Some nights I drive home and eat rice alone and cry a little. That's honest.",
              clue: "Very candid emotional honesty. Natural and relatable.",
            },
          ],
        },
        {
          npcLine: "I missed dance practice twice this month. Instructor almost kicked me out.",
          choices: [
            {
              text: '"Why did you miss?"',
              response:
                "Heavy flow days. No way I'm moving through choreography feeling like that. Tried once. Never again.",
              clue: "Mentions 'heavy flow days' — menstrual period affecting physical activity. Very specific.",
            },
            {
              text: '"Is dance that important to you?"',
              response:
                "It's the only thing that's mine. Work, family drama, all of it disappears when I'm dancing.",
              clue: "Dance as personal identity anchor. Normal, human motivation.",
            },
          ],
        },
        {
          npcLine: "My sister just told me she's pregnant. I cried for an hour.",
          choices: [
            {
              text: '"Happy tears or scared ones?"',
              response:
                "Both! Happy because I'm going to be an aunt. Scared because our family is already chaos. But mostly happy.",
              clue: "Excited to be an aunt. Natural sister-to-sister dynamic.",
            },
            {
              text: '"Are you close with your sister?"',
              response:
                "We fight constantly and I'd do anything for her. That's just sisters.",
              clue: "'That's just sisters.' Casual, natural description of a female sibling bond.",
            },
          ],
        },
      ],
    },
  ],

  candybar: [
    {
      id: "candy",
      name: "Candy",
      isLadyboy: false,
      outfitColor: "#FF8C00",
      hairColor: "#0d0a00",
      reveal:
        "Candy is a real girl. She talked about her school uniform skirt being too short and her mother altering it — a very specific female school memory.",
      dialogues: [
        {
          npcLine: "Welcome to Candy Bar! I'm Candy. Yes, that is my real nickname.",
          choices: [
            {
              text: '"Why Candy?"',
              response:
                "My mom said I was sweet enough to eat when I was born. Been stuck with it ever since. I don't mind.",
              clue: "Mom gave her the nickname at birth. Warm, typical Thai family nicknaming story.",
            },
            {
              text: '"You seem very cheerful."',
              response:
                "I fake it sometimes. But tonight I'm genuinely in a good mood. My exam results came back — passed!",
              clue: "Honest about faking happiness sometimes. Has ongoing exams.",
            },
          ],
        },
        {
          npcLine: "I hated high school so much. I don't know how I survived.",
          choices: [
            {
              text: '"What was so bad?"',
              response:
                "The uniform skirt was SO short. My mom kept altering it longer and I kept rolling it back up. Daily war.",
              clue: "School uniform skirt battles with mom. Classic female high school memory.",
            },
            {
              text: '"High school is rough for everyone."',
              response:
                "I had a best friend who made it bearable. We cried together in the bathroom twice a week. Miss her.",
              clue: "Crying with a female best friend in the school bathroom. Very authentic.",
            },
          ],
        },
        {
          npcLine: "What would you change about your life if you could?",
          choices: [
            {
              text: '"I\'ll tell you mine if you tell me yours."',
              response:
                "I'd tell my younger self that it all gets better. I spent too many years worrying about what boys thought of me.",
              clue: "Worried about what boys thought of her — natural female adolescent experience.",
            },
            {
              text: '"What do you wish for now?"',
              response:
                "To graduate. Open a dessert shop. Name it Candy Bar. Full circle.",
              clue: "Wants to graduate and open a dessert shop. Specific, realistic dream.",
            },
          ],
        },
      ],
    },
    {
      id: "pear",
      name: "Pear",
      isLadyboy: true,
      outfitColor: "#FF1493",
      hairColor: "#2E0028",
      reveal:
        "Pear is a ladyboy. She mentioned 'starting hormones at 17' and said she has a 'chosen family' because her birth family rejected her.",
      dialogues: [
        {
          npcLine: "I love this bar. It's the most colorful place I've ever worked.",
          choices: [
            {
              text: '"How long have you been here?"',
              response:
                "Four years. This place gave me a second chance after my family... situation. I owe it a lot.",
              clue: "'After my family situation.' Vague but suggests estrangement or conflict.",
            },
            {
              text: '"Colorful fits you."',
              response:
                "Everything about me is colorful now. It wasn't always. Black and white for too many years.",
              clue: "'Not always colorful.' Life was 'black and white for too many years' — implies major change.",
            },
          ],
        },
        {
          npcLine: "I started figuring myself out when I was fifteen. Best and worst years of my life.",
          choices: [
            {
              text: '"What happened at fifteen?"',
              response:
                "I admitted to myself what I'd known since I was little. Started hormones at seventeen. My parents found out at eighteen.",
              clue: "'Started hormones at seventeen.' Explicit HRT reference.",
            },
            {
              text: '"That sounds difficult."',
              response:
                "Incredibly. But I have a chosen family now — people who love me exactly as I am. That's rarer than blood.",
              clue: "'Chosen family' — often used by LGBTQ+ people whose birth families rejected them.",
            },
          ],
        },
        {
          npcLine: "I used to hide so much. Now I hide nothing.",
          choices: [
            {
              text: '"What did you hide?"',
              response:
                "Everything. Who I was, how I felt, what I wanted. Living like that is exhausting. I'm done with it.",
              clue: "Hid identity for years. Freedom in finally being open.",
            },
            {
              text: '"Do you feel free now?"',
              response:
                "Completely free. Every scar was worth it. Every difficult day built this.",
              clue: "'Every scar was worth it.' Physical scars — likely surgical.",
            },
          ],
        },
      ],
    },
    {
      id: "kwan",
      name: "Kwan",
      isLadyboy: false,
      outfitColor: "#FFA500",
      hairColor: "#1A0800",
      reveal:
        "Kwan is a real girl. She talked about her pregnancy causing morning sickness that ruined her cooking school exams, and her mom recognizing her pregnancy before she did.",
      dialogues: [
        {
          npcLine: "Don't let the name fool you. Candy Bar is actually pretty chill on weeknights.",
          choices: [
            {
              text: '"Are you from Bangkok?"',
              response:
                "Born and raised, Ladprao area. I know every shortcut in this city. Ask me anything.",
              clue: "Local Bangkok girl. Knows the city deeply. Natural pride.",
            },
            {
              text: '"What\'s the strangest thing that\'s happened here?"',
              response:
                "A man proposed to one of the girls last Tuesday. She said no. He cried. It was very awkward.",
              clue: "Normal work anecdote. Relaxed, observer-type personality.",
            },
          ],
        },
        {
          npcLine: "I almost dropped out of cooking school two years ago.",
          choices: [
            {
              text: '"Why?"',
              response:
                "Morning sickness. I was pregnant. Lost it early, but those weeks destroyed my grades. Hard time.",
              clue: "Was pregnant and had morning sickness. A specifically female biological experience.",
            },
            {
              text: '"How did you get through it?"',
              response:
                "My mom figured it out before I even told her. She showed up with ginger tea and didn't ask questions. That's love.",
              clue: "Mom recognized pregnancy symptoms before she admitted it. Classic mother-daughter moment.",
            },
          ],
        },
        {
          npcLine: "I cook better than anyone at this bar. Just so you know.",
          choices: [
            {
              text: '"Prove it."',
              response:
                "*laughs* Come to my cooking class Saturday morning. I teach beginners now. It's the best part of my week.",
              clue: "Teaches cooking classes. A concrete, normal life detail.",
            },
            {
              text: '"That\'s a bold claim."',
              response:
                "Bold and true. Massaman curry. I'll change your life.",
              clue: "Confident about specific skill. Natural female self-confidence.",
            },
          ],
        },
      ],
    },
  ],

  rainbow: [
    {
      id: "aim",
      name: "Aim",
      isLadyboy: true,
      outfitColor: "#7FFF00",
      hairColor: "#003300",
      reveal:
        "Aim is a ladyboy. She said she 'used to walk differently' and that her doctor 'follows her progress closely' — references to surgical recovery and hormones.",
      dialogues: [
        {
          npcLine: "Rainbow is the most fun place on the strip. You picked right.",
          choices: [
            {
              text: '"You seem very at home here."',
              response:
                "I am now. Took time. I used to walk into rooms differently — more guarded. Now I just... walk.",
              clue: "'Used to walk into rooms differently — more guarded.' Implies past self-consciousness about appearance.",
            },
            {
              text: '"What makes Rainbow special?"',
              response:
                "Everyone here is accepted. No questions, no judgment. For some of us that's rare to find.",
              clue: "'For some of us that's rare.' Personal statement, not just a general comment.",
            },
          ],
        },
        {
          npcLine: "I have a doctor's appointment tomorrow morning. I never miss them.",
          choices: [
            {
              text: '"Are you okay?"',
              response:
                "Fine, fine. My doctor just follows my progress closely. We've been working together for three years.",
              clue: "Doctor 'follows her progress' for three years. Likely hormone therapy monitoring.",
            },
            {
              text: '"You seem very health-conscious."',
              response:
                "My body is something I've invested in deeply. Of course I take care of it.",
              clue: "'Invested in my body deeply.' Deliberate investment — likely surgical/hormonal.",
            },
          ],
        },
        {
          npcLine: "People sometimes ask me why I'm so happy. The answer is simple.",
          choices: [
            {
              text: '"Tell me."',
              response:
                "I spent twenty years being someone I wasn't. Now I get to be myself every single day. That's everything.",
              clue: "'Twenty years being someone I wasn't.' Clear reference to pre-transition life.",
            },
            {
              text: '"Happiness is rare."',
              response:
                "It is. I earned mine. Every painful step was worth it.",
              clue: "'Every painful step was worth it.' Likely referring to physical transition pain.",
            },
          ],
        },
      ],
    },
    {
      id: "mook",
      name: "Mook",
      isLadyboy: false,
      outfitColor: "#9370DB",
      hairColor: "#100020",
      reveal:
        "Mook is a real girl. She talked about her period causing her to faint during a school sports event, and her older sister teasing her about her first boyfriend — genuine female memories.",
      dialogues: [
        {
          npcLine: "You came in late. Good — I hate the early rush.",
          choices: [
            {
              text: '"Do you prefer it quieter?"',
              response:
                "Always. I can actually have real conversations. The first two hours it's just screaming over music.",
              clue: "Prefers genuine connection over performance. Grounded personality.",
            },
            {
              text: '"What do you do during the rush?"',
              response:
                "Smile and survive. I think about what I'll cook when I get home at 3am. My comfort system.",
              clue: "Late-night comfort cooking. Normal, human coping mechanism.",
            },
          ],
        },
        {
          npcLine: "I fainted once in front of my entire school. Still haven't recovered emotionally.",
          choices: [
            {
              text: '"What happened?"',
              response:
                "Sports day. I didn't realize my period had started. Cramps hit mid-race and that was it. Floor.",
              clue: "Fainted during a race because period cramps hit suddenly. Specific female experience.",
            },
            {
              text: '"That sounds mortifying."',
              response:
                "My sister still brings it up at family dinners. I can't escape it.",
              clue: "Sister teases her about it. Normal sibling dynamic.",
            },
          ],
        },
        {
          npcLine: "My older sister is obsessed with my love life. It's exhausting.",
          choices: [
            {
              text: '"Older sisters are like that."',
              response:
                "She's been like this since my first boyfriend in year 9. She read his name off my notebook and told my whole family at dinner.",
              clue: "First boyfriend in year 9 — sister read name off her notebook. Classic female teenage experience.",
            },
            {
              text: '"Do you have a boyfriend now?"',
              response:
                "No. And I would like to keep it that way until my sister moves to another province.",
              clue: "Funny, relatable sisterly boundary. Natural female family dynamic.",
            },
          ],
        },
      ],
    },
    {
      id: "nid",
      name: "Nid",
      isLadyboy: false,
      outfitColor: "#20B2AA",
      hairColor: "#0a0a1a",
      reveal:
        "Nid is a real girl. She described wearing her mother's clothes as a little girl to play dress-up, and talked about the boys at her school being scared of her — authentic female youth memories.",
      dialogues: [
        {
          npcLine: "You look like you're searching for something. Aren't we all.",
          choices: [
            {
              text: '"What are you searching for?"',
              response:
                "Stability. A plan. I change my five-year plan every five months. My friends think it's funny. I think it's terrifying.",
              clue: "Anxious about the future in a very normal, relatable way.",
            },
            {
              text: '"You seem thoughtful for this place."',
              response:
                "I read too much. My coworkers make fun of me for bringing books on my break.",
              clue: "Reads books on break. Normal intellectual habit.",
            },
          ],
        },
        {
          npcLine: "I used to play in my mother's wardrobe when I was little. Hours in there.",
          choices: [
            {
              text: '"Doing what?"',
              response:
                "Trying on her heels, her dresses, her lipstick. She always pretended to be angry but she was secretly pleased.",
              clue: "Little girl playing dress-up in mother's clothes. Classic female childhood memory.",
            },
            {
              text: '"Your mom sounds wonderful."',
              response:
                "She is. She still calls me 'her little fashion disaster' because of those years.",
              clue: "Mom's affectionate nickname for her childhood antics. Warm mother-daughter relationship.",
            },
          ],
        },
        {
          npcLine: "I was terrifying in secondary school, apparently.",
          choices: [
            {
              text: '"Terrifying how?"',
              response:
                "The boys were scared of me. I was class president three years running and I was not forgiving about homework.",
              clue: "Class president, intimidating to the boys. Confident female leadership memory.",
            },
            {
              text: '"That\'s kind of amazing."',
              response:
                "I peaked at fifteen and I've been chasing that feeling ever since.",
              clue: "Self-deprecating humor about past confidence. Natural and authentic.",
            },
          ],
        },
      ],
    },
  ],
};