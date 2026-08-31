const state = {
  currentDay: Number(localStorage.getItem('alagaCurrentDay') || 1),
  totalWorkouts: Number(localStorage.getItem('alagaTotalWorkouts') || 0),
  pendingWorkout: localStorage.getItem('alagaPendingWorkout') === 'true'
};

const workouts = {
  1: {
    title: 'Glutes + Legs',
    exercises: [
      'Hip Thrust Machine',
      'Leg Press',
      'Seated Leg Curl',
      'Hip Abduction'
    ]
  },

  2: {
    title: 'Upper + Glutes',
    exercises: [
      'Lat Pulldown',
      'Chest Press',
      'Seated Row',
      'Hip Abduction'
    ]
  },

  3: {
    title: 'Thighs + Glutes',
    exercises: [
      'Leg Press',
      'Leg Extension',
      'Seated Leg Curl',
      'Hip Thrust Machine'
    ]
  }
};


/* =========================
   APP
========================= */

const app = document.getElementById('app');


/* =========================
   SAVE DATA
========================= */

function save() {
  localStorage.setItem('alagaCurrentDay', state.currentDay);
  localStorage.setItem('alagaTotalWorkouts', state.totalWorkouts);
  localStorage.setItem('alagaPendingWorkout', state.pendingWorkout);
}


/* =========================
   WORKOUT CARD
========================= */

function workoutCard(day = state.currentDay) {
  const w = workouts[day];

  return `
    <div class="card">

      <div class="kicker">
        Next workout
      </div>

      <div class="workout-name">
        Day ${day} — ${w.title}
      </div>

      <div class="meta">
        4 exercises • Beginner friendly
      </div>

    </div>
  `;
}


/* =========================
   HOME
========================= */

function home() {

  if (state.pendingWorkout) {
    return returnCheck();
  }

  app.innerHTML = `
    <section class="screen">

      <div class="brand">
        <h1>ALAGA</h1>

        <p class="tagline">
          Balik Alindog, one day at a time.
        </p>
      </div>

      <div class="spacer"></div>

      <div class="center">

        <div class="kicker">
          Made with love by Christian for Blessie 🩵
        </div>

        <h2>
          How are you feeling?
        </h2>

      </div>

      <button class="choice" onclick="good()">
        <strong>🟢 I feel good</strong>
        <span>Let's train.</span>
      </button>

      <button class="choice" onclick="tired()">
        <strong>🟡 I'm tired</strong>
        <span>Let's keep it easy.</span>
      </button>

      <button class="choice" onclick="exhausted()">
        <strong>🔴 I'm exhausted</strong>
        <span>Rest is allowed.</span>
      </button>

      <button class="secondary" onclick="surprise()">
        🎲 Surprise me
      </button>

      <div class="footer-menu">

        <button class="linkish" onclick="journey()">
          📈 Journey
        </button>

        <button class="linkish" onclick="tutorials()">
          🎥 Tutorials
        </button>

        <button class="linkish" onclick="settings()">
          ⚙️ Settings
        </button>

      </div>

      <div class="spacer"></div>

    </section>
  `;
}


/* =========================
   GOOD
========================= */

function good() {

  app.innerHTML = `
    <section class="screen">

      <button class="back" onclick="home()">
        ← Back
      </button>

      <div class="spacer"></div>

      <div class="kicker">
        Feeling good? 🩵
      </div>

      <h2>
        Let's train.
      </h2>

      ${workoutCard()}

      <button class="primary" onclick="workout()">
        🏋️ Start today's plan
      </button>

      <button class="secondary" onclick="cardio()">
        ❤️ Add / do cardio instead
      </button>

      <div class="spacer"></div>

    </section>
  `;
}


/* =========================
   TIRED
========================= */

function tired() {

  app.innerHTML = `
    <section class="screen">

      <button class="back" onclick="home()">
        ← Back
      </button>

      <div class="spacer"></div>

      <div class="kicker">
        That's okay 🩵
      </div>

      <h2>
        What sounds right?
      </h2>

      <button class="choice" onclick="workout()">
        <strong>🏋️ Just workout</strong>
        <span>${workouts[state.currentDay].title}</span>
      </button>

      <button class="choice" onclick="minimum()">
        <strong>🪫 Do the minimum</strong>
        <span>A shorter version still counts.</span>
      </button>

      <button class="choice" onclick="cardio()">
        <strong>❤️ Cardio only</strong>
        <span>Move because you want to.</span>
      </button>

      <button class="choice" onclick="recovery()">
        <strong>🌙 Recover</strong>
        <span>No pressure today.</span>
      </button>

      <div class="spacer"></div>

    </section>
  `;
}


