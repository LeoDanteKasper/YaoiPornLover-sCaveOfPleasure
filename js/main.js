 class ChiptuneAudioEngine {
            constructor() {
                this.ctx = null;
                this.enabled = true;
            }

            init() {
                if (!this.ctx) {
                    const AudioContext = window.AudioContext || window.webkitAudioContext;
                    this.ctx = new AudioContext();
                }
            }

            playTone(freq, type = 'square', duration = 0.08, vol = 0.08) {
                if (!this.enabled) return;
                this.init();
                if (this.ctx.state === 'suspended') {
                    this.ctx.resume();
                }

                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = type;
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

                gain.gain.setValueAtTime(vol, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start();
                osc.stop(this.ctx.currentTime + duration);
            }

            playKeyPress() {
                const freqs = [380, 410, 440, 470];
                const randomFreq = freqs[Math.floor(Math.random() * freqs.length)];
                this.playTone(randomFreq, 'triangle', 0.02, 0.02);
            }

            playCmdSuccess() {
                this.playTone(523.25, 'square', 0.05, 0.04);
                setTimeout(() => this.playTone(659.25, 'square', 0.06, 0.04), 50);
            }

            playAffectionUp() {
                this.playTone(523.25, 'sine', 0.08, 0.06);
                setTimeout(() => this.playTone(659.25, 'sine', 0.08, 0.06), 70);
                setTimeout(() => this.playTone(783.99, 'sine', 0.08, 0.06), 140);
                setTimeout(() => this.playTone(1046.50, 'sine', 0.12, 0.08), 210);
            }

            playCombatHit() {
                this.playTone(150, 'sawtooth', 0.1, 0.08);
                setTimeout(() => this.playTone(80, 'sawtooth', 0.15, 0.1), 50);
            }
        }

        const sfx = new ChiptuneAudioEngine();

        const itemsDB = {
            esmeralda: { name: "Esmeralda del Caos", desc: "Una joya mística que irradia energía ilimitada.", giveEffect: { sonic: 35, shadow: 40 } },
            pizzatactica: { name: "Pizza Táctica de Jamón", desc: "Una pizza caliente en caja metálica reforzada.", giveEffect: { doomentio: 30, blitzo: 25, beast_boy: 20 } },
            hotdog: { name: "Chili Dog Supremo", desc: "El aperitivo definitivo lleno de condimento.", giveEffect: { sonic: 45, bart_allen: 35 } },
            manga: { name: "Manga Shonen Edición Limitada", desc: "Un tomo de colección impecable.", giveEffect: { senpai: 35, mukai: 25, midoriya_izuku: 30 } },
            cafe: { name: "Café Negro de Grano Supremo", desc: "Amargo, oscuro y de aroma impecable.", giveEffect: { shadow: 30, batman: 30, thomas_wayne: 35, chris_redfield: 25 } },
            batarang: { name: "Batarang de Aleación", desc: "Un bumerán táctico de alta precisión.", giveEffect: { batman: 40, superman: 15, dick_grayson: 35, tim_drake: 35, damian_wayne: 30 } },
            bateriacronos: { name: "Batería de Materia Oscura", desc: "Un núcleo energético de tecnología superior.", giveEffect: { cloud: 30, grant: 25, blue_beetle: 35 } },
            bateriacristal: { name: "Cristal Aku Aku", desc: "Un cristal que emite una vibración antigua y protectora.", giveEffect: { crash: 50 } },
            pepsi: { name: "Pepsi Fría Edición Retro", desc: "Una lata helada con el logo clásico de Pepsi.", giveEffect: { pepsiman: 60, zazz: 20, bart_allen: 25 } },
            rosas: { name: "Ramillete de Rosas Negras", desc: "Rosas de tallo largo con elegancia gótica.", giveEffect: { stolas: 40, alastor: 25, kaito: 25 } },
            pato: { name: "Patito de Goma con Sombrero", desc: "Un pato de baño amarillo con un elegante sombrero de copa.", giveEffect: { lucifer: 60 } },
            contrato: { name: "Contrato de Almas Elegante", desc: "Un pergamino de vástago dorado listo para firmar.", giveEffect: { alastor: 40, blitzo: 20 } },
            hueso: { name: "Hueso Ancestral Tallado", desc: "Una reliquia mística para seres caninos.", giveEffect: { jontalbain: 45, beast_boy: 30 } },
            espadabuster: { name: "Buster Sword en Miniatura", desc: "Un amuleto con forma de la mítica espada pesada.", giveEffect: { cloud: 40, trunks_futuro: 30, shirou_emiya: 25 } },
            berenjena: { name: "Berenjena Dorada Brillante", desc: "Un vegetal extravagante de tono púrpura radiante.", giveEffect: { waluigi: 50 } },
            armapositron: { name: "Pistola Táctica de Hellhound", desc: "Armamento personalizado con grabados demoníacos.", giveEffect: { blitzo: 45, red_hood: 30 } },
            hierba_verde: { name: "Hierba Verde Táctica", desc: "Una planta medicinal de primeros auxilios empaquetada con esmero.", giveEffect: { leon_kennedy_re2: 45, leon_kennedy_re4: 45, chris_redfield: 50 } },
            semilla_del_hermitano: { name: "Semilla del Ermitaño", desc: "Una mística semilla verde capaz de curar heridas y restaurar la energía al instante.", giveEffect: { gohan_adulto: 40, gohan_nino: 45, trunks_futuro: 35, trunks_nino: 30 } },
            ramen_naruto: { name: "Tazón de Ramen Ichiraku", desc: "Ramen humeante servido en un tazón cerámico tradicional con extra de cerdo.", giveEffect: { naruto_uzumaki: 60, natsu_dragneel: 30 } },
            escarabajo_alienigena: { name: "Núcleo del Escarabajo Khaji Da", desc: "Un artefacto biotecnológico azul que emite pulsos de energía alienígena.", giveEffect: { blue_beetle: 60 } },
            chamarra_cuero: { name: "Chamarra de Cuero Negra", desc: "Una chaqueta táctica de cuero resistente con cierre reforzado.", giveEffect: { conner_kent: 45, leon_kennedy_re4: 30 } },
            barra_energia: { name: "Barra Energética Hipercinética", desc: "Snack de calorías concentradas para quemar a altas velocidades.", giveEffect: { bart_allen: 50, sonic: 25 } },
            tofu_vegano: { name: "Tofu Marinado para Héroes", desc: "Comida 100% vegetariana y saludable para recargar baterías.", giveEffect: { beast_boy: 50 } },
            pluma_arco: { name: "Pluma Sagrada de Palutena", desc: "Una pluma de un blanco impoluto cargada de bendiciones divinas.", giveEffect: { pit_kid_icarus: 50, dark_pit: 30, kaio_shin: 25 } },
            llave_espada_replica: { name: "Llavero del Corazón de la Luz", desc: "Un accesorio que reacciona con la fuerza del corazón de quien lo sostiene.", giveEffect: { sora: 50, kirito_kazuto: 20 } },
            escudo_hyliano: { name: "Emblema del Escudo Hyliano", desc: "Un blasón con el grabado de la Fuerza Dorada y la mítica Ave Roja.", giveEffect: { link_zelda: 55, pit_kid_icarus: 20 } }
        };

       const rawNpcsDB = {
        kaito: { name: "Kaito", desc: "Un muchacho misterioso con ropa informal y una mirada observadora.", room: "salon_central", tags: ["sabio_serio", "misterioso", "observador"], favoritePlace: "mirador_estrellas" },
        doomentio: { name: "Doomentio", desc: "Un tipo de aspecto demacrado y postura rígida, dando discursos hiperanalíticos.", room: "salon_central", tags: ["serio", "critico", "egocentrico"], favoritePlace: "biblioteca_misteriosa" },
        grant: { name: "Grant", desc: "Un sujeto tranquilo de modales pausados, ajustándose los lentes mientras analiza la arquitectura.", room: "salon_central", tags: ["sabio_serio", "analitico", "tranquilo"], favoritePlace: "planetario_cuantico" },
        pepsiman: { name: "Pepsiman", desc: "El legendario héroe plateado y azul corriendo en el lugar a toda velocidad.", room: "salon_central", tags: ["alegre", "caotico", "comico", "heroico"], favoritePlace: "pista_patinaje" },
        batman: { name: "Batman (Bruce Wayne)", desc: "El Caballero de la Noche. Envuelto en su capa negra, observa minuciosamente desde las sombras.", room: "universo_dc", tags: ["edgy", "serio", "estratega", "heroico"], favoritePlace: "azotea_gothica" },
        superman: { name: "Superman (Clark Kent)", desc: "El Hombre de Acero, flotando a pocos centímetros del suelo con una sonrisa cálida.", room: "universo_dc", tags: ["heroico", "alegre", "lider", "protector"], favoritePlace: "picnic_campo" },
        dick_grayson: { name: "Nightwing (Dick Grayson)", desc: "El primer Robin, vistiendo su traje negro y azul de Nightwing. Mantiene una postura ágil.", room: "universo_dc", tags: ["alegre", "heroico", "carismatico", "lider"], favoritePlace: "club_gay_striptease" },
        tim_drake: { name: "Red Robin (Tim Drake)", desc: "El detective prodigio de la Batifamilia, tecleando rápidamente en un dispositivo holográfico.", room: "universo_dc", tags: ["sabio_serio", "analitico", "heroico"], favoritePlace: "cafe_gourmet" },
        damian_wayne: { name: "Robin (Damian Wayne)", desc: "El hijo biológico de Bruce Wayne. Cruza los brazos con gesto desafiante.", room: "universo_dc", tags: ["edgy", "orgulloso", "agresivo", "heroico"], favoritePlace: "dojo_artes_marciales" },
        thomas_wayne: { name: "Batman de Flashpoint (Thomas Wayne)", desc: "Un Batman más viejo, de ojos cansados, traje oscuro con detalles rojos y dos pistolas.", room: "universo_dc", tags: ["edgy", "serio", "rudo", "antiheroe"], favoritePlace: "bar_subterraneo" },
        conner_kent: { name: "Superboy (Conner Kent / Kon-El)", desc: "Un joven de actitud rebelde con chamarra de cuero y la icónica 'S' roja.", room: "universo_dc", tags: ["rebelde", "carismatico", "heroico", "orgulloso"], favoritePlace: "concierto_rock" },
        bart_allen: { name: "Kid Flash (Bart Allen)", desc: "Un velocista hiperactivo que no puede quedarse quieto un solo segundo.", room: "universo_dc", tags: ["alegre", "hiperactivo", "comico", "heroico"], favoritePlace: "parque_atracciones" },
        beast_boy: { name: "Chico Bestia (Garfield Logan)", desc: "Un chico de piel verde brillante y sonrisa burlona con su uniforme de los Titanes.", room: "universo_dc", tags: ["alegre", "comico", "amigable", "heroico"], favoritePlace: "puesto_comida_callejera" },
        blue_beetle: { name: "Blue Beetle (Jaime Reyes)", desc: "Un muchacho enfundado en una armadura alienígena azul brillante.", room: "universo_dc", tags: ["alegre", "heroico", "amigable", "joven"], favoritePlace: "arcade_retro" },
        gohan_adulto: { name: "Gohan (Adulto)", desc: "Vestido con su gi morado de combate, transmite una calma sabia y una fuerza oculta.", room: "universo_dragon_ball", tags: ["sabio_serio", "tranquilo", "heroico", "estudioso"], favoritePlace: "biblioteca_misteriosa" },
        gohan_nino: { name: "Gohan (Niño)", desc: "El pequeño Gohan vistiendo su traje con el kanji de Kame. Mira con curiosidad.", room: "universo_dragon_ball", tags: ["alegre", "inocente", "timido", "heroico"], favoritePlace: "picnic_campo" },
        trunks_nino: { name: "Trunks (Niño)", desc: "El hijo mestizo de Vegeta, confiado y con las manos en los bolsillos.", room: "universo_dragon_ball", tags: ["alegre", "orgulloso", "travieso", "competitivo"], favoritePlace: "arcade_retro" },
        trunks_futuro: { name: "Trunks del Futuro", desc: "El guerrero peli-violeta con su chaqueta de Capsule Corp y su espada cruzada.", room: "universo_dragon_ball", tags: ["edgy", "serio", "heroico", "protector"], favoritePlace: "mirador_estrellas" },
        android_17: { name: "Androide 17", desc: "El protector de la fauna silvestre, luciendo su brazalete de Ranger y mirada indiferente.", room: "universo_dragon_ball", tags: ["solitario", "tranquilo", "edgy", "protector"], favoritePlace: "bosque_encantado" },
        kaio_shin: { name: "Kaiō Shin del Este", desc: "La deidad del Universo 7, observando la convergencia multiversal con preocupación.", room: "universo_dragon_ball", tags: ["sabio_serio", "divino", "precavido"], favoritePlace: "jardin_botanico" },
        naruto_uzumaki: { name: "Naruto Uzumaki", desc: "El Ninja de la Hoja con su traje naranja y la banda de Hokage. Desborda energía.", room: "universo_shonen_jump", tags: ["alegre", "heroico", "determinado", "lider"], favoritePlace: "restaurante_ramen" },
        natsu_dragneel: { name: "Natsu Dragneel", desc: "El Mago de Fairy Tail con su bufanda de escamas. Le salen chispas de fuego de los puños.", room: "universo_shonen_jump", tags: ["alegre", "caotico", "competitivo", "impulsivo"], favoritePlace: "coliseo_gladiadores" },
        midoriya_izuku: { name: "Izuku Midoriya (Deku)", desc: "El heredero del One For All con su traje verde de héroe y su libreta de notas.", room: "universo_shonen_jump", tags: ["heroico", "analitico", "alegre", "determinado"], favoritePlace: "gimnasio_alto_rendimiento" },
        shinra_kusakabe: { name: "Shinra Kusakabe", desc: "El Oficial de la Fire Force. Muestra su sonrisa diabólica mientras sus pies botan llamas.", room: "universo_shonen_jump", tags: ["heroico", "misentendido", "determinado", "agresivo"], favoritePlace: "pista_patinaje" },
        shirou_emiya: { name: "Shirou Emiya", desc: "Un joven de cabello pelirrojo listo para proyectar espadas si es necesario.", room: "universo_anime_variado", tags: ["heroico", "serio", "altruista", "determinado"], favoritePlace: "restaurante_lujoso" },
        kirito_kazuto: { name: "Kirito (Kazuto Kirigaya)", desc: "El Espadachín Negro, vistiendo su abrigo oscuro y con su fiel espada.", room: "universo_anime_variado", tags: ["edgy", "tranquilo", "gamer", "heroico"], favoritePlace: "arcade_retro" },
        kamijou_touma: { name: "Kamijou Touma", desc: "Un estudiante de secundaria con el pelo erizado y gesto de profunda resignación.", room: "universo_anime_variado", tags: ["heroico", "desafortunado", "alegre", "humilde"], favoritePlace: "puesto_comida_callejera" },
        senpai: { name: "Senpai", desc: "Un estudiante de uniforme impecable que parece sacado de una novela visual escolar.", room: "universo_anime_variado", tags: ["tranquilo", "amigable", "ordinario"], favoritePlace: "cafe_gourmet" },
        blitzo: { name: "Blitzo (I.M.P.)", desc: "Un imp rojo de cuernos a rayas con su traje de negocios desgastado y una sonrisa maniaca.", room: "universo_hazbin_helluva", tags: ["caotico", "comico", "agresivo", "mercenario"], favoritePlace: "club_gay_striptease" },
        stolas: { name: "Príncipe Stolas", desc: "Un alto y elegante demonio búho de la Goetia con túnica real y ojos llenos de misterio.", room: "universo_hazbin_helluva", tags: ["dramatico", "elegante", "mago", "cariñoso"], favoritePlace: "mirador_estrellas" },
        alastor: { name: "Alastor (El Demonio de la Radio)", desc: "Una figura esbelta con traje rojo, orejas de ciervo y una sonrisa inquietante constante.", room: "universo_hazbin_helluva", tags: ["caotico", "elegante", "misterioso", "peligroso"], favoritePlace: "teatro_opera" },
        lucifer: { name: "Lucifer Morningstar", desc: "El Rey del Infierno vistiendo un elegante traje blanco con sombrero de copa y bastón.", room: "universo_hazbin_helluva", tags: ["alegre", "excentrico", "dramatico", "poderoso"], favoritePlace: "parque_atracciones" },
        sonic: { name: "Sonic el Erizo", desc: "El erizo azul más rápido del mundo, dando golpecitos en el suelo con su zapatilla.", room: "universo_sega_sonic", tags: ["alegre", "heroico", "confiado", "hiperactivo"], favoritePlace: "parque_atracciones" },
        shadow: { name: "Shadow el Erizo", desc: "La Forma de Vida Suprema. Se mantiene cruzado de brazos con aura de energía oscura.", room: "universo_sega_sonic", tags: ["edgy", "solitario", "serio", "antiheroe"], favoritePlace: "bar_subterraneo" },
        zazz: { name: "Zazz (Zeti)", desc: "Un alienígena rosado y frenético con cuernos, riéndose salvajemente.", room: "universo_sega_sonic", tags: ["caotico", "agresivo", "maniaco", "enemigo"], favoritePlace: "concierto_rock" },
        leon_kennedy_re2: { name: "Leon S. Kennedy (RE2)", desc: "Un agente novato con el uniforme táctico del R.P.D., sosteniendo su linterna con firmeza.", room: "universo_capcom_resident", tags: ["heroico", "inocente", "superviviente", "determinado"], favoritePlace: "puesto_comida_callejera" },
        leon_kennedy_re4: { name: "Leon S. Kennedy (RE4)", desc: "El agente veterano del gobierno con su campera de cuero marrón, manteniendo la calma.", room: "universo_capcom_resident", tags: ["sarcastico", "serio", "heroico", "superviviente"], favoritePlace: "bar_subterraneo" },
        chris_redfield: { name: "Chris Redfield", desc: "Un musculoso veterano armado hasta los dientes con equipo táctico pesado.", room: "universo_capcom_resident", tags: ["serio", "militar", "heroico", "protector"], favoritePlace: "campo_tiro" },
        mega_man: { name: "Mega Man (Rock)", desc: "El robot azul con su Mega Buster cargado y listo en su brazo derecho.", room: "universo_capcom_resident", tags: ["heroico", "alegre", "justiciero", "noble"], favoritePlace: "museo_tecnologico" },
        jontalbain: { name: "Jon Talbain", desc: "El hombre lobo luchador en su traje de artes marciales blanco.", room: "universo_darkstalkers", tags: ["edgy", "solitario", "luchador", "serio"], favoritePlace: "dojo_artes_marciales" },
        mukai: { name: "Mukai", desc: "Un ser de piedra petrificada de presencia monumental, exudando aura de antigüedad.", room: "universo_darkstalkers", tags: ["sabio_serio", "imponente", "antiguo", "rival"], favoritePlace: "templo_antiguo" },
        waluigi: { name: "Waluigi", desc: "Una figura alta y flacucha vestida de morado con su bigote en punta, haciendo gestos de enojo.", room: "universo_nintendo", tags: ["caotico", "comico", "envidioso", "rival"], favoritePlace: "casino_neon" },
        pit_kid_icarus: { name: "Pit (Kid Icarus)", desc: "El ángel guardián con sus alas blancas y su arco sagrado.", room: "universo_nintendo", tags: ["alegre", "heroico", "comelon", "leal"], favoritePlace: "buffet_libre" },
        dark_pit: { name: "Pit Sombrío (Dark Pit)", desc: "El clon oscuro de Pit, con wings de pluma negra y una mirada desafiante.", room: "universo_nintendo", tags: ["edgy", "rebelde", "orgulloso", "antiheroe"], favoritePlace: "azotea_gothica" },
        link_zelda: { name: "Link", desc: "El Héroe del Tiempo vistiendo su túnica verde, sosteniendo la Espada Maestra.", room: "universo_nintendo", tags: ["heroico", "callado", "valiente", "aventurero"], favoritePlace: "bosque_encantado" },
        cloud: { name: "Cloud Strife", desc: "El ex-SOLDADO de pelo rubio de punta y ojos de Mako, cargando la Espada Buster.", room: "universo_gaming_rpg", tags: ["edgy", "serio", "solitario", "heroico"], favoritePlace: "bar_subterraneo" },
        sora: { name: "Sora", desc: "El portador de la Keyblade con su ropa ancha roja y negra y una sonrisa optimista.", room: "universo_gaming_rpg", tags: ["alegre", "heroico", "amigable", "optimista"], favoritePlace: "playa_tropical" },
        crash: { name: "Crash Bandicoot", desc: "El marsupial anaranjado dando vueltas sin sentido y haciendo gestos graciosos.", room: "universo_gaming_rpg", tags: ["alegre", "caotico", "comico", "hiperactivo"], favoritePlace: "playa_tropical" }
    };

        const citasDB = {
            lugares: {
                club_gay_striptease: { name: "Club de Striptease Gay 'Neon Velvet'", reqAffinity: 15, boost: 35, category: "Noche / Fiesta", desc: "Luces de neón púrpura, cócteles coloridos y bailarines en el escenario." },
                cafe_gourmet: { name: "Café Gourmet Lujoso 'Aroma Divino'", reqAffinity: 10, boost: 25, category: "Gastronomía", desc: "Pastelería fina, espresso de especialidad y ambiente tranquilo." },
                restaurante_lujoso: { name: "Restaurante 5 Estrellas 'Le Multiverse'", reqAffinity: 30, boost: 40, category: "Gastronomía", desc: "Platos gourmet exclusivos y manteles de seda con piano de fondo." },
                mirador_estrellas: { name: "Mirador Estelar del Nexus", reqAffinity: 20, boost: 30, category: "Romance / Vistas", desc: "Vista panorámica al cosmos donde colisionan nebulosas e infinitas galaxias." },
                bar_subterraneo: { name: "Bar Speakeasy 'El Escondite'", reqAffinity: 15, boost: 25, category: "Noche / Fiesta", desc: "Música de jazz suave, tragos fuertes y una tenue iluminación tenue." },
                arcade_retro: { name: "Arcade Retro 'Cyber Neon 1989'", reqAffinity: 5, boost: 20, category: "Entretenimiento", desc: "Máquinas arcade clásicas, luces parpadeantes y sonido chiptune retro." },
                parque_atracciones: { name: "Parque de Atracciones 'Galactic Thrills'", reqAffinity: 15, boost: 30, category: "Entretenimiento", desc: "Montañas rusas gravitacionales, algodón de azúcar y juegos de feria." },
                playa_tropical: { name: "Playa Paradisíaca 'Atolón Cristal'", reqAffinity: 25, boost: 35, category: "Tranquilo / Naturaleza", desc: "Arenas blancas, agua turquesa templada y brisa suave al atardecer." },
                teatro_opera: { name: "Gran Teatro de la Ópera Multiversal", reqAffinity: 35, boost: 45, category: "Cultura / Elegante", desc: "Palcos de terciopelo rojo, acústica perfecta y orquestas dramáticas." },
                dojo_artes_marciales: { name: "Dojo de Artes Marciales 'Espíritu de Hierro'", reqAffinity: 10, boost: 25, category: "Combate / Entrenamiento", desc: "Tatamis limpios, aroma a incienso y saco de entrenamiento pesado." },
                casino_neon: { name: "Casino Imperial 'El Gran Dado'", reqAffinity: 20, boost: 35, category: "Noche / Fiesta", desc: "Ruletas girando, mesas de póquer de alto riesgo y luces destellantes." },
                bosque_encantado: { name: "Bosque místico de Luciérnagas", reqAffinity: 15, boost: 30, category: "Tranquilo / Naturaleza", desc: "Senderos iluminados por hongos bioluminiscentes y arroyos cristalinos." },
                concierto_rock: { name: "Estadio 'Moshpit del Caos' (Concierto Metal)", reqAffinity: 20, boost: 35, category: "Noche / Fiesta", desc: "Guitarras distorsionadas, luces estroboscópicas y energía desenfrenada." },
                biblioteca_misteriosa: { name: "Biblioteca Ancestral de Tomos Prohibidos", reqAffinity: 15, boost: 25, category: "Cultura / Elegante", desc: "Estanterías infinitas de madera noble con miles de pergaminos arcanos." },
                restaurante_ramen: { name: "Puesto de Ramen Tradicional 'Ichiraku Style'", reqAffinity: 5, boost: 20, category: "Gastronomía", desc: "Vapor humeante, tazas colmadas de fideos caseros y salsa de soja rústica." },
                picnic_campo: { name: "Picnic en Colinas Verdes al Atardecer", reqAffinity: 10, boost: 25, category: "Tranquilo / Naturaleza", desc: "Manta a cuadros sobre la hierba, sándwiches frescos y aire puro." },
                gimnasio_alto_rendimiento: { name: "Gimnasio Táctico 'Titan Power'", reqAffinity: 10, boost: 25, category: "Combate / Entrenamiento", desc: "Pesas pesadas, cintas de correr de alta velocidad y ambiente motivador." },
                cine_neon: { name: "Cine IMAX 'Dimension Cinema'", reqAffinity: 10, boost: 25, category: "Entretenimiento", desc: "Butacas reclinables ultra cómodas, palomitas gigantes y pantalla colosal." },
                piscina_termal: { name: "Aguas Termales de la Cumbre", reqAffinity: 30, boost: 40, category: "Tranquilo / Naturaleza", desc: "Vapor relajante, piscinas naturales de piedra y vista a montañas nevadas." },
                museo_tecnologico: { name: "Museo de Ciencia & Tecnología Futurista", reqAffinity: 10, boost: 25, category: "Cultura / Elegante", desc: "Exposiciones holográficas interactivas y androides antiguos en exhibición." },
                crucero_espacial: { name: "Crucero de Lujo 'Estrella Polar'", reqAffinity: 45, boost: 50, category: "Romance / Vistas", desc: "Nave espacial con cubierta de cristal flotando en la órbita de un planeta de neón." },
                pizzeria_artesanal: { name: "Pizzería Nápoles de Horno de Leña", reqAffinity: 5, boost: 20, category: "Gastronomía", desc: "Queso derretido sobre masa madre crocante en un rincón acogedor." },
                karaoke_bar: { name: "Box de Karaoke Privado 'Singsong'", reqAffinity: 15, boost: 30, category: "Entretenimiento", desc: "Luces LED ritmadas, micrófonos inalámbricos y catálogo infinito de canciones." },
                coliseo_gladiadores: { name: "Coliseo Multiversal de Arena Sangrienta", reqAffinity: 25, boost: 35, category: "Combate / Entrenamiento", desc: "Clamor del público en graderías de piedra y combate directo en la arena." },
                jardin_botanico: { name: "Jardín Botánico de Flora Exótica", reqAffinity: 10, boost: 25, category: "Tranquilo / Naturaleza", desc: "Invernaderos de cristal gigantes con plantas carnívoras y flores luminosas." },
                pista_patinaje: { name: "Pista de Patinaje sobre Hielo Neón", reqAffinity: 15, boost: 30, category: "Entretenimiento", desc: "Música pop vibrante, luces de colores reflejadas en el hielo y chocolate caliente." },
                cafeteria_gatos: { name: "Cat Café 'Michis de Luz'", reqAffinity: 5, boost: 20, category: "Gastronomía", desc: "Gatitos amigables jugando entre los sofás mientras disfrutas tu café mañanero." },
                azotea_gothica: { name: "Azotea de Rascacielos al Llover", reqAffinity: 20, boost: 35, category: "Romance / Vistas", desc: "Gargolas de piedra mojadas y vista a la ciudad nocturna bajo una suave lluvia." },
                galeria_arte: { name: "Galería de Arte Vanguardista 'Minds'", reqAffinity: 15, boost: 25, category: "Cultura / Elegante", desc: "Cuadros abstractos, esculturas de energía pura y copas de champán." },
                puesto_comida_callejera: { name: "Mercado Nocturno de Street Food", reqAffinity: 5, boost: 20, category: "Gastronomía", desc: "Faroles rojos, puestos de brochetas picantes y ambiente bullicioso." },
                templo_antiguo: { name: "Santuario de Piedra Olvidado", reqAffinity: 20, boost: 30, category: "Cultura / Elegante", desc: "Paz espiritual absoluta entre ruinas antiguas cubiertas de musgo sagrado." },
                campo_tiro: { name: "Polígono de Tiro Táctico", reqAffinity: 15, boost: 30, category: "Combate / Entrenamiento", desc: "Protección auditiva, dianas en movimiento y precisión con armas de fuego." },
                pista_gokarts: { name: "Circuito de Go-Karts Neón Speed", reqAffinity: 15, boost: 30, category: "Entretenimiento", desc: "Karts eléctricos ultrarrápidos compitiendo en una pista llena de curvas." },
                barco_pirata: { name: "Taberna Pirata en el Puerto", reqAffinity: 15, boost: 30, category: "Noche / Fiesta", desc: "Jarras de ron añejo, canciones de marineros y mesas de madera rústica." },
                planetario_cuantico: { name: "Planetario de Proyección Cuántica", reqAffinity: 15, boost: 25, category: "Cultura / Elegante", desc: "Simulación de agujeros de gusano e hiperespacio proyectados en la cúpula." },
                buffet_libre: { name: "Buffet Libre Infinito 'Gula Real'", reqAffinity: 10, boost: 25, category: "Gastronomía", desc: "Montañas de comida de todas las dimensiones listas para servirse sin límite." },
                taller_mecanico: { name: "Taller Garaje 'Custom Motors'", reqAffinity: 10, boost: 25, category: "Combate / Entrenamiento", desc: "Grasa de motor, herramientas profesionales y el rugido de motores V8." },
                parque_acuatico: { name: "Parque Acuático 'Océano Cósmico'", reqAffinity: 20, boost: 35, category: "Entretenimiento", desc: "Toboganes gigantes con luces LED y piscinas de olas artificiales." },
                acuario_profundo: { name: "Acuario de Profundidades Abisales", reqAffinity: 15, boost: 25, category: "Tranquilo / Naturaleza", desc: "Túneles de cristal rodeados de criaturas marinas bioluminiscentes." },
                salon_te_ingles: { name: "Salón de Té Real 'Victoria Elegance'", reqAffinity: 15, boost: 25, category: "Gastronomía", desc: "Porcelana fina, té de jazmín y bocadillos elegantes en una mesa imperial." },
                cabana_nieve: { name: "Cabaña de Madera con Chimenea", reqAffinity: 25, boost: 35, category: "Tranquilo / Naturaleza", desc: "Nieve cayendo afuera mientras se comparte una manta calientita junto al fuego." },
                pista_baile_disco: { name: "Discoteca Synthwave 'Retro Fever'", reqAffinity: 15, boost: 30, category: "Noche / Fiesta", desc: "Piso iluminado de cuadros, bola de espejos y ritmos synthwave ochenteros." }
            }
        };

        const simsProfileDB = {
            _default: {
                outfit: "Ropa informal neutra",
                likes: ["Música", "Conversar", "Explorar el Nexus"],
                dislikes: ["Perder el tiempo", "Falta de respeto"],
                mood: "Neutral",
                mentalState: "Tranquilo",
                relationship: 50
            },
            batman: {
                outfit: "Traje táctico de Kevlar reforzado con capa de fibra de carbono",
                likes: ["Silencio", "Estrategia", "Café negro", "Batarangs"],
                dislikes: ["Caos injustificado", "Chistes malos", "Pérdida de tiempo"],
                mentalState: "Hyper-alerta",
                relationship: 30
            },
            sonic: {
                outfit: "Zapatillas rojas de velocidad y guantes blancos de algodón",
                likes: ["Chili Dogs", "Velocidad", "Aventuras", "Música rápida"],
                dislikes: ["Quedarse quieto", "Lentitud", "Injusticias"],
                mentalState: "Eufórico",
                relationship: 60
            },
            alastor: {
                outfit: "Saco rojo estilo zoot suit, monóculo y micrófono retro de radio",
                likes: ["Entretenimiento", "Jazztet", "Sonrisas", "Tratos"],
                dislikes: ["Tecnología moderna", "Aburrimiento", "Gente vulgar"],
                mentalState: "Maniaco-elegante",
                relationship: 40
            },
            doomentio: {
                outfit: "Camisa abotonada arrugada y lentes de marco grueso",
                likes: ["Crítica de arte", "Debates largos", "Rigor absoluto"],
                dislikes: ["Mediocridad", "Afecto desmedido", "Popularidad hueca"],
                mentalState: "Hiperanalítico",
                relationship: 20
            },
            blitzo: {
                outfit: "Saco de vestir desaliñado, botas de cuero y arnés táctico",
                likes: ["Armas de fuego", "Caballos", "Negocios", "Caos"],
                dislikes: ["Críticas", "Autoridad corporativa", "Que le digan qué hacer"],
                mentalState: "Impulsivo",
                relationship: 45
            }
        };

        const themePalettes = {
            heroico: {
                "--bg-color": "#03121d",
                "--term-bg": "rgba(10, 25, 41, 0.96)",
                "--border-color": "#00dfff",
                "--purple": "#00dfff",
                "--gold": "#ffe600",
                "--text-main": "#e1f5fe"
            },
            edgy: {
                "--bg-color": "#120517",
                "--term-bg": "rgba(22, 10, 28, 0.96)",
                "--border-color": "#d670ff",
                "--purple": "#d670ff",
                "--gold": "#ff79c6",
                "--text-main": "#f8f8f2"
            },
            caotico: {
                "--bg-color": "#1a0505",
                "--term-bg": "rgba(31, 10, 10, 0.96)",
                "--border-color": "#ff4d4d",
                "--purple": "#ff4d4d",
                "--gold": "#ffb86c",
                "--text-main": "#fff0f0"
            },
            alegre: {
                "--bg-color": "#051a0e",
                "--term-bg": "rgba(9, 31, 18, 0.96)",
                "--border-color": "#50fa7b",
                "--purple": "#50fa7b",
                "--gold": "#f1fa8c",
                "--text-main": "#f0fff4"
            },
            sabio_serio: {
                "--bg-color": "#05181c",
                "--term-bg": "rgba(8, 28, 33, 0.96)",
                "--border-color": "#8be9fd",
                "--purple": "#8be9fd",
                "--gold": "#e5c07b",
                "--text-main": "#edfbfd"
            },
            default: {
                "--bg-color": "#0c0d10",
                "--term-bg": "rgba(15, 17, 23, 0.96)",
                "--border-color": "#2e3440",
                "--purple": "#c678dd",
                "--gold": "#e5c07b",
                "--text-main": "#d8dee9"
            }
        };

        class SimsEngine {
            constructor(npcsDatabase) {
                this.npcs = npcsDatabase;
                this.initProfiles();
            }

            initProfiles() {
                for (let key in this.npcs) {
                    let baseProfile = simsProfileDB[key] || simsProfileDB._default;
                    this.npcs[key].simsData = {
                        relationship: baseProfile.relationship || 50,
                        mentalState: baseProfile.mentalState || "Estable",
                        outfit: baseProfile.outfit || "Ropa casual multiversal",
                        likes: baseProfile.likes || ["Explorar", "Charlar"],
                        dislikes: baseProfile.dislikes || ["Mala onda", "Ignorancia"]
                    };
                    this.npcs[key].affinity = this.npcs[key].simsData.relationship;
                }
            }

            updateAffection(npcKey, delta) {
                const npc = this.npcs[npcKey];
                if (!npc) return;

                let current = npc.simsData.relationship;
                current = Math.max(0, Math.min(100, current + delta));
                npc.simsData.relationship = current;

                if (current >= 85) npc.simsData.mentalState = "Enamorado / Fiel";
                else if (current >= 65) npc.simsData.mentalState = "Entusiasmado";
                else if (current >= 40) npc.simsData.mentalState = "Tranquilo";
                else if (current >= 20) npc.simsData.mentalState = "Distante / Irritado";
                else npc.simsData.mentalState = "Hostil / Deprimido";

                npc.affinity = current;
            }

            applyCharacterTheme(npcKey) {
                const npc = this.npcs[npcKey];
                if (!npc || !npc.tags) return;

                let chosenTag = "default";
                for (let tag of npc.tags) {
                    if (themePalettes[tag]) {
                        chosenTag = tag;
                        break;
                    }
                }

                const palette = themePalettes[chosenTag];
                const root = document.documentElement;

                root.style.setProperty('--bg-color', palette["--bg-color"]);
                root.style.setProperty('--term-bg', palette["--term-bg"]);
                root.style.setProperty('--border-color', palette["--border-color"]);
                root.style.setProperty('--purple', palette["--purple"]);
                root.style.setProperty('--gold', palette["--gold"]);
                root.style.setProperty('--text-main', palette["--text-main"]);
            }

            renderSimsCard(npcKey) {
                const npc = this.npcs[npcKey];
                if (!npc) return `<span class="warning">Personaje no encontrado.</span>`;

                this.applyCharacterTheme(npcKey);

                const sims = npc.simsData;
                const rel = sims.relationship;

                const barLength = 10;
                const filled = Math.round((rel / 100) * barLength);
                const empty = barLength - filled;
                const progressBar = "🟩".repeat(filled) + "⬛".repeat(empty);

                return `
                    <div style="border: 2px solid var(--border-color); padding: 12px; background: rgba(0,0,0,0.4); border-radius: 8px; margin: 10px 0;">
                        <div style="font-size:1.1rem; color:var(--purple); font-weight:bold; border-bottom:1px solid var(--border-color); padding-bottom:4px;">
                            💎 FICHA SIMS: ${npc.name.toUpperCase()}
                        </div>
                        
                        <div style="margin-top: 8px;">
                            <strong>Barra de Agrado:</strong> [${progressBar}] <strong>${rel} / 100 pts</strong>
                        </div>
                        <div><strong>Estado Mental:</strong> <span style="color:var(--gold);">${sims.mentalState}</span></div>
                        <div><strong>Ropa Actual:</strong> ${sims.outfit}</div>
                        
                        <div style="margin-top: 6px; font-size: 0.85rem;">
                            <span style="color:var(--green);">👍 Gustos:</span> ${sims.likes.join(", ")}<br>
                            <span style="color:var(--red);">👎 Disgustos:</span> ${sims.dislikes.join(", ")}
                        </div>
                    </div>
                `;
            }
        }

        const npcsDB = {};
        for (let key in rawNpcsDB) {
            let src = rawNpcsDB[key];
            npcsDB[key] = {
                name: src.name,
                title: src.tags ? src.tags.join(" • ") : "Viajero Multiversal",
                desc: src.desc,
                appearance: `${src.desc} Mantiene una postura distintiva y aura característica.`,
                affinity: 0,
                room: src.room,
                tags: src.tags || [],
                favoritePlace: src.favoritePlace || "cafe_gourmet",
                responses: {
                    hablar: {
                        low: `"${src.dialogue}"`,
                        high: `"${src.dialogue} (Te mira con profunda confianza e interés acumulado)"`
                    },
                    coquetear: {
                        low: `"${src.name} sonríe algo sorprendido por tus palabras directas."`,
                        high: `"${src.name} se sonroja notablemente y te devuelve un guiño cómplice."`
                    },
                    besar: {
                        low: `"${src.name} da un paso atrás algo ruborizado: 'Aún no nos conocemos lo suficiente...'."`,
                        high: `"${src.name} te corresponde el beso calurosamente con una sonrisa radiante."`
                    },
                    abrazar: {
                        low: `"${src.name} acepta el abrazo con cordialidad y un gesto amable."`,
                        high: `"${src.name} te rodea con fuerza reconociendo el gran vínculo que los une."`
                    },
                    masaje: {
                        low: `"${src.name} se pone algo rígido: 'Che, recién nos conocemos, aflojá un poco'."`,
                        high: `"${src.name} deja caer los hombros, suspira de alivio y se entrega por completo al masaje relajante."`
                    },
                    acariciar_cabello: {
                        low: `"${src.name} se aparta suavemente con una risita nerviosa."`,
                        high: `"${src.name} cierra los ojos, inclinando la cabeza hacia tu mano para disfrutar la caricia."`
                    },
                    acariciar: {
                        low: `"${src.name} se acomoda la ropa, algo confundido por el gesto tan cercano."`,
                        high: `"${src.name} busca tu contacto y te sostiene la mirada con calidez."`
                    },
                    halagar: {
                        low: `"${src.name} te da las gracias con una sonrisa modesta."`,
                        high: `"${src.name} se ilumina por completo: 'Nadie me había dicho algo tan sincero en mucho tiempo'."`
                    },
                    poesia: {
                        low: `"${src.name} escucha con atención pero se ríe un poco de lo dramático del verso."`,
                        high: `"${src.name} queda cautivado por tus versos, escuchando cada palabra con verdadera devoción."`
                    },
                    carta_amor: {
                        low: `"${src.name} recibe el papel sorprendido: 'Esto es muy lindo, pero vamos despacio...'."`,
                        high: `"${src.name} guarda la carta cerca de su pecho con una sonrisa imborrable."`
                    },
                    romantico: {
                        low: `"${src.name} nota la atmósfera especial pero intenta cambiar de tema de forma tímida."`,
                        high: `"${src.name} aprovecha el ambiente romántico para dar un paso más cerca tuyo."`
                    },
                    bailar: {
                        low: `"${src.name} se tropieza un poco: 'No soy muy bueno en la pista, pero hago el intento'."`,
                        high: `"${src.name} te toma de la cintura y se mueve con vos al ritmo de la música con total fluidez."`
                    },
                    jugar: {
                        low: `"${src.name} acepta el juego de buena gana para pasar el rato."`,
                        high: `"${src.name} se divierte como nunca, riendo a carcajadas con vos."`
                    },
                    juguetear: {
                        low: `"${src.name} te da un empujoncito juguetón en el hombro."`,
                        high: `"${src.name} te sigue el juego con picardía y un toque de complicidad."`
                    },
                    tomar_mano: {
                        low: `"${src.name} mira sus manos entrelazadas con sorpresa antes de soltarse despacio."`,
                        high: `"${src.name} entrelaza sus dedos con los tuyos firmemente y no te suelta."`
                    }
                }
            };
        }

        const simsEngine = new SimsEngine(npcsDB);

        const roomsDB = {
            salon_central: {
                name: "Gran Salón Nexus Multiversal",
                desc: "Un punto neutro colosal de neón y mármol. Desde acá salen todos los portales hacia las distintas dimensiones y universos.",
                exits: { norte: "universo_dc", sur: "universo_sega_sonic", este: "universo_hazbin_helluva", oeste: "universo_capcom_resident", arriba: "universo_dragon_ball", abajo: "universo_arcade_retro" },
                npcs: ["kaito", "doomentio", "grant", "pepsiman"],
                items: ["pepsi", "pizzatactica"]
            },
            universo_dc: {
                name: "Universo DC: Ciudad Gótica y Metrópolis",
                desc: "Calles oscuras custodiadas por vigilantes nocturnos, con el imponente cielo de Metrópolis recortándose a lo lejos.",
                exits: { sur: "salon_central" },
                npcs: ["batman", "superman", "dick_grayson", "tim_drake", "damian_wayne", "thomas_wayne", "conner_kent", "bart_allen", "beast_boy", "blue_beetle"],
                items: ["batarang", "cafe", "chamarra_cuero", "barra_energia", "tofu_vegano", "escarabajo_alienigena"]
            },
            universo_dragon_ball: {
                name: "Universo Dragon Ball: Tierra y Templo Sagrado",
                desc: "Llanuras montañosas verdes con islas flotantes y una energía espiritual abrumadora en el ambiente.",
                exits: { abajo: "salon_central", este: "universo_shonen_jump" },
                npcs: ["gohan_adulto", "gohan_nino", "trunks_nino", "trunks_futuro", "android_17", "kaio_shin"],
                items: ["semilla_del_hermitano"]
            },
            universo_shonen_jump: {
                name: "Universo Anime: Valle Shōnen",
                desc: "Un paisaje épico donde se cruzan villas ninja, gremios de magos y escuelas de héroes.",
                exits: { oeste: "universo_dragon_ball", sur: "universo_anime_variado" },
                npcs: ["naruto_uzumaki", "natsu_dragneel", "midoriya_izuku", "shinra_kusakabe"],
                items: ["ramen_naruto"]
            },
            universo_anime_variado: {
                name: "Universo Anime: Distrito Isekai y Fantasía",
                desc: "Un cruce urbano y fantástico donde la magia moderna y el combate de espadas chocan.",
                exits: { norte: "universo_shonen_jump" },
                npcs: ["shirou_emiya", "kirito_kazuto", "kamijou_touma", "senpai"],
                items: ["manga"]
            },
            universo_hazbin_helluva: {
                name: "Universo Hellverse: Inframundo & Hazbin Hotel",
                desc: "Un ambiente elegante victoriano bañado en tonos carmesí, luces de neón rojo y elegancia macabra.",
                exits: { oeste: "salon_central" },
                npcs: ["blitzo", "stolas", "alastor", "lucifer"],
                items: ["rosas", "pato", "contrato", "armapositron"]
            },
            universo_sega_sonic: {
                name: "Universo SEGA: Green Hill & Space Colony",
                desc: "Colinas verdes con bucles de velocidad que se entrelazan con estaciones espaciales de alta tecnología.",
                exits: { norte: "salon_central" },
                npcs: ["sonic", "shadow", "zazz"],
                items: ["esmeralda", "hotdog"]
            },
            universo_capcom_resident: {
                name: "Universo Capcom: Raccoon City & R.P.D.",
                desc: "Pasillos oscuros en ruinas, cintas de precaución y una atmósfera constante de supervivencia zombie.",
                exits: { este: "salon_central", sur: "universo_darkstalkers" },
                npcs: ["leon_kennedy_re2", "leon_kennedy_re4", "chris_redfield", "mega_man"],
                items: ["hierba_verde"]
            },
            universo_darkstalkers: {
                name: "Universo Darkstalkers & Fighting",
                desc: "Escenarios oscuros iluminados por la luna llena donde luchadores sobrenaturales miden sus fuerzas.",
                exits: { norte: "universo_capcom_resident" },
                npcs: ["jontalbain", "mukai"],
                items: ["hueso"]
            },
            universo_nintendo: {
                name: "Universo Nintendo: Reino Champiñón y Cielos",
                desc: "Plataformas de colores, cielos dorados celestiales y templos grecorromanos flotantes.",
                exits: { arriba: "universo_arcade_retro" },
                npcs: ["waluigi", "pit_kid_icarus", "dark_pit", "link_zelda"],
                items: ["berenjena", "pluma_arco", "escudo_hyliano"]
            },
            universo_gaming_rpg: {
                name: "Universo Gaming RPG & Aventura",
                desc: "Ruinas místicas, espadas legendarias y mundos al borde de la destrucción reuniéndose en un solo punto.",
                exits: { oeste: "universo_arcade_retro" },
                npcs: ["cloud", "sora", "crash"],
                items: ["espadabuster", "bateriacristal", "llave_espada_replica"]
            },
            universo_arcade_retro: {
                name: "Sector Arcade & Zona Secreta",
                desc: "Pantallas CRT rugiendo con luces púrpura y una bóveda tecnológica escondida en el piso inferior.",
                exits: { arriba: "salon_central", abajo: "universo_nintendo", este: "universo_gaming_rpg" },
                npcs: [],
                items: ["bateriacronos"]
            }
        };

        const gameState = {
            currentRoom: "salon_central",
            inventory: [],
            turns: 0
        };

        const terminalBody = document.getElementById('terminal-body');
        const cmdInput = document.getElementById('cmd-input');

        function printLog(content, type = '') {
            const entry = document.createElement('div');
            entry.className = `log-entry ${type}`;
            entry.innerHTML = content;
            terminalBody.appendChild(entry);
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }

        function renderTagsHTML(tagsArray) {
            if (!tagsArray || !Array.isArray(tagsArray) || tagsArray.length === 0) return '';
            let chips = tagsArray.map(tag => {
                let cleanTag = tag.toLowerCase().trim().replace(/[\s-]+/g, '_');
                return `<span class="tag-chip tag-${cleanTag}">#${tag}</span>`;
            });
            return `<div class="tag-container">${chips.join('')}</div>`;
        }

        function updateStats() {
            document.getElementById('stat-turnos').textContent = gameState.turns;
            let sum = 0;
            let count = 0;
            for (let k in npcsDB) {
                sum += npcsDB[k].affinity;
                count++;
            }
            let avg = count > 0 ? Math.min(100, Math.round(sum / count)) : 0;
            document.getElementById('stat-afecto').textContent = `${avg}%`;
        }

        function renderRoom() {
            const room = roomsDB[gameState.currentRoom];
            let html = `<div class="room-title">📍 ${room.name}</div>`;
            html += `<p>${room.desc}</p>`;

            if (room.npcs.length > 0) {
                html += `<p style="margin-top:8px;"><strong>Personajes presentes:</strong></p>`;
                room.npcs.forEach(key => {
                    const npc = npcsDB[key];
                    if (npc) {
                        let tagsHTML = renderTagsHTML(npc.tags);
                        let favPlaceName = citasDB.lugares[npc.favoritePlace] ? citasDB.lugares[npc.favoritePlace].name : npc.favoritePlace;
                        html += `<div style="margin-left: 10px; margin-bottom:4px;">• <span class="npc-name">${npc.name}</span> [Afecto: ${npc.affinity} pts] ${tagsHTML}<br><small style="color:var(--text-muted); margin-left:12px;">Lugar Favorito: <span style="color:var(--gold);">${favPlaceName}</span> | ${npc.desc}</small></div>`;
                    }
                });
            } else {
                html += `<p style="margin-top:8px;" class="system-msg">No hay nadie en esta zona en este momento.</p>`;
            }

            if (room.items.length > 0) {
                html += `<p style="margin-top:8px;"><strong>Objetos en el suelo:</strong> `;
                let itemSpans = room.items.map(k => `<span class="item-name">${itemsDB[k] ? itemsDB[k].name : k}</span> [id: <span class="highlight">${k}</span>]`);
                html += itemSpans.join(', ') + `</p>`;
            }

            let exitKeys = Object.keys(room.exits).map(e => `<span class="highlight">${e.toUpperCase()}</span>`).join(' | ');
            html += `<p style="margin-top:8px; font-size:0.85rem;"><small>Salidas de navegación: [ ${exitKeys} ]</small></p>`;

            printLog(html);
        }

        const baseCommands = [
            "mirar", "ir norte", "ir sur", "ir este", "ir oeste", "ir arriba", "ir abajo",
            "interacciones", "cosas", "inventario", "ayuda", "clear",
            "apariencia", "hablar", "coquetear", "besar", "abrazar", "masaje", "acariciar_cabello", 
            "acariciar", "halagar", "poesia", "carta_amor", "romantico", "bailar", "jugar", "juguetear", 
            "tomar_mano", "desafiar", "cita", "invitar", "lugares_cita", "sims", "enfocar", 
            "savegame slot1", "loadgame slot1"
        ];

        function handleTabAutocomplete(inputElem) {
            const current = inputElem.value.toLowerCase().trim();
            if (!current) return;

            let dict = [...baseCommands];
            for (let k in npcsDB) {
                dict.push(`hablar ${k}`);
                dict.push(`apariencia ${k}`);
                dict.push(`sims ${k}`);
                dict.push(`coquetear ${k}`);
                dict.push(`besar ${k}`);
                dict.push(`abrazar ${k}`);
                dict.push(`masaje ${k}`);
                dict.push(`acariciar_cabello ${k}`);
                dict.push(`acariciar ${k}`);
                dict.push(`halagar ${k}`);
                dict.push(`poesia ${k}`);
                dict.push(`carta_amor ${k}`);
                dict.push(`romantico ${k}`);
                dict.push(`bailar ${k}`);
                dict.push(`jugar ${k}`);
                dict.push(`juguetear ${k}`);
                dict.push(`tomar_mano ${k}`);
                dict.push(`desafiar ${k}`);
                for (let l in citasDB.lugares) {
                    dict.push(`cita ${k} ${l}`);
                }
            }
            for (let i in itemsDB) {
                dict.push(`tomar ${i}`);
            }

            const matches = dict.filter(item => item.startsWith(current));

            if (matches.length === 1) {
                inputElem.value = matches[0] + " ";
                sfx.playCmdSuccess();
            } else if (matches.length > 1) {
                printLog(`<div class="autocomplete-hint">Coincidencias: [ ${matches.slice(0, 10).join(' | ')} ]</div>`);
                sfx.playKeyPress();
            }
        }

        function handleSaveGame(slot = 'slot1') {
            const slotKey = `zork_save_${slot}`;
            const saveData = {
                gameState: gameState,
                npcsDB: npcsDB,
                roomsDB: roomsDB,
                timestamp: new Date().toLocaleString()
            };

            localStorage.setItem(slotKey, JSON.stringify(saveData));
            sfx.playCmdSuccess();
            printLog(`<div class="system-toast">💾 Partida guardada en [${slotKey.toUpperCase()}] (${saveData.timestamp}).</div>`);
        }

        function handleLoadGame(slot = 'slot1') {
            const slotKey = `zork_save_${slot}`;
            const raw = localStorage.getItem(slotKey);

            if (!raw) {
                printLog(`No existe ninguna partida guardada en el slot: "<strong>${slotKey}</strong>".`, 'warning');
                return;
            }

            try {
                const data = JSON.parse(raw);
                Object.assign(gameState, data.gameState);
                Object.assign(npcsDB, data.npcsDB);
                Object.assign(roomsDB, data.roomsDB);

                updateStats();
                sfx.playAffectionUp();
                printLog(`<div class="system-toast">⚡ Partida cargada exitosamente desde [${slotKey.toUpperCase()}].</div>`);
                renderRoom();
                drawMapHUD();
            } catch (e) {
                printLog(`Error al cargar datos del slot ${slotKey}.`, 'warning');
            }
        }

        function drawMapHUD() {
            const canvas = document.getElementById('map-canvas');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = '#08090c';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const mapCoords = {
                universo_dc: { x: 140, y: 15 },
                universo_dragon_ball: { x: 180, y: 15 },
                universo_shonen_jump: { x: 220, y: 15 },
                universo_anime_variado: { x: 220, y: 45 },
                salon_central: { x: 140, y: 45 },
                universo_capcom_resident: { x: 80, y: 45 },
                universo_darkstalkers: { x: 80, y: 75 },
                universo_hazbin_helluva: { x: 200, y: 45 },
                universo_sega_sonic: { x: 140, y: 75 },
                universo_arcade_retro: { x: 50, y: 45 },
                universo_nintendo: { x: 20, y: 45 },
                universo_gaming_rpg: { x: 50, y: 75 }
            };

            ctx.strokeStyle = '#282c34';
            ctx.lineWidth = 1.5;

            ctx.beginPath();
            ctx.moveTo(mapCoords.salon_central.x, mapCoords.salon_central.y);
            ctx.lineTo(mapCoords.universo_dc.x, mapCoords.universo_dc.y);
            ctx.moveTo(mapCoords.salon_central.x, mapCoords.salon_central.y);
            ctx.lineTo(mapCoords.universo_sega_sonic.x, mapCoords.universo_sega_sonic.y);
            ctx.moveTo(mapCoords.salon_central.x, mapCoords.salon_central.y);
            ctx.lineTo(mapCoords.universo_hazbin_helluva.x, mapCoords.universo_hazbin_helluva.y);
            ctx.moveTo(mapCoords.salon_central.x, mapCoords.salon_central.y);
            ctx.lineTo(mapCoords.universo_capcom_resident.x, mapCoords.universo_capcom_resident.y);
            ctx.stroke();

            for (let rKey in mapCoords) {
                const pos = mapCoords[rKey];
                const isCurrent = (rKey === gameState.currentRoom);

                ctx.beginPath();
                ctx.arc(pos.x, pos.y, isCurrent ? 6 : 3, 0, Math.PI * 2);

                if (isCurrent) {
                    ctx.fillStyle = '#98c379';
                    ctx.shadowColor = '#98c379';
                    ctx.shadowBlur = 8;
                } else {
                    ctx.fillStyle = '#3b4252';
                    ctx.shadowBlur = 0;
                }

                ctx.fill();
                ctx.closePath();
            }
        }

        function handleDuel(targetName) {
            const foundKey = findNPCInRoom(targetName);
            if (!foundKey) {
                printLog(`No encuentras a "<strong>${targetName}</strong>" aquí para un desafío.`, 'warning');
                return;
            }

            const npc = npcsDB[foundKey];
            sfx.playCombatHit();

            printLog(`
                <div style="border: 1px solid var(--red); padding: 10px; background: rgba(224,108,117,0.08); border-radius: 6px;">
                    <div style="color:var(--red); font-weight:bold;">⚔️ DESAFÍO TÁCTICO DE TEXTO ASCII — VS ${npc.name.toUpperCase()}</div>
                    <pre style="color:var(--gold); font-size:0.75rem; margin:6px 0;">
  /\_/\  
 ( o.o )  [SISTEMA DE COMBATE CHIPTUNE ACTIVO]
  > ^ <   ${npc.name} acepta el combate amigable.
                    </pre>
                    <p>Intercambian ráfagas de energía y movimientos gimnásticos en la sala. ¡Tras un duelo espectacular, quedas en empate técnico!</p>
                    <p class="system-msg">Afecto de valentía aumentado en +15 puntos con ${npc.name}.</p>
                </div>
            `);

            simsEngine.updateAffection(foundKey, 15);
            updateStats();
        }

        function findNPCInRoom(targetName) {
            if (!targetName) return null;
            const room = roomsDB[gameState.currentRoom];
            return room.npcs.find(key => {
                const npc = npcsDB[key];
                return key.toLowerCase() === targetName.toLowerCase() || (npc && npc.name.toLowerCase().includes(targetName.toLowerCase()));
            });
        }

        function handleCita(targetName, lugarKey) {
            if (!targetName) {
                printLog('Sintaxis: <span class="highlight">cita [personaje] [lugar]</span> (Ej: <code>cita blitzo club_gay_striptease</code>)', 'warning');
                return;
            }

            const foundKey = findNPCInRoom(targetName);
            if (!foundKey) {
                printLog(`No ves a "<strong>${targetName}</strong>" en este sector para invitarlo a salir.`, 'warning');
                return;
            }

            const npc = npcsDB[foundKey];
            
            if (!lugarKey) {
                printLog(`¿A dónde quieres llevar a ${npc.name}? Usa <span class="highlight">lugares_cita</span> para ver la lista completa.`, 'warning');
                return;
            }

            let cleanLugarKey = lugarKey.toLowerCase().trim();
            const lugar = citasDB.lugares[cleanLugarKey];

            if (!lugar) {
                printLog(`El lugar "<strong>${lugarKey}</strong>" no existe. Usa <span class="highlight">lugares_cita</span> para ver la lista de claves.`, 'warning');
                return;
            }

            if (npc.affinity < lugar.reqAffinity) {
                printLog(`
                    <div class="speech-bubble">
                        "${npc.name} vacila un momento: 'Aún no tenemos la confianza suficiente para ir a ${lugar.name}... Necesitamos al menos ${lugar.reqAffinity} puntos de afecto (Afecto actual: ${npc.affinity} pts)'"
                    </div>
                `, 'warning');
                return;
            }

            let bonus = 0;
            let isFavorite = (npc.favoritePlace === cleanLugarKey);
            if (isFavorite) {
                bonus = 20;
            }

            let totalBoost = lugar.boost + bonus;
            simsEngine.updateAffection(foundKey, totalBoost);
            updateStats();
            sfx.playAffectionUp();

            let reactionText = "";
            if (isFavorite) {
                reactionText = `¡${npc.name} SE EMOCIONA ENORMEMENTE! Este es su lugar preferido de todo el multiverso. ¡Obtienes un super bonus de +${bonus} puntos de afecto adicionales!`;
            } else if (npc.tags.includes("edgy") && (cleanLugarKey === "bar_subterraneo" || cleanLugarKey === "azotea_gothica")) {
                reactionText = `${npc.name} observa la atmósfera sombría con satisfacción: 'Nada mal... un lugar decente para mantenerse alejado de la chusma.'`;
            } else if (npc.tags.includes("alegre") && (cleanLugarKey === "parque_atracciones" || cleanLugarKey === "piscina_termal")) {
                reactionText = `${npc.name} salta de entusiasmo y disfruta cada segundo del viaje al máximo.`;
            } else if (npc.tags.includes("caotico") && (cleanLugarKey === "club_gay_striptease" || cleanLugarKey === "concierto_rock")) {
                reactionText = `${npc.name} desata el caos y ríe a carcajadas contagiándote su energía salvaje.`;
            } else {
                reactionText = `${npc.name} disfruta enormemente del ambiente relajado y conversan plácidamente durante horas.`;
            }

            printLog(`
                <div style="border: 1px solid var(--purple); padding: 12px; background: rgba(198,120,221,0.12); border-radius: 8px; margin: 8px 0;">
                    <div style="color:var(--purple); font-weight:bold; font-size:1.05rem;">🌹 CITA EXITOSA EN: ${lugar.name.toUpperCase()}</div>
                    <p style="margin-top:6px; font-size:0.85rem; color:var(--text-muted);">${lugar.desc}</p>
                    <p style="margin-top:8px;">Has llevado a <span class="npc-name">${npc.name}</span> de cita. ${reactionText}</p>
                    <div class="speech-bubble" style="margin-top:8px;">
                        "${npc.name}: 'La pasé genial con vos hoy. Definitivamente tenemos que repetir este momento.'"
                    </div>
                    <p class="system-msg" style="margin-top:6px;">✨ ¡Afecto ganado: +${totalBoost} puntos! (Afecto total: ${npc.affinity} pts)</p>
                </div>
            `);
        }

        function handleListCitas() {
            let html = `
                <p><strong>🌹 CATÁLOGO DE LUGARES PARA CITAS (${Object.keys(citasDB.lugares).length} ESTABLECIMIENTOS):</strong></p>
                <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:8px;">Sintaxis: <code>cita [personaje] [clave_lugar]</code> (Ej: <code>cita batman azotea_gothica</code>)</p>
                <div style="max-height:300px; overflow-y:auto; border:1px solid #282c34; border-radius:4px;">
                <table class="cmd-table">
                    <tr><th>Clave</th><th>Nombre del Lugar</th><th>Categoría</th><th>Req. Afecto</th><th>Afecto Base</th></tr>
            `;

            for (let key in citasDB.lugares) {
                let lug = citasDB.lugares[key];
                html += `<tr><td><code>${key}</code></td><td>${lug.name}</td><td>${lug.category}</td><td>${lug.reqAffinity} pts</td><td>+${lug.boost}</td></tr>`;
            }

            html += `</table></div>`;
            printLog(html);
        }

const comandosSociales = [
    "hablar", "conversar", "besar", "coquetear", "seducir", "abrazar",
    "masaje", "masajear", "acariciar_cabello", "cabello", "acariciar", 
    "halagar", "elogiar", "poesia", "poema", "carta_amor", "carta", 
    "romantico", "bailar", "jugar", "juguetear", "tomar_mano", "mano"
];

const interaccionesPicantes = [
    "sexo", "69", "footjob", "anilingus", "masturbar",
    "dedear", "bombear_pechos", "ordeñar", "striptease", "nalgear"
];

function parseCommand(raw) {
    const input = raw.trim();
    if (!input) return;

    gameState.turns++;
    updateStats();

    printLog(`<div class="cmd-echo"><span style="color:var(--green)">player@zork-palace</span>:<span style="color:var(--gold)">~/nexus</span>$ ${escapeHTML(input)}</div>`);

    const lower = input.toLowerCase();
    const tokens = lower.split(' ').filter(t => t !== '');
    const verb = tokens[0];

    if (verb === "savegame") {
        handleSaveGame(tokens[1]);
    } else if (verb === "loadgame") {
        handleLoadGame(tokens[1]);
    } else if (["ir", "norte", "sur", "este", "oeste", "arriba", "abajo"].includes(verb)) {
        let dir = verb === "ir" ? tokens[1] : verb;
        handleMove(dir);
    } else if (["mirar", "look", "ver"].includes(verb)) {
        renderRoom();
    } else if (verb === "apariencia") {
        handleAppearance(tokens.slice(1).join(' '));
    } else if (verb === "sims" || verb === "enfocar") {
        let target = tokens.slice(1).join(' ');
        let foundKey = findNPCInRoom(target);
        if (foundKey) {
            printLog(simsEngine.renderSimsCard(foundKey));
        } else {
            printLog(`No encuentras a "<strong>${target}</strong>" cerca para ver sus métricas Sims.`, 'warning');
        }
    } else if (verb === "interacciones") {
        handleInteractionsList();
    } else if (["lugares_cita", "citas_lista"].includes(verb)) {
        handleListCitas();
    } else if (["cita", "invitar"].includes(verb)) {
        let target = tokens[1];
        let lugar = tokens[2];
        handleCita(target, lugar);
    } else if (verb === "regalar") {
        handleGive(lower);
    } else if (["cosas", "inventario", "inv"].includes(verb)) {
        handleInventory();
    } else if (verb === "desafiar") {
        handleDuel(tokens.slice(1).join(' '));
        
    // ACÁ REEMPLAZAMOS EL BLOQUE DURO POR LOS ARRAYS DINÁMICOS
    } else if (comandosSociales.includes(verb) || interaccionesPicantes.includes(verb)) {
        let target = tokens.slice(1).join(' ');
        let act = verb;

        // Mantenemos tu mapeo de alias para que lo viejo no se rompa
        if (verb === "conversar") act = "hablar";
        if (verb === "seducir") act = "coquetear";
        if (verb === "masajear") act = "masaje";
        if (verb === "cabello") act = "acariciar_cabello";
        if (verb === "elogiar") act = "halagar";
        if (verb === "poema") act = "poesia";
        if (verb === "carta") act = "carta_amor";
        if (verb === "mano") act = "tomar_mano";

        handleNPCAction(target, act);
        
    } else if (["tomar", "agarrar", "coger", "get"].includes(verb)) {
        handleTakeItem(tokens.slice(1).join(' '));
    } else if (["ayuda", "help"].includes(verb)) {
        handleHelp();
    } else if (["clear", "limpiar"].includes(verb)) {
        terminalBody.innerHTML = '';
    } else {
        printLog(`bash: comando no encontrado: "${verb}". Escribe <span class="highlight">ayuda</span> para la lista.`, 'warning');
    }

    // El HUD que agregaste al final
    drawMapHUD();
}

        function handleMove(direction) {
            const room = roomsDB[gameState.currentRoom];
            if (!direction || !room.exits[direction]) {
                printLog(`No hay salida hacia "<strong>${direction || ''}</strong>".`, 'warning');
                return;
            }

            gameState.currentRoom = room.exits[direction];
            sfx.playCmdSuccess();
            printLog(`<span class="system-msg">Te has movido hacia el ${direction.toUpperCase()}...</span>`);
            renderRoom();
        }

        function handleAppearance(targetName) {
            if (!targetName) {
                printLog('Especifica un personaje. Ej: <span class="highlight">apariencia sonic</span>', 'warning');
                return;
            }

            let foundKey = findNPCInRoom(targetName);
            if (!foundKey) {
                for (let k in npcsDB) {
                    if (k.includes(targetName.toLowerCase()) || npcsDB[k].name.toLowerCase().includes(targetName.toLowerCase())) {
                        foundKey = k;
                        break;
                    }
                }
            }

            if (!foundKey) {
                printLog(`No se encontraron datos para "${targetName}".`, 'warning');
                return;
            }

            const npc = npcsDB[foundKey];
            let tagsHTML = renderTagsHTML(npc.tags);
            let favPlaceName = citasDB.lugares[npc.favoritePlace] ? citasDB.lugares[npc.favoritePlace].name : npc.favoritePlace;

            printLog(`
                <div style="border: 1px solid #3b4252; padding: 10px; background: rgba(33,37,43,0.5); border-radius: 6px;">
                    <div class="npc-name" style="font-size:1.05rem;">👤 ${npc.name} — ${npc.title}</div>
                    <div style="margin-top: 4px;">Etiquetas: ${tagsHTML}</div>
                    <div style="margin-top: 6px;"><strong>Detalle Visual:</strong> ${npc.appearance}</div>
                    <div style="margin-top: 4px; color:var(--gold);"><strong>Lugar Favorito para Citas:</strong> ${favPlaceName} (Clave: <code>${npc.favoritePlace}</code>)</div>
                    <div style="margin-top: 4px; font-size: 0.85rem;" class="system-msg">Nivel de Afecto Acumulado: ${npc.affinity} pts</div>
                </div>
            `);
        }

        function handleNPCAction(targetName, action) {
            if (!targetName) {
                printLog(`¿A quién quieres ${action}? Ej: <span class="highlight">${action} blitzo</span>`, 'warning');
                return;
            }

            const foundKey = findNPCInRoom(targetName);
            if (!foundKey) {
                printLog(`No ves a "<strong>${targetName}</strong>" en esta área.`, 'warning');
                return;
            }

            const npc = npcsDB[foundKey];
            simsEngine.updateAffection(foundKey, 10);
            updateStats();
            sfx.playAffectionUp();

            let resp = npc.responses[action];
            if (typeof resp === 'object') {
                resp = (npc.affinity >= 30) ? resp.high : resp.low;
            } else if (!resp) {
                resp = `"${npc.name} reacciona de forma atenta a tu acción."`;
            }

            printLog(`
                <p>Te acercas a <span class="npc-name">${npc.name}</span> para <strong>${action.replace('_', ' ')}</strong>:</p>
                <div class="speech-bubble">${resp}</div>
            `);
        }

        function handleGive(fullInput) {
            const clean = fullInput.replace('regalar ', '');
            const parts = clean.split(' a ');

            if (parts.length < 2) {
                printLog('Usa: <span class="highlight">regalar [objeto] a [personaje]</span> (Ej: <code>regalar esmeralda a sonic</code>)', 'warning');
                return;
            }

            const itemQuery = parts[0].trim();
            const npcQuery = parts[1].trim();

            const itemKey = gameState.inventory.find(k => k.toLowerCase() === itemQuery.toLowerCase() || (itemsDB[k] && itemsDB[k].name.toLowerCase().includes(itemQuery.toLowerCase())));
            if (!itemKey) {
                printLog(`No tienes "<strong>${itemQuery}</strong>" en tu inventario.`, 'warning');
                return;
            }

            const npcKey = findNPCInRoom(npcQuery);
            if (!npcKey) {
                printLog(`No se encuentra "<strong>${npcQuery}</strong>" aquí.`, 'warning');
                return;
            }

            const npc = npcsDB[npcKey];
            const item = itemsDB[itemKey];

            gameState.inventory = gameState.inventory.filter(k => k !== itemKey);

            let boost = 20;
            if (item.giveEffect && item.giveEffect[npcKey]) {
                boost = item.giveEffect[npcKey];
            }

            simsEngine.updateAffection(npcKey, boost);
            updateStats();
            sfx.playAffectionUp();

            printLog(`
                <p>Le entregas <span class="item-name">${item.name}</span> a <span class="npc-name">${npc.name}</span>.</p>
                <div class="speech-bubble">
                    "${npc.name} recibe el regalo con gran entusiasmo. ¡Afecto aumentado en +${boost} puntos!"
                </div>
            `);
        }

        function handleTakeItem(itemQuery) {
            if (!itemQuery) {
                printLog('¿Qué objeto deseas tomar? Ej: <span class="highlight">tomar pepsi</span>', 'warning');
                return;
            }

            const room = roomsDB[gameState.currentRoom];
            const itemKey = room.items.find(k => k.toLowerCase() === itemQuery.toLowerCase() || (itemsDB[k] && itemsDB[k].name.toLowerCase().includes(itemQuery.toLowerCase())));

            if (!itemKey) {
                printLog(`No hay ningún objeto llamado "<strong>${itemQuery}</strong>" aquí.`, 'warning');
                return;
            }

            room.items = room.items.filter(k => k !== itemKey);
            gameState.inventory.push(itemKey);
            sfx.playCmdSuccess();

            printLog(`Guardado en inventario: <span class="item-name">${itemsDB[itemKey] ? itemsDB[itemKey].name : itemKey}</span>.`);
        }

        function handleInventory() {
            if (gameState.inventory.length === 0) {
                printLog('<p class="system-msg">Tu inventario de cosas está totalmente vacío por ahora.</p>');
                return;
            }

            let html = '<p><strong>🎒 Inventario de Cosas y Regalos:</strong></p><ul style="margin-left:20px;">';
            gameState.inventory.forEach(k => {
                const item = itemsDB[k] || { name: k, desc: "Objeto misterioso" };
                html += `<li><span class="item-name">${item.name}</span> [id: <code>${k}</code>] — ${item.desc}</li>`;
            });
            html += '</ul>';
            printLog(html);
        }

        function handleInteractionsList() {
            let html = `
                <p><strong>📜 Menú Completo de Interacciones Disponibles:</strong></p>
                <div style="max-height:300px; overflow-y:auto; border:1px solid #282c34; border-radius:4px;">
                <table class="cmd-table">
                    <tr><th>Comando / Alias</th><th>Ejemplo</th><th>Efecto</th></tr>
                    <tr><td><code>sims</code> / <code>enfocar</code></td><td><code>sims batman</code></td><td>Ficha estilo Los Sims.</td></tr>
                    <tr><td><code>hablar</code> / <code>conversar</code></td><td><code>hablar stolas</code></td><td>Charla básica.</td></tr>
                    <tr><td><code>coquetear</code> / <code>seducir</code></td><td><code>coquetear cloud</code></td><td>Coqueteo directo.</td></tr>
                    <tr><td><code>halagar</code> / <code>elogiar</code></td><td><code>halagar sonic</code></td><td>Expresa admiración sincera.</td></tr>
                    <tr><td><code>poesia</code> / <code>poema</code></td><td><code>poesia kaito</code></td><td>Recita un poema romántico.</td></tr>
                    <tr><td><code>carta_amor</code> / <code>carta</code></td><td><code>carta blitzo</code></td><td>Escribe una carta emotiva.</td></tr>
                    <tr><td><code>romantico</code></td><td><code>romantico stolas</code></td><td>Abre un ambiente íntimo.</td></tr>
                    <tr><td><code>masaje</code> / <code>masajear</code></td><td><code>masaje leon_kennedy_re4</code></td><td>Masaje descontracturante.</td></tr>
                    <tr><td><code>acariciar_cabello</code></td><td><code>acariciar_cabello cloud</code></td><td>Pasa los dedos por su pelo.</td></tr>
                    <tr><td><code>acariciar</code></td><td><code>acariciar superman</code></td><td>Caricia suave.</td></tr>
                    <tr><td><code>tomar_mano</code> / <code>mano</code></td><td><code>tomar_mano sora</code></td><td>Entrelaza tus dedos con los suyos.</td></tr>
                    <tr><td><code>abrazar</code></td><td><code>abrazar crash</code></td><td>Abrazo reconfortante.</td></tr>
                    <tr><td><code>besar</code></td><td><code>besar alastor</code></td><td>Beso directo.</td></tr>
                    <tr><td><code>bailar</code></td><td><code>bailar pepsiman</code></td><td>Sacan sus mejores pasos.</td></tr>
                    <tr><td><code>jugar</code></td><td><code>jugar bart_allen</code></td><td>Juego divertido.</td></tr>
                    <tr><td><code>juguetear</code></td><td><code>juguetear beast_boy</code></td><td>Broma y juego liviano.</td></tr>
                    <tr><td><code>cita</code></td><td><code>cita blitzo club_gay_striptease</code></td><td>Salida privada a un lugar.</td></tr>
                    <tr><td><code>desafiar</code></td><td><code>desafiar shadow</code></td><td>Duelo de práctica ASCII.</td></tr>
                    <tr><td><code>regalar</code></td><td><code>regalar pato a lucifer</code></td><td>Entrega de obsequios.</td></tr>
                </table>
                </div>
            `;
            printLog(html);
        }

        function handleHelp() {
            let html = `
                <p><strong>🖥️ SISTEMA ZORK LINUX TERMINAL - COMANDOS PRINCIPALES:</strong></p>
                <table class="cmd-table">
                    <tr><th>Comando</th><th>Descripción</th></tr>
                    <tr><td><code>mirar</code></td><td>Inspecciona la sala actual, personajes u objetos.</td></tr>
                    <tr><td><code>sims [personaje]</code></td><td>Muestra la ficha tipo Los Sims con sus gustos y ropa.</td></tr>
                    <tr><td><code>ir [norte/sur/este/oeste/arriba/abajo]</code></td><td>Te desplazas entre los sectores del multiverso.</td></tr>
                    <tr><td><code>cita [personaje] [lugar]</code></td><td>Llevas a un personaje a una cita personalizada.</td></tr>
                    <tr><td><code>lugares_cita</code></td><td>Muestra todos los lugares disponibles para salir.</td></tr>
                    <tr><td><code>interacciones</code></td><td>Muestra la lista completa de acciones sociales.</td></tr>
                    <tr><td><code>savegame [slot]</code> / <code>loadgame [slot]</code></td><td>Guarda o carga la partida localmente.</td></tr>
                    <tr><td><code>apariencia [nombre]</code></td><td>Muestra la estética y el lugar favorito del personaje.</td></tr>
                    <tr><td><code>regalar [objeto] a [nombre]</code></td><td>Obsequia un ítem para elevar el afecto.</td></tr>
                    <tr><td><code>cosas</code> / <code>inventario</code></td><td>Muestra tus pertenencias.</td></tr>
                    <tr><td><code>tomar [objeto]</code></td><td>Recoge un objeto del suelo.</td></tr>
                </table>
            `;
            printLog(html);
        }

        function escapeHTML(str) {
            return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }

        function execQuick(cmd) {
            cmdInput.value = cmd;
            parseCommand(cmd);
            cmdInput.value = '';
            cmdInput.focus();
        }

        function execQuickSims() {
            const room = roomsDB[gameState.currentRoom];
            if (room && room.npcs.length > 0) {
                let firstNpc = room.npcs[0];
                execQuick(`sims ${firstNpc}`);
            } else {
                printLog('No hay nadie en esta sala para ver sus métricas Sims.', 'warning');
            }
        }

        cmdInput.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                handleTabAutocomplete(this);
            } else if (e.key === 'Enter') {
                const val = cmdInput.value;
                cmdInput.value = '';
                parseCommand(val);
            } else {
                sfx.playKeyPress();
            }
        });

        window.addEventListener('DOMContentLoaded', () => {
            printLog('Inicias en un palacio hay varios hombres hermosos a tu alrededor ¿qué haces?', 'room-title');
            renderRoom();
            drawMapHUD();
        });
