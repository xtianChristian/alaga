const state = {
  currentDay: Number(localStorage.getItem("alagaCurrentDay") || 1),
  totalWorkouts: Number(localStorage.getItem("alagaTotalWorkouts") || 0),
  pendingWorkout: localStorage.getItem("alagaPendingWorkout") === "true"
};

const workouts = {
  1: {
    title: "Glutes + Legs",
    exercises: [
      "Hip Thrust Machine",
      "Leg Press",
      "Seated Leg Curl",
      "Hip Abduction"
    ]
  },
  2: {
    title: "Upper + Glutes",
    exercises: [
      "Lat Pulldown",
      "Chest Press",
      "Seated Row",
      "Hip Abduction"
    ]
  },
  3: {
    title: "Thighs + Glutes",
    exercises: [
      "Leg Press",
      "Leg Extension",
      "Seated Leg Curl",
      "Hip Thrust Machine"
    ]
  }
};

const exerciseHelpData = {
  "Hip Thrust Machine": {
    tutorial: "https://youtu.be/VgAOV-xZM0k",
    alternative: "Bodyweight Glute Bridge",
    alternativeTip:
      "Lie on your back with your knees bent. Gently lift your hips, squeeze your glutes, then lower slowly."
  },

  "Leg Press": {
    tutorial: "https://youtube.com/shorts/EotSw18oR9w?si=RhPXb9ecnhCQkoEo",
    alternative: "Sit-to-Stand from a Bench",
    alternativeTip:
      "Sit on a stable bench, stand up with control, then slowly sit back down."
  },

  "Seated Leg Curl": {
    tutorial: "https://youtube.com/shorts/xdbEG3xGLI8?si=nwcKKaMJ8pqZ4Zi3",
    alternative: "Standing Bodyweight Hamstring Curl",
    alternativeTip:
      "Hold something stable and slowly bring one heel toward your glute. Switch sides."
  },

  "Hip Abduction": {
    tutorial: "https://youtube.com/shorts/DumWj7eUHwE?si=V3KETRtiOcZrSLQk",
    alternative: "Side-Lying Hip Abduction",
    alternativeTip:
      "Lie on your side and slowly raise your top leg. Keep the movement controlled."
  },

  "Lat Pulldown": {
    tutorial: "https://youtube.com/shorts/bNmvKpJSWKM?si=PwSxns6lK0SRZa0U",
    alternative: "Come Back Later",
    alternativeTip:
      "It is okay to skip this exercise for now and return when the machine is available."
  },

  "Chest Press": {
    tutorial: "https://youtube.com/shorts/Qu7-ceCvq7w?si=-D2Fxhr-v7yGxm7X",
    alternative: "Incline Wall Push-Up",
    alternativeTip:
      "Place your hands on a wall or stable elevated surface. Keep your movement slow and controlled."
  },

  "Seated Row": {
    tutorial: "https://youtube.com/shorts/qD1WZ5pSuvk?si=Gm8oonH8Sp2kSbdq",
    alternative: "Come Back Later",
    alternativeTip:
      "It is okay to skip this exercise for now and return when the machine is available."
  },

  "Leg Extension": {
    tutorial: "https://youtube.com/shorts/uM86QE59Tgc?si=LPOr2NMGQbOFsaJR",
    alternative: "Seated Knee Extension",
    alternativeTip:
      "Sit on a stable chair and slowly straighten one knee at a time without added weight."
  }
};

const app = document.getElementById("app");

function save() {
  localStorage.setItem("alagaCurrentDay", state.currentDay);
  localStorage.setItem("alagaTotalWorkouts", state.totalWorkouts);
  localStorage.setItem("alagaPendingWorkout", state.pendingWorkout);
}

