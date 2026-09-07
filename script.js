// 0. VARIABLES GLOBALES
if (typeof N_LEGAJO === 'undefined') {
    var N_LEGAJO = "";
}

var startTime = new Date();
var currentStep = 0;
var globalCategories = [];

const stepTitles = ["Introducción", "1. Mi 'Yo' Auténtico", "2. Mis Emociones y Necesidades", "3. La Vida Que Me Moldea", "4. La Autotrascendencia", "5. En Busca del Sentido"];

// 1. INICIALIZACIÓN
function iniciarPagina() {
    console.log("Iniciando sistema...");
    const loginView = document.getElementById('login-view');
    const appContent = document.getElementById('app-content');
    
    if (loginView) loginView.style.display = 'flex';
    if (appContent) appContent.style.display = 'none';

    // Pre-renderizamos la tabla al iniciar
    renderTablaNecesidades();
}

// 2. VERIFICACIÓN DE LEGAJO
function verificarLegajo() {
    const input = document.getElementById('input-legajo');
    const btn = document.getElementById('btn-login');
    const errorMsg = document.getElementById('login-error');
    
    if (!input) return;
    const legajo = input.value.trim().toUpperCase();

    if (!legajo) {
        input.style.borderColor = "red";
        return;
    }

    btn.disabled = true;
    btn.innerText = "Verificando...";
    
    if (typeof google !== 'undefined' && google.script && google.script.run) {
        google.script.run
            .withSuccessHandler(function(resultado) {
                if (resultado === true || (resultado && resultado.success)) {
                    N_LEGAJO = legajo;
                    entrarApp();
                } else {
                    btn.disabled = false;
                    btn.innerText = "Entrar al Camino";
                    if (errorMsg) errorMsg.style.display = "block";
                    input.style.borderColor = "red";
                }
            })
            .withFailureHandler(function(err) {
                btn.disabled = false;
                btn.innerText = "Error de conexión";
                console.error("Error:", err);
            })
            .buscarLegajo(legajo);
    } else {
        console.warn("Ejecutando fuera de Apps Script. Simulando entrada.");
        N_LEGAJO = legajo;
        entrarApp();
    }
}

// 3. ENTRADA A LA APP
function entrarApp() {
    const loginView = document.getElementById('login-view');
    const appContent = document.getElementById('app-content');
    
    if (loginView) loginView.style.display = 'none';
    if (appContent) appContent.style.display = 'block';
    
    const badge = document.getElementById('display-legajo');
    if (badge) badge.innerText = N_LEGAJO;

    showView('guide');
    goToStep(0); 
    renderLogFields();
}

// 4. NAVEGACIÓN ENTRE SECCIONES
function showView(viewId) {
    const guideView = document.getElementById('guide-view');
    const logView = document.getElementById('log-diario-view');
    const btnGuide = document.getElementById('btn-guide');
    const btnLog = document.getElementById('btn-log');

    if (viewId === 'guide') {
        if (guideView) guideView.style.display = 'block';
        if (logView) logView.style.display = 'none';
        if (btnGuide) btnGuide.classList.add('active');
        if (btnLog) btnLog.classList.remove('active');
        
        if (currentStep === 3) {
            renderTablaNecesidades();
        }
    } else {
        if (guideView) guideView.style.display = 'none';
        if (logView) logView.style.display = 'block';
        if (btnGuide) btnGuide.classList.remove('active');
        if (btnLog) btnLog.classList.add('active');
    }
}

// 5. NAVEGACIÓN ENTRE PASOS
function goToStep(step) {
    currentStep = step;
    
    const menu = document.getElementById('steps-menu');
    if (menu) {
        menu.innerHTML = stepTitles.map((t, i) => 
            `<button class="step-btn ${currentStep === i ? 'active' : ''}" id="sbtn-${i}" onclick="goToStep(${i})">${t}</button>`
        ).join('');
    }

    document.querySelectorAll('.step-content').forEach(div => {
        div.style.setProperty('display', 'none', 'important');
    });

    const contenedorDestino = document.getElementById('cont-step-' + step);
    if (contenedorDestino) {
        contenedorDestino.style.setProperty('display', 'block', 'important');
    }

    if (step === 2 && typeof renderTablaNecesidades === 'function') {
        renderTablaNecesidades();
    }

    const todosLosBotones = document.querySelectorAll('button');
    todosLosBotones.forEach(btn => {
        if (!btn || !btn.innerText) return;

        const textoBoton = btn.innerText.toLowerCase();
        const idBoton = btn.id ? btn.id.toLowerCase() : "";

        if (textoBoton.includes("guardar") || idBoton.includes("guardar") || idBoton.includes("save")) {
            if (step === 0) {
                btn.style.setProperty('display', 'none', 'important');
            } else {
                const belongsToCurrentStep = btn.closest(`#cont-step-${step}`);
                if (belongsToCurrentStep) {
                    btn.style.display = 'block';
                } else if (btn.closest('.step-content')) {
                    btn.style.display = 'none';
                }
            }
        }
    });
}

