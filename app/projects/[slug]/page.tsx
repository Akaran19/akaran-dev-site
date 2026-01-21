import { notFound } from 'next/navigation'
import Section from '@/components/Section'

const projectDetails: Record<string, {
  title: string
  problem: string
  description: string
  techStack: string[]
  content: string
  demoUrl?: string
  githubUrl?: string
}> = {
  'rapid-recall-marketing-quiz': {
    title: 'Rapid Recall - LUBS2850 Marketing Quiz',
    problem: 'How to make marketing concepts engaging and memorable?',
    description: 'Interactive educational mini-game for mastering LUBS2850 Marketing concepts.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Firebase Firestore'],
    content: 'A modern, interactive educational mini-game built for LUBS2850 Marketing students at the University of Leeds. Features a Kahoot-style interface with timer, progress tracking, and visual feedback. Includes a persistent global leaderboard using Firebase Firestore for cross-device score tracking. The app uses glassmorphism design with smooth animations and is fully responsive across desktop, tablet, and mobile devices. Built with vanilla JavaScript and modern CSS, requiring no build tools and running entirely in the browser.',
    demoUrl: 'https://akaran19.github.io/LUBS2850_flashcards/',
    githubUrl: 'https://github.com/Akaran19/LUBS2850_flashcards'
  },
  'credit-risk-modeling': {
    title: 'Credit Risk Modeling System',
    problem: 'How to assess credit risk using machine learning?',
    description: 'Built a complete credit risk modeling system from scratch using Python and machine learning.',
    techStack: ['Python', 'Scikit-learn', 'Flask', 'Machine Learning'],
    content: 'This project demonstrates a complete end-to-end data science workflow for credit risk assessment. Starting with real-world financial data processing, the system applies machine learning techniques to evaluate credit risk. Key features include handling imbalanced datasets, model training with Scikit-learn, and an interactive web application for credit risk evaluation. The project serves as both a practical tool and a learning resource for data science beginners and interview preparation.',
    demoUrl: 'https://akaran.dev/credit-risk'
  },
  'generative-agent-model': {
    title: 'Generative Agent-Based Model of Language Adoption',
    problem: 'How do languages evolve and spread in populations?',
    description: 'BSc thesis exploring computational models of language change using agent-based simulations.',
    techStack: ['Python', 'NetworkX', 'Pandas', 'Matplotlib'],
    content: 'This project implemented evolutionary algorithms to model linguistic adaptation and cultural transmission in simulated populations. The model demonstrated how simple interaction rules can lead to complex language evolution patterns.',
    githubUrl: 'https://github.com/Akaran19/bachelors-project-new'
  },
  'world-cup-sentiment': {
    title: 'World Cup Twitter Sentiment Analysis',
    problem: 'Understanding public sentiment during major sporting events',
    description: 'Analyzed millions of tweets during the 2022 World Cup.',
    techStack: ['Python', 'Tweepy', 'NLTK', 'TextBlob'],
    content: 'Collected and analyzed real-time Twitter data during the tournament, identifying sentiment trends and cultural reactions across different fan bases and demographics.'
  },
  'pacman-eye-tracking': {
    title: 'Eyes on the Prize - Investigating Cognitive Load in Pac-Man Gameplay through Eye Tracking',
    problem: 'How does cognitive load affect decision-making in games?',
    description: 'Current attention levels in society have caused a shift in the media consumed and games played. Everything must be shorter, and less taxing cognitively. This study aims to investigate the major cultural trend in the 1980s, the arcade game Ms. Pac-Man, to try and deduce what made the game a global sensation. We investigated cognitive load dynamics through player gaze behaviour.',
    techStack: ['Python', 'CatEyes', 'OpenCV', 'Matplotlib', 'Statsmodels', 'EyeLink', 'ALE'],
    content: 'The data used in this project is part of a large-scale dataset, created to conduct reinforcement and imitation learning. The dataset is named Atari-HEAD (Atari Human Eye-tracking And Demonstration). The precursor to this dataset is the Atari Grand Challenge, a large-scale public dataset of human demonstration collected through online crowdsourcing with players of diverse skill levels. The dataset was created hoping to allow researchers to study the relation between attention and decision. The data was collected using the Arcade Learning Environment (ALE) (Bellemare et al., 2013). This structure allows for capturing of many interesting aspects of natural visuomotor tasks while allowing better experimental control than real-world tasks. The use of ALE is deterministic given the same game seed. The seed was however randomly generated to introduce stochasticity for gameplay. The Arcade Learning Environment (ALE) was created to evaluate general, domain-independent AI technology. ALE offers the opportunity for models, machine learning and reinforcement learning to be tested on Atari 2600 games, which are seen as challenging and interesting even for human players. ALE allows for the development and benchmarking of domain-independent agents on over 55 different games, showcasing the potential of established AI techniques in the realm of perception and action (Bellemare et al., 2013). Ms. Pac-Man, a classic maze-chase game released in 1981, serves as an influential case study in perception and action. Developed by Namco as a sequel to the original Pac-Man, Ms. Pac-Man introduced dynamic improvements, including faster gameplay and intricate ghost movement patterns. This game was a cultural phenomenon, that contributed significantly to the 1980s arcade gaming scene. We have chosen to investigate Ms. Pac-Man as it offers a dynamic maze environment, perfect for exploring decision-making, attentional shifts, and cognitive load. For every game image frame i, we recorded its corresponding image frame Ii, human keystroke action ai, human decision time ti, gaze positions gi1…gin, and the immediate reward ri returned by the environment. The game screen was 64.6 × 40.0 cm (or 1280 × 840 in pixels), and the distance to the subjects\' eyes was 78.7 cm. The human subjects were amateur players who were familiar with the games. The data contains 4 subjects playing 20 different Atari games. This report will only focus on the gameplay of the Atari 2600 game, Ms. Pac-Man. The total game time is 4.87 hours, with 353,428 usable gaze samples. The subjects were only allowed to play for 15 minutes and were required to rest for at least 15 minutes before the next trial. The trials are all 15 minutes as the current literature does not yet propose any AIs that reach human performance by 15 minutes. The gaze data was recorded using an EyeLink 1000 eye tracker at 1000 Hz. The EyeLink 1000 tracker was calibrated using a 16-point calibration procedure at the beginning of each trial, and the same 16 points were used at the end of the trial to estimate the gaze positional error. The average end-of-trial gaze positional error across 471 trials was 0.4 cm (2.1 pixels), less than 1% of the stimulus size. Such high tracking accuracy is necessary when dealing with Atari games since many OOI (objects of interest) are small and hard to track without high-quality equipment. To optimize the dataset for imitation learning (IL), the Arcade Learning Environment (ALE) default setting, challenging for expert players at 60 Hz, was adjusted. In the new setup, the game pauses at each frame until a keyboard action is taken, allowing subjects to hold a key for continuous play at a more comfortable 20Hz. This change resolves issues such as state-action mismatch, aligning actions with states at each time step and enhancing compatibility with supervised learning algorithms. The semi-frame-by-frame mode also aims to relax gameplay, reduce fatigue, and minimize suboptimal decisions due to inattentive blindness. By recording human decision time and eye movements at every frame, the dataset ensures capturing states requiring sophisticated planning, contributing to effective learning algorithms. The data was downloaded from the Arxiv Library (Zhang et al., 2019) on 29th November 2023. The data was then pre-processed which included creating a temporally ordered .csv file and downsampling the data from 1000 Hz to 50 Hz. This was chosen, as Ms. Pac-Man in the ALE can at the highest speed run at 20 Hz, which makes using eye tracking data at 1000 Hz seem redundant. The python package CatEyes (Gütlin, 2021/2021) was then used to classify fixations, saccades, smooth pursuits and PSOs (Post-saccadic oscillations). The method of eye-movement signal segmentation and event classification used is NSLR-HMM (Naïve Segmented Linear Regression - Hidden Markov Models). Unlike traditional workflows, NSLR integrates denoising into segmentation, making it the initial step in the analysis. Classification is then performed on denoised segments. This versatile approach identifies fixations, saccades, smooth pursuits, and post-saccadic oscillations, accommodating experiments with complex gaze behaviour. This allows it to be directly applied to noisy data, yielding robust gaze position and velocity estimates for both high-quality lab data and challenging mobile data on natural gaze behaviour, requiring minimal manual parameter setting as it autonomously estimates signal noise levels and gaze feature parameters from human classification examples (Pekkanen & Lappi, 2017). During the data analysis phase, the obtained game frames from the trials underwent processing using the OpenCV Python package (Bradski, 2000), to precisely localize ghosts and Pac-Man in each frame. This was feasible due to the distinct colour palette of retro game consoles like Atari, where colours for Objects of Interest (OOI) are intentionally different, as the console follows a 128-color palette. The localized positions were then utilized to calculate the distances between ghosts and Pac-Man, as well as between gaze location and Pac-Man, and gaze location and ghosts. This made it possible to create a novel variable named \'gaze_location\', that specifies whether the participant is looking at Pac-Man, a ghost, or neither. This \'gaze_location\' variable was then investigated temporally. Proportions of time spent looking at each value in \'gaze_location\' were calculated for 10-second intervals, and the temporal dynamics of gaze location were visually inspected using the Matplotlib Python package (Hunter, 2007). Next, the average fixation durations were plotted in 5-second intervals to address the hypothesis related to fixation duration and cognitive load. An ordinary least-squares linear regression model was hypothesized, treating fixation duration as the dependent variable, with time since the start of the trial and distance to Pac-Man as predictor variables. This model, created using the Statsmodels Python package (Seabold & Perktold, 2010), revealed that the distance to Pac-Man and the time since the start of the trial both had a significant impact on fixation duration. Finally, we explored the correlation between gaze location and Pac-Man\'s location temporally, due to the discoveries made in the prior step. The temporal dynamics were then plotted over one-minute intervals.',
    githubUrl: 'https://github.com/Akaran19/PercAct-exam'
  },
  'topic-modelling-syllabus': {
    title: 'Topic Modelling Cognitive Science Syllabus',
    problem: 'What topics dominate modern cognitive science curricula?',
    description: 'Applied LDA and BERT-based topic modeling to analyze course syllabi.',
    techStack: ['Python', 'scikit-learn', 'BERT', 'Gensim'],
    content: 'Processed syllabi from 50+ universities to identify emerging trends in cognitive science education, showing a shift towards computational and data-driven approaches.',
    githubUrl: 'https://github.com/Akaran19/soccult_exam'
  },
  'peerly-platform': {
    title: 'Peerly.io – Paper Review Platform',
    problem: 'Streamlining academic peer review process',
    description: 'Built a web platform for managing academic paper submissions and reviews.',
    techStack: ['React', 'Supabase', 'TypeScript', 'Tailwind CSS'],
    content: 'Developed a full-stack application with real-time notifications, automated reviewer matching based on expertise, and collaborative review workflows.',
    demoUrl: 'https://peerly.io'
  },
  'ai-snake': {
    title: 'AI Snake Game with Reinforcement Learning',
    problem: 'How can AI learn to play games optimally?',
    description: 'An intelligent Snake game implementation where an AI agent learns optimal gameplay strategies through reinforcement learning algorithms.',
    techStack: ['Python', 'PyTorch', 'NumPy', 'OpenAI Gym'],
    content: 'This project implements an AI-powered Snake game using reinforcement learning. The AI agent is trained using deep Q-learning to navigate the game board, collect food, and avoid obstacles. Built with PyTorch for neural network training and OpenAI Gym for the game environment, it demonstrates practical applications of machine learning in gaming and showcases how AI can master classic arcade games through iterative learning.',
    githubUrl: 'https://github.com/Akaran19/AI_snake'
  }
}

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projectDetails[params.slug]

  if (!project) {
    notFound()
  }

  return (
    <Section>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <p className="text-accent font-medium mb-6">{project.problem}</p>
        <p className="text-lg mb-6">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.techStack.map((tech) => (
            <span key={tech} className="px-3 py-1 bg-gray-800 text-gray-300 text-sm font-mono rounded">
              {tech}
            </span>
          ))}
        </div>
        {project.githubUrl && (
          <div className="mt-4 mb-8">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-colors"
            >
              <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
          </div>
        )}
        <div className="prose max-w-none">
          <p>{project.content}</p>
        </div>
      </div>
    </Section>
  )
}