function workoutCard(day = state.currentDay) {
  const workout = workouts[day];

  return `
    <div class="card">
      <div class="kicker">Next workout</div>

      <div class="workout-name">
        🍑 Day ${day} — ${workout.title}
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

        <h2>How are you feeling?</h2>
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
   FEELING GOOD
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

      <h2>Let's train.</h2>

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

      <h2>What sounds right?</h2>

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

        <h2>Rest today.</h2>

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

      <button class="back" onclick="home()">
        ← Home
      </button>

      <div class="kicker">
        Today's plan
      </div>

      <h2>
        🍑 Day ${state.currentDay}
      </h2>

      ${workoutCard()}

      <button class="primary" onclick="hevyTransition()">
        🏋️ I'm ready — let's go
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
   HEVY TRANSITION
========================= */

function hevyTransition() {
  const workoutToday = workouts[state.currentDay];

  app.innerHTML = `
    <section class="screen">

      <button class="back" onclick="workout()">
        ← Change my mind
      </button>

      <div class="spacer"></div>

      <div class="center">

        <div class="kicker">
          🏋️ You're ready.
        </div>

        <h2>
          Day ${state.currentDay} — ${workoutToday.title}
        </h2>

        <p>
          Open Hevy on whichever device is easiest for you.
        </p>

        <div class="card">

          <strong>
            Choose this routine in Hevy:
          </strong>

          <p>
            🏋️ Day ${state.currentDay} — ${workoutToday.title}
          </p>

        </div>

        <p class="tiny">
          You can start Hevy from your iPhone or Apple Watch. 🩵
        </p>

      </div>

      <button class="primary" onclick="startHevyManually()">
        🩵 Got it — I'll start Hevy
      </button>

      <button class="secondary" onclick="helpExercises()">
        🤔 I need exercise help first
      </button>

      <div class="spacer"></div>

    </section>
  `;
}

function startHevyManually() {
  state.pendingWorkout = true;
  save();

  app.innerHTML = `
    <section class="screen">

      <div class="spacer"></div>

      <div class="center">

        <div class="kicker">
          🩵 You're all set.
        </div>

        <h2>
          Have a good workout.
        </h2>

        <p>
          Start Hevy whenever you're ready.
        </p>

        <p>
          We'll be right here when you're done. 🩵
        </p>

      </div>

      <button class="secondary" onclick="helpExercises()">
        🤔 I need exercise help
      </button>

      <div class="spacer"></div>

    </section>
  `;
}

/* =========================
   RETURN CHECK
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
  const completedDay = state.currentDay;

  state.totalWorkouts++;

  if (state.currentDay === 3) {
    state.currentDay = 1;
  } else {
    state.currentDay++;
  }

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

  const milestone = milestoneNumbers.includes(state.totalWorkouts)
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
    : "";

  app.innerHTML = `
    <section class="screen">

      <div class="spacer"></div>

      <div class="center">

        <div class="kicker">
          🎉 Done!
        </div>

        <h2>
          Day ${completedDay} complete.
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
  const workoutToday = workouts[state.currentDay];

  app.innerHTML = `
    <section class="screen">

      <button class="back" onclick="tired()">
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
          ${workoutToday.exercises[0]} — 2 sets
        </strong>

        <br><br>

        <strong>
          ${workoutToday.exercises[1]} — 2 sets
        </strong>

        <br><br>

        <strong>
          ${workoutToday.exercises[3]} — 2 sets
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
        20–40 minutes is a suggestion, not a requirement.
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
    "Try one easy episode of a comfort show.",
    "Pick a light movie and get cozy."
  ],

  listen: [
    "Put on a playlist you already love.",
    "AirPods in. No decisions. Just vibe."
  ],

  move: [
    "Take a gentle 10-minute walk.",
    "Try 5 minutes of easy stretching."
  ],

  fun: [
    "Play something low-effort and enjoyable.",
    "Call or message someone you love."
  ],

  any: [
    "🎬 Watch something comforting.",
    "🎵 Put on music and rest.",
    "🚶 Take a gentle walk.",
    "🛌 Do absolutely nothing."
  ]
};

function surprise(type = "any") {
  const pool = picks[type] || picks.any;
  const pick = pool[Math.floor(Math.random() * pool.length)];

  app.innerHTML = `
    <section class="screen">

      <button class="back" onclick="home()">
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
          No pressure. Just something for you. 🩵
        </p>

      </div>

      <button class="primary" onclick="surprise('${type}')">
        🎲 Another one
      </button>

      <button class="secondary" onclick="home()">
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
  const list = workouts[state.currentDay].exercises
    .map((exercise, index) => {
      return `
        <button
          class="choice"
          onclick="exerciseHelp(${index})"
        >
          <strong>${exercise}</strong>
          <span>Tap for help</span>
        </button>
      `;
    })
    .join("");

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
  const exercise = workouts[state.currentDay].exercises[index];

  app.innerHTML = `
    <section class="screen">

      <button class="back" onclick="helpExercises()">
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
        onclick="watchTutorial('${exercise}')"
      >
        <strong>🎥 I don't know how</strong>
        <span>Watch the tutorial</span>
      </button>

      <button
        class="choice"
        onclick="machineOccupied(${index})"
      >
        <strong>🚦 Machine is occupied</strong>
        <span>No worries. You have options.</span>
      </button>

      <button
        class="choice"
        onclick="showAlternative('${exercise}')"
      >
        <strong>🔄 I need another exercise</strong>
        <span>Show me a simple alternative</span>
      </button>

      <button
        class="secondary"
        onclick="somethingWrong()"
      >
        🚨 Something feels wrong
      </button>

      <button
        class="secondary"
        onclick="workout()"
      >
        Back to workout
      </button>

      <div class="spacer"></div>

    </section>
  `;
}

/* =========================
   TUTORIAL
========================= */

function watchTutorial(exercise) {
  const url = exerciseHelpData[exercise].tutorial;

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );
}

/* =========================
   MACHINE OCCUPIED
========================= */

