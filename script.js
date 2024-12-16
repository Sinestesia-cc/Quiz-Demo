// Configuración de preguntas y respuestas
const questions = [
    {
        question: "¿Cuál es la capital de Francia?",
        options: ["París", "Londres", "Roma", "Berlín"],
        correct: 0,
        image: "https://static.wixstatic.com/media/9d4060_756bad346dce4dd58cfd10517dd47c2a~mv2.png"
    },
    {
        question: "¿Cuál es el río más largo del mundo?",
        options: ["Nilo", "Amazonas", "Yangtsé", "Misisipi"],
        correct: 1,
        image: "https://static.wixstatic.com/media/9d4060_756bad346dce4dd58cfd10517dd47c2a~mv2.png"
    },
    {
        question: "¿Quién pintó la Mona Lisa?",
        options: ["Vincent Van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Salvador Dalí"],
        correct: 2,
        image: "https://static.wixstatic.com/media/9d4060_756bad346dce4dd58cfd10517dd47c2a~mv2.png"
    },
    {
        question: "¿En qué año llegó el hombre a la luna?",
        options: ["1959", "1969", "1979", "1989"],
        correct: 1,
        image: "https://static.wixstatic.com/media/9d4060_756bad346dce4dd58cfd10517dd47c2a~mv2.png"
    },
    {
        question: "¿Cuál es el idioma más hablado del mundo?",
        options: ["Inglés", "Mandarín", "Español", "Hindi"],
        correct: 1,
        image: "https://static.wixstatic.com/media/9d4060_756bad346dce4dd58cfd10517dd47c2a~mv2.png"
    },
    {
        question: "¿Cuántos planetas hay en el sistema solar?",
        options: ["7", "8", "9", "10"],
        correct: 1,
        image: "https://static.wixstatic.com/media/9d4060_3b5807e507d24d229edb1ed57aad9ad8~mv2.png"
    },
    {
        question: "¿Qué gas es más abundante en la atmósfera terrestre?",
        options: ["Oxígeno", "Nitrógeno", "Dióxido de carbono", "Hidrógeno"],
        correct: 1,
        image: "https://static.wixstatic.com/media/9d4060_3b5807e507d24d229edb1ed57aad9ad8~mv2.png"
    },
    {
        question: "¿Cuál es el animal terrestre más grande?",
        options: ["Elefante africano", "Rinoceronte blanco", "Jirafa", "Hipopótamo"],
        correct: 0,
        image: "https://static.wixstatic.com/media/9d4060_3b5807e507d24d229edb1ed57aad9ad8~mv2.png"
    },
    {
        question: "¿Qué instrumento mide la presión atmosférica?",
        options: ["Barómetro", "Termómetro", "Higrómetro", "Anemómetro"],
        correct: 0,
        image: "https://static.wixstatic.com/media/9d4060_3b5807e507d24d229edb1ed57aad9ad8~mv2.png"
    },
    {
        question: "¿Qué país tiene la mayor población del mundo?",
        options: ["India", "China", "Estados Unidos", "Indonesia"],
        correct: 1,
        image: "https://static.wixstatic.com/media/9d4060_3b5807e507d24d229edb1ed57aad9ad8~mv2.png"
    },
    {
        question: "¿Quién escribió 'Cien años de soledad'?",
        options: ["Gabriel García Márquez", "Mario Vargas Llosa", "Jorge Luis Borges", "Octavio Paz"],
        correct: 0,
        image: "https://static.wixstatic.com/media/9d4060_51746aa371e9429193aa11fe5993d488~mv2.png"
    },
    {
        question: "¿Qué océano es el más grande del mundo?",
        options: ["Atlántico", "Índico", "Pacífico", "Ártico"],
        correct: 2,
        image: "https://static.wixstatic.com/media/9d4060_51746aa371e9429193aa11fe5993d488~mv2.png"
    },
    {
        question: "¿Qué elemento tiene el símbolo químico 'O'?",
        options: ["Oro", "Oxígeno", "Osmio", "Óxido"],
        correct: 1,
        image: "https://static.wixstatic.com/media/9d4060_51746aa371e9429193aa11fe5993d488~mv2.png"
    },
    {
        question: "¿En qué continente se encuentra Egipto?",
        options: ["Asia", "África", "Europa", "América"],
        correct: 1,
        image: "https://static.wixstatic.com/media/9d4060_51746aa371e9429193aa11fe5993d488~mv2.png"
    },
    {
        question: "¿Cuál es la fórmula química del agua?",
        options: ["CO2", "O2", "H2O", "CH4"],
        correct: 2,
        image: "https://static.wixstatic.com/media/9d4060_51746aa371e9429193aa11fe5993d488~mv2.png"
    }
];

let currentQuestion = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;

let isDragging = false;
let previousMousePosition = { x: 0 };
const rotationSpeed = 0.005;

const container = document.getElementById('container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
let sphere;

function load360Image(imageURL) {
    if (sphere) scene.remove(sphere);

    const texture = textureLoader.load(imageURL, () => renderer.render(scene, camera));

    const geometry = new THREE.SphereGeometry(500, 64, 64);
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });

    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
}

camera.position.z = 0;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

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

container.addEventListener('touchstart', (e) => {
    isDragging = true;
    previousMousePosition.x = e.touches[0].clientX;
});

container.addEventListener('touchmove', (e) => {
    if (!isDragging) return;

    const deltaX = e.touches[0].clientX - previousMousePosition.x;
    camera.rotation.y -= deltaX * rotationSpeed;
    previousMousePosition.x = e.touches[0].clientX;
});

container.addEventListener('touchend', () => {
    isDragging = false;
});

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

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function detectOculus() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (userAgent.includes("Oculus")) {
        document.getElementById("footer").classList.add("hidden");
    }
}

detectOculus();
showQuestion();
