// Configuración de preguntas y respuestas
const questions = [
    {
        question: "¿Cuál es la capital de Francia?",
        options: ["París", "Londres", "Roma", "Berlín"],
        correct: 0,
        image: "https://static.wixstatic.com/media/9d4060_756bad346dce4dd58cfd10517dd47c2a~mv2.png",
        audio: "https://www.example.com/audio1.mp3"
    },
    {
        question: "¿Cuál es el río más largo del mundo?",
        options: ["Nilo", "Amazonas", "Yangtsé", "Misisipi"],
        correct: 1,
        image: "https://static.wixstatic.com/media/9d4060_3b5807e507d24d229edb1ed57aad9ad8~mv2.png",
        audio: "https://www.example.com/audio2.mp3"
    },
    {
        question: "¿Quién pintó la Mona Lisa?",
        options: ["Vincent Van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Salvador Dalí"],
        correct: 2,
        image: "https://static.wixstatic.com/media/9d4060_51746aa371e9429193aa11fe5993d488~mv2.png",
        audio: "https://www.example.com/audio3.mp3"
    },
    {
        question: "¿En qué año llegó el hombre a la luna?",
        options: ["1959", "1969", "1979", "1989"],
        correct: 1,
        image: "https://static.wixstatic.com/media/9d4060_756bad346dce4dd58cfd10517dd47c2a~mv2.png",
        audio: "https://www.example.com/audio4.mp3"
    },
    {
        question: "¿Cuál es el idioma más hablado del mundo?",
        options: ["Inglés", "Mandarín", "Español", "Hindi"],
        correct: 1,
        image: "https://static.wixstatic.com/media/9d4060_756bad346dce4dd58cfd10517dd47c2a~mv2.png",
        audio: "https://www.example.com/audio5.mp3"
    }
];

let currentQuestion = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;

const container = document.getElementById('container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
container.appendChild(renderer.domElement);

// Añadir botón VR
document.body.appendChild(VRButton.createButton(renderer));

// Configuración de la esfera 360
const textureLoader = new THREE.TextureLoader();
let sphere;

function load360Image(imageURL) {
    if (sphere) scene.remove(sphere);

    const texture = textureLoader.load(imageURL);
    const geometry = new THREE.SphereGeometry(500, 64, 64);
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide
    });

    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
}

camera.position.z = 0;

// Animación
function animate() {
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
}

// Eventos de interacción
let isDragging = false;
let previousMousePosition = { x: 0 };
const rotationSpeed = 0.005;

container.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition.x = e.clientX;
});

container.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - previousMousePosition.x;
    camera.rotation.y -= deltaX * rotationSpeed;
    previousMousePosition.x = e.clientX;
});

container.addEventListener('mouseup', () => {
    isDragging = false;
});

// Mostrar pregunta
function showQuestion() {
    if (currentQuestion >= questions.length) {
        showSummary();
        return;
    }

    const question = questions[currentQuestion];
    document.getElementById('question').innerText = question.question;

    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => checkAnswer(index);
        answersDiv.appendChild(button);
    });

    load360Image(question.image);

    const audioElement = document.getElementById("question-audio");
    audioElement.src = question.audio;

    const playButton = document.getElementById("play-audio");
    playButton.onclick = () => {
        audioElement.play();
    };
}

function checkAnswer(selected) {
    const question = questions[currentQuestion];
    if (selected === question.correct) {
        correctAnswers++;
    } else {
        incorrectAnswers++;
    }
    currentQuestion++;
    showQuestion();
}

function showSummary() {
    const container = document.getElementById('quiz');
    container.innerHTML = `
        <h1 style="color: white;">Resumen del Quiz</h1>
        <p style="color: white;">Respuestas correctas: ${correctAnswers}</p>
        <p style="color: white;">Respuestas incorrectas: ${incorrectAnswers}</p>
        <p style="color: white;">¡Gracias por participar!</p>
    `;
}

// Ajustar tamaño en caso de redimensionar
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Iniciar animación
animate();
showQuestion();