function machineOccupied(index) {
  const exercise = workouts[state.currentDay].exercises[index];

  app.innerHTML = `
    <section class="screen">

      <button
        class="back"
        onclick="exerciseHelp(${index})"
      >
        ← Back
      </button>

      <div class="spacer"></div>

      <div class="kicker">
        🚦 No worries
      </div>

      <h2>
        ${exercise} is occupied.
      </h2>

      <p>
        What do you want to do?
      </p>

      <button
        class="choice"
        onclick="otherExercises(${index})"
      >
        <strong>➡️ Do another exercise first</strong>
        <span>Keep going and come back later.</span>
      </button>

      <button
        class="choice"
        onclick="showAlternative('${exercise}')"
      >
        <strong>🔄 Try an alternative</strong>
        <span>No waiting needed.</span>
      </button>

      <button
        class="choice"
        onclick="workout()"
      >
        <strong>↩️ Come back later</strong>
        <span>Continue with your workout.</span>
      </button>

      <div class="spacer"></div>

    </section>
  `;
}

/* =========================
   OTHER EXERCISES
========================= */

function otherExercises(currentIndex) {
  const remainingExercises = workouts[state.currentDay].exercises
    .filter((exercise, index) => index !== currentIndex);

  const list = remainingExercises
    .map(exercise => {
      return `
        <div class="card">
          <strong>${exercise}</strong>
        </div>
      `;
    })
    .join("");

  app.innerHTML = `
    <section class="screen">

      <button
        class="back"
        onclick="machineOccupied(${currentIndex})"
      >
        ← Back
      </button>

      <div class="spacer"></div>

      <div class="kicker">
        ➡️ Keep going
      </div>

      <h2>
        Try another exercise first.
      </h2>

      ${list}

      <p class="tiny">
        Come back to the occupied machine later. 🩵
      </p>

      <button
        class="primary"
        onclick="workout()"
      >
        Back to workout
      </button>

      <div class="spacer"></div>

    </section>
  `;
}

/* =========================
   ALTERNATIVE
========================= */

function showAlternative(exercise) {
  const data = exerciseHelpData[exercise];

  app.innerHTML = `
    <section class="screen">

      <button class="back" onclick="helpExercises()">
        ← Exercises
      </button>

      <div class="spacer"></div>

      <div class="kicker">
        🔄 Alternative
      </div>

      <h2>
        ${data.alternative}
      </h2>

      <div class="card">

        <strong>Instead of:</strong>

        <p>
          ${exercise}
        </p>

        <strong>Quick guide:</strong>

        <p>
          ${data.alternativeTip}
        </p>

      </div>

      <p class="tiny">
        Keep it easy and controlled. This is just an option, not a test. 🩵
      </p>

      <button
        class="primary"
        onclick="workout()"
      >
        Back to workout
      </button>

      <button
        class="secondary"
        onclick="helpExercises()"
      >
        Choose another exercise
      </button>

      <div class="spacer"></div>

    </section>
  `;
}

/* =========================
   SOMETHING WRONG
========================= */

function somethingWrong() {
  app.innerHTML = `
    <section class="screen">

      <div class="spacer"></div>

      <div class="center">

        <div class="kicker">
          🚨 Stop
        </div>

        <h2>
          Don't push through unusual pain.
        </h2>

        <p>
          Stop the exercise. Skip it or end the workout if needed.
        </p>

        <p class="tiny">
          If symptoms are severe, sudden, or concerning, seek appropriate medical help.
        </p>

      </div>

      <button
        class="primary"
        onclick="workout()"
      >
        Back to workout
      </button>

      <button
        class="secondary"
        onclick="home()"
      >
        🏠 Go home
      </button>

      <div class="spacer"></div>

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
   TUTORIAL LIBRARY
========================= */

function tutorials() {
  const list = Object.keys(exerciseHelpData)
    .map(exercise => {
      return `
        <button
          class="choice"
          onclick="watchTutorial('${exercise}')"
        >
          <strong>🎥 ${exercise}</strong>
          <span>Watch tutorial</span>
        </button>
      `;
    })
    .join("");

  app.innerHTML = `
    <section class="screen">

      <button class="back" onclick="home()">
        ← Home
      </button>

      <div class="kicker">
        Tutorial library
      </div>

      <h2>
        Learn before you go. 🩵
      </h2>

      ${list}

      <div class="spacer"></div>

    </section>
  `;
}

/* =========================
   SETTINGS
========================= */

function settings() {
  app.innerHTML = `
    <section class="screen">

      <button class="back" onclick="home()">
        ← Home
      </button>

      <div class="spacer"></div>

      <div class="kicker">
        Settings
      </div>

      <h2>
        ALAGA 🩵
      </h2>

      <div class="card">

        <strong>
          Your progress stays on this device.
        </strong>

        <p>
          Current workout: Day ${state.currentDay}
        </p>

        <p>
          Completed workouts: ${state.totalWorkouts}
        </p>

      </div>

      <div class="spacer"></div>

    </section>
  `;
}

/* =========================
   START APP
========================= */

home();