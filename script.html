<script>
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
    
    // Sintaxis limpia en bloque plano para evitar el error del token '.'
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
}

    // 3. ENTRADA A LA APP
    function entrarApp() {
        document.getElementById('login-view').style.display = 'none';
        document.getElementById('app-content').style.display = 'block';
        
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
        guideView.style.display = 'block';
        logView.style.display = 'none';
        btnGuide.classList.add('active');
        btnLog.classList.remove('active');
        
        // Verificamos si al volver a la guía estábamos en el paso 3
        if (currentStep === 3) {
            renderTablaNecesidades();
        }
    } else {
        guideView.style.display = 'none';
        logView.style.display = 'block';
        btnGuide.classList.remove('active');
        btnLog.classList.add('active');
    }
} // <--- Esta llave cierra showView correctamente


  // 5. NAVEGACIÓN ENTRE PASOS
    function goToStep(step) {
    currentStep = step;
    
    // Actualiza los botones del menú de pasos
    const menu = document.getElementById('steps-menu');
    if (menu) {
        menu.innerHTML = stepTitles.map((t, i) => 
            `<button class="step-btn ${currentStep === i ? 'active' : ''}" onclick="goToStep(${i})">${t}</button>`
        ).join('');
    }

    // Controla qué contenido se muestra
    const contents = document.querySelectorAll('.step-content');
    contents.forEach((div, index) => {
        div.style.display = (index === currentStep) ? 'block' : 'none';
    });

    // Disparador específico para la Actividad 3 (Paso 2)
    if (step === 2) {
        renderTablaNecesidades();
    }

    // 🛡️ LIMPIEZA SEGURA DE BOTONES DE GUARDADO
    const todosLosBotones = document.querySelectorAll('button');
    todosLosBotones.forEach(btn => {
        // Control de seguridad: Si el botón no tiene texto o propiedades, lo ignoramos para que no rompa el script
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
}// <--- Cierre correcto y limpio de goToStep

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

       // Genera el contenido en el contenedor
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
    } // <-- Cierre limpio y único de la función renderLogFields
      
    function setRating(btn, key, val) {
        // Quita la clase activa de los otros emojis del mismo grupo
        btn.parentElement.querySelectorAll('.icon-button').forEach(b => b.classList.remove('active'));
        // Añade la clase al seleccionado
        btn.classList.add('active');
        // Guarda el valor en el input oculto
        document.getElementById('input-' + key).value = val;
    }

    function enviarLogodiario(btn) {
        console.log("Iniciando proceso de envío...");

        try {
            const formData = { 
                legajo: N_LEGAJO, 
                emocion: document.getElementById('emocion-text-log').value 
            };

            // Recogemos los 14 campos de las categorías
            globalCategories.forEach(cat => {
                cat.fields.forEach(f => {
                    const inputEl = document.getElementById('input-' + f.key);
                    formData[f.key] = inputEl ? inputEl.value : "0";
                });
            })

            // Feedback del botón
            const originalText = btn.innerText;
            btn.disabled = true;
            btn.innerText = "⏳ Enviando...";

            // Ejecución limpia de google.script.run
            google.script.run
                .withSuccessHandler(function(response) {
                    alert("✨ ¡Logodiario guardado con éxito!");
                    // Redirección segura para evitar la página en blanco
                    window.open(google.script.host.origin + google.script.host.editorServices.getActiveAppUrl(), '_top');
                })
                .withFailureHandler(function(error) {
                    console.error("Error al guardar:", error);
                    alert("❌ Error en el servidor: " + error);
                    btn.disabled = false;
                    btn.innerText = originalText;
                })
                .registrarLogodiario(formData);

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
        google.script.run
            .withSuccessHandler(() => {
                alert("¡Identidad Guardada!");
                btn.disabled = false;
                btn.innerText = "💾 Guardar Actividad de Identidad";
            })
            .registrarActividad1(data);
    }

// --- ACTIVIDAD: MI LUGAR EN EL MUNDO (LLAMADA) ---
function enviarActividadLlamada(btn) {
    const textoLlamada = document.getElementById('ans_llamada').value.trim();

    if (!textoLlamada) {
        alert("Por favor, escribe tu registro antes de guardar.");
        return;
    }

    const data = {
        legajo: N_LEGAJO, // Usamos tu variable global de sesión
        llamada: textoLlamada
    };

    btn.disabled = true;
    btn.innerText = "Guardanado..."; // Mantén la línea que tengas de feedback arriba

    google.script.run
        .withSuccessHandler(function(response) {
            // 3. MENSAJE DE ÉXITO
            alert("✨ ¡Actividad guardada con éxito!");
            // Redirección segura para evitar la página en blanco
            window.open(google.script.host.origin + google.script.host.editorServices.getActiveAppUrl(), '_top');
        })
        .withFailureHandler(function(error) {
            console.error("Error al guardar:", error);
            alert("❌ Hubo un problema al guardar. Intenta de nuevo.");
            
            // 4. REGRESAMOS EL BOTÓN A SU ESTADO ORIGINAL
            if (typeof originalText !== 'undefined') {
                btn.innerHTML = originalText;
            } else {
                btn.innerText = "Guardar Actividad";
            }
            btn.disabled = false;
        })
        .guardarActividadLlamada(data); // Asegúrate de que termine en punto y coma (;)
}

   /* --- FUNCIONES DE ARRASTRE (DRAG & DROP) --- */
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
        // 1. Metemos la palabra físicamente dentro del marco de la figura
        dropZone.appendChild(draggedElement);
        draggedElement.style.position = "absolute";

        // 2. Calculamos la posición exacta usando el scroll de la página para que no se desfase
        const rect = dropZone.getBoundingClientRect();
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Posición absoluta real del contenedor en la pantalla total
        const zoneX = rect.left + scrollLeft;
        const zoneY = rect.top + scrollTop;

        // Calculamos dónde soltó el mouse restando el origen de la figura
        const x = ev.pageX - zoneX - (draggedElement.offsetWidth / 2);
        const y = ev.pageY - zoneY - (draggedElement.offsetHeight / 2);

        // Limitamos los movimientos para que queden estrictamente encima de la caja de la silueta
        const limitX = Math.max(0, Math.min(x, rect.width - draggedElement.offsetWidth));
        const limitY = Math.max(0, Math.min(y, rect.height - draggedElement.offsetHeight));

        draggedElement.style.left = limitX + "px";
        draggedElement.style.top = limitY + "px";
        
        // 3. CAMBIO CLAVE: Pintamos el fondo de la FIGURA (dropZone), no de la palabra
        if (color) {
            dropZone.style.backgroundColor = color;
            dropZone.style.borderRadius = "15px"; // Para que el fondo tenga bordes suaves y estéticos
            dropZone.style.transition = "background-color 0.4s ease"; // Transición suave de color
        }
    }
}
/* --- ENVIAR ACTIVIDAD 2: EMOCIONES (Columnas G-H) --- */
function enviarActividad2(btn) {
    const dropzone = document.getElementById('drop-zone');
    // Recolectamos las palabras que están dentro del contenedor de la silueta
    const emocionesEnSilueta = Array.from(dropzone.querySelectorAll('.drag-item'))
                                    .map(el => el.innerText).join(', ');
    
    // CAMBIO CLAVE: Cambiamos los nombres para que coincidan con el archivo .gs
    const data = {
        legajo: N_LEGAJO,
        emociones_recurrentes: emocionesEnSilueta, // Antes "emociones"
        razon_emociones: document.getElementById('ans_causa').value, // Antes "causa"
        fecha: new Date().toLocaleString()
    };

    // Ajustamos también la validación con los nuevos nombres
    if (!data.emociones_recurrentes && !data.razon_emociones) {
        alert("Por favor, completa la actividad antes de guardar.");
        return;
    }

    btn.disabled = true;
    btn.innerText = "Guardando...";

    google.script.run
        .withSuccessHandler(function(response) {
            // 3. MENSAJE DE ÉXITO
            alert("✨ ¡Actividad guardada con éxito!");
            
            // Si quieres que la página se refresque/vuelva al inicio:
            window.open(google.script.host.origin + google.script.host.editorServices.getActiveAppUrl(), '_top');
        })
        .withFailureHandler(function(error) {
            console.error("Error al guardar:", error);
            alert("❌ Hubo un problema al guardar. Intenta de nuevo.");
            
            // 4. REGRESAMOS EL BOTÓN A SU ESTADO ORIGINAL SI EL SERVIDOR FALLA
            btn.innerHTML = originalText;
            btn.disabled = false;
})
        .registrarActividad2(data); 
}