/* =========================
   EXHAUSTED
========================= */

function exhausted() {

  app.innerHTML = `
    <section class="screen">

      <button class="back" onclick="home()">
        ← Back
      </button>

      <div class="spacer"></div>

      <div class="center">

        <div class="kicker">
          🩵 No pressure
        </div>

        <h2>
          Rest today.
        </h2>

        <p>
          Your workout isn't going anywhere.
        </p>

      </div>

      <button class="primary" onclick="recovery()">
        🌙 Recovery mode
      </button>

      <button class="secondary" onclick="home()">
        🛌 I'll rest
      </button>

      <div class="spacer"></div>

    </section>
  `;
}


/* =========================
   TODAY'S WORKOUT
========================= */

function workout() {

  app.innerHTML = `
    <section class="screen">

      <button class="back" onclick="changeMind()">
        ← Change my mind
      </button>

      <div class="kicker">
        Today's plan
      </div>

      <h2>
        🍑 Day ${state.currentDay}
      </h2>

      ${workoutCard()}

      <button class="primary" onclick="launchHevy()">
        🏋️ Launch Hevy
      </button>

      <p class="tiny">
        When you're finished, come back here 🩵
      </p>

      <button class="secondary" onclick="helpExercises()">
        🤔 Stuck? Get exercise help
      </button>

      <div class="spacer"></div>

    </section>
  `;
}


/* =========================
   CHANGE MY MIND
========================= */

function changeMind() {

  app.innerHTML = `
    <section class="screen">

      <button class="back" onclick="workout()">
        ← Back to today's plan
      </button>

      <div class="spacer"></div>

      <div class="center">

        <div class="kicker">
          No pressure 🩵
        </div>

        <h2>
          Changed your mind?
        </h2>

        <p>
          That's completely okay.
          What would you rather do?
        </p>

      </div>

      <button class="choice" onclick="cardio()">
        <strong>❤️ Cardio only</strong>
        <span>Move because you want to.</span>
      </button>

      <button class="choice" onclick="minimum()">
        <strong>🪫 Do the minimum</strong>
        <span>A shorter workout is enough.</span>
      </button>

      <button class="choice" onclick="recovery()">
        <strong>🌙 Recovery</strong>
        <span>Rest and take care of yourself.</span>
      </button>

      <button class="secondary" onclick="cancelWorkoutAndHome()">
        🏠 Back home
      </button>

      <div class="spacer"></div>

    </section>
  `;
}


/* =========================
   CANCEL WORKOUT + HOME
========================= */

function cancelWorkoutAndHome() {
  state.pendingWorkout = false;
  save();
  home();
}


/* =========================
   LAUNCH HEVY
========================= */

function launchHevy() {

  state.pendingWorkout = true;

  save();

  alert(
    'Hevy launch link will be connected after we verify the correct iPhone deep-link behavior.'
  );

  workout();
}


/* =========================
   RETURN FROM HEVY
========================= */

function returnCheck() {

  app.innerHTML = `
    <section class="screen">

      <div class="spacer"></div>

      <div class="center">

        <div class="kicker">
          Welcome back 🌸
        </div>

        <h2>
          Did you finish your workout?
        </h2>

        <p>
          Your Day ${state.currentDay} workout is still open.
        </p>

      </div>

      <button class="primary" onclick="completeWorkout()">
        ✅ Yes, I finished
      </button>

      <button class="secondary" onclick="workout()">
        ↩️ Not yet
      </button>

      <button class="secondary" onclick="helpExercises()">
        🤔 I came back for help
      </button>

      <div class="spacer"></div>

    </section>
  `;
}


/* =========================
   COMPLETE WORKOUT
========================= */