// 6. RENDERIZADO DE LOGODIARIO
function renderLogFields() {
    globalCategories = [
        { name: 'NECESIDADES FÍSICAS', fields: [
            { key: 'alimentacion', title: 'Alimentación', icon: '🍎', desc: '¿Hoy nutrí mi cuerpo de forma consciente?' },
            { key: 'sueno', title: 'Sueño', icon: '😴', desc: '¿Respeté mi descanso y horas de sueño?' },
            { key: 'casa', title: 'Casa', icon: '🏠', desc: '¿Siento a mi casa, como mí hogar (mi refugio)?' },
            { key: 'ejercicios', title: 'Ejercicios', icon: '🏃‍♀️', desc: '¿Moví mi cuerpo hoy?' },
            { key: 'contacto', title: 'Contacto Físico', icon: '🫂', desc: '¿Busqué o recibí demostraciones de afecto?' }
        ]},
        { name: 'NECESIDADES MENTALES', fields: [
            { key: 'exploracion', title: 'Exploración', icon: '🧭', desc: '¿Aprendí algo nuevo o curioseé en temas nutritivos para mí?' },
            { key: 'silencio', title: 'Silencio', icon: '🤫', desc: '¿Dediqué tiempo a la quietud?' },
            { key: 'comunicacion', title: 'Comunicación', icon: '🗣️', desc: '¿Me expresé con honestidad?' }
        ]},
        { name: 'NECESIDADES EMOCIONALES', fields: [
            { key: 'reflexion', title: 'Reflexión', icon: '🤔', desc: '¿Observé mí día sin juzgarme severamente?' },
            { key: 'autoconfianza', title: 'Autoconfianza', icon: '👑', desc: '¿Me sentí capaz frente a los retos?' },
            { key: 'autovaloracion', title: 'Autovaloración', icon: '💎', desc: '¿Reconocí mi valor personal, ante cualquier circunstancia?' }
        ]},
        { name: 'NECESIDADES ESPIRITUALES', fields: [
            { key: 'amor', title: 'Amor', icon: '❤️', desc: '¿Actué con compasión y ternura?' },
            { key: 'creatividad', title: 'Creatividad', icon: '💡', desc: '¿Imaginé o creé algo original?' },
            { key: 'sentido', title: 'Sentido', icon: '🎯', desc: '¿Siento que hoy mi vida tuvo un propósito?' }
        ]}
    ];

    const container = document.getElementById('log-fields-container');
    if(!container) return;

    container.innerHTML = globalCategories.map(cat => `
        <div class="section-card">
            <h2 style="color: var(--color-primary); border-bottom: 2px solid var(--color-primary); margin-bottom: 15px; padding-bottom: 5px;">${cat.name}</h2>
            ${cat.fields.map(f => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px dashed #eee;">
                    <div style="flex: 1; padding-right: 15px;">
                        <h3 style="font-size: 1rem; margin:0;">${f.icon} ${f.title}</h3>
                        <span class="sub-pregunta">${f.desc}</span>
                    </div>
                    <div style="display: flex; gap: 15px;">
                        <div class="icon-button" onclick="setRating(this, '${f.key}', 1)">😞</div>
                        <div class="icon-button" onclick="setRating(this, '${f.key}', 2)">😐</div>
                        <div class="icon-button" onclick="setRating(this, '${f.key}', 3)">😊</div>
                    </div>
                    <input type="hidden" id="input-${f.key}" value="0">
                </div>`).join('')}
        </div>`).join('');
}

function setRating(btn, key, val) {
    btn.parentElement.querySelectorAll('.icon-button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('input-' + key).value = val;
}

function enviarLogodiario(btn) {
    try {
        const formData = { 
            legajo: N_LEGAJO, 
            emocion: document.getElementById('emocion-text-log').value 
        };

        globalCategories.forEach(cat => {
            cat.fields.forEach(f => {
                const inputEl = document.getElementById('input-' + f.key);
                formData[f.key] = inputEl ? inputEl.value : "0";
            });
        });

        const originalText = btn.innerText;
        btn.disabled = true;
        btn.innerText = "⏳ Enviando...";

        if (typeof google !== 'undefined' && google.script && google.script.run) {
            google.script.run
                .withSuccessHandler(function(response) {
                    alert("✨ ¡Logodiario guardado con éxito!");
                    window.open(google.script.host.origin + google.script.host.editorServices.getActiveAppUrl(), '_top');
                })
                .withFailureHandler(function(error) {
                    console.error("Error al guardar:", error);
                    alert("❌ Error en el servidor: " + error);
                    btn.disabled = false;
                    btn.innerText = originalText;
                })
                .registrarLogodiario(formData);
        }
    } catch (e) {
        console.error("Error en el script:", e);
        alert("Error local: " + e.message);
        btn.disabled = false;
        btn.innerText = "Reintentar";
    }
}

// --- ACTIVIDAD 1 Y AUTOESTIMA ---
function selectAuto(el, valor) {
    const parent = el.parentElement;
    parent.querySelectorAll('.check-manual').forEach(div => {
        div.querySelector('.check-box-organic').classList.remove('checked');
    });
    el.querySelector('.check-box-organic').classList.add('checked');
    document.getElementById('ans_autoestima').value = valor;
}

function enviarActividad1(btn) {
    const data = {
        legajo: N_LEGAJO,
        quien: document.getElementById('ans_quien').value,
        talentos: document.getElementById('ans_talentos').value,
        rasgos: document.getElementById('ans_rasgos').value,
        autoestima: document.getElementById('ans_autoestima').value,
        permanencia: Math.round((new Date() - startTime) / 60000)
    };
    btn.disabled = true;
    btn.innerText = "Guardando...";
    if (typeof google !== 'undefined' && google.script && google.script.run) {
        google.script.run
            .withSuccessHandler(() => {
                alert("¡Identidad Guardada!");
                btn.disabled = false;
                btn.innerText = "💾 Guardar Actividad de Identidad";
            })
            .registrarActividad1(data);
    }
}

// --- ACTIVIDAD: MI LUGAR EN EL MUNDO ---
function enviarActividadLlamada(btn) {
    const textoLlamada = document.getElementById('ans_llamada').value.trim();

    if (!textoLlamada) {
        alert("Por favor, escribe tu registro antes de guardar.");
        return;
    }

    const data = {
        legajo: N_LEGAJO,
        llamada: textoLlamada
    };

    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerText = "Guardando...";

    if (typeof google !== 'undefined' && google.script && google.script.run) {
        google.script.run
            .withSuccessHandler(function(response) {
                alert("✨ ¡Actividad guardada con éxito!");
                window.open(google.script.host.origin + google.script.host.editorServices.getActiveAppUrl(), '_top');
            })
            .withFailureHandler(function(error) {
                console.error("Error al guardar:", error);
                alert("❌ Hubo un problema al guardar. Intenta de nuevo.");
                btn.innerHTML = originalText;
                btn.disabled = false;
            })
            .guardarActividadLlamada(data);
    }
}

// --- FUNCIONES DE ARRASTRE (DRAG & DROP) ---
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    const color = ev.target.getAttribute("data-color");
    if (color) ev.dataTransfer.setData("color", color);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const color = ev.dataTransfer.getData("color");
    const draggedElement = document.getElementById(data);
    const dropZone = document.getElementById("drop-zone");

    if (draggedElement && dropZone) {
        dropZone.appendChild(draggedElement);
        draggedElement.style.position = "absolute";

        const rect = dropZone.getBoundingClientRect();
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        const zoneX = rect.left + scrollLeft;
        const zoneY = rect.top + scrollTop;

        const x = ev.pageX - zoneX - (draggedElement.offsetWidth / 2);
        const y = ev.pageY - zoneY - (draggedElement.offsetHeight / 2);

        const limitX = Math.max(0, Math.min(x, rect.width - draggedElement.offsetWidth));
        const limitY = Math.max(0, Math.min(y, rect.height - draggedElement.offsetHeight));

        draggedElement.style.left = limitX + "px";
        draggedElement.style.top = limitY + "px";
        
        if (color) {
            dropZone.style.backgroundColor = color;
            dropZone.style.borderRadius = "15px";
            dropZone.style.transition = "background-color 0.4s ease";
        }
    }
}

// --- ENVIAR ACTIVIDAD 2: EMOCIONES ---
function enviarActividad2(btn) {
    const dropzone = document.getElementById('drop-zone');
    const emocionesEnSilueta = Array.from(dropzone.querySelectorAll('.drag-item'))
                                    .map(el => el.innerText).join(', ');
    
    const data = {
        legajo: N_LEGAJO,
        emociones_recurrentes: emocionesEnSilueta,
        razon_emociones: document.getElementById('ans_causa').value,
        fecha: new Date().toLocaleString()
    };

    if (!data.emociones_recurrentes && !data.razon_emociones) {
        alert("Por favor, completa la actividad antes de guardar.");
        return;
    }

    const originalText = btn.innerText;
    btn.disabled = true;
    btn.innerText = "Guardando...";

    if (typeof google !== 'undefined' && google.script && google.script.run) {
        google.script.run
            .withSuccessHandler(function(response) {
                alert("✨ ¡Actividad guardada con éxito!");
                window.open(google.script.host.origin + google.script.host.editorServices.getActiveAppUrl(), '_top');
            })
            .withFailureHandler(function(error) {
                console.error("Error al guardar:", error);
                alert("❌ Hubo un problema al guardar. Intenta de nuevo.");
                btn.innerText = originalText;
                btn.disabled = false;
            })
            .registrarActividad2(data); 
    }
}

// --- LÓGICA TABLA INTERACTIVA ---
function pintarCelda(td) {
    let val = parseInt(td.getAttribute('data-value') || "0");
    val = (val >= 100) ? 0 : val + 25;
    
    td.setAttribute('data-value', val);
    td.innerText = val + "%";
    
    const alpha = val / 100;
    td.style.backgroundColor = `rgba(125, 168, 32, ${alpha})`; 
    td.style.color = (val > 50) ? "#fff" : "#2d5016";
}

function renderTablaNecesidades() {
    const container = document.getElementById('tabla-interactiva-grid');
    if (!container) return;
    container.innerHTML = "";

    const categorias = {
        "FÍSICAS": ["Alimentación", "Sueño", "Descanso", "Hidratación", "Casa", "Abrigo", "Oxígeno", "Fisiológicas", "Ejercicios", "Contacto"],
        "MENTALES": ["Aprendizaje", "Conocimiento", "Exploración", "Análisis", "Orden", "Silencio", "Introspección", "Comunicación", "Laboriosidad"],
        "EMOCIONALES": ["Afecto", "Pertenencia", "Autoconfianza", "Vínculos", "Intimidad", "Reconocimiento", "Autovaloración", "Sexualidad", "Expresión"],
        "ESPIRITUALES": ["Amor", "Creatividad", "Sentido", "Trascendencia", "Oración", "Fe", "Valores", "Ética", "Sueños", "Arte"]
    };

    for (let cat in categorias) {
        let colHtml = `<div class="col-categoria">
            <div class="col-header">${cat}</div>`;
        
        categorias[cat].forEach(item => {
            colHtml += `
                <div class="item-necesidad" data-cat="${cat}" data-value="0" onclick="actualizarItem(this)">
                    <span>${item}</span>
                    <span class="val-txt">0%</span>
                </div>`;
        });
        colHtml += `</div>`;
        container.innerHTML += colHtml;
    }
}

function actualizarItem(el) {
    let val = parseInt(el.getAttribute('data-value'));
    val = (val >= 100) ? 0 : val + 25;
    
    el.setAttribute('data-value', val);
    el.querySelector('.val-txt').innerText = val + "%";
    
    calcularPromedioGeneral();
}

function calcularPromedioGeneral() {
    const items = document.querySelectorAll('.item-necesidad');
    let suma = 0;
    items.forEach(i => suma += parseInt(i.getAttribute('data-value')));
    let prom = items.length > 0 ? (suma / items.length).toFixed(1) : 0;
    const elem = document.getElementById('promedio-general');
    if(elem) elem.innerText = prom + "%";
}

function reiniciarTabla() {
    if(confirm("¿Reiniciar todos los valores?")) {
        renderTablaNecesidades();
        const elem = document.getElementById('promedio-general');
        if(elem) elem.innerText = "0.0%";
    }
}

function enviarActividad3(btn) {
    const legajo = document.getElementById('display-legajo').innerText;
    
    if (legajo === "---") { 
        alert("Por favor, inicia sesión primero."); 
        return; 
    }

    btn.innerText = "⌛ Guardando...";
    btn.disabled = true;

    const categorias = ["FÍSICAS", "MENTALES", "EMOCIONALES", "ESPIRITUALES"];
    const promedios = categorias.map(cat => {
        const items = document.querySelectorAll(`.item-necesidad[data-cat="${cat}"]`);
        let suma = 0;
        items.forEach(i => {
            suma += parseInt(i.getAttribute('data-value') || 0);
        });
        return (items.length > 0 ? Math.round(suma / items.length) : 0) + "%";
    });

    const payload = {
        legajo: legajo,
        valores: promedios
    };

    if (typeof google !== 'undefined' && google.script && google.script.run) {
        google.script.run
            .withSuccessHandler(() => {
                btn.innerText = "✅ ¡Guardado!";
                setTimeout(() => { 
                    btn.innerText = "💾 Guardar Necesidades"; 
                    btn.disabled = false; 
                }, 3000);
            })
            .withFailureHandler((err) => {
                alert("Error al guardar: " + err);
                btn.innerText = "💾 Reintentar";
                btn.disabled = false;
            })
            .registrarActividad3(payload);
    }
}

// --- ENVIAR ACTIVIDAD 4: AUTODISTANCIAMIENTO ---
function enviarActividad4(btn) {
    const elLegajo = document.getElementById('display-legajo');
    const legajo = elLegajo ? elLegajo.innerText.trim() : "---";

    if (legajo === "---" || legajo === "") { 
        alert("Por favor, inicia sesión primero."); 
        return; 
    }

    const situacion = document.getElementById('comic-situacion').value.trim();
    const desesperacion = document.getElementById('comic-desesperacion').value.trim();
    const superacion = document.getElementById('comic-superacion').value.trim();

    if (!situacion || !desesperacion || !superacion) {
        alert("Por favor, completa los tres cuadros del cómic antes de guardar.");
        return;
    }

    const textoOriginal = btn.innerText;
    btn.innerText = "⌛ Guardando...";
    btn.disabled = true;

    const payload = {
        legajo: legajo,
        situacion: situacion,
        desesperacion: desesperacion,
        superacion: superacion
    };

    if (typeof google !== 'undefined' && google.script && google.script.run) {
        google.script.run
            .withSuccessHandler(() => {
                btn.innerText = "✅ ¡Crónica Guardada!";
                setTimeout(() => { 
                    btn.innerText = textoOriginal; 
                    btn.disabled = false; 
                }, 3000);
            })
            .withFailureHandler((err) => {
                alert("Error al guardar: " + err);
                btn.innerText = "💾 Reintentar";
                btn.disabled = false;
            })
            .guardarActividad4(payload);
    }
}

// --- ENVIAR ACTIVIDAD 5: LA AUTOTRASCENDENCIA ---
function enviarAutotrascendencia(btn) {
    const huella = document.getElementById('ans_huella').value.trim();
    const otro = document.getElementById('ans_otro').value.trim();
    const movilizacion = document.getElementById('ans_movilizacion').value.trim();

    if (!huella || !otro || !movilizacion) {
        alert("Por favor, completa todas las preguntas antes de continuar.");
        return;
    }

    btn.disabled = true;
    btn.innerHTML = "⌛ Guardando...";

    let legajoSeguro = 'A000';
    if (typeof N_LEGAJO !== 'undefined' && N_LEGAJO) {
        legajoSeguro = N_LEGAJO;
    } else {
        const inputLogin = document.getElementById('legajo');
        if (inputLogin && inputLogin.value) legajoSeguro = inputLogin.value.trim();
    }

    const payload = {
        legajo: legajoSeguro,
        idGuia: 1, 
        huella: huella,
        otro: otro,
        movilizacion: movilizacion
    };

    if (typeof google !== 'undefined' && google.script && google.script.run) {
        google.script.run
            .withSuccessHandler(() => {
                alert("¡Tus reflexiones de Autotrascendencia se han guardado con éxito!");
                btn.innerHTML = "💾 Guardar Respuestas";
                btn.disabled = false;
            })
            .withFailureHandler((err) => {
                alert("Error al guardar: " + err.message);
                btn.innerHTML = "💾 Guardar Respuestas";
                btn.disabled = false;
            })
            .registrarActividad5(payload);
    }
}

function ActividadYoSoy() {
    const yoPuedoSerTexto = document.querySelector('textarea').value; 

    const datos = {
        legajo: localStorage.getItem('legajo') || 'SIN LEGAJO',
        yo_soy: '', 
        yo_puedo_ser: yoPuedoSerTexto
    };

    if (typeof google !== 'undefined' && google.script && google.script.run) {
        google.script.run
            .withSuccessHandler(function(response) {
                alert('¡Actividad guardada correctamente!');
            })
            .withFailureHandler(function(error) {
                alert('Error al guardar: ' + error.message);
            })
            .registrarRespuestasYoSoy(datos);
    }
}

function enviarBusquedaSentido(boton) {
    boton.disabled = true;
    boton.innerHTML = "⏳ Guardando...";

    const nombreAdmirado = document.getElementById("p5_nombre_admirado").value.trim();

    const act1 = document.getElementById("p5_actitud_1").value.trim();
    const act2 = document.getElementById("p5_actitud_2").value.trim();
    const act3 = document.getElementById("p5_actitud_3").value.trim();
    const actitudesUnificadas = `1: ${act1}\n2: ${act2}\n3: ${act3}`;

    const val1 = document.getElementById("p5_valor_1").value.trim();
    const val2 = document.getElementById("p5_valor_2").value.trim();
    const val3 = document.getElementById("p5_valor_3").value.trim();
    const valoresUnificados = `1: ${val1}\n2: ${val2}\n3: ${val3}`;

    const refActual = document.getElementById("p5_reflexion_actual").value.trim();
    const refTraicion = document.getElementById("p5_reflexion_traicion").value.trim();
    const refCompromiso = document.getElementById("p5_reflexion_compromiso").value.trim();

    const datos = {
        nombreAdmirado: nombreAdmirado,
        actitudes: actitudesUnificadas,
        valores: valoresUnificados,
        refActual: refActual,
        refTraicion: refTraicion,
        refCompromiso: refCompromiso
    };

    if (typeof google !== 'undefined' && google.script && google.script.run) {
        google.script.run
            .withSuccessHandler(function(response) {
                boton.innerHTML = "✅ ¡Guardado con éxito!";
                alert("Felicidades. Tu proceso de búsqueda de sentido ha sido guardado.");
            })
            .withFailureHandler(function(err) {
                boton.disabled = false;
                boton.innerHTML = "💾 Guardar Actividad Final";
                alert("Error al guardar: " + err.message);
            })
            .guardarPagina5Backend(datos);
    }
}

function enviarSentido(btn) {
    const comodidad = document.getElementById('ans_comodidad').value;
    const postura = document.getElementById('ans_postura').value;
    const compromiso = document.getElementById('ans_compromiso').value;

    if (!comodidad && !postura && !compromiso) {
        alert("Por favor, escribe al menos una reflexión antes de guardar.");
        return;
    }

    const textoOriginal = btn.innerHTML;
    btn.innerHTML = '⏳ Guardando...';
    btn.disabled = true;

    if (typeof google !== 'undefined' && google.script && google.script.run) {
        google.script.run
            .withSuccessHandler(function(response) {
                btn.innerHTML = '✅ Guardado con Éxito';
                btn.style.backgroundColor = '#2e7d32';
                setTimeout(() => {
                    btn.innerHTML = textoOriginal;
                    btn.style.backgroundColor = '#8c7851';
                    btn.disabled = false;
                }, 3000);
            })
            .withFailureHandler(function(err) {
                alert("Error al guardar: " + err.message);
                btn.innerHTML = textoOriginal;
                btn.disabled = false;
            })
            .guardarRespuestasSentido(comodidad, postura, compromiso);
    }
}