/* --- LÓGICA TABLA INTERACTIVA (Pintar Celdas) --- */
function pintarCelda(td) {
    let val = parseInt(td.getAttribute('data-value') || "0");
    // Ciclo: 0 -> 25 -> 50 -> 75 -> 100 -> 0
    val = (val >= 100) ? 0 : val + 25;
    
    td.setAttribute('data-value', val);
    td.innerText = val + "%";
    
    // Feedback visual usando el verde de tu identidad (--color-primary)
    const alpha = val / 100;
    td.style.backgroundColor = `rgba(125, 168, 32, ${alpha})`; 
    td.style.color = (val > 50) ? "#fff" : "#2d5016";
}

/* --- LÓGICA ACTIVIDAD 3: TABLA DE NECESIDADES --- */

// 1. Generar la tabla con la estructura exacta
function renderTablaNecesidades() {
    const container = document.getElementById('tabla-interactiva-grid');
    if (!container) return;
    container.innerHTML = ""; // Limpiar

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
    let prom = (suma / items.length).toFixed(1);
    document.getElementById('promedio-general').innerText = prom + "%";
}

function reiniciarTabla() {
    if(confirm("¿Reiniciar todos los valores?")) {
        renderTablaNecesidades();
        document.getElementById('promedio-general').innerText = "0.0%";
    }
}