function completeWorkout() {

  state.totalWorkouts++;

  const completed = state.currentDay;

  state.currentDay =
    state.currentDay === 3
      ? 1
      : state.currentDay + 1;

  state.pendingWorkout = false;

  save();

  const milestoneNumbers = [
    1,
    3,
    5,
    10,
    20,
    30,
    50,
    100
  ];

  const milestone =
    milestoneNumbers.includes(state.totalWorkouts)
      ? `
        <div class="card center">

          <strong>
            🏆 ${state.totalWorkouts} workouts!
          </strong>

          <p>
            Look how far you've come. 🩵
          </p>

        </div>
      `
      : '';

  app.innerHTML = `
    <section class="screen">

      <div class="spacer"></div>

      <div class="center">

        <div class="kicker">
          🎉 Done!
        </div>

        <h2>
          Day ${completed} complete.
        </h2>

        <p>
          Next: Day ${state.currentDay}
          — ${workouts[state.currentDay].title}
        </p>

        ${milestone}

      </div>

      <button class="primary" onclick="home()">
        Back home 🩵
      </button>

      <div class="spacer"></div>

    </section>
  `;
}


/* =========================
   MINIMUM WORKOUT
========================= */

function minimum() {

  const w = workouts[state.currentDay];

  app.innerHTML = `
    <section class="screen">

      <button class="back" onclick="home()">
        ← Back
      </button>

      <div class="spacer"></div>

      <div class="kicker">
        🪫 Low battery
      </div>

      <h2>
        Do the minimum.
      </h2>

      <div class="card">

        <strong>
          ${w.exercises[0]} — 2 sets
        </strong>

        <br>

        <strong>
          ${w.exercises[1]} — 2 sets
        </strong>

        <br>

        <strong>
          ${w.exercises[3]} — 2 sets
        </strong>

        <p>
          That's enough. 🩵
        </p>

      </div>

      <button class="primary" onclick="workout()">
        🏋️ Continue
      </button>

      <div class="spacer"></div>

    </section>
  `;
}


/* =========================
   CARDIO
========================= */

function cardio() {

  app.innerHTML = `
    <section class="screen">

      <button class="back" onclick="home()">
        ← Back
      </button>

      <div class="spacer"></div>

      <div class="kicker">
        ❤️ Cardio day
      </div>

      <h2>
        Move how you like.
      </h2>

      <button class="choice">
        <strong>🚶 Treadmill</strong>
        <span>Easy or moderate</span>
      </button>

      <button class="choice">
        <strong>⭕ Elliptical</strong>
        <span>Low impact</span>
      </button>

      <button class="choice">
        <strong>🚴 Bike</strong>
        <span>Go at your pace</span>
      </button>

      <p class="tiny">
        20–40 min is a suggestion,
        not a requirement.
      </p>

      <button class="secondary" onclick="home()">
        Back home
      </button>

      <div class="spacer"></div>

    </section>
  `;
}


/* =========================
   RECOVERY
========================= */

function recovery() {

  app.innerHTML = `
    <section class="screen">

      <button class="back" onclick="home()">
        ← Home
      </button>

      <div class="spacer"></div>

      <div class="kicker">
        🌙 Recovery mode
      </div>

      <h2>
        What sounds good?
      </h2>

      <button class="choice" onclick="surprise('watch')">
        <strong>🎬 Watch something</strong>
      </button>

      <button class="choice" onclick="surprise('listen')">
        <strong>🎵 Listen to something</strong>
      </button>

      <button class="choice" onclick="surprise('move')">
        <strong>🚶 Move a little</strong>
      </button>

      <button class="choice" onclick="surprise('fun')">
        <strong>🎮 Something fun</strong>
      </button>

      <button class="choice" onclick="home()">
        <strong>🛌 Do nothing</strong>
        <span>That's allowed. 🩵</span>
      </button>

      <button class="secondary" onclick="surprise()">
        🎲 Surprise me
      </button>

      <div class="spacer"></div>

    </section>
  `;
}


/* =========================
   RANDOM PICKS
========================= */

const picks = {

  watch: [
    'Try one easy episode of a comfort show.',
    'Pick a light movie and get cozy.'
  ],

  listen: [
    'Put on a playlist you already love.',
    'AirPods in. No decisions. Just vibe.'
  ],

  move: [
    'Take a gentle 10-minute walk.',
    'Try 5 minutes of easy stretching.'
  ],

  fun: [
    'Play something low-effort and enjoyable.',
    'Call or message someone you love.'
  ],

  any: [
    '🎬 Watch something comforting.',
    '🎵 Put on music and rest.',
    '🚶 Take a gentle walk.',
    '🛌 Do absolutely nothing.'
  ]

};


function surprise(type = 'any') {

  const pool = picks[type] || picks.any;

  const pick =
    pool[Math.floor(Math.random() * pool.length)];

  app.innerHTML = `
    <section class="screen">

      <button class="back" onclick="recovery()">
        ← Back
      </button>

      <div class="spacer"></div>

      <div class="center">

        <div class="kicker">
          🎲 Your random pick
        </div>

        <h2>
          ${pick}
        </h2>

        <p>
          No pressure.
          Just something for you. 🩵
        </p>

      </div>

      <button
        class="primary"
        onclick="surprise('${type}')"
      >
        🎲 Another one
      </button>

      <button
        class="secondary"
        onclick="home()"
      >
        Back home
      </button>

      <div class="spacer"></div>

    </section>
  `;
}


/* =========================
   EXERCISE HELP
========================= */

function helpExercises() {

  const list =
    workouts[state.currentDay]
      .exercises
      .map(
        (exercise, index) => `
          <button
            class="choice"
            onclick="exerciseHelp(${index})"
          >
            <strong>${exercise}</strong>
          </button>
        `
      )
      .join('');

  app.innerHTML = `
    <section class="screen">

      <button class="back" onclick="workout()">
        ← Back to workout
      </button>

      <div class="kicker">
        🤔 Stuck?
      </div>

      <h2>
        Which exercise?
      </h2>

      ${list}

      <div class="spacer"></div>

    </section>
  `;
}


function exerciseHelp(index) {

  const exercise =
    workouts[state.currentDay].exercises[index];

  app.innerHTML = `
    <section class="screen">

      <button
        class="back"
        onclick="helpExercises()"
      >
        ← Exercises
      </button>

      <div class="spacer"></div>

      <div class="kicker">
        Exercise help
      </div>

      <h2>
        ${exercise}
      </h2>

      <button
        class="choice"
        onclick="
          alert(
            'Tutorial links will be added exercise-by-exercise in the next build step.'
          )
        "
      >
        <strong>🎥 I don't know how</strong>
        <span>Watch a tutorial</span>
      </button>

      <button
        class="choice"
        onclick="
          alert(
            'Curated substitution logic will be added next.'
          )
        "
      >
        <strong>🚦 Machine is occupied</strong>
        <span>
          Do it later or use an alternative
        </span>
      </button>

      <button
        class="choice"
        onclick="
          alert(
            'Curated substitution logic will be added next.'
          )
        "
      >
        <strong>🔄 I need another exercise</strong>
      </button>

      <button
        class="danger"
        onclick="
          alert(
            'Stop the exercise. Do not push through unusual or concerning pain. Skip it or end the workout if needed.'
          )
        "
      >
        🚨 Something feels wrong
      </button>

      <div class="spacer"></div>

      <button
        class="secondary"
        onclick="workout()"
      >
        Back to workout
      </button>

    </section>
  `;
}


/* =========================
   JOURNEY
========================= */

function journey() {

  app.innerHTML = `
    <section class="screen">

      <button class="back" onclick="home()">
        ← Home
      </button>

      <div class="kicker">
        Your journey
      </div>

      <h2>
        ${state.totalWorkouts} workouts 🩵
      </h2>

      <div class="card">

        <strong>
          Next workout
        </strong>

        <p>
          Day ${state.currentDay}
          — ${workouts[state.currentDay].title}
        </p>

      </div>

      <p>
        We celebrate what you've done.
        We don't count failures.
      </p>

      <div class="spacer"></div>

    </section>
  `;
}


/* =========================
   PLACEHOLDER SCREENS
========================= */

function tutorials() {
  alert(
    'Tutorial library screen comes in the next build step.'
  );
}


function settings() {
  alert(
    'Settings comes after the core flow is finalized.'
  );
}


/* =========================
   START APP
========================= */

home();