// 2. Función única para "pintar" (Ciclo 0-25-50-75-100)
function pintarCelda(td) {
    let val = parseInt(td.getAttribute('data-value') || "0");
    val = (val >= 100) ? 0 : val + 25; 
    
    td.setAttribute('data-value', val);
    td.innerText = val + "%";
    
    // Feedback visual con el verde de la identidad
    const alpha = val / 100;
    td.style.backgroundColor = `rgba(140, 179, 45, ${alpha})`;
    td.style.color = (val > 50) ? "white" : "black";
}

// 3. Calcular promedios y enviar a Google Sheets
function enviarActividad3(btn) {
    const legajo = document.getElementById('display-legajo').innerText;
    
    if (legajo === "---") { 
        alert("Por favor, inicia sesión primero."); 
        return; 
    }

    btn.innerText = "⌛ Guardando...";
    btn.disabled = true;

    // Calculamos promedios basados en las 4 columnas de la nueva tabla
    const categorias = ["FÍSICAS", "MENTALES", "EMOCIONALES", "ESPIRITUALES"];
    const promedios = categorias.map(cat => {
        const items = document.querySelectorAll(`.item-necesidad[data-cat="${cat}"]`);
        let suma = 0;
        items.forEach(i => {
            suma += parseInt(i.getAttribute('data-value') || 0);
        });
        // Si por alguna razón no hay items, devolvemos 0% para evitar errores
        return (items.length > 0 ? Math.round(suma / items.length) : 0) + "%";
    });

    // Creamos el paquete de datos para el servidor
    const payload = {
        legajo: legajo,
        valores: promedios // Envía el array ordenado [Física, Mental, Emocional, Espiritual]
    };

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

// --- ENVIAR ACTIVIDAD 4: AUTODISTANCIAMIENTO (CÓMIC) ---
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

function ActividadYoSoy() {
    // 1. Obtener los valores de los campos
    const yoPuedoSerTexto = document.querySelector('textarea').value; 

    // 2. Crear el objeto de datos que espera tu Backend
    const datos = {
        legajo: localStorage.getItem('legajo') || 'SIN LEGAJO', // O el campo donde guardes el legajo
        yo_soy: '', 
        yo_puedo_ser: yoPuedoSerTexto
    };

    // 3. Llamar a la función del servidor con el nombre CORRECTO
    google.script.run
        .withSuccessHandler(function(response) {
            alert('¡Actividad guardada correctamente!');
        })
        .withFailureHandler(function(error) {
            alert('Error al guardar: ' + error.message);
        })
        .registrarRespuestasYoSoy(datos); // <--- AQUÍ usas el nombre de tu línea 342
}

// 5. NAVEGACIÓN ENTRE PASOS (Solución al botón que no reaccionaba)
function goToStep(step) {
    // 1. Quitar la clase active a TODOS los botones y ponérsela solo al que se hizo clic
    document.querySelectorAll('.step-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const botonActivo = document.getElementById('sbtn-' + step);
    if (botonActivo) {
        botonActivo.classList.add('active');
    }

    // 2. Ocultar TODOS los contenedores de pasos usando la clase general
    document.querySelectorAll('.step-content').forEach(div => {
        div.style.setProperty('display', 'none', 'important');
    });

    // 3. Forzar la apertura del ID exacto del paso seleccionado
    const contenedorDestino = document.getElementById('cont-step-' + step);
    if (contenedorDestino) {
        contenedorDestino.style.setProperty('display', 'block', 'important');
    } else {
        console.error("No se encontró el contenedor: cont-step-" + step);
    }

    // 4. Disparador de la tabla de necesidades (Paso 2)
    if (step === 2 && typeof renderTablaNecesidades === 'function') {
        renderTablaNecesidades();
    }
}

function enviarBusquedaSentido(boton) {
  // Deshabilitar botón para evitar doble envío
  boton.disabled = true;
  boton.innerHTML = "⏳ Guardando...";

  // Capturar Paso 1
  const nombreAdmirado = document.getElementById("p5_nombre_admirado").value.trim();

  // Capturar Paso 2 y unificar en un solo texto con saltos de línea
  const act1 = document.getElementById("p5_actitud_1").value.trim();
  const act2 = document.getElementById("p5_actitud_2").value.trim();
  const act3 = document.getElementById("p5_actitud_3").value.trim();
  const actitudesUnificadas = `1: ${act1}\n2: ${act2}\n3: ${act3}`;

  // Capturar Paso 3 y unificar
  const val1 = document.getElementById("p5_valor_1").value.trim();
  const val2 = document.getElementById("p5_valor_2").value.trim();
  const val3 = document.getElementById("p5_valor_3").value.trim();
  const valoresUnificados = `1: ${val1}\n2: ${val2}\n3: ${val3}`;

  // Capturar Paso 4 (se envían individuales)
  const refActual = document.getElementById("p5_reflexion_actual").value.trim();
  const refTraicion = document.getElementById("p5_reflexion_traicion").value.trim();
  const refCompromiso = document.getElementById("p5_reflexion_compromiso").value.trim();

  // Estructura de datos para enviar a Google Apps Script
  const datos = {
    nombreAdmirado: nombreAdmirado,
    actitudes: actitudesUnificadas,
    valores: valoresUnificados,
    refActual: refActual,
    refTraicion: refTraicion,
    refCompromiso: refCompromiso
  };

  // Llamada al Backend (Google Apps Script)
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

function enviarSentido(btn) {
    const comodidad = document.getElementById('ans_comodidad').value;
    const postura = document.getElementById('ans_postura').value;
    const compromiso = document.getElementById('ans_compromiso').value;

    if (!comodidad && !postura && !compromiso) {
        alert("Por favor, escribe al menos una reflexión antes de guardar.");
        return;
    }

    // Efecto visual de guardando
    const textoOriginal = btn.innerHTML;
    btn.innerHTML = '⏳ Guardando...';
    btn.disabled = true;

    // Llamada al Backend en Código.gs
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
</script>
