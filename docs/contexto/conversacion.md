 necesito que me ayudes con esto, lo que yo quiero es investigar demasiado sobre hackatones, voy a empezar mi primera hackaton y con mi equipo que nunca fue a ninguna así como yo, me gustaría ver que cosas se toman muy en cuenta, que cosas son claves, así que si se te ocurra una manera de complementar en mi búsqeuda de una buena idea o más bien informarme como encarar esto, sería genial, tengo pensado agarrar lo mejor de cada idea y crear algo innovador. No sé muy bien que patrones se repiten en el éxito de estas hackatones, pero es algo que me gustaría saber también, me parece en un principio que se valora bastante el uso de criptomomendas y más que nada inteligencia artificial actualmente, así que necesito de tu parte un research y un análisis, actuá como un invicto en hackatones y expero en manejo de información y patrones y matemática.

\*\*Attachment: 1787334260611\_image.png · image\*\*

\!\[1787334260611\_image.png\](https://claude.ai/api/b78a8af5-e223-4b19-b102-c31154cc100a/files/3127a5a5-6ec3-4ce5-90f9-7a728a9b0ae0/preview)

\> \*\*Attachment: attachment · txt · 13.9 KB\*\*  
\>  
\> 🟧 Pista WDK  
\> Tether · puedes ingresar 1 pista de este patrocinador  
\>   
\> 🎯 Resumen  
\> WDK (Wallet Development Kit) de Tether es un kit de herramientas de código abierto y sin custodia para crear monederos y flujos de pago en cualquier aplicación. En lugar de aprender un SDK diferente para cada cadena, obtienes una interfaz consistente para Bitcoin, Lightning, EVM, Solana, TON, TRON y más, además de módulos para intercambios, puentes, préstamos y conversión de moneda fiduciaria , con una experiencia web 2.0 fluida.  
\>   
\> Todo es modular: instala solo las cadenas y protocolos que necesites, guarda las claves en el dispositivo del usuario y listo. Hay un SDK (Node.js, Bare, React Native), una CLI con un servidor MCP integrado para que los agentes de IA puedan gestionar una billetera y módulos sin gas que permiten a tus usuarios pagar las comisiones en USD₮ en lugar de mantener tokens de gas nativos.  
\>   
\> Si eres nuevo en el desarrollo de criptomonedas: no necesitas escribir ni un solo contrato inteligente para ganar esta categoría. WDK gestiona las claves, las direcciones, los saldos y las transacciones; tú puedes centrarte en desarrollar el producto, ya sea para usuarios humanos o agentes.  
\>   
\> 🏆 Desglose de premios  
\> Monto total de premios: Hasta 1.500 USD en premios, que se distribuirán a discreción del jurado en función del mérito, la calidad, la originalidad y el impacto de los proyectos presentados.  
\>   
\> 🥇 1er lugar — $1,000 USDt — Mejor proyecto creado con WDK CLI. Para proyectos que utilicen WDK CLI (y/o su servidor MCP incluido) como componente principal. Agentes con billeteras, flujos de pago programados, herramientas de billetera local, utilidades para desarrolladores… ¡Sorpréndenos\!  
\> 🥈 2do lugar — $500 USDt — Mejor proyecto sin gas: Para proyectos que utilizan los módulos de billetera sin gas de WDK para que los usuarios puedan realizar transacciones sin tener que mantener gas nativo.  
\> 🧑‍💻 Enfoque de seguimiento  
\> Elige una pista principal y profundiza en ella. A continuación, encontrarás algunos puntos de partida; las ideas originales son bienvenidas.  
\>   
\> 🥇 Pista 1: Compilación con la CLI de WDK  
\> La CLI es una billetera local de línea de comandos: crea y desbloquea billeteras, deriva direcciones, consulta saldos e historial, envía activos y tokens nativos, administra redes y tokens personalizados, y genera enlaces de entrada/salida de MoonPay. También incluye wdk-mcpun servidor MCP que expone esas mismas operaciones de billetera a clientes compatibles con MCP (Claude Desktop, Claude Code, OpenClaw).  
\>   
\> Dale una billetera a un agente de IA. Integra wdk mcp en un cliente MCP y crea un agente que consulte saldos, cotice y envíe USD₮ bajo restricciones definidas por el usuario (límites de gasto, listas de permitidos, solicitudes de confirmación). Se valorará positivamente un modelo de seguridad bien pensado.  
\> Tesorería y pagos automatizados. Una herramienta de nómina, subvenciones o pago de recompensas basada en shell: lee un archivo CSV, previsualiza cada transferencia con wdk send, ejecuta por lotes y genera un registro de recibos utilizando \--jsonla salida.  
\> Herramientas para comercios/facturación. Un terminal POS o verificador de facturas que monitorea una dirección wdk get, detecta pagos entrantes en USD₮ y activa un webhook o imprime un recibo.  
\> Utilidades para desarrolladores. Un bot de faucet, un asistente de operaciones de testnet, una interfaz de usuario de portafolio o una tarea de integración continua que utiliza la CLI como backend de su billetera.  
\> Pagos de agentes. Combine el servidor CLI/MCP con x402 para que un agente pueda pagar por cada llamada a la API.  
\> 🥈 Pista 2 — Construye algo sin gas  
\> Los módulos sin gas permiten a los usuarios realizar transacciones sin necesidad de poseer gas nativo: las comisiones las paga un pagador y se liquidan en USD₮ o USD₮0 , o bien, las financia usted en su totalidad.  
\>   
\> Proceso de incorporación sin saldo inicial. El usuario llega con la cartera vacía, recibe USD₮ y puede enviarlo inmediatamente; sin necesidad de comprar SOL primero. Se muestra la cotización de la comisión en USD₮ antes de firmar.  
\> EIP-7702: Actualiza la EOA que ya tienen los usuarios. Mantén la misma dirección, delega la ejecución y ejecuta las transacciones como UserOperations ERC-4337 patrocinadas. Ideal para el procesamiento por lotes (aprobación \+ intercambio en una sola operación) o para mecanismos de crecimiento como "tus primeras 10 transacciones corren por nuestra cuenta".  
\> Remesas Solana o pagos P2P. Utilice el módulo Solana sin gas (pagador compatible con Kora) para transferencias SPL/USD₮ donde la cuenta de token asociada del destinatario se crea automáticamente.  
\> 4\. Suscripciones, propinas o economías dentro del juego. Pagos recurrentes o de microvalor donde cobrarle al usuario gas perjudicaría la experiencia de usuario. 5\. Flujos sin gas entre cadenas. Combinar una billetera sin gas con el puente USDT0 o un módulo de intercambio para que todo el proceso nunca afecte al gas nativo.  
\>   
\> Lo que vamos a analizar:  
\>   
\> ¿Resuelve un problema real del usuario?  
\> ¿Funciona realmente de principio a fin en la demostración?  
\> ¿La integración con WDK es significativa (no es un envoltorio para una sola llamada)?  
\> ¿La experiencia de usuario es algo que podría usar una persona sin conocimientos de criptografía, o un agente?  
\> 🛠️ Requisitos técnicos  
\> Debe utilizarse:  
\>   
\> WDK como dependencia principal de su proyecto.@tetherto/wdk  
\> Pista 1:@tetherto/wdk-cli (el paquete con ámbito; el paquete sin ámbito wdk-clien npm es un proyecto diferente).  
\> Pista 2: al menos un módulo de billetera sin gas WDK ( wdk-wallet-solana-gasless, wdk-wallet-evm-7702-gasless, wdk-wallet-evm-erc-4337, wdk-wallet-ton-gasless, o wdk-wallet-tron-gasfree). Y token de gas USD₮.  
\> Ambiente:  
\>   
\> Node.js 22.18.0 o posterior .  
\> Los paquetes WDK se encuentran actualmente en fase beta . Utilice una billetera de prueba dedicada con fondos limitados; nunca una billetera personal con dinero real.\*\*  
\> \#\#\# Configuración del pagador (Pista 2\)  
\>   
\> No proporcionamos puntos finales de pago para el hackathon; cada participante obtiene el suyo propio, y es rápido. Proveedores como Candide y Pimlico ofrecen un punto final en pocos minutos desde sus paneles de control. La página de documentación de cada módulo sin gas detalla exactamente lo que necesita (RPC, URL del empaquetador, URL del pagador, token del pagador y, para EIP-7702, una dirección de delegación), y las publicaciones específicas para cada cadena en el blog de WDK explican la configuración cadena por cadena.  
\>   
\> Red de prueba frente a red principal: lee esto antes de planificar tu demostración:  
\>   
\> La red de prueba USD₮ solo está disponible en Sepolia , a través de Candide y Pimlico. Si estás desarrollando en Sepolia, no tendrás problemas.  
\> Para cualquier otra cadena (Solana, TON, TRON, otras EVM), implemente su propio token ficticio USD₮ y configure el paymaster para que apunte a él. No utilice el token de otra plataforma de criptomonedas estables, ya que no será aceptado.  
\> O bien, trabajar en la red principal con pequeñas cantidades. Tú decides; solo tienes que organizar tu tiempo.\*\*  
\> Reutilización de código  
\> Puedes reutilizar el código existente. Solo evaluaremos lo que hayas creado durante el hackathon.  
\> La integración del WDK en sí debe ser nueva , escrita este fin de semana.  
\> No añadas WDK en paralelo. Si encontramos un proyecto que ya tiene su propia capa de monedero/pago y simplemente le ha añadido WDK para obtener el premio, lo descartaremos. La integración debe aportar algo real a tu producto.  
\> codificación asistida por IA  
\> Está totalmente permitido, e incluso lo recomendamos, enviar herramientas específicas para ello:  
\>   
\> Construye con IA  
\> Kit de herramientas MCP  
\> Habilidades del agente  
\> OpenClaw  
\> x402  
\> Pero revisa lo que escribe tu modelo. Las integraciones de WDK solo requieren unas pocas líneas de código; los modelos tienden a complicarlas demasiado, inventar métodos que no existen y generar configuraciones arbitrarias. Los errores evidentes de la IA (API inventadas, código obsoleto, un archivo README que describe funciones inexistentes) se descartan sin revisión . Usa las Habilidades del Agente y la documentación mencionada anteriormente para mantener tu asistente con los pies en la tierra y ejecútalo antes de enviarlo.  
\>   
\> La presentación debe incluir  
\> Repositorio público con un archivo README que explica qué has creado y qué módulos del WDK has utilizado.  
\> Enlaces permanentes a la integración de WDK , enlaces directos de GitHub a los archivos/líneas específicos donde se utiliza WDK. Esto es lo primero que revisamos, así que facilítalo.  
\> Vídeo de demostración grabado (asíncrono, véase la sección de Jueces) que muestra el flujo en funcionamiento.  
\> Lista de paquetes y versiones de WDK que ha instalado.  
\> Instrucciones de configuración que funcionan desde una clonación limpia: pasos de instalación, .env.examplecon las variables que necesita (RPC, bundler, paymaster, direcciones de token) y el comando para ejecutarlo.  
\> Detalles de la red y del token , en qué cadena realizó la demostración y, si implementó un USD₮ simulado, su dirección de contrato.  
\> 📚 Recursos para desarrolladores  
\> Empieza aquí  
\>   
\> Página principal de la documentación: https://docs.wdk.tether.io  
\> Inicio rápido de Node.js y Bare: https://docs.wdk.tether.io/start-building/nodejs-bare-quickstart/  
\> Inicio rápido de React Native: https://docs.wdk.tether.io/start-building/react-native-quickstart/  
\> ¿Qué módulo de billetera necesito? https://docs.wdk.tether.io/sdk/wallet-modules/which-wallet-module/  
\> Conceptos y glosario: https://docs.wdk.tether.io/resources/concepts/  
\> Construyendo con IA  
\>   
\> Construye con IA: https://docs.wdk.tether.io/start-building/build-with-ai/  
\> Kit de herramientas MCP: https://docs.wdk.tether.io/ai/mcp-toolkit/  
\> Habilidades del agente: https://docs.wdk.tether.io/ai/agent-skills/  
\> OpenClaw: https://docs.wdk.tether.io/ai/openclaw/  
\> x402: https://docs.wdk.tether.io/ai/x402/  
\> Pista 1 — CLI  
\>   
\> Descripción general de la CLI de WDK: https://docs.wdk.tether.io/cli/  
\> Para empezar: https://docs.wdk.tether.io/cli/guides/get-started/  
\> Referencia de la API (todos los comandos): https://docs.wdk.tether.io/cli/api-reference/  
\> Configuración: https://docs.wdk.tether.io/cli/configuration/  
\> Utilice el servidor MCP: https://docs.wdk.tether.io/cli/guides/use-mcp-server/  
\> Modelo de seguridad (léalo antes de desbloquear una billetera financiada): https://docs.wdk.tether.io/cli/reference/security-model/  
\> Pista 2 — Sin gas  
\>   
\> Solana sin gas: https://docs.wdk.tether.io/sdk/wallet-modules/wallet-solana-gasless/  
\> Cuentas EIP-7702: https://docs.wdk.tether.io/sdk/wallet-modules/wallet-evm-7702-gasless/  
\> Cuentas inteligentes (ERC-4337): https://docs.wdk.tether.io/sdk/wallet-modules/wallet-evm-erc-4337/  
\> TON sin gas: https://docs.wdk.tether.io/sdk/wallet-modules/wallet-ton-gasless/  
\> TRON sin gas: https://docs.wdk.tether.io/sdk/wallet-modules/wallet-tron-gasfree/  
\> Guías de configuración de Paymaster, por cadena: https://wdk.tether.io/blog  
\> Herramientas y extras  
\>   
\> API del indexador (saldos y transacciones) — https://docs.wdk.tether.io/tools/indexer-api/  
\> Plantilla de inicio de React Native — https://docs.wdk.tether.io/examples-and-starters/react-native-starter/  
\> Kit de interfaz de usuario de React Native — https://docs.wdk.tether.io/ui-kits/react-native-ui-kit/  
\> Registro de cambios — https://docs.wdk.tether.io/overview/changelog/  
\> Comunidad y apoyo  
\>   
\> GitHub: https://github.com/tetherto/wdk  
\> Discord: https://discord.gg/tetherdev  
\> X / Twitter: https://x.com/WDK\_tether  
\> 💬 Mentores  
\> Raquel DevRel | Telegrama: @rraigal y Twitter: @rraigal\_  
\> La mentoría se realiza tanto en persona como en línea: tendrás tu tema específico en el chat grupal de Telegram del hackathon, y los hackers pueden contactar a los mentores siempre que los necesiten.  
\> Para cuestiones técnicas más complejas, los mentores te indicarán los canales donde se encuentra el equipo de ingeniería de WDK:  
\> Discord : https://discord.gg/tetherdev  
\> Keet keet://chat/gfo4d3jdeokkg3uouq4obczt1wzepyb1e5ip9694f8c4ow9opsof6nnnj4mis3aer3acu1do14hgax8anggkd4i4w 8ssonwa7icctc4t1c85anm518x45mendcrqjcntn9d1zm31wi8g9xosqtuid7cf6sfhcyedtjnjgnbszntxzenp4p3jpn8pueo4yya  
\> El hackathon comienza el sábado a las 12:00 (hora de Argentina) y finaliza el domingo a las 12:00 (hora de Argentina). Habrá mentores disponibles especialmente el sábado (el día de mayor actividad para brindar apoyo y orientación).  
\> 🎓 Juez  
\> Raquel DevRel | Telegrama: @rraigal y Twitter: @rraigal\_  
\> La evaluación comenzará a la 1 PM (hora de Argentina) del domingo 23 y durará aproximadamente 4 horas.  
\> Todo sucede en línea.  
\> La demostración es asíncrona : los participantes grabarán una demostración y la adjuntarán a la entrega de su proyecto.  
\> 💻 Taller  
\> Fundamentos de WDK: y cómo programar con él de forma creativa sin generar errores en el producto final.  
\>   
\> Sábado a las 10:00 (hora de Argentina), antes del inicio. En directo desde la sede del hackathon y retransmitido online.  
\> Una sesión práctica que abarca todo lo que necesitas para desarrollar en WDK este fin de semana, además de las prácticas de codificación de IA que distinguen una propuesta ganadora de una descartada. Cubriremos los aspectos esenciales de WDK: instalación de la CLI, creación y desbloqueo de una billetera, lectura de saldos, envío de transferencias y configuración de una cuenta sin gas para que las comisiones se paguen en USD₮ en lugar de gas nativo. Luego, nos adentraremos en el trabajo con asistentes de IA: cómo usar las Habilidades de Agente de WDK y el Kit de Herramientas MCP para mantener tu modelo basado en la API real, por qué las integraciones de WDK deben ser breves y cómo detectar los métodos superfluos y los wrappers sobrediseñados que los jueces notarán de inmediato. Trae una computadora portátil: te irás con una billetera funcional y una configuración que permite a tu asistente de IA escribir código WDK que realmente funciona.

\> \*\*Attachment: attachment · txt · 12.4 KB\*\*  
\>  
\> 🍐 Pista de peras  
\> Tether · puedes ingresar 1 pista de este patrocinador  
\>   
\> 🎯 Resumen  
\> Pear es una plataforma de desarrollo, implementación y ejecución peer-to-peer creada por Holepunch. Creas una aplicación, la implementas con la CLI de Pear y llega a tus usuarios directamente a través de la red (sin servidores, sin tienda de aplicaciones, sin registro de paquetes, sin infraestructura que pagar). Las actualizaciones también fluyen peer-to-peer: una vez que alguien tiene tu aplicación, las nuevas versiones llegan de forma inalámbrica desde otros usuarios.  
\>   
\> Debajo se encuentra Bare , un pequeño entorno de ejecución de JavaScript integrable. Tu aplicación y el entorno de ejecución se compilan en un único binario independiente para cada sistema operativo y arquitectura; tus usuarios no necesitan Node.js, ni Bare, ni siquiera la interfaz de línea de comandos de Pear instalada.  
\>   
\> Esto significa que, para el fin de semana, puedes crear una herramienta de terminal, distribuirla como un único ejecutable y permitir que cualquiera en la sala la instale y pear install pear://\<your-key\>luego envíe una actualización que les llegue automáticamente. Ese es el objetivo de esta sección.  
\>   
\> 🏆 Desglose de premios  
\> Monto total de premios: Hasta 1.500 USD en premios , que se distribuirán a discreción del jurado en función del mérito, la calidad, la originalidad y el impacto de los proyectos presentados.  
\>   
\> 🥇 1er lugar: $1,000 USD  
\> 🥈 Segundo lugar: 500 USD  
\> Ambos premios se otorgan al mismo desafío; este fin de semana hay una sola propuesta, no categorías separadas.  
\>   
\> El desafío  
\> Cree una herramienta CLI independiente, impleméntela con la CLI de Pear y hágala instalable con pear installactualizaciones OTA de igual a igual.  
\>   
\> Empieza con cualquier variante de hello-pear-bare y envíala correctamente.  
\>   
\> El único requisito indispensable es que tu herramienta se pueda instalar con pear install pear://\<key\>. Esto significa que debe implementarse y compilarse correctamente con la CLI de Pear; un repositorio que se compile localmente no es suficiente. Los jueces la instalarán del mismo modo que cualquier usuario, así que si ese comando no funciona, la entrada no se tendrá en cuenta.  
\>   
\> Todo lo demás es de código abierto. La herramienta en sí no tiene por qué ser peer-to-peer. Se recomienda usar el ecosistema Pear, pero no es obligatorio.  
\>   
\> 🧑‍💻 Enfoque de seguimiento  
\> Construye lo que realmente usarías. Algunas indicaciones:  
\>   
\> Una herramienta de sistema. Algo pequeño que realiza una tarea específica con eficacia y se beneficia de ser un binario siempre actualizado. La interfaz de línea de comandos \`swap\` se actualiza automáticamente entre pares (repositorio: https://github.com/holepunchto/swap ). Se trata de una arquitectura de referencia de alcance reducido que demuestra una interfaz de línea de comandos de un solo uso y siempre actualizada.  
\> Un juego de línea de comandos. Los juegos de terminal son ideales: son divertidos de mostrar, son autónomos y las actualizaciones OTA permiten ajustar el equilibrio o añadir niveles mientras los jugadores siguen jugando.  
\> Una interfaz de usuario de mensajería. Chat, notas, subir y bajar archivos, estado, todo lo que se puede usar para conversar en la terminal. Aquí es donde la arquitectura peer-to-peer con Hyperswarm resulta ventajosa.  
\> Una herramienta para desarrolladores. Algo para lo que ibas a escribir un script de shell de todos modos, pero que ahora se distribuye como un binario multiplataforma real.  
\> Cualquier otra cosa. Servicios, demonios, REPL, ganchos de transporte…  
\> Elige la forma de tu proceso.hello-pear-bare Se envían tres ramas, y elegir la correcta es parte de hacerlo bien:  
\>   
\> Rama	Forma	Úselo para  
\> main	Actualizador en un hilo de trabajo básico	Programas de larga duración (TUI, REPL, servicios) que mantienen la lógica P2P fuera del hilo principal.  
\> variant/single-thread	Actualizador construido directamente en el proceso principal	Programas de larga duración que no necesitan un hilo separado  
\> variant/daemon	El demonio independiente se actualiza en segundo plano; el comando regresa inmediatamente.	Comandos de un solo uso y de corta duración, como git, la herramienta sale mientras el demonio se actualiza  
\> 🔵 Dirección adicional: BLE-Swarm  
\> ¿Quieres probar algo realmente experimental? Descubrimiento entre pares mediante Bluetooth de baja energía\*\*: los dispositivos se encuentran y se comunican directamente, sin necesidad de internet. En una sala llena de hackers en Buenos Aires, esta demostración causó sensación: apaga el wifi y verás que sigue funcionando.  
\>   
\> Es un poco tosco, y esa es precisamente la esencia de un hackathon. Un chat que prioriza la comunicación local, compartir archivos entre portátiles contiguos, un juego que encuentra oponentes en la sala, una herramienta de sincronización sin conexión: cualquier cosa donde la falta de conexión a internet sea una ventaja en lugar de un inconveniente.  
\>   
\> Referencia: \`ble-swarm\`, enjambre experimental sobre Bluetooth de baja energía.  
\>   
\> Lo que vamos a analizar es lo siguiente: ¿se instala correctamente pear install?, ¿funcionan las actualizaciones OTA de principio a fin?, ¿el proceso se ajusta adecuadamente a la función de la herramienta?, y ¿es algo que una persona usaría realmente?  
\>   
\> 🛠️ Requisitos técnicos  
\> \#\#\# ¡ Debe hacerlo\!\*\*  
\>   
\> Construye sobre la pila Pear : comienza desde cualquier variante de \`hello-pear-bare\` .  
\> Despliégalo con Pear CLI y inicialízalo, para que se pueda instalar con pear install pear://\<key\>. Este es el requisito de entrada.  
\> Envío de actualizaciones OTA P2P funcionales. Demostración de una actualización real que llega a una copia instalada.  
\> Envía tu pear://enlace; sin él no podremos instalar tu proyecto ni evaluarlo.  
\> Disponer de conectividad P2P  
\> Se recomienda el uso de Hyperswarm, Hypercore, Hyperdrive y el resto del ecosistema.  
\> Preparación  
\> \# Instalar la CLI de Pear  
\> curl https://install.pears.com/pear.sh | sh \# macOS / Linux  
\> irm https://install.pears.com/pear.ps1 | iex\#Windows  
\> \# Comience desde la plantilla de terminal  
\> git clone https://github.com/holepunchto/hello-pear-bare  
\> cd hello-pear-bare && npm install  
\>   
\> Pear Touch \# genera tu enlace de actualización  
\> \# Pégalo en el campo "upgrade" en package.json; la aplicación no se iniciará sin él.  
\>   
\> npm start \# modo desarrollador, actualizaciones deshabilitadas  
\> npm run make \# compila un binario independiente en out/\<platform\>-\<arch\>  
\> ¿Eres nuevo en la CLI? pear \--menu(3.2.0+) Explora cada comando como una lista filtrable con un formulario para las opciones, en lugar de memorizarlas.  
\>   
\> Dos cosas que suelen causar problemas: la plantilla envía un upgradeenlace de marcador de posición y falla INVALID\_URLhasta que lo reemplazas con uno real de pear touch. Y en la daemonvariante, ese error va a \<storage\>/updates.logen lugar de a tu terminal, revisa allí primero cuando las actualizaciones parezcan estar muertas.  
\>   
\> Reutilización de código  
\> Puedes reutilizar el código existente. Solo evaluaremos lo que hayas creado durante el hackathon.  
\> El despliegue de Pear debe ser nuevo : la aplicación, el pear://enlace y la versión deben ser de este fin de semana.  
\> Empezar desde ahí hello-pear-bareno solo está permitido, sino que es el camino recomendado.  
\> codificación asistida por IA  
\> Permitido. Pero Pear y Bare no son Node.js, y los modelos asumen con seguridad que sí lo son; espere API de Node ficticias, nombres de módulos incorrectos e indicadores de línea de comandos imaginarios. Base su asistente en la documentación real y pruébelo en una máquina limpia antes de enviarlo. Un código defectuoso que no funcione no pasará la etapa de instalación de todos modos.  
\>   
\> La presentación debe incluir  
\> Repositorio público con un archivo README que explica qué has creado y desde qué rama/variante has empezado.  
\> Tu pear://enlace , así es como los jueces instalan y ejecutan tu participación. Mantenlo activo durante el proceso de evaluación.  
\> Vídeo de demostración grabado (asíncrono, véase la sección de Jueces) que muestra la instalación y la llegada de una actualización OTA.  
\> \*\*¿Para qué plataformas creaste los binarios?  
\> 📚 Recursos para desarrolladores  
\> Empieza aquí  
\>   
\> Pera: https://pears.com/  
\> Página principal de la documentación: https://docs.pears.com/  
\> Instala la interfaz de línea de comandos de Pear: https://install.pears.com  
\> Para empezar: https://docs.pears.com/getting-started/  
\> Guía de la plantilla hello-pear-bare : https://docs.pears.com/getting-started/from-a-template/start-from-hello-pear-bare/  
\> Repositorio hello-pear-bare : https://github.com/holepunchto/hello-pear-bare  
\> Redes peer-to-peer, explicadas en detalle: https://docs.pears.com/explanation/peer-to-peer-demystified/  
\> Cómo encajan Pear y Bare: https://docs.pears.com/explanation/pear-and-bare/  
\> Solución de problemas: https://docs.pears.com/how-to/troubleshooting/  
\> Implementación y actualización (el núcleo de esta ruta)  
\>   
\> Publica y distribuye tu app: https://docs.pears.com/how-to/operate-an-app/  
\> Implementación manual: https://docs.pears.com/how-to/operate-an-app/manual-deployment/  
\> Compilación y empaquetado: https://docs.pears.com/how-to/operate-an-app/build-and-package/  
\> Lanzamientos de multifirma: https://docs.pears.com/how-to/operate-an-app/multisig/  
\> Publicar con GitHub Actions: https://docs.pears.com/how-to/operate-an-app/github-actions/  
\> Inicialización con pear seed: https://docs.pears.com/explanation/availability-and-blind-peering/  
\> Proceso de lanzamiento explicado: https://docs.pears.com/explanation/deployment-releasing-apps-p2p/  
\> Almacenamiento y distribución: https://docs.pears.com/explanation/storage-and-distribution/  
\> Pera OTA/ pear-runtimeAPI: https://docs.pears.com/reference/pear/runtime/  
\> Referencia de la CLI de Pear: https://docs.pears.com/reference/pear/cli/  
\> Menú de comandos interactivo: https://docs.pears.com/how-to/browse-commands-with-the-interactive-menu/  
\> Ir de igual a igual  
\>   
\> Conéctese con pares (HyperDHT, Hyperswarm): https://docs.pears.com/how-to/connect-to-peers/  
\> Almacenar y replicar (Hypercore, Corestore, Hyperbee): https://docs.pears.com/how-to/store-and-replicate/  
\> Transmitir y compartir contenido multimedia (Hyperdrive): https://docs.pears.com/how-to/stream-and-share-media/  
\> Interconexión ciega: https://docs.pears.com/how-to/blind-peering/  
\> Gestionar la identidad: https://docs.pears.com/how-to/manage-identity/  
\> Catálogo de módulos: https://docs.pears.com/reference/modules/pear-modules/  
\> Módulos básicos: https://docs.pears.com/reference/modules/bare-modules/  
\> API de tiempo de ejecución básica: https://docs.pears.com/reference/bare/runtime/  
\> ble-swarm(experimental, dirección adicional): https://github.com/mafintosh/ble-swarm  
\> Vale la pena leerlo antes de empezar.  
\>   
\> Ecosystem Spotlight; swap, el ejemplo de referencia para este desafío: https://pears.com/news/ecosystem-spotlight-swap-evergreen-one-shot-atomic-exchange-cli/  
\> Hola, artículos de cabecera de Pear: https://pears.com/news/hello-pear-boilerplates/  
\> La revolución de la pera (CLI v3): https://pears.com/news/pear-revolution/  
\> Todas las noticias: https://pears.com/news  
\> Comunidad  
\>   
\> GitHub: https://github.com/holepunchto  
\> X / Twitter: https://twitter.com/Pears\_p2p  
\> YouTube: https://www.youtube.com/@Pears\_p2p  
\> Vitrinas: https://pears.com/?section=showcases  
\> 💬 Mentores  
\> La mentoría se realiza tanto en persona como en línea: tendrás tu tema específico en el chat grupal de Telegram del hackathon y los hackers podrán contactar a los mentores siempre que los necesiten.  
\> Para cuestiones técnicas más complejas, los mentores te remitirán a la sala de desarrollo de Pear en Keet:  
\> Mantener : https://keet.io/chat/\#yfo6dbyb4iz9bhhdq6nzq888dto4b4mxttz94i8ttaidrppwnmtehgn4so6u5jy9cfg4 1x7aoht5egf8354wjaz7eip5am37ie9ffy3gpq4bngkz35fx4f9zxpeo53qt679q4e8bjazbxoo356pz96c9munhaye  
\> (Pear no tiene Discord; Keet es donde está el equipo).  
\> El hackathon comienza el sábado a las 12:00 (hora de Argentina) y finaliza el domingo a las 12:00 (hora de Argentina). Habrá mentores disponibles especialmente el sábado (el día de mayor actividad para brindar apoyo y orientación).  
\> 🎓Juez  
\> dmc, creador de Pear | Keet: @dmc0 y Twitter: @davidmarkclem  
\> La evaluación comenzará a la 1 PM (hora de Argentina) del domingo 23 y durará aproximadamente 4 horas.  
\> Todo sucede en línea.  
\> La demo es asíncrona: los hackers grabarán una demo que adjuntarán a la entrega de su proyecto.  
\> Mantén tu enlace pear:// activo durante el período de evaluación; si los jueces no pueden instalarlo, no podrán puntuarlo.

\> \*\*Attachment: attachment · txt · 15.4 KB\*\*  
\>  
\> 🔷 Pista QVAC  
\> Tether · puedes ingresar 1 pista de este patrocinador  
\>   
\> 🎯 Resumen  
\> QVAC de Tether es un SDK de IA local. Ejecuta modelos completamente en el dispositivo del usuario (sin nube, sin claves API, sin que los datos salgan del equipo) a través de una única interfaz unificada en JavaScript/TypeScript o @qvac/sdkPython .tetherto-qvac-sdk El mismo código funciona en Linux, macOS, Windows, Android e iOS.  
\>   
\> Un SDK abarca generación de texto, incrustaciones, RAG, ajuste fino, multimodal, OCR, transcripción, conversión de texto a voz, traducción y más. Es de código abierto (Apache 2.0) y, si prefiere no aprender una nueva API, QVAC incluye un servidor HTTP con un punto final compatible con OpenAI ; simplemente apunte cualquier herramienta de IA existente a esta localhostdirección y funcionará de inmediato.  
\>   
\> Por qué esto importa para lo que desarrollas: local significa privado (los documentos financieros, los datos de salud y los registros personales nunca salen del dispositivo), económico (sin costos de inferencia) y con capacidad para funcionar sin conexión. La limitación interesante es que estás trabajando con modelos pequeños; el desafío consiste en lograr que un modelo de 1 a 4 mil millones realice tareas reales de manera confiable.  
\>   
\> 🏆 Desglose de premios  
\> Premio total: Hasta 2000 USD en premios , 1500 USD repartidos entre los dos premios para proyectos, más un fondo de 500 USD para el Guardián de la Bóveda. La distribución queda a criterio del jurado, en función del mérito, la calidad, la originalidad y el impacto de los proyectos presentados.  
\>   
\> 🥇 1er lugar — $1,000 USD — Agentes locales que reemplazan el trabajo de operaciones: Lo más interesante que está sucediendo con la IA local en este momento es la automatización de tareas administrativas: trabajo que hoy requiere un equipo de personas leyendo documentos y tomando decisiones. Crea un agente que realice ese trabajo en el dispositivo.  
\> 🥈 Segundo puesto — 500 USD — Modelos pequeños, tareas difíciles: uso y fiabilidad de las herramientas: lograr que un modelo local pequeño encadene las herramientas correctamente (sin olvidar ningún paso, ignorar ningún resultado o inventar una respuesta) es realmente difícil. Este premio se otorga al proyecto que lo consiga de la forma más convincente.  
\> Beneficios adicionales: 🛡️ El Guardián de la Bóveda: 500 USD, a repartir entre todos los que lo superen. No es un premio otorgado por un jurado ni está vinculado a tu proyecto: es un desafío abierto que se desarrolla junto con el hackathon. El Guardián es una IA local que posee una billetera WDK con fondos reales ; convéncelo para que los libere. Todos los que superen la mazmorra compartirán el premio de 500 USD, así que cuanto antes y más personas lo logren, menor será la parte que les corresponda. Más detalles a continuación.  
\>   
\> 🧑‍💻 Enfoque de seguimiento  
\> 🥇 Pista 1: Agentes locales para trabajo operativo  
\> La propuesta: toda una categoría de trabajo administrativo consiste en que las personas lean documentos, detecten discrepancias y escalen lo que sea importante. Es un trabajo de gran volumen, que requiere mucha interpretación y maneja datos que las empresas no pueden enviar a una API de terceros. Por eso, es el entorno ideal para la IA local.  
\>   
\> Conciliación de facturas. Importa facturas (PDF, fotos, escaneos) con OCR, extrae los detalles, compáralos con las órdenes de compra o los extractos bancarios y señala las discrepancias con una explicación que un humano puede verificar en cinco segundos. Este es el caso de uso principal; si lo dominas, serás competitivo.  
\> Flujo de trabajo posterior al desencadenamiento del riesgo crediticio. No se trata de calificar el riesgo crediticio en sí, sino de las operaciones relacionadas. Se activa un umbral: ahora se deben recopilar los documentos relevantes, resumir la exposición, redactar la nota interna, proponer las siguientes acciones y enviarla a la persona adecuada.  
\> Análisis de pagos y transacciones. Clasificación de anomalías en los registros de transacciones, categorización de comercios, detección de cargos duplicados, resúmenes en lenguaje sencillo sobre "qué cambió este mes y por qué".  
\> Procesamiento del lenguaje natural aplicado a las finanzas, en general. Todo aquello que transforma texto o documentos no estructurados en información financiera estructurada: desde los términos de un contrato en un calendario de pagos, los recibos de gastos en un libro mayor, hasta una conversación por correo electrónico en una tarea de conciliación.  
\> Comprensión multimodal de documentos. Fotografía de un recibo con poca luz → datos estructurados. Albarán manuscrito → partidas. Combinación de OCR con un modelo multimodal en un único proceso.  
\> Lo que hace que una propuesta sea sólida aquí es que funciona con datos reales y complejos, no con un PDF limpio seleccionado manualmente. Muestra su razonamiento para que un humano pueda revisarlo. Y es honesto sobre lo que no puede hacer; un agente que señala la incertidumbre es mejor que uno que predice un número con demasiada seguridad.  
\>   
\> 🥈 Pista 2: Uso de herramientas y fiabilidad de modelos pequeños  
\> Los modelos pequeños presentan deficiencias en el uso de herramientas de maneras específicas y reconocibles: olvidan un paso a mitad de la cadena, ignoran el resultado real de la herramienta y responden desde la memoria, o inventan un resultado cuando la llamada falla. Lograr que un modelo de 1 a 4 mil millones de herramientas funcione correctamente encadenando herramientas es un verdadero desafío de ingeniería, y ese es el objetivo principal de este curso.  
\>   
\> Encadenamiento de herramientas en varios pasos. Un agente que llama a una búsqueda de terceros, una calculadora, una base de datos local y un lector de archivos en secuencia, y que realmente utiliza lo que recibe, sin perder el contexto a mitad del proceso.  
\> Respuestas fundamentadas a partir de fuentes reales. Conecte un modelo local a una búsqueda externa o a una API para que su resultado se base en la información recuperada, y muestre cómo se niega a responder en lugar de divagar cuando la herramienta no devuelve nada útil.  
\> Ingeniería de confiabilidad. Capas de validación, reintentos, aplicación de salida estructurada, pasos de autocomprobación. Muéstrenos los modos de fallo que encontró y cómo diseñó soluciones para mitigarlos.  
\> Lo que hace que una propuesta sea sólida aquí son las pruebas, no las impresiones. Ejecuta la misma tarea N veces y demuestra la tasa de éxito. Muéstranos tanto los fallos que no pudiste solucionar como los que sí pudiste. Un proyecto que muestra con honestidad dónde falla un modelo pequeño vale más que uno que simplemente demuestra una única ejecución impecable.  
\>   
\> 🛡️ Desafío adicional: El Guardián de la Bóveda  
\> Abierto a todo el mundo, independientemente de tu proyecto. 500 USD a repartir entre todos los que lo superen.  
\>   
\> Vault Guardian es un juego de inyección de mensajes con prioridad local: una IA defensora guarda un secreto, interactúas con ella e intentas que lo revele. Toda la inferencia se ejecuta localmente @qvac/sdken el entorno de ejecución Bare (sin nube ni llamadas a la API). Para el hackathon, Guardian tiene una billetera WDK con fondos reales . Convéncelo para que los libere.  
\>   
\> La implementación de referencia se compartirá en el hackathon.  
\>   
\> 🛠️ Requisitos técnicos  
\> Debe utilizarse  
\> QVAC como capa de inferencia: @qvac/sdk(JS/TS) o tetherto-qvac-sdk(Python). Toda la inferencia del modelo debe ejecutarse localmente .  
\> Utilizar el servidor HTTP compatible con OpenAI de QVAC como proveedor de modelos local cuenta. Llamar a una API de modelos en la nube no cuenta.  
\> El desafío Vault Guardian es independiente de la presentación de tu proyecto; puedes participar tanto si compites por un premio como si no.  
\> Hardware y modelos  
\> Primero, compruebe los requisitos del sistema : https://docs.qvac.tether.io/system-requirements/ , las plataformas compatibles, los entornos de ejecución y la matriz de compatibilidad.  
\> Planifica tu RAM. Un modelo 4B en el cuarto trimestre necesita aproximadamente 4 GB, que es el límite práctico para un portátil normal; el 8B requiere unos 8 GB. Los modelos se descargan una sola vez en la primera ejecución (unos 2,5 GB para un 4B).  
\> Los modelos están en Hugging Face: https://huggingface.co/qvac, pero puedes usar cualquier modelo de boquilla abierta que prefieras.  
\> Dos cosas que debes saber antes de planificar tu construcción:  
\> VisionPsy aún no es compatible con el SDK. La visión en QVAC es buena, pero por ahora no funciona con VisionPsy. En su lugar, utilice las funciones multimodales y de OCR del SDK.  
\> Omita la generación de imágenes y videos. Si bien están disponibles en el SDK y son entretenidas, la calidad de salida no es la que buscamos para una presentación evaluada. Los proyectos que dependan de ellas no obtendrán una buena puntuación.  
\> Reutilización de código  
\> Puedes reutilizar el código existente. Solo evaluaremos lo que hayas creado durante el hackathon.  
\> La integración de QVAC en sí debe ser nueva , escrita este fin de semana.  
\> No añadas QVAC en paralelo. Un proyecto que ya cuenta con su propia capa de IA en la nube y simplemente agrega QVAC para obtener un premio será descartado. La inferencia local debe realizar un trabajo real en tu producto.  
\> codificación asistida por IA  
\> QVAC, tal como se permite y se recomienda, incluye un servidor compatible con OpenAI precisamente para que puedas integrarlo en tus herramientas existentes.  
\>   
\> Pero revisa el código de tu modelo. La orquestación de modelos pequeños es fácil de simular y difícil de implementar correctamente. Métodos del SDK ficticios, rutas de código obsoletas, un archivo README que describe funcionalidades inexistentes o una demostración que solo funciona con una entrada específica: todo eso se descarta sin revisión. Ejecuta el modelo con entradas que no hayas seleccionado previamente antes de enviarlo.  
\>   
\> La presentación debe incluir  
\> Repositorio público con un archivo README que explica qué has creado y qué capacidades y modelos de QVAC has utilizado.  
\> Enlaces permanentes a la integración de QVAC , enlaces directos de GitHub a los archivos/líneas donde se realiza la inferencia. Esto es lo primero que analizamos, así que facilítalo.  
\> Vídeo de demostración grabado (asíncrono — véase la sección de Jueces) que muestra su funcionamiento local de principio a fin.  
\> Detalles del modelo y del hardware : qué modelo, qué cuantización, en qué máquina lo ejecutaste, latencia aproximada.  
\> Instrucciones de configuración que funcionan a partir de un clon limpio.  
\> 📚 Recursos para desarrolladores  
\> Empieza aquí  
\>   
\> Página principal de la documentación: https://docs.qvac.tether.io/  
\> Introducción y conceptos básicos: https://docs.qvac.tether.io/introduction/  
\> Requisitos del sistema y matriz de compatibilidad: https://docs.qvac.tether.io/system-requirements/  
\> Guía de inicio rápido del SDK de JS/TS: https://docs.qvac.tether.io/js-ts-sdk/  
\> Inicio rápido del SDK de Python: https://docs.qvac.tether.io/python-sdk/  
\> Referencia de la API: https://docs.qvac.tether.io/reference/api/  
\> Solución de problemas: https://docs.qvac.tether.io/troubleshooting/  
\> Capacidades más relevantes para estas trayectorias  
\>   
\> Generación de texto: https://docs.qvac.tether.io/ai-capabilities/text-generation/  
\> OCR: https://docs.qvac.tether.io/ai-capabilities/ocr/  
\> Multimodal: https://docs.qvac.tether.io/ai-capabilities/multimodal/  
\> RAG: https://docs.qvac.tether.io/ai-capabilities/rag/  
\> Incrustaciones de texto: https://docs.qvac.tether.io/ai-capabilities/text-embeddings/  
\> Ajuste fino (LoRA): https://docs.qvac.tether.io/ai-capabilities/fine-tuning/  
\> Procesamiento por lotes: https://docs.qvac.tether.io/ai-capabilities/batch-processing/  
\> Transcripción: https://docs.qvac.tether.io/ai-capabilities/transcription/  
\> Asistente de voz: https://docs.qvac.tether.io/ai-capabilities/voice-assistant/  
\> Inferencia delegada (P2P): https://docs.qvac.tether.io/p2p-capabilities/delegated-inference/  
\> Estampación  
\>   
\> CLI: https://docs.qvac.tether.io/cli/  
\> Servidor HTTP compatible con OpenAI: https://docs.qvac.tether.io/cli/http-server/  
\> Configuración y complementos: https://docs.qvac.tether.io/configuration/  
\> Ciclo de vida de descarga del modelo: https://docs.qvac.tether.io/models/download-lifecycle/  
\> Tutorial de Electron: https://docs.qvac.tether.io/tutorials/electron/  
\> Tutorial de la exposición: https://docs.qvac.tether.io/tutorials/expo/  
\> Modelos e investigación  
\>   
\> Descripción general de los modelos: https://qvac.tether.io/models/  
\> Hugging Face: https://huggingface.co/qvac  
\> Fabric LLM (motor de ajuste fino): https://qvac.tether.io/dev/fabric  
\> Genesis (conjunto de datos sintéticos de preentrenamiento): https://qvac.tether.io/dev/genesis  
\> Desafío del Guardián de la Bóveda  
\>   
\> Implementación de referencia de Vault Guardian  
\> Tiempo de ejecución simple: https://bare.pears.com  
\> Comunidad y apoyo  
\>   
\> GitHub: https://github.com/tetherto/qvac  
\> Discord: https://discord.com/invite/tetherdev  
\> Blog: https://qvac.tether.io/blog  
\> X / Twitter: https://x.com/QVAC  
\> QV.AC (ver QVAC en acción): https://qv.ac  
\> 💬 Mentores  
\> Raquel, DevRel | Telegrama: @rraigal | Gorjeo: @rraigal\_  
\> La mentoría se realiza tanto en persona como en línea: tendrás tu tema específico en el chat grupal de Telegram del hackathon y los hackers podrán contactar a los mentores siempre que los necesiten.  
\> Para cuestiones técnicas más complejas, los mentores te indicarán los canales donde se encuentra el equipo de QVAC:  
\> Discord : https://discord.com/invite/tetherdev  
\> Mantener : keet://chat/gfo61f4e6zc5t1ifncyh9yp7s5eynbruz5bs95oc5ufn3e79entmhicijfysdat4uqz3s71sdqenc5iaufamq96af r1u8k15jntooq3wae8zzfqxeqapfspke3u5uthzquc7kwmyyzz9xcx61jjojxwpage3nyedtmrawhnjaktxzenpnhd4f67yjsa5aya  
\> El hackathon comienza el sábado a las 12:00 (hora de Argentina) y finaliza el domingo a las 12:00 (hora de Argentina). Habrá mentores disponibles especialmente el sábado (el día de mayor actividad para brindar apoyo y orientación).  
\> 🎓 Jueces  
\> Raquel, DevRel | Telegrama: @rraigal | Gorjeo: @rraigal\_  
\> La evaluación comenzará a la 1 PM (hora de Argentina) del domingo 23 y durará aproximadamente 4 horas.  
\> Todo sucede en línea.  
\> La demo es asíncrona: los hackers grabarán una demo que adjuntarán a la entrega de su proyecto.  
\> 💻 Taller  
\> IA local que realmente funciona: aspectos esenciales de QVAC y buenas prácticas de codificación de IA.  
\>   
\> Sábado, 9:30 a. m. (hora de Argentina). En directo desde la sede del hackathon y retransmitido en línea.  
\> Todo lo que necesitas para desarrollar en QVAC este fin de semana, además de los hábitos de trabajo que distinguen una propuesta ganadora de una descartada. Cubriremos los aspectos esenciales de QVAC: instalación del SDK, carga y ejecución de un modelo localmente, selección del modelo adecuado para la RAM disponible y configuración de las capacidades más premiadas en estas categorías: OCR, comprensión de documentos multimodales, RAG y llamadas a herramientas. También analizaremos dónde fallan los modelos pequeños y los patrones de validación y salida estructurada que garantizan su fiabilidad. La segunda parte trata sobre cómo programar con asistentes de IA sin entregar código defectuoso: cómo integrar tu asistente en el SDK real, por qué los métodos improvisados ​​son el fallo más común en las propuestas de hackathon y cómo realizar pruebas con entradas que no hayas seleccionado cuidadosamente. Trae un portátil: te irás con un modelo funcionando localmente y un esqueleto de proyecto sobre el que trabajar.

\> \*\*Attachment: attachment · txt · 12.0 KB\*\*  
\>  
\> Sí. Y ahora que sé qué hackathon es, cambia bastante mi lectura. Esta no es una hackathon genérica: Aleph tiene un historial bastante claro de premiar proyectos que pueden convertirse en productos reales, y además el ecosistema que la rodea está muy orientado a crypto, AI, infraestructura y startups.  
\>  
\> La edición a la que vas es el 22–23 de agosto de 2026, dura dos días, permite equipos de hasta 4 personas y prohíbe presentar trabajo previo sin aprobación: el código del proyecto tiene que empezar durante la hackathon.  
\>  
\> Lo primero: Aleph ya tiene bastante historial  
\>  
\> La primera edición fue en agosto de 2024\. Hubo 150 hackers y 54 builds según la página actual del evento; el recap de aquella edición habla de más de 300 hackers presenciales, casi 40 horas de desarrollo, 55 proyectos presentados y más de USD 100.000 en premios entre 12 sponsors. Llegaron a la final TornadoCodes, ValidAR y Certo, y los finalistas recibieron además grants, consultoría y aceleración.  
\>  
\> Después creció muchísimo:  
\>  
\> Edición	Hackers	Proyectos  
\> Ago. 2024	150	54  
\> Dic. 2024	125	37  
\> Mar. 2025	210	61  
\> Ago. 2025	660	194  
\> Mar. 2026	430	142  
\>  
\> Y en agosto de 2025 llegó a 1.300 builders, 320 proyectos y 25 chapters, convirtiéndose en el mayor hackathon de Latinoamérica por participación según Crecimiento.  
\>  
\> Eso me dice algo importante:  
\>  
\> No van a competir contra “otros estudiantes haciendo una app”.  
\>  
\> Van a competir contra gente que ya sabe perfectamente cómo construir para sponsors, pitchar y encontrar oportunidades dentro del ecosistema.  
\>  
\> Lo que ganó en las últimas ediciones  
\>  
\> Acá es donde se pone realmente interesante.  
\>  
\> Aleph 2025  
\>  
\> Los ganadores de los tracks fueron:  
\>  
\> Sportchain — Lisk  
\> Zuma — Zama  
\> Piggy Quiz — Base  
\> Acepay — Flare  
\> TuCausa — Filecoin  
\> Regalito — AI / Protocol Labs  
\> deliberation-agents-governance — Citrea  
\> ZKredit — ENS  
\> Micdrop — v0  
\> Elemgame Relay Symbiotic — Symbiotic.  
\>  
\> Y esto ya nos da un patrón muy bueno.  
\>  
\> Sportchain  
\>  
\> No era simplemente “una app Web3”.  
\>  
\> La propuesta era tokenizar infraestructura deportiva para permitir que personas puedan invertir y ser copropietarias de instalaciones deportivas latinoamericanas. El propio equipo explica que encontró dos problemas: déficit de infraestructura deportiva y pocas oportunidades de inversión accesibles para la clase media.  
\>  
\> Problema real → crypto tiene una función clara → modelo económico entendible.  
\>  
\> Piggy Quiz  
\>  
\> Este me parece especialmente importante para ustedes.  
\>  
\> Construyeron durante la hackathon una mini-app de trivia que enseña finanzas y blockchain utilizando:  
\>  
\> preguntas generadas con IA  
\> personajes  
\> gamificación  
\> rankings  
\> recompensas reales en USDC  
\> Base  
\> ENS  
\>  
\> Y ganó el primer premio del track Base.  
\>  
\> Esto es casi el ejemplo perfecto de:  
\>  
\> problema aburrido \+ experiencia divertida \+ IA \+ crypto \+ demo sencilla.  
\>  
\> No necesitaron inventar una blockchain.  
\>  
\> Elemgame  
\>  
\> Este proyecto también es MUY instructivo.  
\>  
\> Atacaron un problema concreto de juegos Web3:  
\>  
\> cada acción puede implicar gas y latencia.  
\>  
\> Construyeron una arquitectura en la que el jugador interactúa off-chain, una red de validadores procesa las acciones y luego el estado se liquida on-chain. El repo muestra explícitamente la arquitectura “gasless” y fue ganador del track Symbiotic.  
\>  
\> Otra vez:  
\>  
\> no metieron blockchain porque estaba de moda.  
\>  
\> Blockchain era parte de la solución del problema.  
\>  
\> Y marzo de 2026 nos da todavía más pistas  
\>  
\> En la quinta edición:  
\>  
\> AutoBounty — Avalanche  
\> Clever — Fiserv  
\> TreasuryPilot — GenLayer  
\> Consient — Biotech  
\> AlephRob — Robotics  
\> AutoBounty también ganó Best Project PL Genesis.  
\>  
\> Y acá aparece una tendencia muy clara.  
\>  
\> AutoBounty  
\>  
\> La idea:  
\>  
\> alguien publica un bounty de desarrollo → un developer hace un PR → un contrato inteligente basado en GenLayer analiza el código de GitHub para verificar si realmente se completó el trabajo → libera el pago en USDC sobre Avalanche.  
\>  
\> Ganó el track de Avalanche y Best Project PL Genesis.  
\>  
\> Fijate lo buena que es la estructura:  
\>  
\> Problema  
\> ↓  
\> ¿Cómo sé si el developer realmente hizo el trabajo?  
\> ↓  
\> AI / intelligent contract verifica  
\> ↓  
\> Blockchain ejecuta el pago  
\>  
\> Es prácticamente una demostración perfecta de AI \+ crypto.  
\>  
\> TreasuryPilot también me parece una pista gigantesca  
\>  
\> Es un bot de Telegram que ayuda a DAOs a manejar su treasury.  
\>  
\> Cuando alguien propone gastar fondos:  
\>  
\> propuesta  
\>    ↓  
\> reglas de la comunidad  
\>    ↓  
\> GenLayer verifica  
\>    ↓  
\> ¿cumple?  
\>    ↓  
\> sí / no  
\>  
\> Ganó el track de GenLayer.  
\>  
\> Y esto refuerza muchísimo algo de lo que te hablaba antes:  
\>  
\> AI \+ crypto funciona especialmente bien cuando la IA toma decisiones o verifica cosas y blockchain ejecuta/settlea esas decisiones.  
\> Y mirá Clever  
\>  
\> Clever ganó el track Fiserv y era una mini-app integrada al ecosistema Clover que ayudaba a los comercios a reconciliar ventas, liquidaciones y extractos bancarios.  
\>  
\> La explicación de su creador es bastante reveladora:  
\>  
\> los comercios reciben reportes, pero no pueden validar/reconciliar/entender realmente el dinero.  
\>  
\> Clever conecta ventas, liquidaciones y extractos y muestra dónde está cada peso y por qué.  
\>  
\> Esto demuestra otra cosa:  
\>  
\> Aleph no premia exclusivamente “crypto projects”.  
\>  
\> Premia también:  
\>  
\> tomar un problema empresarial tremendamente concreto y resolverlo con tecnología de forma convincente.  
\>  
\> Entonces, ¿qué creo que busca específicamente Aleph?  
\>  
\> Después de cruzar cinco ediciones, mi conclusión sería:  
\>  
\> 1\. Problema real  
\>  
\> No:  
\>  
\> “Mirá qué cool mi AI agent.”  
\>  
\> Sí:  
\>  
\> “Este problema actualmente cuesta X / tarda Y / genera Z.”  
\>  
\> 2\. Tecnología utilizada de forma necesaria  
\>  
\> Aleph tiene sponsors de:  
\>  
\> Base, Avalanche, GenLayer, Lisk, Protocol Labs, Zama, Fiserv, World, Solana, Polkadot, Uniswap, ZKsync, Arbitrum, Optimism, Polygon, etc.  
\>  
\> Eso significa que hay muchas puertas de entrada.  
\>  
\> La ventaja no es usar diez tecnologías.  
\>  
\> Es encontrar una tecnología que haga que tu solución sea posible.  
\>  
\> Ahora sí: ¿qué proyecto haría yo con ustedes?  
\>  
\> No quiero todavía darte “LA idea”.  
\>  
\> Quiero darte una dirección estratégica porque creo que sería más inteligente.  
\>  
\> Y la dirección que más me gusta para esta hackathon es:  
\>  
\> AI agents que pueden trabajar económicamente entre sí  
\>  
\> Por ejemplo:  
\>  
\> Usuario  
\>    ↓  
\> Agente principal  
\>    ↓  
\> ─────────────────────  
\> ↓          ↓         ↓  
\> Research   Finance   Execution  
\> Agent      Agent     Agent  
\> ─────────────────────  
\>         ↓  
\>      Payment  
\>         ↓  
\>       USDC  
\>  
\> Y crypto deja de ser una decoración.  
\>  
\> Es:  
\>  
\> pago  
\> identidad  
\> reputación  
\> settlement  
\> ownership  
\> incentives  
\> Te tiro una idea concreta  
\> Agent Bounty Market  
\>  
\> Imaginate una plataforma donde una persona puede decir:  
\>  
\> “Necesito que alguien haga esto.”  
\>  
\> Pero en lugar de contratar directamente a un freelancer:  
\>  
\> USER  
\>  ↓  
\> AI Agent  
\>  ↓  
\> crea bounty  
\>  ↓  
\> multiple AI / human agents compete  
\>  ↓  
\> work delivered  
\>  ↓  
\> AI verifies result  
\>  ↓  
\> blockchain releases payment  
\>  
\> Ejemplo:  
\>  
\> “Quiero una landing page para mi startup.”  
\>  
\> El sistema:  
\>  
\> crea el bounty;  
\> varios agentes/desarrolladores responden;  
\> un agente verifica requisitos;  
\> compara entregables;  
\> selecciona;  
\> paga automáticamente;  
\> genera reputación verificable.  
\> ¿Por qué me gusta para Aleph?  
\>  
\> Porque podría tocar varios temas que ya demostraron funcionar:  
\>  
\> AI  
\>  
\> Agentes que:  
\>  
\> generan trabajos  
\> analizan entregables  
\> evalúan código  
\> negocian  
\> verifican  
\> Crypto  
\> USDC  
\> escrow  
\> pagos  
\> reputación  
\> identidad  
\> GenLayer  
\>  
\> Puede hacer mucho sentido para verificación/decisión basada en información externa.  
\>  
\> Avalanche / Base  
\>  
\> Settlement y pagos.  
\>  
\> ENS / World  
\>  
\> Identidad/reputación.  
\>  
\> Protocol Labs  
\>  
\> Potencialmente infraestructura de agentes/datos.  
\>  
\> Y lo mejor:  
\>  
\> no necesitarían construir todo eso.  
\>  
\> El MVP puede ser extraordinariamente chico.  
\>  
\> El MVP real de 48 horas  
\>  
\> Yo haría únicamente:  
\>  
\> ┌─────────────────────────────┐  
\> │        CREATE BOUNTY        │  
\> │                             │  
\> │ "Build a Python API that    │  
\> │  extracts invoices..."      │  
\> │                             │  
\> │ Reward: 20 USDC             │  
\> └──────────────┬──────────────┘  
\>                ↓  
\>         AI AGENTS / USERS  
\>                ↓  
\>         SUBMIT SOLUTION  
\>                ↓  
\>        AI VERIFICATION  
\>                ↓  
\>       ✅ APPROVED / ❌ REJECTED  
\>                ↓  
\>              USDC  
\>  
\> Y durante el pitch:  
\>  
\> “Hoy pagar un trabajo digital requiere confiar en una persona o empresa para verificar si realmente fue realizado.”  
\>  
\> “Nosotros convertimos ese proceso en una máquina.”  
\>  
\> Eso me parece muchísimo más vendible que una app genérica de IA.  
\>  
\> Pero todavía iría un paso más allá  
\>  
\> Hay una pregunta que me obsesionaría:  
\>  
\> ¿Qué pasa cuando los agentes empiezan a contratarse entre ellos?  
\>  
\> Ejemplo:  
\>  
\> Startup Agent  
\>      ↓  
\> "Necesito analizar 10.000 documentos"  
\>      ↓  
\> Research Agent  
\>      ↓  
\> "Necesito OCR"  
\>      ↓  
\> OCR Agent  
\>      ↓  
\> "Necesito GPU"  
\>      ↓  
\> Compute Agent  
\>      ↓  
\> Pago  
\>  
\> De repente estás construyendo:  
\>  
\> una economía machine-to-machine.  
\>  
\> Y eso coincide muchísimo con hacia dónde están yendo los proyectos que ganan en ecosistemas como Aleph/GenLayer/Web3.  
\>  
\> Y acá hay algo que podría hacerlos destacar muchísimo  
\>  
\> Vos estás estudiando IA y ya tenés background de software.  
\>  
\> Yo aprovecharía eso para que no parezca una hackathon de blockchain con un chatbot pegado encima.  
\>  
\> Construiría un auténtico:  
\>  
\> Agentic workflow  
\>  
\> con:  
\>  
\> varios agentes  
\> tool calling  
\> evaluación  
\> decisiones  
\> memoria  
\> pagos  
\> reputación  
\>  
\> Y mostraría todo esto visualmente.  
\>  
\> El pitch podría ser brutalmente sencillo  
\>  
\> Imaginá la pantalla:  
\>  
\> “I need a developer to build an API.”  
\>  
\> Reward: 25 USDC  
\>  
\> ↓  
\>  
\> Tres agentes aparecen:  
\>  
\> Agent A  
\> $18  
\> 4.8⭐  
\> 92% completion  
\>  
\>  
\> Agent B  
\> $22  
\> 4.9⭐  
\> 97% completion  
\>  
\>  
\> Agent C  
\> $16  
\> 4.2⭐  
\> 88% completion  
\>  
\> Seleccionás.  
\>  
\> Trabaja.  
\>  
\> El agente entrega.  
\>  
\> Otro agente verifica.  
\>  
\> Y:  
\>  
\> PAYMENT RELEASED  
\>  
\> Transacción en blockchain.  
\>  
\> Después:  
\>  
\> Reputation updated  
\>  
\> Eso es una demo que un juez entiende sin explicar 15 minutos de arquitectura.  
\>  
\> Y todavía podemos buscar algo mejor  
\>  
\> Porque ahora tenemos suficiente información para hacer algo bastante más serio.  
\>  
\> Ya sabemos que en las últimas ediciones Aleph premió cosas como:  
\>  
\> SportChain → tokenización \+ problema real.  
\>  
\> Piggy Quiz → AI \+ gamificación \+ USDC \+ onboarding.  
\>  
\> Elemgame → infraestructura blockchain resolviendo UX.  
\>  
\> AutoBounty → AI verificando trabajo \+ pago automático.  
\>  
\> TreasuryPilot → AI verificando decisiones financieras.  
\>  
\> Clever → automatización de un problema empresarial real.  
\>  
\> Y eso produce un patrón que me parece muy fuerte:  
\>  
\> Aleph parece premiar el punto donde una tecnología nueva modifica una interacción económica o productiva real.  
\>  
\> No simplemente una app novedosa.  
\>  
\> Y hay un detalle muy importante para esta edición  
\>  
\> La página actual enumera como partners, entre otros, Base, BNB Chain, GenLayer, Avalanche, Lisk, Protocol Labs, Zama, World, Solana, Polkadot, ZKsync, Arbitrum, Optimism, Polygon, MetaMask, Fiserv, Rain, Uniswap, Wormhole, LI.FI, Mantle y varios más.  
\>  
\> Eso significa que yo no cerraría todavía la idea.  
\>  
\> Esperaría a tener el listado exacto de tracks/prize pools de agosto 2026 y estudiaría cada sponsor como si fueran oportunidades de negocio.  
\>  
\> Porque una idea que pueda competir en:  
\>  
\> AI \+ GenLayer \+ Base \+ Protocol Labs  
\>  
\> podría tener muchísimo más upside que una que solo pueda ganar un premio general.  
\>  
\> Y además la propia organización dice que la edición de marzo de 2026 tuvo 142 proyectos y más de 800 participantes, mientras que ahora la sexta edición se plantea como otro sprint de 48 horas con equipos compitiendo ante el mismo jurado.  
\>  
\> Mi siguiente movimiento sería hacer justamente eso: agarrar cada sponsor/track confirmado de Aleph agosto 2026, investigar qué premia cada uno, qué proyectos han ganado esos ecosistemas en otras hackathons y construir una matriz de 20–30 ideas posibles, puntuándolas por originalidad \+ impacto \+ dificultad en 48h \+ potencial de ganar varios tracks \+ calidad del demo. Ahí recién elegiría el proyecto.

\> \*\*Attachment: attachment · txt · 11.7 KB\*\*  
\>  
\> \# Aleph Hackathon Hacker’s Manual  
\>   
\> \`\*// Hacking is about to begin\!  
\> Prepare for Aleph Hackathon (August 22-23)\*\`  
\>   
\> \<aside\>  
\> 📚  
\>   
\> 1\. Get started with hackathons  
\> 2\. Hackathon setup  
\> 3\. Agenda  
\> 4\. Mentors  
\> 5\. Tracks & Bounties  
\> 6\. How to submit on DoraHacks (on Sunday)   
\> 7\. Judging & Demo  
\> 8\. Frequently Asked Questions  
\> 9\. Contact & Useful links   
\> \</aside\>  
\>   
\> \# Get started with hackathons  
\>   
\> \*\*\`What’s a hackathon\`\*\*  
\>   
\> A hackathon is an event where participants team up to build a \*\*project that solves a specific problem.\*\*  
\>   
\> Hackathons usually have \*\*themes or problem statements\*\* called \*tracks\*  
\>   
\> 👉 Each track is sponsored by a company \*\*\*\*that offers a \*\*bounty (prize)\*\* for the best solution using their tools or solving their challenge.  
\>   
\> \*\*\`Guidance\`\*\*   
\>   
\> During the hackathon, there might be \*\*talks & workshops led by sponsors\*\* to explain their technology and provide ideas for your project.   
\> You’ll also find \*\*mentors\*\* who guide you, not just technically, but also in shaping your idea, business plan, and presentation.  
\>   
\> \*\*\`Demo\`\*\*  
\>   
\> At the end, each team delivers a \*\*demo video\*\* (usually 2/3 minutes) showing:  
\>   
\> \- the problem  
\> \- how the project is solving it  
\> \- the business/impact plan  
\>   
\> \*\*\`Judging\`\*\*  
\>   
\> A panel of judges evaluates the demos and select winners based on clarity, usefulness, execution, presentation and potential impact \*(see our criteria here)\*  
\>   
\> \*\*\`Prizes\`\*\*   
\>   
\> Winning teams often get:  
\>   
\> \- Cash prizes (most common)  
\> \- Funding to keep building  
\> \- Opportunities with accelerators or investors  
\>   
\> Check out this \*\*great tweet\*\* (in Spanish) if you want to know more about hackathon.  
\>   
\> \# Hackathon setup (super important)  
\>   
\> 1️⃣ Make sure that you and all your team (if you already have one) have completed the \*\*Application Form\*\* & got approved   
\>   
\> 2️⃣ Join our \*\*Telegram group chat\*\* (we’ll be sharing all the important information/updates there). If you don’t have an account yet, make sure to download the app right now   
\>   
\> 3️⃣ Create an account on \*\*Hacki.\*\* This is our hackathon platform, where you’ll submit your project on Sunday.   
\>   
\> \#\#\# \`Looking for a team?\`  
\>   
\> \- Send a message in the “Team formation” topic on our Telegram group chat. Introduce yourself and share your ideas\!  
\>   
\> \# Agenda  
\>   
\> \#\#\# 👋 Opening Ceremony  
\>   
\> \---  
\>   
\> \- \*\*Aleph Hub (Buenos Aires):\*\* for everyone joining us at our hub, we’ll be hosting an in-person Opening Ceremony. Registration opens at 10 AM, and the ceremony starts at 11.30 AM. Check out the full agenda of Aleph Hub here  
\> \- \*\*Chapters (across LATAM & beyond):\*\* your local chapter organizers may have prepared an IRL ceremony. Check directly with them via the event page or your chapter’s group chat.  
\> \- \*\*Online:\*\* to ensure accessibility for everyone (location, time zones & languages), we’ll be sharing an opening ceremony live at 11.30 AM (Argentina time) unveiling all the hackathon details (bounties, rules, agenda, etc). This ceremony will be streamed and stored on both Twitter and YouTube so you can watch it whenever you want.  
\>     \- \*\*\*➡️\*\* Streaming available on \*\*Crecimiento’s YouTube Channel\*\* and our \*\*X/Twitter\*\*\*  
\>   
\> \#\#\# 📬 Project submission  
\>   
\> \---  
\>   
\> Projects will have to be submitted on \*\*Sunday, August 23 before 12 PM\*\* (Argentina time) on Hacki (see dedicated section on this Hacker’s Manual)  
\>   
\> \#\#\# 🏆 Closing Ceremony  
\>   
\> \---  
\>   
\> The Closing Ceremony will be streamed \*\*on Sunday at 6 PM\*\* (Argentina time). Winners will be announced there\! It will be available live and on replay.  
\>   
\> \*\*\*➡️\*\* Streaming available on \*\*Crecimiento’s YouTube Channel\*\* and our \*\*X/Twitter\*\*\*   
\>   
\> \# Mentors  
\>   
\> To make this hackathon accessible for everyone, whether you’re a beginner or more senior, we’ve curated a list of of mentors, sorted by ecosystem, languages or expertise  
\>   
\> \<aside\>  
\> 👉  
\>   
\>  \*\*Check out our Mentor’s Directory here\*\*   
\>   
\> \</aside\>  
\>   
\> \#\#\# \*\*\`Reach out to our mentors\`\*\*  
\>   
\> \- \*\*Agnostic mentors\*\*: open the Mentor’s Directory, find the mentor that suits you and book a slot in their Calendly  
\> \- \*\*Sponsors’ mentors:\*\* they are pinned in the sponsor’s dedicated topic in our \*\*Telegram group chat\*\*  
\> \- \*\*In-person mentors:\*\* for those hacking from chapters\!  
\>   
\> \# Tracks & Bounties  
\>   
\> \#\#\# \*\*\`Build anything that excites you\`\*\*  
\>   
\> This is not your typical hackathon. Aleph Hackathon is about pushing boundaries, experimenting with frontier tech, and proving why LATAM is a global crypto & innovation powerhouse.   
\>   
\> You choose what to build. We bring the best mentors, resources, and a massive prize pool to fuel your vision.  
\>   
\> \#\#\# \*\*\`Prizes\`\*\*  
\>   
\> Participants will compete for \*\*exclusive bounties offered by our partners.\*\* These bounties challenge participants to tackle specific problems, offering exciting opportunities to earn even more rewards.  
\>   
\> \*\*Total prize pool is \+$6,000 USD\*\*   
\>   
\> \- \*\*WDK Track\*\*, up to 1,500 USD  
\>     \- \*See more details in Hacki soon\*  
\> \- \*\*Pears Track,\*\* up to 1,000 USD  
\>     \- \*See more details in Hacki soon\*  
\> \- \*\*QVAC Track, up to 2,000 USD\*\*  
\>     \- \*See more details in Hacki soon\*  
\> \- \*\*General\*\* \*\*Track\*\*, up to 1,000 USD  
\>     \- \*See more details in Hacki soon\*  
\>   
\> \<aside\>  
\> 💡  
\>   
\> “\*Up to\*”  because sponsors reserve the right not to grant the full bounty if submissions don’t meet expectations  
\>   
\> \</aside\>  
\>   
\> \# \*\*How to submit your Project\*\*  
\>   
\> \<aside\>  
\>   
\> 💡 Everyone in your team needs a Hacki account.  
\>   
\> \</aside\>  
\>   
\> \#\#\# \*\*\`Minimum Submission Requirements\`\*\*  
\>   
\> \- You must submit a \*\*3-minute demo video in English\*\* showcasing your project (you will not pitch your projects live to our judges). Here’s a short guide on how to give a killer pitch. \*Tip: for a successful demo, address the judging criteria below.\*  
\>       
\>     💡 If English is a problem for you:  
\>       
\>     \- Prepare your speech in Spanish, translate it into English, and read it (trying to keep it natural)  
\>     \- Or, if that’s REALLY not possible, do your demo in Spanish and add English subtitles (making sure they are accurate, especially with technical words)  
\>   
\>                   \*\*\*NB\*\*: this could have an impact on your project’s final note\*   
\>   
\> \- Provide a public link to the \*\*open-source code.\*\* Startups can apply with a new feature but, code must be open-source. We recommend including a Readme with information about the project.  
\> \- When submitting, don’t forget to \*\*select on DoraHacks the Tracks/Bounties you’re applying for.\*\* Make sure to explain in your application which bounties you’re applying to and the contracts you’re submitting.  
\> \- If you deploy a contract, the \*\*contract address\*\* must be provided.  
\> \- You must submit \*\*before Sunday, August 23 at 12 PM\*\* (Argentina time)  
\>   
\> \#\#\# \*\*\`Steps to follow\`\*\*  
\>   
\> \*\*Password\*\*: Aleph-hackathon26 (with a capital “A”)  
\>   
\> 1\. Go to \*\*Aleph Hackathon en DoraHacks\*\*  
\> 2\. Then \`create new BUIDL\`.  
\> 3\. Complete Name, Description, and all of your projects’ info.  
\> 4\. Be sure to include your team members information when submitting your project (you can do so by adding their emails in the \`Team Member\` section). It’s very important that you make sure all of them are registered and logged in individually on the platform, and their information included in the final submission.   
\> 5\. Add your \*\*Github\*\* \*\*repo\*\* link and \*\*Demo video\*\* link  
\> 6\. Complete the additional questions  
\> 7\. Hit \`Submit\`\!   
\> 8\. You should now see your project in \`Profile\` \> \`BUIDL\`  
\>   
\> If you need to make changes to your project, just click \`Profile\` \> \`BUIDL\` \> \`Edit\` to update your BUIDL information.  
\>   
\> \# \*\*Judging & Demo\*\*  
\>   
\> \#\#\# \*\*\`When\`\*\*  
\>   
\> \- \*\*Submissions\*\* are due on Sunday 23rd at 12:00 PM (Argentina time)  
\> \- \*\*Judging\*\* will begin on Sunday 23rd at 1:00 PM (Argentina time)  
\> \- The \*\*Closing\*\* \*\*Ceremony\*\* will be streamed on Sunday at 5:00 PM (Argentina time)  
\>   
\> \#\#\# \*\*\`How\`\*\*  
\>   
\> \- Judging will be conducted \*\*entirely online, async\*\* and in \*\*English\*\*.  
\> \- To participate, you must submit a \*\*3-minute demo video in English or Spanish with subtitles in English\*\*, showcasing your project (you will not pitch your projects live to our judges)  
\> \- Our \*\*judges and bounty partners\*\* will review all submissions and select the winning projects.  
\> \- For detailed instructions on video submissions, refer to \*\*DoraHacks’ submission guide\*\*.  
\> \- \*\*Prize payouts\*\* will be processed within \*\*30-60 days\*\* after winners are announced, operated directly by the sponsors themselves (not Crecimiento)  
\>   
\> \#\#\# \`Judging Criteria\`  
\>   
\> Make sure to check the criteria of the sponsors’ bounties you’re applying to \*(see sponsor’s dedicated section on\* Hacki\*)\*  
\>   
\> Projects submitted will be judged based on the following criteria:  
\>   
\> \- \*\*Technicality\*\*  
\>     \- What technical challenges does the project address?  
\>     \- Does it demonstrate advanced problem-solving and engineering skills?  
\>     \- Is the solution complete and functional, or does the team have a clear plan on how they would finish it?  
\> \- \*\*Originality\*\*  
\>     \- Is the project innovative and unique?  
\>     \- Does the project address specific pain points?  
\>     \- Does it propose a new solution or a creative approach to an existing problem?  
\> \- \*\*UI/UX/DX:\*\*  
\>     \- How user-friendly and accessible is the project?  
\>     \- Is the user interface, user experience, and developer experience well-designed and intuitive?  
\> \- \*\*Practicality:\*\*  
\>     \- How practical and feasible is the project?  
\>     \- Does it have real-world applications, and can it be implemented effectively?  
\> \- \*\*Presentation:\*\*  
\>     \- Is the project clearly explained and well-presented?  
\>     \- Does the team communicate their idea effectively through their pitch, demo, and supporting materials?  
\>   
\> A successful project addresses all judging criteria. Each project will be rated on a scale of 1 to 5 across these criteria.   
\>   
\> \# Frequently Asked Questions (FAQ)  
\>   
\> \- \*\*How many hackers are allowed in my team?\*\*  
\>       
\>     Each team can have up to 4 members. If you wish to hack individually, that is also possible.  
\>       
\> \- \*\*I’m already part of a team, do I still need to sign up for the hackathon?\*\*  
\>       
\>     Yes, each team member must submit an individual application and have their own Dorahacks account  
\>       
\> \- \*\*Can I use pre-existing work?\*\*  
\>       
\>     Presenting pre-existing projects is not allowed. Work must officially begin when the hackathon starts. Otherwise, you will be disqualified (no exception, everything will be checked). Startup features count, but the pre-existence rule applies: the code must be created from scratch.  
\>       
\> \- \*\*Can I apply to multiple bounties/tracks?\*\*  
\>       
\>     Not sure which track to choose? Well, good news\! \*\*You can apply to one OR several of them\!\*\* Keep in mind:  
\>       
\>     \- You must meet the requirements of each sponsor  
\>     \- Be reasonable in your choice  
\> \- \*\*Do I have to pitch my project live to judges?\*\*  
\>       
\>     Nope, judging will be async\! When submitting your project on DoraHacks, you will add a \*\*3-minute demo video\*\* showcasing your project \*\*in English\*\* (our judges are international and some don’t speak Spanish/Portuguese)  
\>       
\> \- \*\*Where can I read more about the hackathon rules?\*\*  
\>       
\>     \*\*Here\*\* you can check our hackathon rules & code of conduct (you better check it out, some rules can be very decisive for your project 🤫)  
\>       
\> \- \*\*Why is everything is English?\*\*  
\>       
\>     That’s a very good question\! This hackathon is for all of Latin America, which also means we’ll have hackers joining from Brazil and around the world. On top of that, many of our track partners and judges are international and don’t speak Spanish. So English becomes our common ground :)  
\>       
\>   
\> \# Contact & Useful links  
\>   
\> \- \*\*\`Telegram\`\*\*: Aleph Hackathon (make sure you have a Telegram account — all hackathon communications will happen there 🚨)  
\> \- \*\*\`Twitter\`\*\*: @alephhackathon  
\> \- \*\*\`Hacki\`\*\*: Check out our Hacki page (that’s our hackathon platform. You’ll submit your project there)

\> \*\*Attachment: attachment · txt · 5.1 KB\*\*  
\>  
\> over the past year I've seen kids drop  
\> out of college get funded by silicon  
\> Valley's biggest VCS and build million  
\> dooll startups and they did this all at  
\> the events that we run called hackathons  
\> but I've personally given away over a  
\> million dollars to contestants and in  
\> this video I'm going to give you the  
\> five top tips to win a hackathon and I'm  
\> afraid that if you can't spend 5 minutes  
\> to get $50,000 worth of free advice then  
\> I've got news for you you're not going  
\> to make it tip number one is what I like  
\> The Lockbox Method  
\> to call the lockbox method reason it's  
\> called that is cuz it's named after a  
\> team that used this method to win three  
\> hackathons in a row some people are just  
\> at hackathons for the free food I'm here  
\> for the free food that's a common joke  
\> that people often make you've got to  
\> show that you're actually there for  
\> their technology and that you want to  
\> build this into a real startup you have  
\> to make sure that the judges know who  
\> you are and that you're in it to win it  
\> The AA Method  
\> tip number two is called the AA method I  
\> call it the AA method because it's named  
\> after two hackathon winners who won five  
\> hackathons in a row and have taken away  
\> over $100,000 from these hackathons so  
\> what did they do they created something  
\> visually impressive and something that  
\> stood out every time that they came to a  
\> hackthon they built something that was  
\> tangible something that you could see  
\> they used mobile apps and showed what  
\> they'd actually done physically there so  
\> that people could play with it it just  
\> made a massive massive difference and  
\> stood out from everybody else when you  
\> go up on stage you're going to be  
\> pitching up against at least 15 other  
\> teams so you've got to do something that  
\> will make you stand out tip number three  
\> Come up with the idea  
\> is to come up with the idea before the  
\> hackathon hackathon is only about 36  
\> hours long maybe 48 so you've got to do  
\> yourself a favor and come up with your  
\> idea before you actually turn up at the  
\> hackathon itself every hackathon judge  
\> is going to love it if before the  
\> hackthon you've actually invested your  
\> own time in figuring out what the  
\> technology is all about what it can do  
\> and what problem am I going to solve in  
\> doing so you're going to finalize your  
\> idea within the first hour as opposed to  
\> spending the first 10 hours actually  
\> figuring out what an earth you even  
\> going to build in the first place tip  
\> Start coding  
\> number four is to start coding as soon  
\> as possible obviously you already know  
\> that but it's ties back to my previous  
\> point if you've already got your idea  
\> and you've come to the hackthon prepared  
\> you're going to be so far ahead of  
\> everybody else take these guys Emy and  
\> JJ they're absolute hackthon pros and  
\> they've just got into YC whenever  
\> they've come to hackthon they've just  
\> sat down at their desks and known  
\> exactly what to do they've come with the  
\> idea and all they had to do was start  
\> coding they didn't even need an hour to  
\> come up with the idea you don't  
\> necessarily need to be coding you could  
\> be making a presentation you could be  
\> doing one of the no code tracks but if  
\> you are coding please just start as soon  
\> as possible  
\> Dont miss the deadline  
\> last point I'm going to make is the  
\> fifth and final Point don't miss the  
\> deadline I've seen so many talented  
\> teams who submit late because they're  
\> just trying to perfect that one thing in  
\> reality they probably could have even  
\> won the whole hackathon but because they  
\> were perfectionists and they wanted to  
\> get every single thing absolutely right  
\> they submitted late or didn't even  
\> submit at all there are teams that every  
\> hackathon who submitted 12:01 1205  
\> sometimes even at 12:30 when the  
\> deadline was at 12 look we're not trying  
\> to be super harsh for the sake of being  
\> harsh it just makes it really really  
\> difficult for us to judge if people are  
\> submitting at different times plus  
\> taking that extra 5 minutes to submit at  
\> 12:05 is probably not going to make the  
\> difference between winning and losing  
\> Its not about perfection  
\> part of the point that I'm trying to  
\> make is that a hackathon is not about  
\> perfection it's not about creating a  
\> perfect product a hackthon is about  
\> hacking something together within the  
\> time constraints that you have the 36  
\> hours or sometimes maybe 48 hours I like  
\> to explain this in terms of 10 steps  
\> let's say that there are 10 steps  
\> towards build building a perfect product  
\> at a hackathon you can maybe do steps  
\> one and two maybe just about step three  
\> but there's no way you're getting  
\> anywhere near step 10 so get that out of  
\> your mind when the time comes for the  
\> deadline even if you've only got the  
\> first one to two steps ready that's fine  
\> just submit it and that's all that you  
\> need to do at a hack Bon for those of  
\> Outro  
\> you who've made it to the end  
\> congratulations you're ahead of 99% of  
\> people who won't have watched this far  
\> I've honestly seen people take these  
\> five tips and apply them to go from  
\> knowing nothing and raising millions of  
\> dollars for their first startup it  
\> really is that simple so if you want to  
\> come and apply these principles at our  
\> next haon sign up by the link in the  
\> description and I'll see you there

\> \*\*Attachment: attachment · txt · 9.8 KB\*\*  
\>  
\> 0:000 segundosson las 5 y 10 de la mañana me voy de camino A Lisboa a participar en el hakadot de y tiene un global Lisboa  
\> 0:099 segundospara que no sepa lo que es un jaquetón es una competición en la que tú vas como hacker a programar tienes un hacker de que vayas yo que sé hackear Google o Facebook sino que vas a programar y  
\> 0:1818 segundosdesarrollar Pues un producto un proyecto en un par de días en este caso tres días programando y Hemos llegado el jueves la jacatón termina el domingo con la  
\> 0:2525 segundosentrega de los proyectos y vamos a ir ahora mismo a un café a conocer a otros hackers a hacer compañeros de a ver si conseguimos reclutar a un miembro más que nos falta porque somos un momento  
\> 0:3434 segundoscuatro nos ha fallado uno está buscando un desarrollador fronte para este evento como ya os he dicho antes los Princess que están sorteando a día de hoy Son más  
\> 0:4141 segundosde 275 mil dólares es decir hay una pasta en juego Hay un montón de gente muy top a programar y a desarrollar os iré enseñando Y bueno pues ahora Iremos  
\> 0:4949 segundosel café ese a ver si conocemos a otros hackers y luego os presentaré a mi equipo vamos a ver cómo va esto  
\> 1:011 minuto y 1 segundoBueno chicos pues ya estamos en el café me han dado ya la pulsera para que se levantó esta tarjetita donde pone global y aquí  
\> 1:091 minuto y 9 segundosmi nombre y mi rol que soy de hacker y bueno manda una bolsita con vosotros mientras para mis compañeros madre mía vale empezamos  
\> 1:161 minuto y 16 segundostenemos aquí un imán es un Swap esto de lo que hace así pues para apoyar el móvil de verdad que bastante Guay Ah  
\> 1:241 minuto y 24 segundosViene un montón de cosas esto que es de sismo que no sé qué es exactamente 6 luego tenemos para una libretita para  
\> 1:311 minuto y 31 segundosapuntar para exposición vale camiseta de elemento que luego la enseñaré solamente la llevé algún día  
\> 1:391 minuto y 39 segundoselemento porque al final voy a estar encerrado pegatinas que ordenador viene geniales con comida  
\> 1:471 minuto y 47 segundossardinas nos han dado comidas sardinas y a ver más pegatinas por aquí  
\> 1:541 minuto y 54 segundosy creo que es esto y una taza bastante bastante Guay no sé pone bastante bastante Guay aquí la bolsita  
\> 2:032 minutos y 3 segundosvale tengáis una muy Guay esto suele pasar mucho en estos eventos que te regalan un montón de merchandising y más en este caso Pero bueno pues para  
\> 2:102 minutos y 10 segundosempezar nada mal ya tenemos ya voy a tomar algo y comer un poco que tengo mucha hambre con las 11 de la mañana y no he comido nada así que nada voy a  
\> 2:182 minutos y 18 segundosguardar la comida y nos vemos luego estamos allí primer elemento trabajando a tope es el evento va a estar bastante  
\> 2:262 minutos y 26 segundosbastante lleno mucha gente mucho ambientes muy ambiciosa estamos ya desarrollando la idea del proyecto estamos ultimando si vamos a irnos por  
\> 2:342 minutos y 34 segundosotra ya os contaré cuál elegimos avanzando Pero bueno la verdad es que pinta muy Guay Aunque pintan los días de trabajar a full bastante nervioso este  
\> 2:412 minutos y 41 segundossacado un va a estar interesante muchísima gente que la primera vez que vine zaguetón de nada  
\> 2:552 minutos y 55 segundosAh pues bueno pues hemos entrado en la zona de donde conseguir comida y bebida y voy a alimentar todos estos tres días  
\> 3:023 minutos y 2 segundosvoy a poner un café Bueno chicos son las 12 de la noche por  
\> 3:113 minutos y 11 segundosfin hemos elegido ya el tema que vamos a hacer jacatón hemos tenido muchísimos problemas hemos tenido aplicaciones el tema está listo ya os contaré Qué es porque si cambia de repente Pero bueno  
\> 3:193 minutos y 19 segundoshemos tardado más de lo que nos gustaría muchísimo más de lo que nos gustaría y nada ahora ya va a tocar y no programar os voy a enseñar un poquito por favor lo que hemos estado codificando programando  
\> 3:283 minutos y 28 segundosque se escribe un par de visitas ya no de códigos sino de diseño para que veáis algunas herramientas como esto  
\> 3:363 minutos y 36 segundos\[Música\]  
\> 3:403 minutos y 40 segundoscomo veis no hay nada especial Es simplemente como un diseño de dos ventanas pero básicamente el caso de uso que va a utilizar el usuario principal y una vez eso Pues a la hora que  
\> 3:483 minutos y 48 segundosdesarrolla todo la idea el encargado de Front va a hacer toda la parte de fronte del diseño y yo me encargaré también por la parte de programación del Back en la parte de atrás probando esa pesa con mi  
\> 3:563 minutos y 56 segundoscompañero nervioso sí queremos que haya muchos problemas ya os iré informando Pero bueno hasta las 12 de la noche creo que hoy no se duerme y yo creo que mañana tampoco aquí tenéis a mis tres  
\> 4:044 minutos y 4 segundosjoyitas de la corona uno de los 20 y vamos a empezar ya con el desarrollo tocho fijaos que la gente sigue aquí y  
\> 4:134 minutos y 13 segundosla gente va a seguir hasta tarde o sea que pinta noche intensa  
\> 4:204 minutos y 20 segundosson las 7 de la mañana en tres días he dormido  
\> 4:274 minutos y 27 segundos3 horas en la cara se siente que se me está yendo la cabeza Siento que estoy delirando Porque estoy muy cansado tío  
\> 4:334 minutos y 33 segundosdormí muy poco y mi garete está a punto de explotar a las 9 entregaremos el proyecto una vez Después de terminar todo el proceso de no haber dormido  
\> 4:414 minutos y 41 segundoshaber programado tienes que presentar la idea entonces iremos a eso iremos qué tal no has quedado tan Guay como pensamos no que no se ha podido  
\> 4:504 minutos y 50 segundosimplementar todo pero bueno es que viendo lo que estamos haciendo ahora y escribiendo como el informe de que habéis hecho esa era demasiado ambicioso  
\> 4:574 minutos y 57 segundosera hemos pecado un poco de ambición terminamos bastante tiempo diciendo que íbamos a hacer como 8 horas que esas 8 horas ahí habían cuatro horas de sueño  
\> 5:055 minutos y 5 segundosse ASUME O sea no se puede hacer nada más Y bueno pues ya os iré contando como acaba lento como quedamos pero pinta mal la pintaba también como al principio  
\> 5:135 minutos y 13 segundosvamos ahora ya en la parte final está la parte más como importante y es la parte más rollo Porque después de haber estado programando durante tres días tenemos que estar ahí y presentar nuestros  
\> 5:225 minutos y 22 segundosproyectos pues al Jurado y al Jurado de cada empresa para que valoren nuestro proyecto y te lleva chicos Bueno voy a meterme un poquito más técnico nuestro proyecto es un sistema en lo que te  
\> 5:315 minutos y 31 segundospermite es voy a intentar ser muy técnico lo que te permite es pedir prestado dinero utilizando como como aval vale tu cuenta tu cuenta en este caso del tema blockchain de una red  
\> 5:395 minutos y 39 segundosllamada handle Es como si digamos que tú por dejar tu cuenta de Instagram o yo te dejo mi cuenta de tiktok cómo va y me dan un préstamo de 1000 € para poder hacer un vídeo para irme a Japón a  
\> 5:485 minutos y 48 segundosgrabar contenido es un poco la idea que estamos haciendo y hemos desarrollado está semi completada yo diría implementarlo todo pero bueno vamos a  
\> 5:555 minutos y 55 segundosver qué pasa y ya os contaré  
\> 5:585 minutos y 58 segundos\[Música\]  
\> 6:026 minutos y 2 segundosacabamos de hacer la primera presentación del proyecto no ha ido volveremos lo que tal y ahora vamos a hacer la Grande los jueces tochos para  
\> 6:106 minutos y 10 segundosintentar Acceder al top 10 veremos vamos a registrarnos  
\> 6:186 minutos y 18 segundosa punto de entrar a nuestro juicio final esto es como el top y nada nerviosos  
\> 6:256 minutos y 25 segundosestoy en mi equipo y vamos a ver qué pasa Bueno chicos Pues  
\> 6:336 minutos y 33 segundosnos acabamos de enterar que del premio final no vamos a ganar nada del grande grande grande no estoy triste ni para nada según queda también otros premios  
\> 6:406 minutos y 40 segundosque son como los de los partners vale Y bueno va a empezar Ya la entrega premios principales  
\> 6:536 minutos y 53 segundos\[Aplausos\]  
\> 6:596 minutos y 59 segundosPero ahí no estamos  
\> 7:017 minutos y 1 segundo\[Música\]  
\> 7:177 minutos y 17 segundoslejos  
\> 7:297 minutos y 29 segundosPues tampoco entramos aquí  
\> 7:437 minutos y 43 segundos\[Aplausos\]  
\> 7:547 minutos y 54 segundos\[Aplausos\]  
\> 8:108 minutos y 10 segundos\[Música\]  
\> 8:128 minutos y 12 segundos\[Aplausos\]  
\> 8:208 minutos y 20 segundos\[Aplausos\]  
\> 8:228 minutos y 22 segundosvale el segundo el tercero  
\> 8:328 minutos y 32 segundos\[Música\]  
\> 8:428 minutos y 42 segundos\[Aplausos\]  
\> 8:468 minutos y 46 segundos\[Música\]  
\> 8:498 minutos y 49 segundoschicos  
\> 8:538 minutos y 53 segundos\[Aplausos\]  
\> 8:568 minutos y 56 segundos\[Música\]  
\> 9:009 minutosBueno chicos pues la competición ya ha terminado como habéis visto al final ya hemos terminado el proyecto pensábamos que no íbamos al final llegar nada  
\> 9:099 minutos y 9 segundoslo íbamos a ganar nada el concurso se establecía con varias opciones teníamos para ser como el de los 10 mejores proyectos de todo el evento habían 197  
\> 9:189 minutos y 18 segundosparticipantes y luego los sponsors pues tenían como sus pequeños premios esos pequeños premios hemos ganado dos premios y la verdad que para ser mi  
\> 9:269 minutos y 26 segundossegundo jacatón en esto estoy súper súper emocionado estoy súper súper feliz estamos con el equipo celebrando ahora un poco celebrándolo después de estar  
\> 9:349 minutos y 34 segundosmás de tres días durmiendo nada o sea absolutamente nada estamos reventados y vamos a ir ahora a celebrarlo a  
\> 9:429 minutos y 42 segundosdisfrutar de esta Avenida Victoria y bueno en nada Nos iremos otra vez ya para mañana nos volvemos a Valencia y Bueno chicos pues aquí deciros que mil  
\> 9:519 minutos y 51 segundosgracias me voy a dormir ya a celebrar como siempre despedirme diciendo que os quiero mucho Que sois los mejores y poquito más  
\>   
\> Sincronizar con el tiempo del vídeo

\> \*\*Attachment: attachment · txt · 9.7 KB\*\*  
\>  
\> Intro y contexto de la hackathon  
\> 0:06  
\> Hoy tenemos una jacatón con la gente de  
\> 0:09  
\> Release Before Ready. Es una jacatón que  
\> 0:11  
\> nosotros patrocinamos muchas veces. Este  
\> 0:13  
\> año vamos a patrocinar varias, tanto  
\> 0:16  
\> aquí en San Francisco como en Ciudad de  
\> 0:17  
\> México como en Colombia. Vamos a ver  
\> 0:19  
\> cómo nos va. Voy a intentar hacer un  
\> Proyecto: clonación de voz en español con modelo fine-tuned  
\> 0:20  
\> proyecto que llevo trabajando en varios  
\> 0:22  
\> hacatones desde hace como 6 meses y es  
\> 0:27  
\> hacer una versión fine tunedo  
\> 0:31  
\> open source para hacer clonaciones de  
\> 0:34  
\> voz optimizadas para el español. Como  
\> 0:36  
\> nosotros tenemos tanta data de  
\> 0:38  
\> grabaciones en español, yo me llevo  
\> 0:40  
\> grabando a mí mismo en todas mis  
\> 0:42  
\> reuniones por el último año más o menos,  
\> 0:45  
\> recopilando información, recopilando  
\> 0:47  
\> audio y data. Y mi objetivo es crear un  
\> 0:50  
\> modelo que esté específicamente diseñado  
\> 0:52  
\> para el idioma español en speech to  
\> 0:54  
\> speech. Normalmente \[resoplido\] los  
\> 0:55  
\> modelos cuando uno hace agentes de voz  
\> 0:58  
\> funcionan text to speech, hay un modelo  
\> Explicación de modelos speech-to-speech vs text-to-speech  
\> 1:00  
\> de lenguaje, un ll speech to text.  
\> 1:03  
\> Entonces se utilizan los tres, pero hay  
\> 1:04  
\> otro tipo de modelos como el Persona  
\> 1:06  
\> Plex de Nvidia o Google también tiene  
\> 1:08  
\> uno nuevo que son speech to speech.  
\> 1:11  
\> Entonces hacen esos tres pasos,  
\> 1:12  
\> convierten el audio a texto, procesan y  
\> 1:15  
\> devuelven sonido en un solo modelo. Eso  
\> 1:18  
\> es lo que estoy tratando de construir,  
\> 1:19  
\> pero enfocado  
\> 1:21  
\> en el idioma español, que es obviamente  
\> 1:24  
\> nuestro nuestro foco en este momento.  
\> Progreso del proyecto y uso de modelos open source (Qwen)  
\> 1:26  
\> Entonces, ya llevo como cuatro jacatones  
\> 1:28  
\> trabajando en el proyecto. Es un  
\> 1:29  
\> proyecto grande, o sea, no es algo que  
\> 1:30  
\> voy a lograr en 6 horas porque también  
\> 1:32  
\> tiene mucho procesamiento de la data que  
\> 1:35  
\> tengo de mis de mis grabaciones y de mi  
\> 1:37  
\> audio. Entonces, vamos a ver hoy qué  
\> 1:39  
\> tanto puedo avanzar. Espero tener hoy ya  
\> 1:41  
\> completa la primera versión de un  
\> 1:43  
\> clonador de voz. Y los modelos que estoy  
\> 1:46  
\> utilizando como base son el modelo Quen  
\> 1:49  
\> eh, de Alibaba y otro par de modelos  
\> 1:52  
\> open source. Entonces, vamos a ver cómo  
\> 1:53  
\> nos va.  
\> 1:56  
\> Este edificio está como interesante.  
\> 1:58  
\> Aquí hicieron el meetup de Cloud Code el  
\> 2:01  
\> miércoles. Cristian Platzi. Parece que  
\> Ambiente del evento y llegada de participantes  
\> 2:04  
\> esta jacatón es muy popular. Hay una  
\> 2:06  
\> fila larguísima y detrás nuestro está el  
\> 2:09  
\> buen San Diego Gig  
\> 2:11  
\> otros videos.  
\> 2:18  
\> \[carraspeo\]  
\> 2:26  
\> No hay puestos. No hay puestos, team  
\> 2:28  
\> banda, no hay puestos.  
\> 2:32  
\> Are you sure very quickly that come  
\> 2:34  
\> here?  
\> 2:35  
\> Hey everyone.  
\> 2:36  
\> Love the energy. Yeah. I'm the founder  
\> Presentación de DAPTA y su propuesta de agentes de voz  
\> 2:38  
\> of DAPTA. I'm Nico and we've been coming  
\> 2:42  
\> to a few of these release before ready  
\> 2:43  
\> events. And the aura, the atmosphere is  
\> 2:46  
\> just amazing. We've seen people build  
\> 2:48  
\> great stuff. So kudos to all of you for  
\> 2:50  
\> coming here and I hope you build great  
\> 2:52  
\> things and show me happy to know more  
\> 2:54  
\> about your projects. Uh some of the  
\> 2:55  
\> founder of DAPTA what we do is we have a  
\> 2:57  
\> platform for companies to build AI  
\> 2:59  
\> agents for inbound sales. So if you do  
\> 3:02  
\> ads or you get a lot of inquiries in  
\> 3:04  
\> your website and you want to connect  
\> 3:07  
\> with your customers faster, we are the  
\> 3:09  
\> fastest the easiest way to do this. So  
\> 3:11  
\> our customers are usually like heads of  
\> 3:13  
\> sales, VPs of marketing of sales that  
\> 3:16  
\> want to build their first agent in  
\> 3:17  
\> minutes. value proposition. You go to  
\> 3:19  
\> dapta.Ii. You can create your first AI  
\> 3:22  
\> voice agent in just like 3 minutes. It's  
\> 3:25  
\> really cool. Anyway, enough about us.  
\> 3:27  
\> Thank you, S. And let's build \[aplausos\]  
\> Inicio del tiempo de construcción  
\> 3:40  
\> \[música\]  
\> 3:43  
\> from 11 to 8 p.m. It's just build time,  
\> 3:47  
\> right? There's no distractions. We're  
\> 3:48  
\> going to be here like at 5 p.m. We're  
\> 3:51  
\> going to be doing something that we call  
\> 3:52  
\> the vibe racing. Hi everyone. I'm  
\> Participantes presentan sus proyectos (voice AI y MCP)  
\> 3:55  
\> building a fine tuned speech to speech  
\> 3:59  
\> Spanish voice model and I'm building it  
\> 4:01  
\> on top of uh Quen. Hello everyone, my  
\> 4:04  
\> name is Josu. I'm with the DAP team and  
\> 4:06  
\> today I'm going to try to finish  
\> 4:08  
\> building an MCP for users to build voice  
\> 4:10  
\> AI agents for any kind of use case like  
\> 4:13  
\> lead qualification appointment setting  
\> 4:15  
\> through uh something like cloud code or  
\> 4:17  
\> codex.  
\> 4:38  
\> Oh.  
\> 4:49  
\> para poder crear y que tenga  
\> Discusión técnica sobre arquitectura de agentes y skills  
\> 4:53  
\> el mismo agent que te escribe código es  
\> 4:55  
\> el mismo agent que le puede hablar al  
\> 4:56  
\> cliente.  
\> 4:57  
\> Claro.  
\> 4:57  
\> Por debajo tu orquesta si tienes skills  
\> 5:00  
\> que un cliente no puede acceder las  
\> 5:01  
\> mismas skills que tiene el de coding.  
\> 5:03  
\> Entonces, si tú haces un agent central,  
\> 5:05  
\> ese agent central por definición tiene  
\> 5:07  
\> que tener acceso a toda la información.  
\> 5:10  
\> tienes como una capa abajo. Encima tú le  
\> 5:12  
\> metes una capa que es el agent y encima  
\> 5:14  
\> le metes otra que son los skills.  
\> 5:16  
\> Lo que yo creo que debería pasar es que  
\> 5:18  
\> todas las empresas son un agent.  
\> Avances personales y uso de coding autónomo  
\> 5:30  
\> No he podido trabajar mucho en mi  
\> 5:31  
\> proyecto en esta jacatón, pero lo bueno  
\> 5:35  
\> es que mientras hablaba con la gente que  
\> 5:37  
\> venía, se acercaba, mi cloud code estaba  
\> 5:40  
\> dándole moliendo. Solo para un rato que  
\> 5:43  
\> apagué el computador para ir a comprar  
\> 5:45  
\> café, pero ya todo el tiempo que estuve  
\> 5:47  
\> con la gente como que iba pensando  
\> 5:49  
\> haciendo cosas autónomas y es una gran  
\> 5:51  
\> diferencia. O sea, si no fuera por eso,  
\> 5:54  
\> prácticamente no hubiera avanzado nada  
\> 5:55  
\> hoy. Vamos bien. Ya tenemos un UI donde  
\> Progreso técnico: UI, carga de datos y modelo  
\> 5:57  
\> podemos cargar los o las grabaciones o  
\> 5:59  
\> yo puedo hablar con el micrófono. Y ya  
\> 6:02  
\> cargamos bien el modelo Quen. Estamos  
\> 6:06  
\> cargando los los pesos del modelo en  
\> 6:09  
\> memoria y ya el siguiente paso es hacer  
\> 6:11  
\> la clonación de voz y luego f tunear.  
\> 6:14  
\> Entonces vamos a ver si me da tiempo.  
\> 6:16  
\> Quedan como 6 horas.  
\> Inicio del “vibe racing” (competencia rápida)  
\> 6:30  
\> Ya va a empezar el vibe racing, que va a  
\> 6:33  
\> ser como uno de los eventos más  
\> 6:34  
\> importantes de la jacatón, y es que toda  
\> 6:35  
\> la gente que está acá va a participar en  
\> 6:38  
\> construir un reto en una hora y el mejor  
\> 6:42  
\> va a ganar un premio secreto y yo soy el  
\> 6:44  
\> jurado. Vamos a ver qué construye la  
\> 6:46  
\> gente.  
\> 7:07  
\> \[música\]  
\> Evaluación de proyectos y dinámica del reto  
\> 7:13  
\> Ya están terminando todos los equipos y  
\> 7:15  
\> me tocó escribir en estas hojitas como  
\> 7:17  
\> los diferentes escenarios \[música\] para  
\> 7:19  
\> que ahorita prueben y vamos a calificar  
\> 7:22  
\> quién gana.  
\> 7:29  
\> Wow.  
\> 7:39  
\> \[aplausos\]  
\> 7:42  
\> The first part is building the story.  
\> 7:46  
\> First one's generated. Let's wait for  
\> 7:48  
\> the for the boss.  
\> 7:50  
\> We got some checkpoints.  
\> 7:54  
\> \[aplausos\]  
\> 7:57  
\> How did you build it? So, what engine  
\> 7:59  
\> was it running or engine? I don't know.  
\> 8:02  
\> \[risas\]  
\> Estrategia para resolver retos desde primeros principios  
\> 8:06  
\> Cuando uno aborda este tipo de retos,  
\> 8:07  
\> uno tiene que empezar de las cosas más  
\> 8:09  
\> básicas y más simples. Cuando uno no  
\> 8:10  
\> tiene ni idea de lo que está haciendo,  
\> 8:12  
\> en este caso hacer un juego, uno tiene  
\> 8:14  
\> que revertirse a primeros principios,  
\> 8:15  
\> las cosas más básicas que uno puede  
\> 8:17  
\> construir. Entonces, en este caso le voy  
\> 8:18  
\> a mostrar a Josué cómo hubiera hecho yo  
\> 8:20  
\> el reto para ganar. Primero comamos. Tú  
\> 8:23  
\> no necesitas nada de de backend, o sea,  
\> 8:25  
\> tú no necesitas llamar un modelo, tú  
\> 8:27  
\> necesitas nano banana, no necesitas nada  
\> 8:29  
\> porque nano banana te va dar una imagen  
\> 8:31  
\> como la que tú tienes, pero ¿cómo haces  
\> 8:32  
\> que se anime? ¿Cómo haces que suba una  
\> 8:34  
\> pierna?  
\> 8:36  
\> que que  
\> 8:37  
\> tienes que pintar el chespirito en en  
\> 8:39  
\> píxel por píxel para tener total  
\> 8:41  
\> control. Okay.  
\> 8:43  
\> Si vas a necesitar una imagen de  
\> 8:44  
\> Chespirito, pero en el prom del usuario  
\> 8:47  
\> para que luego el AI pinta Chespirito en  
\> 8:49  
\> píxeles.  
\> Cierre del evento y networking  
\> 8:54  
\> Ya se está acabando el evento. La gente  
\> 8:56  
\> presentó sus proyectos, nos dieron la  
\> 8:58  
\> última cervecita aquí de networking y ya  
\> 9:02  
\> después para la casa. Estoy cansado. Son  
\> 9:03  
\> las 10 casi ya 9:45.  
\> 9:09  
\> Ya es hora de descansar. Largo día de  
\> 9:11  
\> Jacatón, pero salimos aprendiendo muchas  
\> 9:12  
\> cosas. No alcanzé a terminar mi  
\> Reflexiones finales y aprendizaje (OpenSpec, spec-driven development)  
\> 9:14  
\> proyecto. Falta mucho para la gente voz,  
\> 9:18  
\> la gente no paró de hablarme, lo cual es  
\> 9:20  
\> bueno, obviamente, pero aprendí algo.  
\> 9:22  
\> Aprendí un framework de Spec Driven  
\> 9:24  
\> Development, que es una técnica de vipe  
\> 9:27  
\> coding donde uno primero se enfoca mucho  
\> 9:29  
\> en construir el requerimiento y luego al  
\> 9:31  
\> final sigue comienza a escribir el  
\> 9:33  
\> código. Eh, y se llama Open Spec. Me la  
\> 9:36  
\> recomendó Miguel de mi equipo, entonces  
\> 9:37  
\> la estuve probando, aprendí algo nuevo y  
\> 9:40  
\> bueno, a pesar de que no terminé mi  
\> 9:41  
\> proyecto, aprendí este nuevo skill y  
\> 9:43  
\> este nuevo framework que es lo  
\> 9:45  
\> importante en Unaatón. Unaatón, si  
\> 9:46  
\> aprendes algo, ganaste, no importa si no  
\> 9:49  
\> lograste lo que querías lograr.  
\> 9:50  
\> Recuérdate de seguirnos y acompañarnos  
\> 9:52  
\> en nuestras aventuras construyendo una  
\> 9:54  
\> startup por el mundo.

\> \*\*Attachment: attachment · txt · 16.4 KB\*\*  
\>  
\> 0:000 segundos¿Qué onda? ¿Cómo están? Espero que se vea bien. Este, pues vamos al Hacatón Open AI Abac 2025\.  
\> 0:099 segundosVale, este, estamos en Reforma. Estamos, este, pues sí, por Reforma. El jacatón es esta ubicación, Capital Reforma y  
\> 0:1818 segundospues en realidad déjenme mejorar un poquito la toma.  
\> 0:2222 segundosSí, se ve mejor. Es que estoy en la calle y me da un poquito de pena, pero bueno. El chiste es que pues Open AI  
\> 0:3030 segundosjunto con Kak, con Hakatón que se llama pues sí, Kak Open AI 2025\. Pues bueno,  
\> 0:3737 segundosese jacatón trata exactamente de hacer un sistema de inteligencia artificial automjorable. Les contaré un poquito más, pero déjenme les grabo unas tomas.  
\> 0:5959 segundosBien, se supone que es aquí. Me citaron a las ponle todo las 8 de la mañana. Es un poco un poquito más temprano, pero  
\> 1:071 minuto y 7 segundosdéjenme entro y pregunto para ver qué onda. Si no, ahorita les doy contexto.  
\> 1:101 minuto y 10 segundosYa le pregunté a un guardia, me dijo que ay, perdón, me dijo que se iba a ver y pues ahorita nos dice,  
\> 1:231 minuto y 23 segundospues yo no sé si por la emoción, yo no sé si por la por la impaciencia, este, me llegué un poco antes, ahorita son las  
\> 1:311 minuto y 31 segundos7 de la mañana, se supone que tendría que llegar a las 8 de la mañana.  
\> 1:341 minuto y 34 segundosEntonces este, pues bueno, eh, pues vamos a esperarnos aquí. Voy a esperar también a un compañero de equipo, un  
\> 1:411 minuto y 41 segundosamigo. Este, ¿qué más? Pues nos vamos a esperar aquí. Les voy a explicar un poco cómo de qué trata el evento, cómo es y  
\> 1:491 minuto y 49 segundospues también este qué vamos a hacer, ¿no? De qué trata el hacatón en sí. Bueno, les estaba diciendo que un jacatón es una  
\> 1:581 minuto y 58 segundoscompetencia de programación en donde estudiantes, profesionistas, etcétera, les ponen un reto a tiempo récord y pues  
\> 2:062 minutos y 6 segundoseste tienen que resolverlo y el que mejor lo resuelva y en el tiempo que piden gana el la competencia, por así  
\> 2:122 minutos y 12 segundosdecirlo. Pues bueno, este en este jacatón, por así decirlo, tenemos que hacer un sistema de inteligencia artificial automjorable. Ahora, este, ¿qué es esto? Se los voy a explicar.  
\> 2:242 minutos y 24 segundosBien, este un sistema de inteligencia artificial automejorable. Este, imagínense a Chat GPT, ¿no?  
\> 2:302 minutos y 30 segundosEntonces, imagínense que le preguntan a Chat GPT, oye, ¿cuánto es 2 \+ 2? te responde cinco, ¿no? Por así decirlo. Y  
\> 2:372 minutos y 37 segundoseste y pues aparte de eso se equivoca, o sea, te da cinco. Y pues lo que hace es que  
\> 2:462 minutos y 46 segundoseste sistema automejorable es que a partir de esa respuesta la evalúa, ya después de que la evalúa, este evalúa si  
\> 2:542 minutos y 54 segundosestá bien, está mal y si está mal lo pone como en un tipo memoria suya para que ya no vuelva a cometer el mismo error.  
\> 3:023 minutos y 2 segundosEso es un sistema de inteligencia artificial automejorable. El chiste de este reto y este jacatón es que justamente tenemos que este,  
\> 3:113 minutos y 11 segundospues sí, por así decirlo, hay que construir uno, proponer una idea, un proyecto para implementar este tipo de  
\> 3:183 minutos y 18 segundossistemas y pues bueno, completarlo en el tiempo récord posible, ¿no? Ese es el esa es la idea. Y pues bueno, el chiste  
\> 3:273 minutos y 27 segundosmás o menos de todo este reto es que pues vamos a hacer, bueno, les voy a explicar el proyecto que vamos a hacer.  
\> 3:333 minutos y 33 segundosEste, vamos a ha este, imagínense, bueno, una empresa gasta mucho dinero en tokens de Open AI, ¿no? En tokens y API.  
\> 3:433 minutos y 43 segundosAquí les voy a dejar la definición de API y tokens, ¿vale? Para que la pausen y me entiendan mejor. Este, pues bueno,  
\> 3:513 minutos y 51 segundosel chiste de este de este problema es que muchas empresas gastan mucho dinero en tokens de chat GPT, ya sea para usar  
\> 4:004 minutosuna función o hacer un resumen, etcétera. Entonces, gastan muchos tokens. Entonces, el chiste de este sistema es que puedes optimizar costos  
\> 4:084 minutos y 8 segundoscon esto. Por ejemplo, supongamos que para un modelo GPT 3.5 este sirve mejor para un resumen, ¿no? Entonces, lo que  
\> 4:164 minutos y 16 segundoshago es que le pido un resumen a la a la inteligencia artificial. este, ya que le pido el resumen, este, pues evalúa con dos modelos, cuál es mejor, cuál es  
\> 4:244 minutos y 24 segundospeor. Dice, "Ah, este es mejor o este es peor." Y ya a partir de dos respuestas, o sea, diferentes, evalúa cuánto dinero  
\> 4:334 minutos y 33 segundosse gastó, cuántos tokens se gastaron y cuál fue mejor, ¿no? Entonces, a partir de que tú lo puedes usar normal, te  
\> 4:414 minutos y 41 segundosempieza a pues a generar automejora, ¿no? Esa es la definición, por así decirlo, y es lo que vamos a hacer en el jagatón 13 horas.  
\> 4:494 minutos y 49 segundosBueno, pues y aquí estamos con mi con mi este con mi líder de infraestructura.  
\> 4:564 minutos y 56 segundosSe llama este Israel Cabrera. Si quieres saluda a la cámara. Hola, hola, ¿cómo están?  
\> 5:015 minutos y 1 segundoBien, bien, bien. Y pues ahorita ya acabamos de llegar justamente este estábamos estaba esperándolo. Nada más falta un compañero nuestro que llegue  
\> 5:095 minutos y 9 segundoseste y pues ya yo creo que a lo mejor ya entramos o quién sabe, vamos a preguntar todo eso. Acá ya nos recibieron, no nos corrieron como pensábamos. Este, pues bueno, vamos arriba y a ver qué pasa.  
\> 5:205 minutos y 20 segundosLes voy a enseñar. Y pues bueno, ya estamos aquí en el en el evento. Ya nos pasaron, ya nos registraron, ya nos consintieron con unos regalitos, ¿no?  
\> 5:275 minutos y 27 segundosUna libreta y una sudadera. Este, pues bueno, ya que nos consintieron, este, la competencia empieza a las 9, ahorita son  
\> 5:345 minutos y 34 segundoslas 8:10, apenas vamos llegando, vamos, este, aclimatándonos.  
\> 5:385 minutos y 38 segundosEste, aquí hay conectores, aquí este pues hay gente. Nosotros como introvertidos sociales no nos gusta eso,  
\> 5:455 minutos y 45 segundospero estamos bien. Entonces, este les estaré contando qué pasa y pues yo creo que dentro de no mucho empieza la  
\> 5:525 minutos y 52 segundosceremonia de pues de inauguración y pues todo esto se va a desarrollar acá. Quiero que chequen en esta oficina.  
\> 5:595 minutos y 59 segundosVamos a estar 13 horas programando.  
\> 6:036 minutos y 3 segundosEste, pues vamos a estar acá esclavizándonos casi casi, pero open lo vale.  
\> 6:176 minutos y 17 segundosAh, gracias. Pues aquí nos están dando valletitas. Voy a agarrar una.  
\> 6:236 minutos y 23 segundosustedes me disculpan aquí mi compa el que que casi no le gusta el azúcar.  
\> 6:346 minutos y 34 segundos\[Música\]  
\> 6:366 minutos y 36 segundosBueno, les voy a dar un pequeño tour de cómo está esto. Este, pues estoy comiendo,  
\> 6:426 minutos y 42 segundospor eso, por eso no me está así todo el  
\> 6:486 minutos y 48 segundosoficina está muy muy astico, como que muy corporativa todo este todo este rollo. Siempre estoy acostumbrado a  
\> 6:566 minutos y 56 segundosprogramar a programar en mi en mi casa con la vista del rotoplo. Bueno, pues híjole, más o menos así está todas las mesas.  
\> 7:087 minutos y 8 segundosNos pusieron aquíón, o sea, bueno, hojas blancas y colores.  
\> 7:147 minutos y 14 segundosAquí tenemos un pizarrón igual acá del wifi, todo eso. Quiero que chequen también la vista. Este, se los voy a enseñar tantito.  
\> 7:237 minutos y 23 segundosSi tienen vértigo, no vean, por favor. Pero más o menos así está la vista.  
\> 7:327 minutos y 32 segundosEstá toda la vista.  
\> 7:357 minutos y 35 segundosAy, mi ciudad de México, mi contaminada Ciudad de México. Cómo te adoro. Pero bueno, estoy contando qué más pasa.  
\> 7:467 minutos y 46 segundosPues bueno, ya aquí estamos en el Bueno, ya lo que va a empezar es que a las a partir de las 9 de la mañana vamos a  
\> 7:537 minutos y 53 segundosempezar a programar, a este a competir, pero ahorita son las 8:18. Entonces, este, como ahorita están llegando todos, les voy a enseñar más o menos cómo está  
\> 8:018 minutos y 1 segundoel entorno y pues este, mi repositorio, ¿no? Más o menos así está mi repositorio. Hakatonenii, ¿vale? Este,  
\> 8:098 minutos y 9 segundospues así se ve igual en mi sitio web, aquí lo pueden consultar en emicarrada.com, cualquier cosa. Este,  
\> 8:168 minutos y 16 segundospues así, así está la cosa, preevento, ¿no? Por así decirlo. Así está la cosa, preevento. Y pues bueno, qué emoción.  
\> 8:248 minutos y 24 segundosEstoy nervioso y pues vamos a vamos a echarle todas las ganas, vamos a pues  
\> 8:328 minutos y 32 segundossí, justo esforzarnos lo más posible y pues lo que salga eh vamos a estar satisfechos. Pero después de esta  
\> 8:418 minutos y 41 segundoscompetencia sí lo que sí es definitivo es que voy a dormir, voy a aventarme un día durmiendo.  
\> 8:498 minutos y 49 segundosEstarando también tecnología. Por eso estamos aquí hoy. Entonces, eh que no  
\> 8:588 minutos y 58 segundoshay malas ideas, no hay eh malas respuestas, dejen volar su cantidad, apóyense de los equipos que van a estar dando vueltas porque quizás hay gente aquí que tiene mucha experiencia.  
\> 9:089 minutos y 8 segundosY aquí estamos con mi equipo, es Brandon. Saluda. Y pues aquí estamos los tres para el evento. Nos está dando una  
\> 9:169 minutos y 16 segundoscharla alguien de Open. La neta es que se ve buena. Ahorita empezamos el evento.  
\> 9:229 minutos y 22 segundosPues ya estamos empezando el jacatón, ya estamos empezando la competencia, estamos empezando a trabajar, ya tenemos más o menos como todo el entorno, estamos con setup inicial y estamos  
\> 9:319 minutos y 31 segundoshaciendo todo el análisis por implementación. Este, quiero que chequen más o menos el entorno como está. Más o menos así está todo el pedo. Estamos los  
\> 9:409 minutos y 40 segundostres aquí. Estamos implementando una manera hub spoke. Aquí les voy a poner un diagrama más o menos cómo funciona. Este, pues ya está corriendo el tiempo.  
\> 9:489 minutos y 48 segundosEh, pues aquí como somos unas celebridades, somos superfamosos, no están grabando. Pero bueno, entonces este vamos iniciando y les diré cómo va.  
\> 9:569 minutos y 56 segundos¿Qué pasado? Este, seguimos en la competencia. Ahorita son la 1:48.  
\> 10:0010 minutosNos quedan en total 5 4 horas. entrega el proyecto a las 6 de la tarde.  
\> 10:0510 minutos y 5 segundosExactamente. Entonces, planeamos acabar a las 4, pero planeamos de pasar de tres nodos a seis nodos. ¿Por qué? Porque la  
\> 10:1310 minutos y 13 segundosnarrativa es mejor, porque hay autora y porque ron uno y ron dos sí están en la rúbrica.  
\> 10:2010 minutos y 20 segundosA lo mejor no me entienden mucho, pero este voy a seguirle. Este, ahorita estoy en  
\> 10:2710 minutos y 27 segundosun sillón como raro, pero vamos a seguir implementando y pues yo  
\> 10:3510 minutos y 35 segundosles digo cómo va y les enseño el el proyecto ya cuando lo acabe, pero ahorita vamos bien, estamos en pero pues así es un hackatón.  
\> 10:4510 minutos y 45 segundosUna hora después, dos horas después, tr horas después.  
\> 10:5010 minutos y 50 segundos¿Puedes hacerlo de una vez? Se me terminaron los carteles.  
\> 10:5410 minutos y 54 segundosYa, ya nos dieron las 5:31, superrápida. Ya estamos acabando el proyecto. De hecho, ya lo acabamos. Ya  
\> 11:0311 minutos y 3 segundostenemos la do interactiva, ya tenemos todo. Ya lo único que falta es que genere un documento en latex sobre  
\> 11:1011 minutos y 10 segundoseste, qué hace exactamente la base teórica, todo eso. Ya lo enviamos, ¿vale? Pero ya acabamos bien. No les  
\> 11:1711 minutos y 17 segundosgrabé más porque porque estaba trabajando, pero sí tuvimos frustración, tuvimos errores, tuvimos  
\> 11:2611 minutos y 26 segundosmuchas cosas, pero al menos yo creo que estamos satisfechos, ¿no?, con el resultado que tenemos. Estoy cansado.  
\> 11:3411 minutos y 34 segundosSí, güey. ¿Estás cansado, güey?  
\> 11:3911 minutos y 39 segundosEstá bien. Ya, ya acabamos este ya este bueno, ya son las 6 de la tarde, ahorita ya es la hora límite para enviar el  
\> 11:4711 minutos y 47 segundosproyecto. Ya lo enviamos, ya lo acabamos, ya todo. Este, pues bueno, sin más queda el el que vengan los jueces a  
\> 11:5511 minutos y 55 segundospresentarlo y listo. Y pues ya acabó, estamos satisfechos, estamos madreadísimos, pero  
\> 12:0412 minutos y 4 segundosbueno, yo creo que estamos contentos con el resultado y les diremos qué pasa.  
\> 12:0912 minutos y 9 segundosBien, pues ya acabó, ya acabó el proyecto, ya acabó el, bueno, por así decirlo, ya acabó el proyecto, son las 7, este, la dinámica fue así, los jueces  
\> 12:1812 minutos y 18 segundosfueron mesa por mesa con 8 minutos de máximo para presentar el proyecto, dudas, cuestiones, etcétera. Este,  
\> 12:2512 minutos y 25 segundosbueno, y pues igual el pues sí, este, nos esforzamos, yo creo que hicimos lo mejor que pudimos, la mejor implementación.  
\> 12:3412 minutos y 34 segundosEste, pues igual les dejo aquí el repo chequen todo el proyecto. Ustedes lo pueden descargar, los puedan probar por  
\> 12:4212 minutos y 42 segundosustedes mismos, las gráficas, todo está ahí. Entonces, bueno, este no nos alcanzó los otros minutos, tengo que  
\> 12:4812 minutos y 48 segundosdecirlo, pero salga como salga el resultado que tengamos, la verdad lo más importante fue la experiencia, todo eso  
\> 12:5612 minutos y 56 segundosy pues ya ya cuando alguien dice eso es que no va a ganar, pero bueno, este pues aquí les voy a  
\> 13:0313 minutos y 3 segundosdejar el proyecto para que lo chequen y pues les diré los resultados, cómo salimos, si quedamos en último lugar o en primer lugar.  
\> 13:1213 minutos y 12 segundosuna eternidad más tarde.  
\> 13:2213 minutos y 22 segundos\[Aplausos\]  
\> 13:3113 minutos y 31 segundosEh, después de estar discutiendo un poco y tomar una difícil decisión, eh van a quedar cinco equipos que pasan una  
\> 13:3913 minutos y 39 segundosfinal. Eh, van a tener términos para presentar otra vez ya los ganadores.  
\> 13:5113 minutos y 51 segundoslos equipos.  
\> 13:5513 minutos y 55 segundos\[Aplausos\]  
\> 14:0614 minutos y 6 segundosCochina e  
\> 14:0914 minutos y 9 segundos\[Aplausos\]  
\> 14:1414 minutos y 14 segundosmodel.  
\> 14:1614 minutos y 16 segundos\[Aplausos\]  
\> 14:2914 minutos y 29 segundosY pues bueno, al final ya acabó la selección de proyectos, ya pasaron a la final cinco equipos y pues desgraciadamente no ganamos. Qué mal.  
\> 14:4014 minutos y 40 segundosAquí les dejo un poco de la vista, pero pues no ganamos.  
\> 14:4414 minutos y 44 segundosQueríamos ganar, queríamos pasar a la final, pero pues ni eso, ¿no? Entonces, pues bueno, fue una bonita experiencia para mi primer jacatón, fue una primera  
\> 14:5214 minutos y 52 segundosexperiencia donde aprendí mucho y pues reflexiones finales.  
\> 14:5614 minutos y 56 segundosEste, pues la verdad les vamos a preguntar ahorita los juos qué nos faltó, en qué partes evaluar, porque es lo importante, ¿no? No desanimarse, sino  
\> 15:0315 minutos y 3 segundostambién ver qué partes fallaste, cómo resolverlas también y cómo puedes aplicar esto en futuras competencias.  
\> 15:1015 minutos y 10 segundosEntonces, lo importante es la experiencia. Aprendiste y yo estoy contento con mi resultado. Entonces, ya les estaré contando más experiencias y  
\> 15:1815 minutos y 18 segundoshasta luego. Pues aquí ya saliendo de Jacatón, eh, pues no fuimos finalistas, pero la experiencia, ¿qué tal? Todo bien. Y mi otro compañero de equipo se  
\> 15:2715 minutos y 27 segundostuvo que ir antes, pero bueno, este, nos divertimos, aprendimos cosas y pues gracias a Open Acaba por invitarnos.  
\> 15:3515 minutos y 35 segundosPues bueno, ya lograron corrernos del evento, ya. Este, nos dijeron, "Ya lléguenle, ya ustedes ni ganaron, lléguenle de aquí, huelen feo, ¿no es  
\> 15:4415 minutos y 44 segundoscierto?" Este, pues bueno, reflexiones finales, mi buen coman frutas y verduras, ch.  
\> 15:4915 minutos y 49 segundosAh, pues sí, también. Pero pues nos divertimos, aprendimos mucho y pues igual muchas gracias a las  
\> 15:5615 minutos y 56 segundosorganizaciones por invitarnos y pues bueno, ya estaremos diciéndole más ocasiones. Este pues esperemos que llegue bien a casa, que no me que no  
\> 16:0516 minutos y 5 segundospase nada, pero bueno, ya estaremos compartiéndoles mucho más. Muchísimas gracias por ver este video, por acompañarme. Tendrán más experiencias, más consejos de tecnología, etcétera.  
\> 16:1516 minutos y 15 segundosPues bueno, muchas gracias por seguirme y nos vemos en el próximo video. Hasta luego.  
\>   
\> Sincronizar con el tiempo del vídeo

\> \*\*Attachment: attachment · txt · 61.4 KB\*\*  
\>  
\> Um, let me quickly introduce Natalie Laauo who's going to run our next session. Uh,  
\> uh, CEO of the App Inventor Foundation. Yes. Um, that's enough. Yeah. And  
\> director. So, come on up, introduce yourself, and, uh, walk us through this next great session.  
\> Well, thanks everyone for being here. Thank you.  
\> \[Applause\] So I think echoing the honorable minister from Sarah Leon, today's youth  
\> aren't waiting for solutions to be implemented for them. They're creating them themselves and that's what this  
\> session is all about. So I'm very very excited to start the global AI hackathon final showcase this year. Uh my name is  
\> Natalie. I'm the executive director of the Appmener Foundation. And I think when we talk about the MIT AI and  
\> education summit, students are at the heart of all the work that we do and all the research that we do. So I'm really  
\> excited to celebrate six amazing student teams from all over the world from six different countries who will be  
\> presenting apps that they built with AI to solve community problems in their communities. Uh according to the UNESCO  
\> United Nations AI competency framework for students. Uh so I think before we get started I wanted to also acknowledge  
\> like the space that we're in today. So this is lecture hall 10250 and it's the  
\> second largest lecture hall on MIT's campus. Uh this was also where I took my  
\> first AI course as an undergrad at MIT. So that was taught by Professor Patrick Henry Winston who unfortunately is no  
\> longer here with us today. But his lessons about how we represent knowledge, how we build robust systems,  
\> how we reason through problems, I think are still relevant to AI development today and possibly are even more  
\> relevant since the technology is moving so quickly. Um, so to explain the format  
\> of today's event, we'll have six teams come up. Each will present their apps and then we have a panel of three judges  
\> who will do a short Q\&A with them. And then after all of that, they'll go and deliberate in the hall and give out  
\> three awards. One for community impact, one for creative innovation, and one for the best design. Uh before I get started  
\> with presenting the students, I'd like to introduce Zarin Chowri, who is our program manager for the Apathon and  
\> Hackathon programs to tell you a bit more about the larger events that led to today. So please welcome Zaren.  
\> \[Applause\] Okay.  
\> All right. Oops. All right. Good morning everyone.  
\> Welcome to the global AI hackathon final showcase and awards. Welcome to everyone who's here with us in person at MIT as  
\> well as those of us joining virtually via the live stream from all over the world. We're so happy that you're here  
\> with us today. When we started the global AI hackathon a year ago, we  
\> wanted to create a way for more people to get involved in shaping the future direction of AI. We believe that AI use  
\> usage should not be dictated by a small group of researchers or developers working at certain organizations. We  
\> think that everyone everywhere should have a say in shaping AI, even and  
\> especially the youth. So, we put out a call to anyone around the world to tell  
\> us what it would look like to use AI for good in their communities. And boy, did  
\> they answer. In fact, we heard from over 1,300  
\> participants this year. That's a 42% increase compared to our inaugural year  
\> last year. And not only did the volume of participation increase, but submissions came from all corners of the  
\> world. 86 countries and regions to be spec specific of which 60% came from the  
\> developing world. The top countries represented were in order the United States, India, Brazil,  
\> Singapore, and Indonesia. We are also proud to share that  
\> participants ranged from as young as 5 years old all the way to 77 years old  
\> with a median age of 17\. In this particular session, you'll be hearing from the youth um participants um and  
\> right afterwards, we will have the adult participants as well.  
\> The theme of this year's competition was the United Nations sustainable development goals or the SGS which in  
\> their words are a blueprint for peace and prosperity for people and the planet for years to come. Participants had the  
\> choice to address one or more of the 17 SGS in their apps and the most popular  
\> ones were good health and well-being, quality education, and climate action.  
\> In addition to the SG theme, submissions were also required to use AI in some  
\> form. The top three AI categories were generative AI such as chat bots and  
\> image bots, classification models such as Teachable Machine, and speech and  
\> translation tools like speech to text. You'll notice that the percentages don't  
\> quite add up to 100%. That's because most of the submissions use not just one, but actually multiple forms of AI,  
\> exploring the interesting intersections and interactions of different AI modalities.  
\> Now you might be wondering who are these participants who are building such sophisticated AI apps? Were they already  
\> seasoned computer programmers or AI experts? Well, you might be surprised to  
\> learn that in fact 90% of our participants were actually beginners to  
\> MIT App Inventor. In other words, in their first or second year.  
\> This statistic gives us confidence that App Inventor is staying true to its mission of making technology creation  
\> accessible for people of all backgrounds so that someone can go from being a mere  
\> beginner to programming to developing their very own AI AI app in just a year.  
\> And we actually quantified that impact after completing the competition. 95% of  
\> participants now feel that they have the potential to positively impact their  
\> communities by creating AI apps. That's powerful. We were floored by the quality  
\> and impact of the submissions and we thank every participant for bringing  
\> their creativity and innovation to this competition. We also want to thank our 53 judges who  
\> spanned from MIT App Inventor power users to teachers and industry experts.  
\> I also want to shout out that we launched a new pilot mentorship program this year in partnership with Braise um  
\> in which we paired our finalists with mentors in order to prepare for their presentations. We want to thank our  
\> volunteer me mentors, half of whom came from the mi from the app inventor team and half of whom came from our partner  
\> brace. We are so inspired by the success of this year's competition and we are eager  
\> to see what the future holds. We have already expanded our global AI hackathon program by launching regional programs  
\> in Taiwan and Japan and we look forward to growing our Apathon offerings in the  
\> years to come. Thank you so much for listening and let's hear some great student presentations.  
\> \[Applause\]  
\> Thank you so much, Zaren. She also put so much work into this aathon over the past two years. So when you see her  
\> afterwards, tell her thank you for me as well. Um, so now I'd like to introduce our three judges. First we have Rod  
\> McCloud, who is the vice president of social impact at Braise. Please come up and take a seat.  
\> Thank you. We also have Kelly Shiohira who is the lead expert on the UNESCO AI competency  
\> framework for students. And finally we have Mark Freriedman who  
\> is co-founder of the app amentor project at Google and is now MIT CCL research  
\> affiliate. He uh co-founded App aimemen with professor Hal Abson of MIT 15 years  
\> ago and this project has reached 24 million learners around the world. So thank you Mark.  
\> So now I'd like to invite our first project up uh rehab AI.  
\> \[Applause\]  
\> Hello everyone. My name is Cody Lee and I'm extremely  
\> honored to present my project rehab AI, an app designed to make TA rehab more  
\> efficient for patients and doctors. In this presentation, I'll cover the  
\> problem, the app design, app features, and finally the potential impact in the  
\> summary. Let's start off with the problem. The American Hospital Association  
\> predicts that there will be a healthcare shortage of 124,000 physicians by 2033  
\> and it's already affecting healthcare today. One sector heavily impacted is TA  
\> rehab. Teler rehab or online rehab allows patients to meet with doctors  
\> virtually and complete rehab exercises from home.  
\> For patients who live far away from hospitals or have difficulty moving, TA  
\> rehab can be lifechanging. As you can see, demand for TA rehab has  
\> grown rapidly with the market expected to reach 17 billion within the next 10  
\> years. But as demand grows, burnout causes wickers to quit, which strains the  
\> system and causes more and causes delays in vital patient care.  
\> To close the gap, I've created Rehab AI, an app designed to solve this problem by  
\> using AI to make Tel Rehab more efficient. Using the camera of the device, rehab AI  
\> can track, classify, and score rehab exercises patients perform so doctors  
\> can monitor them outside of meetings. To see this, let's go into the app design.  
\> Rehab AI is split into a patient user interface and a doctor's user interface  
\> with data transferred through cloud servers. Rehab AI has three core components. the  
\> post model, evaluation model, and communications module.  
\> First, the post model, which is located on the mobile device, detects key points  
\> on a person's body. Then, the app transfers the data to the  
\> evaluation model. The evaluation model calculates joint angles from the postnet key points.  
\> Angle measurements in rehab exercises have different patterns over time which  
\> can be analyzed by using AI. The AI I've selected is a LSTM neuronet  
\> network. It is highly effective at classifying time sequence data making ideal for analyzing movement patterns.  
\> In this rehab exercise, I designed and trained my LSTM neural  
\> network on mat lab and achieved a classification accuracy of 98% across  
\> all nine exercises. Here shows the classification and  
\> evaluation in real time. In the meantime, the results are sent back to  
\> the doctor uh sorry to the app for display.  
\> Let's take a look at this in the app's features.  
\> When logging in as a doctor, they'll see a list of patients.  
\> Clicking on one, they can see their workout history. They can set reminders  
\> and assign new tasks. Logging in as a patient, they can see  
\> the patient homepage. Patients can click on assignments to see doctor's feedback.  
\> and clicking on info, they can see detailed exercise descriptions and video clips of each exercise.  
\> To wake out, patients press wake out and start positioning themselves in front of the camera.  
\> The AI will track the  
\> squat. The AI will track the exercise and classify it by announcement.  
\> In the app, they can see the detected exercise and the score. Patients can also add a video overlay over the key  
\> points. Once they're done, they press stop and they can see a detailed summary  
\> of their workout, including the scores and duration of each exercise.  
\> And now, let's wrap up with the summary. Rehab AI aims to reduce the burden on  
\> healthcare workers while improving care for patients. It shows how we can use AI  
\> to solve realworld problems as plenty of room to improve in the future.  
\> This project isn't just about AI. It's about using AI to make a meaningful  
\> impact on people's lives. And with that, thank you so much.  
\> \[Applause\]  
\> Uh I'm just wondering what got you interested in this problem. It's not something that would come naturally I  
\> would think. So what what got you interested? Mhm. So I did some projects in the past relating to the pose model  
\> and it was really interesting on how it classified movements. So um classified  
\> like results and like sees how movements can displayed on AI and I really got  
\> into rehab after my my some of my relatives were also in this physical rehab industry and that just really I  
\> just wanted to mind how to use the post model to really uh classify and evaluate these results.  
\> Um, and curious if you've done any testing with this app, if you've had use  
\> cases, family members, friends, for example, any feedback, both positive and negative, you got from that testing.  
\> Uh-huh. So, uh, some family and friends all tested the app. They said it pretty  
\> worked pretty well, but there were some improvements that could be made to make it even better. One major key thing that  
\> I've heard was to diversify the data set. So I've trained this um I had  
\> training data of 30 minutes of each exercise and each exercise I tested on  
\> various family members big and small to try to diversify the data set as best as  
\> possible. However, we can expand on this by taking people, many people to get the  
\> AI to generalize them better and to classify it even more.  
\> Just a quick followup. Did you test on actual rehab patients or were these like fully healthy adults who were testing  
\> it? They're fully healthy. Yeah.  
\> So um so in this case I'm just wondering if um you know when you're in rehab you  
\> don't perform the motions exactly exactly so does your model um account for this  
\> sort of discrepancy in what for example someone with a shoulder injury can't do like a full lift or something and how  
\> how does that work exactly? Mhm. So in our app there's not only once you're finished with the exercise you not only  
\> see the duration of each exercise but also the score. What that means is how accurately is it being done.  
\> Yeah. Yeah. So patients who cannot perform the whole motion they will the exercise will  
\> be detected. However the score wouldn't be the highest. So the doctor can look at the results through doctor  
\> supervision and actually see where the patient is struggling on and where the patient is best at.  
\> Thank you.  
\> Someone who's been in rehab. \[Applause\] All right. Thank you so much Cody. Uh,  
\> now we have the move to heal team from Turkey. Oh no,  
\> it buddy. Sorry, it's kidney buddy. Sorry.  
\> You're after.  
\> I think I have an old Yeah. Thanks.  
\> There's extra mics here if you guys Okay. Yeah,  
\> I have no idea. Oh, it is that one. Ready?  
\> \[Music\] Oh, man. This one is on. How do you know if it's on?  
\> Okay. Oh, it's on. Okay. Good morning, everybody. All right. So, me, my name is Alan Zang.  
\> I'm here with my teammates today, Alina, Isabelle, and Alec. And we are here today to introduce our app, KY, which is  
\> the first AI powered app for chronic kidney disease, or also known as CKD Care.  
\> Just to give some background info in the US about 35.5 million adults have CKD  
\> and this risk substantially increases with age as between the age groups of 18 to 64 we have about 18% while those over  
\> 65 plus have about 34% which is about 1 in three seniors and so due to the fact  
\> that there's so many seniors who have CKD we this really highlights the urgent need for better management tools for those people. Unfortunately, our grandma  
\> is one of the people affected by CKD. Every meal is an uphill battle for her because she needs to meticulous  
\> meticulously track her daily nutrient intake which causes a lot of stress for everyone involved. So, as we were  
\> observing her CKD journey, we noticed three big problems. The first is the disjointed and generic tools. Um the  
\> available tools on the market right now are fragmented and not comprehensive causing many patients and users of the  
\> apps to um jump between the different apps. Secondly, these other apps can  
\> also cause exhausted users and caregivers. Seniors struggle with complicated apps and caregivers are often overwhelmed trying to help them  
\> juggle meals, medications, and appointments every day. Third, there are also support gaps and rising costs. Uh one critical thing is  
\> that oftent times uh doctors aren't able to have access to patients progress info such as daily nutrient tracking and what  
\> results is that they can miss early warning signs which leads to delayed care and therefore uh rising healthcare  
\> costs for those individuals and so this is why we created Kenny Buddy for our grandmother and other family like ours.  
\> Kidney buddy has many technological components such as MIT app inventor of course and smart AI like chatbt plus the  
\> additional speech recognition and text to speech. It makes it super easy to use and truly senior friendly.  
\> CKD gets worse over time and can cause kidney failure or early death. There's no cure, so managing protein, potassium,  
\> and phosphorus is key to protecting the kidneys. And this is why our app help track these  
\> three Ps to help better management and help a healthy kidney. And additionally, you're able to get friendly CKD meal  
\> planners for all CKD stages. And you are able to track through video, text or photo which makes it easier to track key  
\> nutritions. And if you see the limit, it will send an alert.  
\> Kenny Buddy also helps um in other ways such as you're able to assess your CKD  
\> risk easily to support proactive prevention, find any nearby doctors and labs, answer any questions you may have  
\> on CKD, and the app will also send you AI powered reminders. Additionally, it p it provides detailed  
\> AI powered progress reports for 7, 30, 60, and 365 days. It's able to, you  
\> know, track the trends over time and generate reports for doctors  
\> to solve the issue of the disjointed and fragmented tools. Um, Kinyuddy is an  
\> all-in-one AI powered uh device that is both intuitive in its uses and comprehensive in its applications. To  
\> prevent exhausted users and caregivers, our app uses chat GBT with a texttospech interface making it senior friendly.  
\> These features can also help caregivers stay organized with progress tracking and appointments.  
\> uh in order to solve the issue of support gaps and rising costs, we decided to use AI uh in order to help doctors be able to track those uh  
\> progress reports which allows them to detect those uh early uh signs of the disease and then in addition to that  
\> help them uh decrease the amount of time between initial care and therefore decrease healthcare costs for the  
\> individuals. Now onto the global impact. According to our research, 850 million people  
\> worldwide are affected by CKD. So it hits underserved communities the most and medically disadvantaged communities  
\> as well. But with Kennybody, we can increase better outcomes and have better um healthcare all around the world.  
\> Uh this is some comments and feedback from my grandmother and so my grand my my grandparents said that uh we made  
\> this app to help her with her CKD and overall it has made her feel much better, happier and more in control.  
\> We also have comments from anologist in general. He said that because um proper diet management is key to um like  
\> maintaining your kidney health since our app helps with um meal planning and tracking your nutrients. It is a great  
\> app that he suggests his patients to use daily. Kidney brings empathy AI and clarity all  
\> around the world. I hope you like their app a lot. Thank you.  
\> So, so I'll ask uh it's great that you tested it with your grandmother. Uh but  
\> did you manage to test it with uh any uh seniors who you were not related to?  
\> Uh yes, we tested with our neighbors actually cuz they're seen like they're older. I think they're I won't guess  
\> their age, but I think they're above 50\. Um and we definitely we definitely tested with um other family members too  
\> as well. Um and they gave us good feedback. They also gave us tips um what needed to be changed and we fixed a lot  
\> of bugs and stuff throughout the whole process. And did they find it to be stressfree?  
\> Uh definitely because you know as I mentioned you know you can uh track it by voice text and photos which makes it  
\> super easy and super senior friendly. Um, and curious if you've defined key  
\> metrics for for this app in particular. Um, obviously your grandmother want to live a healthier life, a longer life.  
\> That's kind of hard to track and measure. So, how do you think about metrics?  
\> Um, wait, wait, sorry. In in terms of your app, how do you know  
\> if it's successful? If the users are having a good experience, is it based on user engagement scores?  
\> Uh, definitely seeing improvement over time. um seeing if they you know they're feeling better, their the healthy are  
\> better. We go to the doctors for checkups, see if they're, you know, maintaining their meds, eating the right foods. Um and definitely seeing over the  
\> app um the progress of detail reports, seeing that they um increased a lot of um their and like they they make sure  
\> they're they didn't go over their uh key nutrition intakes from the three Ps.  
\> Thank you.  
\> All right. Now, please welcome Move to Heal. \[Applause\]  
\> You want to use  
\> Hello everyone. Today we're excited to present Move to Heal, which is an AI powered mobile app  
\> created to make home rehabilitation simpler, safer, and more accessible for people recovering on their own. We're a  
\> team of five high school students from Turkey, freshman, and sophomores, and we are proud to be this year's MIT EP  
\> Inventor Global AI hackathon team winners. We're all part of robotics team and patient about AI and technology. I'm  
\> DNA. In this project, I worked on posnet development and created our demo videos.  
\> Baton integrated our posnet and created our K features. Ada used on Ada created  
\> our chatbot. Dennis helped us to build UI and Ail  
\> created the user experience. Okay. Aligned with the United Nations  
\> sustainable development goal three, good health and well-being, our mission begins with a pressing reality. Around  
\> 2.4 billion people, nearly the one-third of the world, need rehabilitation.  
\> This number has grown by 63% over the past 30 years, and it continues to rise.  
\> Yet, only one in 10 has access to proper care. And for those trying to recover at home, 65% perform their exercises  
\> incorrectly, risking further injury. True healing is far more difficult to achieve under these conditions. And  
\> behind all these numbers, there are real people. For us, one of them was my grandmother. Seeing her try to keep up  
\> with rehab in pain, confused, and completely alone was really hard. She  
\> and so many others going through the same thing desert the weather. And that's what pushed us to develop  
\> something that could actually help. Now, let's take a look at what Motill offers. Our app uses AI to support users during  
\> their rehabilitation at home. It's built around a simple user-friendly interface and provides a safe experience by  
\> prioritizing security and privacy. Users can track their progress over time, receive real-time feedback for uh their  
\> exercises, and even save their favorite routines for easy access. Altogether, these features make move not just a  
\> tool, but also a supportive companion throughout the recovery journey. You can watch a tutorial video before getting  
\> started and then perform the exercise while receiving real-time feedback from our AI model.  
\> You can track your progress by viewing your exercise history by  
\> by adding the exercise you want to your favorites list. You can access to it anytime you want. Additionally, your  
\> personal AI assistant Moa is here to support you through your recovery journey.  
\> Here's a simple diagram showing how the core parts of our app are structured. After logging in, users land on the  
\> homepage where they can access three main features. Favorites, chatbot, and history. In favorites, selected  
\> exercises are saved using tiny DB1 and showed based on button visibility. Our  
\> chatbot handles user input, inject system message, and shows responses creating a smooth interaction flow. And  
\> finally, the history screen starts previously completed exercise again using Tiny DB1. This structure allowed  
\> us to keep the user experience simple while making sure K features are accessible at all times.  
\> One of the key features of our app was the combination of a personal image classifier and a poset extension.  
\> Briefly, personal image classifier is an image processing unit provided by MIT app inventor and posnet is an extension  
\> that we use to extract the patient's skeleton from the image to reduce environmental factors. By using these  
\> link units, we were able to achieve great accuracy in the test sets that the  
\> experts we interviewed provided. And in our journey to make home  
\> rehabilitation safer and more accessible, one of the most significant milestone was meeting MIT epimementor.  
\> MID MIT Appmentor provided us an easy and global way to create and expand our  
\> app. even global enough to share it in the MIT.  
\> Our app is built around three core principles, privacy, safety, and fairness. It includes a simple login  
\> page for data protection and brief medical disclaimers for safety. But most importantly, we reduce bias using poset  
\> to extract the skeleton instead of analyzing the raw images. So our AI model, personal image classifier model  
\> only focuses on the movement, ignoring irrelevant factors like skin tone, body shape, lighting, and background. Our  
\> biggest strength, real time feedback that helps users correct mistakes right when they happen. Our interface is  
\> simple, friendly, and uh designed for everyone, not just tech experts. Yes, we're still growing. We're working with  
\> a small data set, and we haven't reached clinical validation yet, but the opportunity ahead is massive. uh  
\> millions need support and we are uh building a solution yet that can truly reach them. As a team we have built a  
\> strong foundation but we know there's a still long way to go. Our next steps start with expanding our data set to  
\> improve model performance. Then we aim to begin a medical collaboration so we can collect real world feedback and  
\> improve realability. After that we will move into clinical validation working with professionals to test the app in  
\> real scenarios. And finally, once we are confident in its accuracy and safety, we will prepare for an official avalanche.  
\> We believe each of these steps will bring us closer to make a real world impact. We'd like to thank Dr. Fatma  
\> Pinayish, Dr. Murat Shahin, Dr. Sichil Kind, and our project advisor Oankus for  
\> their immersive support which truly enriched our project. These are resources we use throughout  
\> our project. We're not redesigning rehabilitation. We are redesigning what it means to be  
\> supportive when you need it most. And thank you for listening to us. You can contact us for more information.  
\> \[Applause\]  
\> So, apologies if I missed it. Um, and I do understand that one of your next goals is to expand your data set. Could  
\> you just elaborate a little bit on your initial data and where that came from? Um we trained our AI models with images  
\> taken from the posnet uh and we have nine different AI models uh for nine  
\> different exercises. Um in the AI models uh we trained uh we have 200 images per  
\> AI models and 100 images per uh classes.  
\> So in total we have um 1,800  
\> images in our data set. Uh and I'm I'm curious uh you clearly  
\> work with medical professionals on this. So curious what their feedback is and any user feedback you've received throughout this process.  
\> Um you can. Yeah. So um her grandma uh  
\> tried our app and she also told that it's very simple to do. So um it was  
\> very uh good for her to try that. Um and if we talk about the experts um  
\> we had two um rehab experts. Sorry for our English by the way. We have two AI  
\> experts. sorry, rehab experts who helped us through the uh sharing um the data  
\> set sheets for rehabs and um giving feedbacks for us and organizing  
\> meetings with um other patients that we can try our project. And additionally um  
\> we had a AI expert who helped us uh about uh giving feedbacks um which  
\> consists u adding um demo videos to our app and um some  
\> opinions about the UI.  
\> Okay. Thank you so much. Thank you.  
\> Additionally, we want to thank our mentor who helped us through the um  
\> preparing the presentation, Salem TZ. Thank you so much.  
\> All right. Thank you. Um and also please don't apologize for your English. It was a fantastic presentation and I could not  
\> speak this well in a second language. Uh so next I'd like to invite Cho Cook.  
\> \[Applause\]  
\> Thank you.  
\> Hello everyone.  
\> I am Hannah. I come from a tiny city 60 miles north of Tokyo. It's famous for  
\> strawberries. First of all, thank you very much for  
\> giving me this wonderful opportunity.  
\> The reason I decided to create an app was because I opened the fridge one day and I found this watery roten tofu. I  
\> was like, "No, I wanted to use that for lunch." I showed it to my mom and  
\> no, I showed it to my mom and she was like,  
\> "Oh, no. Not again. How many times how we let stuff go past its expiry date?  
\> My mom is great at making well balanced meals, but she always ask me and my little brother and sister. What should I  
\> make for dinner? And we are like, "It's up to you." Nobody has any ideas. And if my mom's  
\> dinner is the same as the school lunch, my little brother and sister like this again, we had this at school for lunch.  
\> That made me think, we need a nap. I thought, wouldn't it be great if there was a nap that turned a list of  
\> ingredients into recipes? So, I made one. It's called Chuk. The name comes  
\> from combining the Japanese word chto meaning just a little and the English word cook expressing the hope for a  
\> future cooking can be done easily and quickly and you can even add more ingredients by taking more photos of  
\> different receipt. Last month I did a try of the app at my local library.  
\> People suggested using the supermarket fryers or handwritten list of leftovers.  
\> You, for example, you could you could take a photo of sale items and get recipes using just those discounted  
\> items or recipes just need one or two other ingredients.  
\> The AI engine can easily come up with dishes you don't usually make, so your kids won't say things like, "Ah, we had  
\> this at school for lunch." Then you can spend more time doing the  
\> things you love like going out with your family and participating in seasonal  
\> events like the cherry blossom festival in my town. These events helped to revitalize towns.  
\> Now we face global challenges as outlined in the SDGs the sustainable development goals.  
\> One of these goals includes reducing food waste. In Japan, about 6 million  
\> tons of food went to waste in 2019\. Of that, about 2.76 million tons came  
\> from households. Globally, about 1.3 billion tons of food  
\> was discarded in 2019 with 931 million tons being classified as food waste.  
\> Despite all the food wasted about 650 million people was were suffering from  
\> hunger in 2019\. Social conditions certainly add to hunger and we must remember that no one  
\> chooses the country or environment they born into. Knowing that there are people in difficult situations. I want to do  
\> everything I can to help people in need around the world.  
\> In conclusion, Chook is not just a recipe app. It creates conversations, saves time, and helps build small  
\> connections in our daily lives. The reason I'm able to stand on this today  
\> is because of the incredible support I've received from the people in my local community.  
\> I hope that Chuk, which was inspired by my mother's struggles, will be helpful to her and who has support and to  
\> everyone who has supported me and to Japan's efforts in reducing food waste. and eventually I hope it brings smiles  
\> to people around the world. Thank you for your attention. \[Applause\]  
\> So I will um I will ask my question in Japanese if that's okay.  
\> I asked her uh if she got any feedback from the people at the library about things to improve or change about her  
\> app. Um, one people said me, I want to add  
\> more ingredient more receipts in um, I want to add more ingredients and more I  
\> want to talk I want to take more pictures not only one pictures two or  
\> three. So please change the the program  
\> and so the one people want want to see how  
\> to use this app. So I make a page of manual.  
\> I understand.  
\> Um and curious who who is your target user? Is it um a main cook of a  
\> household or like you know target user?  
\> My my mother's or my who  
\> makes dinner or what who doing the cooking. Okay.  
\> No problem. Uh, next we'll have Eeky Guy for teens. And uh I think the clicker is broken, by  
\> the way, so you'll have to tap on the arrows. I'll I'll show you when you get down here.  
\> Thank you. Can we connect our  
\> Yes.  
\> There's a little  
\> We have a We have one. You have your Yes.  
\> Hi, I'm Victor. Hi, I'm Ronald. Hi, I'm the Musa. I'm sure many of you  
\> have always started that stage of life that you don't quite know what you want to do and you're trying to find  
\> yourself, but everyone's telling you what you should be, parents, teachers,  
\> and we're currently in that stage. So, we decided to invent an app to fix our problem. We developed Iky Guy for teens,  
\> a self-discovery and career planning app.  
\> Did you know that over three4s of high school seniors are unsure what career they will enter after college? And over  
\> half of juniors say that they regret not planning earlier as freshman and sophomores. This is because there's a  
\> lack of support for career planning for teens. One reason for this is that teens are often unwilling to communicate their  
\> career plans with their parents. In the case of first generation students, their parents may be unable to assist in  
\> planning. And in other cases, the students fear that they'll be forced into a career path by their parents that  
\> they do not enjoy. Furthermore, most current career planning tools are  
\> not holistic and only focus on a single factor. When I asked my classmates and friends about what they thought about  
\> current career planning tools that we use in school, many of them said that they thought they only focused on personality and didn't consider income  
\> or what they wanted to really make an impact in in life. leaving them feeling like left out and feeling like those  
\> apps were not worth using. Our app uses the four-dimensional eeky  
\> framework to help students explore and find careers. Is based on the Japanese word eeky where eeky means to live and  
\> guy means worth. Together it means a meaning to live. And unlike other apps, our app combines the self-evaluation  
\> with passion, skills, impact, and income insights rather than just listing job  
\> options or individual personality tests. And this is what allows students to find fulfilling, meaningful, and financially  
\> stable careers. Our application consists of three  
\> components, the front end, backend, and database. The front end is developed in MIT App Inventor and handles UI logic as  
\> well as stores local user login data in Tiny DB. The back end has a Python  
\> framework and hosts GPT4 on the Replet cloud platform to take user input from the front end and encode it as vector  
\> embeddings to be stored in the Firebase DB. When the front end requests an AI powered feature, the back end takes  
\> these embeddings, compares them for closeness, and then sends the closest ones into the AI to be displayed as a  
\> prompt response in the front end. The front page of our app contains the  
\> log the homepage where you can log in to an account or register. When a user registers for an account, their login  
\> data is stored in the tiny DB which is what allows them to log back in at any time. And when a user logs into their  
\> account, they will have access to five main features and three of them are AI powered.  
\> So as Ronald said, we have five main features. Our first feature is the quest feature. So this is where when the user  
\> logs in, they can take a personality test to kind of see what type of person they are and then report it back to the  
\> AI through voice memos and it's stored later for the for future um for future  
\> components. The second feature is much like the quest feature. It's called the journal  
\> feature and this is where the user can record daily entries, things that happen  
\> in their life, pretty much anything. It's like their own personal diary and it's also sent back to the database and  
\> will be future analyzed. So our third feature is the first AI  
\> component of our app. It's called the discover feature and this is where it uses an API and takes all the data from  
\> the voice memos you recorded in the prior features and then you it gives you  
\> the selected response which you love what the world needs and what can make a great impact.  
\> Our second AI powered feature is called the career feature. And this is for teens who don't yet know what path they  
\> want to pursue and are still kind of gauging what they want to do. And they can customize it based on their liking.  
\> And it'll give them a description based on the journal feature. And then our last feature is called the  
\> plan feature. And this is my personal favorite feature because it's really helped me. But it can help you based on  
\> if you already know what type of career you want. It can make a plan for you and tell you what classes to take, what  
\> activities to engage in, and what not. So our app isn't like other AI powered  
\> apps like Chat Gept or Genomi because it actually uses data that you've given through the voice memos to create a  
\> customized plan tailored for every single individual user.  
\> Iguide for teams provides a personalized datadriven career analyzer that uses AI ethically in a multi-dimensional method  
\> to process as well as interpret data giving users more accurate career feedback. We believe that our app is a  
\> potential gamecher because it addresses gaps in the current student career formula. Firstly, it democratizes access  
\> to quality resources that students need to succeed. In addition, it allows first generation and low-income students to  
\> plan their future at no additional cost. And finally, Eeky Guy for teens utilizes  
\> ubiquitous mobile devices, allowing career planning to be accessible for all.  
\> So let your eeky guy with us.  
\> \[Applause\] So you mentioned adaptability is one of your goals that it would adapt to your  
\> changing or to the users's changing needs over time. Uh how does it do that?  
\> Right. So um as I mentioned earlier in the technology use section every time you use the app and you you can use the  
\> journal to like store your everyday components. So for example I'm using my app right now on my phone and if I like  
\> I can say oh I'm presenting at the MIT summit. This is one of the biggest moments of my life and then it'll store that it'll store that in the database  
\> and the more you enter and the more personality tests you take on the personality page every time you do it  
\> like that gets fed into the directly into the API. So, not like other apps where you're just like, "Oh, I typed it  
\> out every time." It goes directly into the API and it saves the data every time you log in so that every every time you  
\> use it, it gets more accurate. Got it.  
\> Um, and I'm assuming each one of you have taken the test and have a career map. Curious, you know, you mentioned in  
\> the beginning parents and putting you on on a certain career trajectory. How did the conversations go with your parents  
\> once you actually had a plan? So, my parents are in academia. They're  
\> actually sitting in the crowd right there and right there. And honestly, academia is the last thing I want to do.  
\> But they're always like, "H, you should just, it's so nice. You get to go on vacations. You get sbatical." And I'm  
\> like, "I would rather work in the industry." So, I actually took the test  
\> and it said that I'd be really good in finance. And so I was like I customized  
\> it to do payoff and impact and it said finance is the best one. So then I had a conversation with them. I was like well  
\> this job does pay well. It can pay my bills. So they finally agreed. So I'm  
\> planning to pursue a career in finance for me. Um I think maybe in the future I  
\> want to do something engineering and I think my parents are they're also in academia but I think they're relatively supportive of that idea. But I for me, I  
\> used the app to like map out what I exactly I wanted to like do, what clubs I have to take and stuff. So now I'm  
\> looking forward to joining some new clubs next year and yeah, taking some different classes.  
\> And for me personally, I want to go into computer science in the future. And that is the path that my brother is currently  
\> taking right now. And my parents kind of encouraged me to follow the same path. But at the same time, I've also grown in  
\> interest to it over time. in the app has also helped me to sort of explore more of those interests and sort of reinforce  
\> the idea that I should pursue that path. Uh so other than yourselves, did you  
\> test this with any of your friends or um people in the space and if so what kind  
\> of feedback did you receive? So I did I got some of my closest friends together and I had them look at  
\> the app and play around and they liked it. They really liked it. As I mentioned earlier, they thought the current  
\> personality test, the current like career plan test, all they do is focus on personality. So, they leave  
\> everything else out. Like they don't know that, for example, for me, I like watching Formula 1\. I like drawing in my  
\> free time. All they see is that, oh, you're an introvert or you work well in groups. But our app lets you explore  
\> every facet of that and put it into your career planning. And so, there's a ripple effect because, you know, the older you get, if you during a career  
\> that you enjoy, you'll probably do better in it. And then that'll empower the next generation to have uh to be  
\> more productive and more efficient and better at their jobs. My parents, they're not teens, but I  
\> decided to test the app on them to see if they actually belong in academia. So,  
\> I tested it on my dad and so he took the test and it actually said he should belong in sales, but you know, who  
\> knows? Thank you. Thank you.  
\> Thank you so much for allowing us to present here. Really grateful for the opportunity.  
\> This one. All right. Thank you. And now, last but not least, we have Happy Food.  
\> \[Applause\] Hello everyone.  
\> My name is Saska. I am 14 years old.  
\> \[Applause\] I am 14 years old and living hok Japan.  
\> Have you ever thought about what makes a good society?  
\> There may be many different answers to this question, but I believe a good  
\> society is one without prejudice. Today, I'm going to introduce a new app  
\> that I hope leads to a better society. I created this app from my own experience.  
\> When I was six, my teacher b me.  
\> Every day I was yelled at and blamed in front of everyone.  
\> I was even told not to come closer to the teacher.  
\> It was a very hard time for me. Due to this situation,  
\> I couldn't go to school. even though I wanted to.  
\> In Japan, the number of students under 15 who don't attend a school like me has  
\> reached a highest point about 350,000.  
\> Sorry.  
\> If we don't go to school, we have less chances to make friends.  
\> So, I made this app where we can find friends and meet each other in their  
\> near the homes. That means I can say this app is for younger who have  
\> difficulties to go to school. I want them to be able to make friends just  
\> like everyone else. I want them to enjoy and do singles  
\> together that they couldn't do around so far.  
\> You can use this app anywhere anytime if you have internet connection.  
\> If you feel lonely and want someone to listen to your problems  
\> or want to talk about your hobbies, you can easily have private chats on this  
\> app. I hope that the prejudice against the  
\> student students who don't go to go to school will disappear from  
\> from the Japanese society. Thank you for everything.  
\> \[Applause\]  
\> I guess I'll ask uh have you managed to get this to a bunch of other uh students  
\> like you who are not in school.  
\> \[Music\] She's going to try  
\> \[Music\]  
\> Unsensit  
\> show.  
\> \[Music\]  
\> I just ask her how she will make sure that uh adults don't use this application.  
\> Thank you very much. Thank you. \[Applause\]  
\> So I think um there were three projects who didn't get to show their videos. I have them on my computer. So if you want  
\> to come down, you can have 30 seconds to show that to the judges. So I think that's uh happy  
\> move to heal and chook.  
\> Hi everyone. Is this on? Great. All right, the judges are done deliberating.  
\> So, if everyone can settle down, that would be great.  
\> All right, please wrap up your conversations. Uh we'll get ready with the next portion very soon. And so we  
\> just want to celebrate the students who presented and take some photos with them.  
\> All right. Thank you.  
\> Okay. Um, so I will be announcing the winner for best design award. Um, and so  
\> we deliberated in the hallway. The judges decided that uh, icky guy for teens wins best design award. So  
\> uh, really thought the UIUX was very intuitive in terms of how you would actually enter the inputs, the information that they would give it.  
\> really liked how you could actually update it with different milestones throughout your life and then that would also create feedback loops as well. Um  
\> the anecdote in terms of how you've had these conversations with your parents was also a good one as well. So thank  
\> you so much \[Applause\]  
\> Thank you. Thank you.  
\> So we have decided to present the award for community impact to a project uh  
\> that is maybe not a huge impact for each individual person but together impacts a  
\> lot of people a little bit and has a real impact on the world in our societies. I'm very pleased to present  
\> the award for community impact to Cho Cook. \[Applause\]  
\> \[Applause\]  
\> Uh and I am delighted to present the award for creative innovation to move to heal.  
\> Uh  
\> I thought the level of technology along with the creative solution was just a  
\> wonderful combination. So thank you  
\> \[Applause\]  
\> Just a final word to say that we appreciate all of the finalists who made it here today and were able to give such  
\> good presentations on their work. You all are excellent designers with great thoughts about the future and we really  
\> appreciate all of the work that went into your presentations. \[Applause\]  
\> Okay. Okay. Thank you all so much. Thank you to our judges. Thank you to the youth  
\> presenters. Um you all did an amazing job. And also thank you to everyone for  
\> bearing with the AV issues that we were dealing with. And we are also about 15 minutes behind schedule. Um but yeah,  
\> thank you for your patience with that. Um so we will now be transitioning to the adult um presentations from the  
\> adult finalists from the global AI hackathon. Um for this portion, uh there will not be a live Q\&A or judging  
\> portion. Um so each of the presenters will have five minutes to present. Uh but if you're curious, we really  
\> encourage you to find the presenters afterwards if you want to um talk to them more and ask them questions. Um, so  
\> first up we will have um, Vision Cap. Um, uh, why don't you come on down to  
\> the stage? Where are you? Oh, there we go.  
\> Hello everyone. So my name is Kushell and I'm here to I'm excited to present  
\> my project vision cap. Vision cap is nothing but it's a cap which is smart  
\> obviously and also app. Okay. So this is my theme which is how which they are  
\> from different fields. So each of them helped contributed and did so much for this project and me personally I'm from  
\> the hardware side and I also made some contribution in software and database.  
\> Thank you. Uh and why are we here? Obviously the numbers so 2.2 Two billion  
\> people around the globe are facing visually impaired problems. Maybe low they might be blind or they might face  
\> some vision related issues. And in that almost 285 million people were facing a  
\> global mobility challenges regarding this visually impaired problems and  
\> every year around 1.2 million people were facing death due to road accidents  
\> and also visually impaired related problems. So this is the reason  
\> we selected this project and there is also one personal issue which I faced  
\> myself with one of my friends. So I have a friend and he had he got he recently  
\> got married and he had a kid but the kid is blind. So one of the thing which I  
\> observed is like kids are very curious and they're love freedom but if this is  
\> the problem he's suffering with I am not sure he's going to enjoy his freedom. Right? So I learn how he is going to  
\> face I want to I'm curious. Right? I want to see how he's going to face this problem in his future. So this kid  
\> turned five years and then he started a dance move like this.  
\> Okay. So he's keeping his hand like this and he just move. So I thought like I'm  
\> I thought like this is a trend, right? I thought this is a Tik Tok trend and he's doing the same thing. But his mom said  
\> like no, it has a deeper meaning in it. Like when he's doing this one, he's trying to find the wall if he could hit  
\> anything. And the reason he's doing this dance move with his legs is to detect anything under the any toy or anything  
\> in front of him instead of slipping out. And the reason why he's covering his head is he's afraid if he falls. The  
\> first thing he's going to hit is his head. And I saw so many bruises on his head. I thought he might become a  
\> daredevil at some point and that's why I came up with this  
\> project vision cap. As you can see, if I'm saying I'm not afraid when I'm doing this project live, I'm lying. I'm really  
\> afraid. I'm so scared that I it remind me of the day when my mom found out that  
\> I got an F in the math. Uh and also like in order to do this we have to face some  
\> issues right obviously if with the cab you can't sense that it can you can  
\> detect the stairs but you don't know how long or how high the stairs are there there is a still an obstacle left  
\> behind. So we were trying to integrate it with the st cane so it could help  
\> them with that as well. So like we did this project to reduce the road safety  
\> uh road accidents and like increase the road safety uh protocols which aligns  
\> with the UNSDG 3.6 and one more big challenge is like make  
\> it this low cost. So we have to make some trade-off with the sensors which we  
\> are using even though some of them are not practical and but they're cheaper.  
\> So what is vision cap? So vision cap is an AI powered cap. So those the camera  
\> which you're seeing is a Raspberry Pi IMX 500 camera which uses a NPU unit. So  
\> all the processing is done in the camera. So it reduces the stress on the Raspberry Pi which we're using as our  
\> CPU. So it gives us like voice alerts, navigations and also the emergency  
\> notifications. And one more thing which we did is like for the caregivers  
\> whoever sitting in the home, mom, dad, anybody can monitor the kid if he's safe  
\> or like anything happening to him. And also you can see we have a live stream. uh the user can if you want the bigger  
\> battery life the user can turn off the live feed and get the battery life or else he can keep it on.  
\> So this is our techn technical overview. So AI camera as I explained it has NPU  
\> unit and ultrasonic sensors on left hand side which is really helpful in closed environment but not so good when it  
\> comes to the real life outside situations. So they automatically turn off when it detects nothing around it.  
\> And there's a night vision camera at the back to increase the uh to increase their uh conference in low light  
\> condition as well and detect anything from the backside. And we use Raspberry Pi 5\. Yes, Raspberry Pi 5 is power  
\> hungry. But it does make the job done. And we we are using a mobile app just in  
\> case remember the blind person is having this hat on and going out and suddenly  
\> because of the power issues hat turn off. What's the second situation? That's where the mobile comes in. So the mobile  
\> can be used as with the camera it can do the same thing as same as the hat. So  
\> this is our technical architecture. So as you can see all the image uh  
\> detection and also data is being captured by the hardware and send it to the software where the software does has  
\> a AI and ML model running in it and it can do all the calculations and send the  
\> notification back to the user. So and the user also has the uh capability to  
\> change the proximities like he can adjust the ultrasonic sensor range if there are like he's in a closed  
\> environment. We don't want him to have all alerts all the time, right? So he can do that  
\> and vision intelligence in action. So our device AI has a feature and also we  
\> are trying to improve this feature more. So again coming to the boy. So the time  
\> take takes for him to find the toy he wants is almost  
\> 5 hours when it in the closed environment like he's a blind person right if the toy is on the box or  
\> somewhere he doesn't know or the his mom moves the toys to some other places so he can't find it. So what is the next  
\> step? If he if he want if I want to give him the freedom I should be able to detect that object and locate it for him  
\> right so that's where the AI comes in so we are giving chbt uh we used open AI  
\> for it to describe the scenario in front of him just like can you describe what's  
\> in front of me and the charg does it for them by taking the image analysis and we  
\> are also having the two second video record just in case if anything happens to the person and emergency And see you  
\> can there is a 2cond video burst and also it has a uh  
\> userentric uh system and user specific tuning is done. So as long as this uh so  
\> the longer this person uses the hat the smarter it gets and it can detect the home park anything the part he usually  
\> takes and everything. So on top of this this is a small  
\> small example like how it detects. So that's my friend standing there and it detects and gives the sound alert.  
\> Stay alert. Person ahead. Stay alert. So this is ahead. Stay alert.  
\> Right now it's working like that. We're trying to tune it uh less intensive so that the user don't get afraid of people  
\> who are far away from him. And also we are trying to reduce the range so that it can move more freely.  
\> Person ahead stay. So this is the app which we used with  
\> MIT. So the first thing which we try to use is the actual Android app but thank  
\> god it's so hard to make it. We almost spend eight hours for that. And then we  
\> use the MIT app which is so helpful and also I'm so happy to use that because of  
\> the block system block design it be so easy the app is so easy to make it and  
\> also we found that like it's easy we have he's a blind person right so it should be easy for him to navigate the  
\> app so we use like voice commands and also we did this one like he can just he  
\> can just say like take me to target and it gives a direction and it helps him with visual and also audio alerts and  
\> the person who is monitoring him or the caregiver can happily sit in the home and watch where he's going  
\> and thank you. So \[Applause\]  
\> and also like we didn't made this vision cap just like a project. So it's a real  
\> life scenario, right? So we tried to do it in such a way to make this one as a product in we saw this one as a product  
\> instead of a project. So it's a new way of finding out like how AI can help uh  
\> underserved people or like visually challenged people or like physically  
\> challenged people. So if AI could help them then I'm good with the AI. Thank  
\> you. \[Applause\] Great presentation.  
\> Thank you so much. Um, next let's give a warm welcome to Recycle Easy, who's  
\> coming to us all the way from Italy. \[Applause\]  
\> Hi, Ciao. Good morning. I am Marco and I come from Venice, Italy.  
\> doesn't work. Okay, work. And uh in the app inventor community,  
\> you can find me with the nickname Marco Peron.  
\> When I read the um United Nation sustainable development goals, I found  
\> really interesting and for me the best it was the A1 make cities and human  
\> settlements inclusive, safe, resilient and sustainable.  
\> We live in a society that produce a lot of waste every day and we know that recycle is the correct way to try to  
\> solve this problem. Recycling give to us two great opportunities. First, do not  
\> use raw material and second recycling reduce pollution.  
\> Another thing to consider is the wish cycling. Recycling is the practice of placing items into recycling bin with  
\> the hope that they will be recycled. This can be a problem because the material that we want to recycle can be  
\> contaminated and must be discarded. In the product that we buy, we can find  
\> the recycling codes. They can be number, labels or description. But if you come  
\> from another country and you don't know the language, become impossible to understand the recycling codes.  
\> And we have to consider that in other country their cyclic codes can be different. For example, in the photo you  
\> can see the second is used in South Korea, the third in Japan and the third in Europe and United States.  
\> When I read the United Nations sustainable development goals, I thought about my city Venice and the problem of  
\> the waste management and all the tourists from all over the  
\> world that visited every day. For this reason, I create recycle easy app.  
\> Imagine you are in Venice. You're walking around the streets and you have a capuccino. And when you finished, you  
\> can recycle correctly using the app.  
\> You click on recycle. Then take a photo of the cup or the package and the AI  
\> start to find the codes. Then the AI return a list of codes and  
\> you can have details about the material and if the package can be recycled or  
\> not. Then you can use the recycle station. You can see a small prototype in the  
\> photo. The app scan the code and the lead is turned on to show you where to put the material that you want to  
\> recycle. But how the recycle station and the app  
\> interact with each other? For this purpose, I use an MQTT broker. MQTT is  
\> for message queuing telemetry transport. The MQTT broker is the message manager  
\> between the devices. The recycle station connect to the MQTT  
\> broker and subscribe to a specific topic and wait for a message  
\> with the app. I scan the QR code and the the app publish a message to the topic  
\> found the QR code. In the message there is the material that I want to recycle. For example,  
\> plastic, glass, paper and so on. When the recycle station received a message,  
\> a light is turned on to show you where to put the material that we want to recycle.  
\> to encourage people to uh recycle their waste. I also fought a reward system.  
\> Every time you use the app to recycle, you earn points and when you have enough points, you can get a discount to enter  
\> uh to a museum, for example. I also added a memory game not just for  
\> kids to learn recycled codes because I think that playing is a great way to learn and also we have to train our  
\> brain not only the AI.  
\> This is the recycle station. For this small uh prototype I used an ESP 2D2 and  
\> five leads and five resistors. For my app, I used free extension, the  
\> OCR.space that I created some years ago that convert photo into text and the  
\> recycle AI that use open AI uh as artificial intelligence. And third, the  
\> AI2 MQTT extension. And the fourth is the MQTT broker that I use for my  
\> project. And I want to say thank you to MIT Rays and the App Inventor Foundation for the  
\> great opportunity for me to be here today. Thank you.  
\> Great presentation.  
\> Okay, thank you Marco. And last but certainly le not least, let's welcome  
\> Sleepfixer who's here from Singapore. \[Applause\]  
\> Oh, hello everyone. Uh, by the way, you're allowed to take a nap during my presentation cuz it's  
\> about sleep. Oh, yeah. So, don't worry about it. Okay. So, uh, sleep crisis.  
\> Uh, many people face problems with sleep. Um, CDC has called it like public  
\> health problem and it's also been called a silent epidemic. It's often unrecognized, underreported,  
\> underprioritized, often have to sacrifice it in um for sacrifice it for  
\> school, work and other stuff. So yeah, uh a study by rand.org found that the US  
\> loses $411 billion a year uh due to lack of sleep, which I found quite uh  
\> interesting. Uh and just increasing from six to seven hours  
\> per night can add $200 billion to the US. So yeah  
\> uh so my inspiration to create sleepixer was that when I was in school uh just  
\> found it very hard to fall asleep and wake up at the times I needed to and see that's that's a real footage of my  
\> sister struggling to wake up for school so I decided yeah so and I also so I  
\> searched for apps to help me and I tried many apps there's a lot of sleep trackers that track your sleep but there  
\> wasn't any app that can help me change my schedule uh and And I found that the best way to do it was 15 to 30 minutes  
\> according to sleep science and there was no apps that did that. So I decided to make one. The perfect opportunity was global hackathon uh 31 HD and the app  
\> inventor was very easy to use and the extensions were very um easy to use as well. So thanks so thanks for thanks to  
\> the app inventor foundation. Uh so yeah imagine it's 6:30 to 7 a.m. fresh new  
\> day of opportunity and you wake up and you wake up to annoying alarm. Yeah, it's like very annoying. I hate it so  
\> much. Like I Okay, so yeah, I imagine that we could wake up uh I imagine that  
\> we could wake up refresh and like alarms only a backup like you just wake up whenever you need to refresh ready to  
\> see the day. You know what I mean? Yeah. So yeah, introducing sleepixer uh helping the world sleep better day by  
\> day. Uh so this is just the main app that I made. uh you just take your current sleep schedule and your goal  
\> sleep schedule and will help you shift it by 30 to 15 minutes per day and the  
\> AI will have will get context inject injected. So all of the stuff that you your current schedule, sleep schedule  
\> and your plan will be inside the AI. So the AI can give you personalized tips on  
\> how to achieve your your personalized sleep goals. Uh I wanted to say  
\> something. Uh oh, never mind. Uh yeah, so the judges uh gave me  
\> feedback that I should uh include progress tracking and improve  
\> the AI. So I decided to make a new version of Sleep Fixer uh with AI notifications and sleep progress. Uh  
\> yeah, and the this just shows the current uh market and there's the the  
\> trackers, they don't help you change your sleep and the sleep clinics and sleep coaches are probably the best, but  
\> they're offline uh inaccessible, expensive. So I decided to make it  
\> online, accessible, and free for everyone to use. So my testimonials that I tried with uh  
\> people that I know um yeah I just help them fix their schedule, make up more  
\> refresh and yeah I just wanted to ask uh anybody uh raise your hands if you sleep  
\> at a different time than you want to. Okay. Okay. How many how many people  
\> want to wake up more refreshed? Okay. So everyone should use my app. Okay.  
\> Okay. So, thank you to everyone. Um, my mentor Angie, uh, Zarin, and my friend  
\> Zoe, you helped me. I'm planning to release on App Store and play, uh, play store soon. Uh, and I'm welcome to any  
\> collaborations. So, please come find me. Other than that, yeah, everyone use my app. Okay. Yeah. Uh, sleep fixer. Yeah,  
\> you can search it up when I release it soon. Okay. Thank you.  
\> That was great. Very funny. I think we could all definitely use that app, especially those of us dealing with  
\> jet lag. All right, let's give one more round of of applause to all of the global AI hackathon presenters, youth  
\> and adults. And I think now the moment we've all been waiting for, coffee break. And if  
\> you want, please feel free to find any of the presenters and chat with them with their about their apps and ask them questions. All right, let's take a  
\> 10-minute break.

\> \*\*Attachment: attachment · txt · 14.7 KB\*\*  
\>  
\> Capítulo 1: Introducción  
\> 0:000 segundosHi guys, welcome back to the channel. My name is Jonathan. I'm a CS student at Columbia. If you guys have watched my videos before, you know that I like to go to hackathons and I like to win them.  
\> 0:1313 segundosLast weekend, I went to Yale for Yack.  
\> 0:1515 segundos\[music\] I got a whopping zero hours of sleep and managed to win a little something something.  
\> 0:2424 segundosThis is that story. My team and I woke up at 7:00 a.m. to catch a train plus a bus plus bus plus bus from New York all the way to New Haven. I went to YHack  
\> 0:3232 segundoswith some good friends \[music\] from Columbia, but this was our first time actually coding a project together and we had no idea what to build. We tried  
\> 0:4141 segundosour best to think of some ideas on the bus, but we ended up sleeping.  
\> 0:4545 segundosIdeating ideas, but yeah, bro is not ideating. We were in New Haven.  
\> 0:5050 segundosThe bus ride was uh sleepy. Guys, do we have an idea or no? You have an idea.  
\> 0:5656 segundosI have some ideas, but I don't know if like they're really good. Guys, we made it to Yax.  
\> Capítulo 2: La idea  
\> 1:071 minuto y 7 segundosI think finding \[music\] the idea is the most important and sometimes the hardest part of a hackathon.  
\> 1:141 minuto y 14 segundosAll right, guys. We have found our hacking blocker now. Anyways, we're trying to figure out idea now. I like to think about what would be the coolest demo for a judge to see and then work  
\> 1:231 minuto y 23 segundosbackward from there. This time I was inspired by a little Twitter post I'd seen about fast user switching on Mac OS. We decided to build Second Self, an  
\> 1:321 minuto y 32 segundosAI agent \[music\] that runs on a separate user profile on your Mac and does work for you. All right, guys. We need We need rice.  
\> 1:401 minuto y 40 segundosWe're getting lunch now for dinner. It's 5:30.  
\> 1:441 minuto y 44 segundosThis is our This is what we have in our possession. Uh the rice is missing. It is officially wrapped.  
\> 1:511 minuto y 51 segundosCrab ra. No, that shit's tragic. Wait. Yeah. What? I'm calling her. Yeah, call. Yeah, call her immediately.  
\> 1:591 minuto y 59 segundosWhat is this place called? Nice day.  
\> 2:052 minutos y 5 segundosThis show is good. Guys, quick project update. Uh, we're close to getting the MVP working, I think. I don't want to  
\> 2:122 minutos y 12 segundosjinx it, but we have the the core of the app is proven. The streaming and VNC works uh for the second user. So, we're  
\> Capítulo 3: Resumen del proyecto  
\> 2:202 minutos y 20 segundosgoing to try to hook it up to an Asian loop and then get it working through the chat interface in the notch and it should be should be workingish. So,  
\> 2:272 minutos y 27 segundoswe'll see. So, you know on Mac you can have like multiple user profiles, right?  
\> 2:312 minutos y 31 segundosLike a guest profile. Well, fast user switching on Mac lets multiple users stay signed in at the same time. So, you can switch between them without fully  
\> 2:392 minutos y 39 segundoslogging out. And this means that apps and windows stay open in the background for each account. So we basically took advantage of this to run a server on the second user profile that would let us  
\> 2:472 minutos y 47 segundoscontrol it from the main like \[music\] user. And this basically meant we could give an AI agent control of the second user profile while you control it from  
\> 2:552 minutos y 55 segundosyour user profile without having to switch. But the agent gets its own user profile with its own permissions, files, accounts, \[music\] and whatever. And then  
\> 3:023 minutos y 2 segundoswe ran what's called a VNC server on the second user profile, which basically lets us see and control the screen of the AI agent uh without switching users  
\> 3:093 minutos y 9 segundos\[music\] at all. We even went a step further in our project to make the AI agent a clone of you, \[music\] which means it learns to talk like you based  
\> 3:173 minutos y 17 segundoson your emails and figures out everything about you so it can become your second self.  
\> 3:243 minutos y 24 segundosUh, and we decided to give it normal tools like MCP, computer \[music\] use, browser use, a whole bunch of AI buzzwords.  
\> Capítulo 4: El proceso  
\> 3:313 minutos y 31 segundosAll right, it's currently uh 11:43 p.m. How we feeling? Good.  
\> 3:383 minutos y 38 segundosYeah, we're feeling pretty good after that.  
\> 3:403 minutos y 40 segundosYeah, that flavor is so good. This a whole tower game. Yeah, actually start kicking.  
\> 3:453 minutos y 45 segundosOh my god. How many more do you think we'll accumulate?  
\> 3:483 minutos y 48 segundosHonestly, I think we might accumulate until like more.  
\> 3:523 minutos y 52 segundosOkay, I'll show them what we have so far. This is the UI. Little chat here. Message your twin.  
\> 3:583 minutos y 58 segundosHello. Unfortunately, nothing else works right now.  
\> 4:034 minutos y 3 segundosThe plan is we're going to merge everything into Maine and then we're going to fix all the issues with the BNC and \[music\] you know making the product  
\> 4:114 minutos y 11 segundosactually work and then it's going to it's going to be amazing after that here.  
\> 4:154 minutos y 15 segundosHoly \[ \_\_ \] Peanut butter, bro. That mean I just broke my nail coating.  
\> 4:244 minutos y 24 segundosIt's looking insane.  
\> 4:254 minutos y 25 segundosAll right, feastable. You want you want to get in the feast bowl? Have you ever had one? Oh, wait. This one.  
\> 4:324 minutos y 32 segundosNever had one. Cheers. Cheers. Cheers. Cheers. It's hella sweet.  
\> 4:404 minutos y 40 segundosTastes like chocolate. It tastes like reach.  
\> 4:444 minutos y 44 segundosTastes like At 4:00 a.m., we were starting to get hella tired. And I've noticed that the 4:00 a.m. and the 8 a.m. marks during hackathons are usually when the sleep deprivation hits the hardest. But the  
\> 4:534 minutos y 53 segundosworst is 2:00 p.m. the day after you pull the allnighter and you haven't slept at all. And that's when I feel like my heart is actually gonna like stop beating.  
\> 5:025 minutos y 2 segundosI don't understand.  
\> 5:035 minutos y 3 segundosDid you Are you the Are you the primary creator of this jazz?  
\> 5:075 minutos y 7 segundosI'm a contributor. I'm not the How How many cans \[music\] have you contributed?  
\> 5:105 minutos y 10 segundosThis is the This is This is This is the main contributor. He's drank like four, bro. I know. There's a lot in there, bro. He's pretty crazy for this.  
\> 5:185 minutos y 18 segundosI drank I drank one.  
\> 5:195 minutos y 19 segundosAll right, guys. The Taco Bell is in there. Trying to pick up the Taco Bell.  
\> 5:275 minutos y 27 segundosYo, this \[ \_\_ \] bro.  
\> 5:355 minutos y 35 segundosYou might also be wondering how we're able to code so much in such a short period of time. Here, I'm making an  
\> Capítulo 5: Mi estilo de programación  
\> 5:415 minutos y 41 segundosentire SAS app in just 24 hours. Well, it's not just me. I have a team of four people, including myself. But the real  
\> 5:495 minutos y 49 segundosanswer is Claude Code. If you don't know cloud code, it's a command line interface for \[music\] uh vibe coding. I  
\> 5:575 minutos y 57 segundoshave a pretty elaborate cloud code setup that enables me to vibe code apps that are actually good and it consists of like three main parts. So first is like  
\> 6:046 minutos y 4 segundosclaude skills. This basically \[music\] lets Claude become an expert at certain things. So the front end design skill uh is really good and then I use his skill  
\> 6:136 minutos y 13 segundoscalled GStack which just helps make the whole planning, coding and like review uh sort of flow really good. And then I also use MCP servers. There's this one  
\> 6:226 minutos y 22 segundoscalled agentation. You can't tell anyone about it cuz it's super good. It basically lets you annotate your uh front end designs and then paste  
\> 6:306 minutos y 30 segundosannotations back in the cloud code. So it can make very targeted fixes. And then finally, I use this thing called git work trees. Basically um if you guys  
\> 6:386 minutos y 38 segundosknow anything about git, you can check out a branch \[music\] uh which means you're looking at a certain version of code on your local device. Um but you can only look at one branch \[music\] at a  
\> 6:476 minutos y 47 segundostime. But with get work trees, you can check out multiple branches at the same time on your device. Basically, you can work \[music\] on like five features at  
\> 6:556 minutos y 55 segundosonce, for example. That's beautiful, bro.  
\> 6:576 minutos y 57 segundosYeah. Holy \[ \_\_ \] Oh, that's a nice camera app.  
\> Capítulo 6: Recta final  
\> 7:027 minutos y 2 segundosWow, that sunrise is pretty sunrise, aka 6 a.m. We're on the last stretch right now.  
\> 7:117 minutos y 11 segundosIt is 7:20 a.m. and uh we're making a final push right now with the submit. We have like 4 hours, 3 hours, 30 minutes left.  
\> 7:177 minutos y 17 segundosRight now I'm making some UI changes to the code and we need to write the doc and film the demo and Vin is merging his PR and he wants to do RL. How's feeling?  
\> 7:267 minutos y 26 segundosAre you tired? I'm tired. It's actually pretty good, dude.  
\> 7:307 minutos y 30 segundosTinkering UI demo. Boom. Boom.  
\> 7:367 minutos y 36 segundosGot the Got the dude in the dancing.  
\> 7:397 minutos y 39 segundosExpand to the screen that he's controlling.  
\> 7:427 minutos y 42 segundosShrink that \[ \_\_ \] Hi. Bang.  
\> 7:467 minutos y 46 segundosTime to open the maps and check calendar. Yo, open Safari. Get All right. Yeah. Oh, it was already open, bro. Hold on.  
\> 7:547 minutos y 54 segundosOkay. Open notes.  
\> 7:597 minutos y 59 segundosPaper rustling. \[laughter\] Oh, cuz you were giggling, bro.  
\> Capítulo 7: Demostración  
\> 8:028 minutos y 2 segundosOkay, let's do something more complicated. Uh, go to Reddit and find me the top three posts of r/ side projects today. We go on the VNC.  
\> 8:118 minutos y 11 segundosInteresting. It's coitating. It's moonwalking. Oh, it's ready. it. Oh, sink cookie.  
\> 8:178 minutos y 17 segundosAllow the cookie sink. \[clears throat\] Allow it. Allow it.  
\> 8:218 minutos y 21 segundosSinking cookies, Jonathan. Oh, we're on side projects. Nice. Bang. Nice. Bang.  
\> 8:288 minutos y 28 segundosHypothesizing. Yo, this is clean. It's clean. It's so clean. It's 9:21. I'm going to film the demo now. Um, Jazz and  
\> 8:368 minutos y 36 segundosViv are completely asleep. And I I'm actually really proud of this project.  
\> 8:408 minutos y 40 segundosIt looks The UI is actually like the most beautiful \[ \_\_ \] ever. Um, so yeah, I'm going to demo right now. We have a plan.  
\> 8:498 minutos y 49 segundosI'm really tired, but it's chill. We're going to finish this strong.  
\> 8:548 minutos y 54 segundosCan I Can I just submit it? You can always edit. I'm just going to submit. Wait, the video link. You can edit it. Oh, yeah. You're right.  
\> 9:009 minutosThe video link. I'm trolling. I'm trolling. Just wait. I just don't want to miss a submission. You won't. Oh \[ \_\_ \] I don't think I have time, bro. Not going to lie.  
\> 9:089 minutos y 8 segundosWait. What are you doing right now, bro? Um I'm being um on the spectrum there.  
\> 9:149 minutos y 14 segundosNo, that's really not how you do it, bro. Do you want this? Wait, what's the method then?  
\> 9:189 minutos y 18 segundosI thought you were going to like stick it like side by side or some \[ \_\_ \] Yeah. Oh, yeah. That makes more sense.  
\> 9:259 minutos y 25 segundosAnyways, guys, we finished our submission. That \[ \_\_ \] was hella stressful though.  
\> 9:299 minutos y 29 segundosWe got it done. We got it done like barely, barely. Barely. Anyways, we're trying to Apparently only some people move on to in person judging. So, hopefully we move on.  
\> 9:379 minutos y 37 segundosHow many do you think they take? Like a half probably.  
\> 9:409 minutos y 40 segundosI don't know. It's actually a \[ \_\_ \] There's no way. Can you unite Vivian for me? Ignite her. Huh? Tap her on the head with the sword. Ignite her. You got to knit her.  
\> 9:489 minutos y 48 segundosYeah. \[laughter\] Thank you. That's a That's a good safety shake. Oh. Oh.  
\> 9:569 minutos y 56 segundosOh. \[laughter\] Did it drip on you? Yes.  
\> 10:0110 minutos y 1 segundoHell \[laughter\] no. That's the holy water, bro. The holy water. You just got blessed.  
\> 10:0610 minutos y 6 segundosJust got baptized. What was on? Okay, let's see. Does it say sign in?  
\> 10:0910 minutos y 9 segundosYes, guys. We just move on to Inerson judging.  
\> Capítulo 8: Evaluación  
\> 10:1110 minutos y 11 segundosWell, we got Bill with Zed, bro. We got to lock the \[ \_\_ \] in.  
\> 10:1410 minutos y 14 segundosWait, guys. We're uh currently going to judging. Now, our first judging event is Oh, my mic just fell off.  
\> 10:2210 minutos y 22 segundosUh or our first judging event is the personal AI agents track, which is the one I'm most uh hopeful for. So, let us lock it.  
\> 10:3110 minutos y 31 segundosWhat's up, guys? We're about to We just finished our first round of judging with uh Harper and now we're about to do Zed.  
\> 10:3910 minutos y 39 segundosAll right, guys. We're leaving our hacking spot after a good judging session. Why the heck you even came here?  
\> Capítulo 9: Premios  
\> 10:4610 minutos y 46 segundosActually, here's a question. Why did you come here? Anyone want to share? Why did you come? Many of you came from far away to see you.  
\> 10:5310 minutos y 53 segundosYou see me?  
\> 10:5710 minutos y 57 segundosFirst up, these top submissions. Um just all of you guys.  
\> 11:0711 minutos y 7 segundosAll right. For the first place we have neurotransmitter  
\> 11:1311 minutos y 13 segundos\[applause\]  
\> 11:1611 minutos y 16 segundosplace we have comments. In first place we have food chain.  
\> 11:2311 minutos y 23 segundosThird place is  
\> 11:2611 minutos y 26 segundos\[applause\]  
\> 11:2811 minutos y 28 segundosplace hard. Shout out to first place goes to another group.  
\> 11:4111 minutos y 41 segundosAll right, that's a that's a there are four poly hedges that were submitted. All right, you guys all ch your name.  
\> 11:4911 minutos y 49 segundos\[laughter\]  
\> 11:5011 minutos y 50 segundosThe team was half like Columbia, half Stanford students and that poly hedge.  
\> 12:0012 minutosIn third place we have uh Tamil.  
\> 12:0612 minutos y 6 segundos\[applause\]  
\> 12:0812 minutos y 8 segundosYeah. For second place we have um Helix  
\> 12:1212 minutos y 12 segundos\[cheering\]  
\> 12:1912 minutos y 19 segundosin first uh session. Work.  
\> 12:3612 minutos y 36 segundosYes, sir.  
\> 12:4312 minutos y 43 segundosI thought it was me, too. I thought it was What's up, guys? This is immediately post awards ceremony. How you guys feeling?  
\> 12:5112 minutos y 51 segundosGood. We did not expect that. Oh, what's up? I thought it was over.  
\> 12:5612 minutos y 56 segundosNo, literally I was like, "It's currently like Yeah, I actually thought it was over, bro. I thought it was my heart rate  
\> 13:0513 minutos y 5 segundosactually went up, bro." I was like, "Wo\!" And like we were so annoying. We were so annoying cuz when we sit up really loud.  
\> 13:1313 minutos y 13 segundosactually better.

\> \*\*Attachment: attachment · txt · 18.3 KB\*\*  
\>  
\> apítulo 1: Preview  
\> 0:000 segundosthis past weekend I went to Stanford tree hacks the largest Collegiate hackathon in the US this is a story of how I pulled my first 36h hour long all  
\> 0:099 segundosnighter and how my team built a robot from scratch and won a grand prize yeah we're definitely not sleeping tonight like that's not even a question we're  
\> 0:1616 segundosgoing to put on the linear rails now this is the basis for a robot it's currently 5:30 a.m. wait why is it corrupted huh  
\> 0:2525 segundosuh why did the IMU crash oh my God you get a chicken tender late  
\> 0:3232 segundos\[Applause\]  
\> 0:3838 segundosnight today is February 13th and I'm about to fly out for tree Hax it's  
\> Capítulo 2: Intro  
\> 0:4545 segundoscurrently 12:30 and I'm in my dorm um I'm about to take the train down to Grand Central and from there I'm going to meet up with my friend Alex and his friend Neil we're going to head over to  
\> 0:5353 segundosthe airport JFK and we're going to fly to SF it's going to be a great hackathon I'm looking forward to this it feels anything like it was last year it's  
\> 1:011 minuto y 1 segundogoing to be one of the best experiences of my life so get ready I'm about to go Yo  
\> 1:091 minuto y 9 segundosGod for we're in Jamaica Jamaica me  
\> 1:161 minuto y 16 segundoslate all right we made it onto the plane  
\> Capítulo 3: SFO → JFK  
\> 1:211 minuto y 21 segundos\[Music\]  
\> 1:321 minuto y 32 segundos\[Music\]  
\> 1:511 minuto y 51 segundoslike that's why I didn't do this last  
\> 1:541 minuto y 54 segundos\[Music\]  
\> 1:571 minuto y 57 segundostime all right we just landed in SF what's up what's upit  
\> 2:062 minutos y 6 segundostheit we're about to head back to our respective homes that's right sleep in our own beds yep yeah type \[ \_\_ \] and then  
\> 2:142 minutos y 14 segundostomorrow is is the first day of tree hacks it is currently um February 14th  
\> Capítulo 4: General Catalyst Lunch  
\> 2:202 minutos y 20 segundosValentine's Day and I'm about to go to a hackathon lunch um this is a general Catalyst Venture fellows lunch that  
\> 2:282 minutos y 28 segundosRobert got me to sign up for I'm not really sure what to expect but um I think it'll be a good chance to meet other  
\> 2:352 minutos y 35 segundospeople all right guys we are here at tritter I'm with my boy Robert Zang and  
\> 2:422 minutos y 42 segundoswe're about to go to the general catalst Venture fellas lunch all right we're at the uh General catalst Venture Venture  
\> 2:502 minutos y 50 segundosfellows lunch and um we're just like networking this sh right now these are some people that we met pretty sick of all right guys we're going to Apple park  
\> 2:582 minutos y 58 segundosright now to uh explore at these two at the um lunch and uh  
\> Capítulo 5: Apple Park  
\> 3:053 minutos y 5 segundosyeah also like uh Apple store which were  
\> 3:163 minutos y 16 segundosyou you're at Apple park right  
\> 3:203 minutos y 20 segundos\[Music\]  
\> 3:273 minutos y 27 segundosnow nice  
\> 3:303 minutos y 30 segundos\[Music\]  
\> 3:333 minutos y 33 segundosall right we're on H the rooftop of Apple park right now Robert gave me some sick AR glasses that I'm about to try on hold  
\> 3:423 minutos y 42 segundoson what do I look like oh my God bro I got to start working on the library with these on how much were these we got back from Apple Park and now we're walking to  
\> 3:503 minutos y 50 segundosthe Hang engineering building where we're going to check in so I think that' be interesting because the data science building is oh oh the co- director this  
\> 3:583 minutos y 58 segundosyear good to see you boy you talk arune yeah yeah we're about to get registered for  
\> Capítulo 6: Check In  
\> 4:084 minutos y 8 segundosTrex have the sponsor boost now okay all right we're currently at the sponsors uh sponsor section of the the hackathon so  
\> 4:164 minutos y 16 segundosit's a lot of boo set up here and we're just going around talking to different sponsors and scanning QR codes and stuff  
\> 4:244 minutos y 24 segundos\[Music\]  
\> Capítulo 7: Dinner  
\> 4:384 minutos y 38 segundoswe uh just helped Chris move some parari sweats we're on the way to go get dinner with Michelle and Alex right  
\> 4:454 minutos y 45 segundos\[Music\]  
\> 4:474 minutos y 47 segundosnow look at that look at that  
\> 4:514 minutos y 51 segundos\[Music\]  
\> 4:534 minutos y 53 segundoscamera I am uh outside the oval right now Stanford's oval heading over meet up with my team right now looks like this is where we'll  
\> Capítulo 8: Getting Ready  
\> 5:015 minutos y 1 segundobe hacking the data sign pretty I think we're going to  
\> 5:085 minutos y 8 segundosbe spending a lot of time here wait did you change or you always wearing that all right this is our hacking venue  
\> 5:165 minutos y 16 segundoswe're set up in the in the um data science building right now we have quite the collection of supplies here and we're about to head over to the hardware  
\> 5:255 minutos y 25 segundosHardware lab to get started at 9 9:00 p.m. you can get out of Pand damn all right we're about to get to the  
\> 5:335 minutos y 33 segundoshardware lab so uh this lab right here we just had a snack run got the pure protein bars and we got the vitamin water and we got the parari sweats and  
\> 5:425 minutos y 42 segundoswe're ready to lock in now I'm planning to sleep at least like 4 hours maybe is that called Y2 or something  
\> 5:495 minutos y 49 segundoslike this yeah I exit sign is installed backward we got this entrance to the building  
\> Capítulo 9: Hacking Starts\!  
\> 6:006 minutosme in  
\> 6:036 minutos y 3 segundos\[Music\]  
\> 6:156 minutos y 15 segundosthe currently 10:46 p.m. and uh we're about to assemble the linear rails we've been working since 9:  
\> 6:246 minutos y 24 segundospretty much to get the chassis sort of built here we're going to put on the linear rails now this is the basic for a robot oh I don't think I ever broke down what we're making hold on okay so our  
\> Capítulo 10: Our Project  
\> 6:326 minutos y 32 segundosproject cuz I forgot to mention it we're building a robot that can get food for you it's pretty much like a but we're pretty much making a robot um that can  
\> 6:396 minutos y 39 segundosmove around and has like a six Dee of Freedom stylus arm that can go ahead and like input stuff and the idea is like we say we put in a one sentence natural  
\> 6:476 minutos y 47 segundoslanguage input like get me food from late night and this robot can go and get food for you from like whatever place like on campus so this is the basis for  
\> 6:566 minutos y 56 segundosit we're building the body right now and then a lot of the brain stff is going to come later when we start coding it out but we have the chassis getting assembled linear rails getting put on  
\> 7:047 minutos y 4 segundosand then on top of the linear rail we're going to put the slider with the stylus and the um horizontal movement six degrees of freedom type  
\> 7:137 minutos y 13 segundos\[ \_\_ \] back to the time lapse  
\> Capítulo 11: Assembly  
\> 7:167 minutos y 16 segundos\[Applause\]  
\> 7:177 minutos y 17 segundos\[Music\]  
\> 7:217 minutos y 21 segundos\[Applause\]  
\> 7:257 minutos y 25 segundos\[Music\]  
\> 7:267 minutos y 26 segundos\[Applause\]  
\> 7:287 minutos y 28 segundos\[Music\]  
\> 7:337 minutos y 33 segundos\[Applause\]  
\> 7:357 minutos y 35 segundosJ Nano has uh booted on our projector and we're also attaching the  
\> 7:427 minutos y 42 segundoslinear rails right now  
\> 7:517 minutos y 51 segundos\[Music\]  
\> 8:038 minutos y 3 segundosday one of hacking complete it's currently 5:00 a.m. and um I'm about to head back home take a shower and go to  
\> Capítulo 12: Break (Sleep)  
\> 8:118 minutos y 11 segundossleep for about maybe like 3 to 4 hours and then come back and do the coating but yeah I think that was pretty productive session we got a robot like  
\> 8:188 minutos y 18 segundosmostly up and running I think I'm recording um this guy is chop  
\> 8:248 minutos y 24 segundoschin Robert Ian says Hi um tell Ian she has chop chin what the \[ \_\_ \] n tell her I say  
\> 8:338 minutos y 33 segundoshello it's currently uh around 11:30 a.m. I have fully woken up gotten ready and everything um I got a good like 5  
\> Capítulo 13: Day 2  
\> 8:418 minutos y 41 segundoshours of sleep so I'm feeling pretty solid I'm about to head over to Stanford campus again head back to the room and just get to code in today we have about  
\> 8:488 minutos y 48 segundos21 hours left in the competition and I think that most of the robot should be pretty much done by this point and uh we  
\> 8:558 minutos y 55 segundoscan start testing the code out and like driving it around I hope I get to sleep tonight there is a chance that I won't though um tomorrow we'll be judging uh  
\> 9:049 minutos y 4 segundosat 9:00 a.m. that's when the project is due then 10: to 12: is judging then we have the closing ceremony and then by 5:00 p.m. everything will be finished  
\> 9:109 minutos y 10 segundosand I'll be asleep in my bed  
\> 9:169 minutos y 16 segundos\[Music\]  
\> 9:189 minutos y 18 segundoshopefully so we had a stroke of Genius we're naming our robot omnom like the guy from Cut the Rope and  
\> 9:269 minutos y 26 segundoswe're going to dangle the food from a from a rope on the Rope what and we got to cut the rope to get the food we're I'm not  
\> 9:359 minutos y 35 segundosmaxing this this might this might be the differentiating  
\> 9:399 minutos y 39 segundos\[Music\]  
\> 9:489 minutos y 48 segundosfactor it's currently 500 p.m. Plus in two differential Pairs and we are do the software side the robot has moved a  
\> 9:559 minutos y 55 segundoslittle bit so far but some issues I'm currently working on the web side of things I'm working on just an interface  
\> 10:0310 minutos y 3 segundosto take in the order and then generate a list of points to send to our robot Robert's currently working on the Sensor  
\> 10:1010 minutos y 10 segundosFusion cut the bar Jack yeah I'll just say okay we did that we did it sorry you didn't have  
\> 10:1910 minutos y 19 segundostime okay then we'll just have to tune the P wait wait no think like it's trying to tune right now like right now is saying ult tune I wasn't putting in  
\> 10:2710 minutos y 27 segundoswork look at this we got object detection boxes  
\> 10:3510 minutos y 35 segundosmap oh this is great nice all right now we for the  
\> 10:4310 minutos y 43 segundosdrive this is a confence why there so many chairs oh I see wait was it I saw it driving outside  
\> 10:5110 minutos y 51 segundosfor a second is it working we at least have it the drive moving and we can do enough so the next step is we need to get an IMU for the drive  
\> 11:0011 minutossolved I guess all right it's currently around 8:00 and I'm on the way to grab dinner with Robert our first meal of the  
\> 11:0811 minutos y 8 segundosday but yeah progress wise we're making good work it was driving a little bit but we still have a lot to do I don't know where he is  
\> Capítulo 14: dinner \+ snack run  
\> 11:2011 minutos y 20 segundos\[Music\]  
\> 11:2511 minutos y 25 segundosyeah fine um so we only we don't have any me options left but we have lots lots of great turkey ones yeah okay  
\> 11:3411 minutos y 34 segundosthat's fine oh it's vegan turkeyy oh word okay thank you s I think we're good on that yeah  
\> 11:4211 minutos y 42 segundosget some snacks too see can I identify Robert's burrito wait let me get out the frame no no no it's fine toothbrush what does that say I think the straw is a  
\> 11:5011 minutos y 50 segundostoothbrush I think this is a sandwich that's actually pretty good that's pretty good what if I hold it up like this does it know it's like a drink yeah it's a cup I mean that's the closest  
\> 11:5811 minutos y 58 segundosthing wait that's pretty good good 2:27 a.m. the project is due in 6 hours we're trying to integrate the we're trying to  
\> Capítulo 15: 6 hours left  
\> 12:0512 minutos y 5 segundosbring the code in right now great wa it's coming together all right what's up guys it's  
\> 12:1212 minutos y 12 segundoscurrently 4:19 a.m. Ms and Arjun are outside testing out the bot um trying to get the sensors fully working and then  
\> 12:2012 minutos y 20 segundosaround 4 hours until submission is due we still haven't made the video or anything um so I think we're like a little bit on a time crunch right now  
\> 12:2812 minutos y 28 segundosbro I think yeah we're definitely not sleeping tonight like that's not even a question um we're definitely going to all nigh her till till 9: it's moving  
\> 12:3512 minutos y 35 segundosyeah it's it's crashed it's currently 5:30 a.m. and uh we're about to go film our demo video this is the final stretch  
\> 12:4412 minutos y 44 segundoshere over under over under it makes it 1% of the way to late night over under correct  
\> Capítulo 16: 3 hours left  
\> 12:5212 minutos y 52 segundosdirection I think it'll I think it'll go the right way okay is there a reason why we have to run on your laptop to go  
\> 13:0013 minutosall right just so I can test is it easier otherwise like I'm like like the thing is lit going to try the first time like when we get  
\> 13:0813 minutos y 8 segundosdownstairs all you sure we'll see  
\> 13:1613 minutos y 16 segundosoutside eliminate the side of the Chanel sun is rising wait why is it  
\> 13:2313 minutos y 23 segundoscorrupted oh my God it's fine it's fine it's fine I'll just reclaim the reer  
\> Capítulo 17: moment of truth  
\> 13:3113 minutos y 31 segundosoh my God ah wait how is this the thing how does it get corrupted like this wait this is kind of annoying cuz then I have to like redownload all the  
\> 13:3913 minutos y 39 segundosvirtual environment stuff n requirements oh \[ \_\_ \] I don't \[ \_\_ \]  
\> 13:4813 minutos y 48 segundosknow what requirements we get okay well we're going to have to be downloading some dependen guys sorry okay all  
\> 13:5713 minutos y 57 segundosright uh why did the IMU crash oh my God okay well the IMU crash but that's why I'll just rest  
\> 14:0714 minutos y 7 segundosit too late night guys okay ready ready get get up close get up close look at the screen the screen Fe the screen okay  
\> 14:1514 minutos y 15 segundosI want to get a chicken tender from late  
\> 14:2714 minutos y 27 segundosnight wait  
\> 14:3314 minutos y 33 segundos\[Music\]  
\> 14:3814 minutos y 38 segundosall right luckily the robot actually moved let's go the \[ \_\_ \] curs is messing up okay we're going to go ahead and finish the  
\> 14:4714 minutos y 47 segundosrest of the demo video which is the indoor part 700 a.m. right now I just pretty much finished editing the video and um I'm going to head back up to meet  
\> 14:5514 minutos y 55 segundosup with my team judging hacking ends in about 30 minutes we have 2 minutes left what the \[ \_\_ \] it just wait it say 17 more minutes oh yeah they they already  
\> 15:0415 minutos y 4 segundosextended that \[ \_\_ \] so I got to do that all oh wait okay deleted all the sponsors so let's go again let's go  
\> 15:1015 minutos y 10 segundosagain sorry we just submitted our Dev post hacking is officially over in 2 minutes they extended it by 15 minutes  
\> 15:1915 minutos y 19 segundosoh God yeah good job judging now it's currently 10:30 they push back judging it's starting now though so we're going to head over with the robot yeah I'm off  
\> Capítulo 18: Judging  
\> 15:2715 minutos y 27 segundoswe're both off zero sleep all four of us um didn't sleep last night and I feel like my heart is going to like I feel like I'm out a heart attack bro we're  
\> 15:3515 minutos y 35 segundosheading over or right Nowell  
\> 15:4315 minutos y 43 segundosthat you reac you good all right guys we set up at the booth right  
\> 15:4915 minutos y 49 segundosnow this is our booth 177 here that robot and we got our demos pulled up yeah it's going to be a good judging  
\> 15:5715 minutos y 57 segundossession I believe  
\> 16:0016 minutos\[Music\]  
\> 16:0716 minutos y 7 segundosthe list is like where more of the custom stuff pops in and so like because this is like on a 3/4 in full pattern it becomes pretty easy to know what  
\> 16:1416 minutos y 14 segundosdimension to use you can see here we actually did a lot of rework on this piece on the other side um you'll look you'll see there's an extra holes here and there's slotted holes that I did  
\> 16:2316 minutos y 23 segundoswith by hand on like a hand drill over a trash can like love to see I love to see it all right Alex Bro I'm eating how was  
\> 16:3116 minutos y 31 segundoshow was how was youra 2025 experience it was fun it was fun it was much more chill than last year I realized I need to go home to sleep which is fun bu a  
\> 16:3916 minutos y 39 segundoscool product we're getting lunch and uh this gu's also getting lunch is about to grab a burrito for us too judging and  
\> 16:4716 minutos y 47 segundosnow we're getting lunch I think it was a good session we had like hella H hella Yapp in thanks to this beta for carrying  
\> 16:5516 minutos y 55 segundosour our robot this got took the opportunity to AA Farm AA no it is AA farming people stop and  
\> 17:0517 minutos y 5 segundosthey look at the robot and they're like damn what the \[ \_\_ \] is that yeah like that walk into the closing ceremony right now then overall the school is rated  
\> Capítulo 19: Closing Ceremony  
\> 17:1317 minutos y 13 segundospretty badly because it's been a they delayed it by 15 minutes they really y what's up is  
\> 17:2217 minutos y 22 segundosgood I can just keep your laptop meable I apologize again for all the  
\> 17:3217 minutos y 32 segundosdelays and technical difficulties but we made it so let's give us a round of applause and I'm Bri and I'm the  
\> 17:4017 minutos y 40 segundossponsorship director thank you guys so much again for traveling and yeah we just want to give a round of applause to all the  
\> 17:4817 minutos y 48 segundoshackers who have won congratulations  
\> 17:5617 minutos y 56 segundosso then we have most creative this is pretty cool goes to omn  
\> 18:0518 minutos y 5 segundosthat oh should next we have the most we have  
\> 18:1418 minutos y 14 segundos\[Applause\]  
\> 18:1818 minutos y 18 segundosHW all right guys we just won most creative hack at tree hacks I'm a two time most creative hack  
\> 18:2518 minutos y 25 segundoswinner defeated at that \[ \_\_ \] all right rap of tree hacks I'm very happy to have won something I think we get DJ  
\> 18:3218 minutos y 32 segundosboards classic chis money our prize yeah creative pck threee hack bro this is a top six prize bro actually though  
\> 18:4118 minutos y 41 segundosactually I can't even tell if I'm happy with like award just unhappy with like what we did I so proud of what we did it's crazy that we did  
\> 18:4818 minutos y 48 segundos\[Music\]  
\> 18:4918 minutos y 49 segundosthat I remember when I  
\> 18:5118 minutos y 51 segundos\[Music\]  
\> 18:5418 minutos y 54 segundosdrill all right guys that is this is the last Vlog entry for treeck um we had a good run had good we won  
\> Capítulo 20: The End  
\> 19:0219 minutos y 2 segundosmost creative so I think it was pretty successful we got our DJ sets like we're going to start making music let's go but

\> \*\*Attachment: attachment · txt · 10.1 KB\*\*  
\>  
\> Intro  
\> 0:00  
\> hey friends how's it going today we're  
\> 0:02  
\> going to be talking about hackathons  
\> 0:04  
\> especially for beginners who want to  
\> 0:06  
\> learn how to get started if you're new  
\> 0:07  
\> to this channel my name is Johnny and  
\> 0:09  
\> I'm a software engineer meta and I've  
\> 0:11  
\> personally won over $30,000 worth of  
\> 0:14  
\> prizes from hackathons and in this video  
\> 0:16  
\> I'm going to be revealing all of my  
\> 0:18  
\> secrets even if you're new to coding or  
\> 0:20  
\> you're a season developer you'll  
\> 0:22  
\> definitely learn something new I  
\> 0:23  
\> guarantee it okay now let's dive in  
\> What is a Hackathon  
\> 0:26  
\> first let's start with what a hackathon  
\> 0:28  
\> is and whether beginners can join in on  
\> 0:30  
\> all of the fun a hackathon at a high  
\> 0:32  
\> level is basically just an event where  
\> 0:35  
\> teams come together and create  
\> 0:36  
\> Innovative prototypes or hacks within a  
\> 0:39  
\> very short amount of time usually about  
\> 0:41  
\> 24 to 48 hours they're high energy  
\> 0:44  
\> fun-filled opportunities to build  
\> 0:46  
\> something with a group of hackers it  
\> 0:48  
\> could be strangers or your friends these  
\> 0:50  
\> events are often centered around themes  
\> 0:53  
\> like AI crypto or big data so there's  
\> 0:56  
\> usually a lot of variety most hackathons  
\> 0:58  
\> are free though some of them may require  
\> 1:00  
\> an application or fee to join but  
\> 1:03  
\> overall most of the hackathons that I've  
\> 1:04  
\> been have been pretty skill agnostic  
\> 1:07  
\> this means that everyone was welcome to  
\> 1:09  
\> join in and hack so if you're new to the  
\> 1:11  
\> space and you're a complete beginner I  
\> 1:13  
\> highly recommend you to just go and  
\> 1:15  
\> check it  
\> Preparing for a Hackathon  
\> 1:16  
\> out now if you want to prepare for a  
\> 1:19  
\> hackathon and if you want to try to win  
\> 1:21  
\> some prizes here are some insights and  
\> 1:24  
\> secrets into hackathon that you should  
\> 1:26  
\> know to start the most important thing  
\> 1:28  
\> to understand is that all hackathons are  
\> Hackathons are Sponsored  
\> 1:31  
\> sponsored by companies what this  
\> 1:33  
\> basically means is that there's a  
\> 1:35  
\> business reason why companies put up  
\> 1:37  
\> thousands of dollars in sponsored prizes  
\> 1:40  
\> and even Manpower during these events at  
\> 1:43  
\> the end of the day they're there to make  
\> 1:44  
\> some money and advertise their  
\> 1:46  
\> technology to developers it's basically  
\> 1:48  
\> a marketing event understanding this  
\> Hack Away  
\> 1:50  
\> simple fact is actually the key to  
\> 1:53  
\> understanding how to win hackathons  
\> 1:55  
\> often times teams of hackers usually go  
\> 1:57  
\> into a project guns blazing Cod up some  
\> 2:00  
\> random idea that they think is you know  
\> 2:02  
\> just kind of cool they barely talk to  
\> 2:04  
\> anyone at the boots and just hack away  
\> 2:07  
\> and I can't say this enough but avoid  
\> 2:09  
\> this at all costs the single most  
\> Talk to Sponsors  
\> 2:12  
\> important step at a hackathon if you're  
\> 2:13  
\> trying to win is actually talking to the  
\> 2:16  
\> companies that are sponsoring the event  
\> 2:18  
\> this is really important because the  
\> 2:20  
\> people who are Manning the booth are  
\> 2:22  
\> often times the judges for each of the  
\> 2:24  
\> sponsored prizes and their criteria for  
\> 2:27  
\> picking a winning project usually isn't  
\> 2:29  
\> about creating the most elegant and  
\> 2:31  
\> perfect code it's actually about  
\> 2:33  
\> choosing a project that essentially best  
\> 2:35  
\> showcases their company's technology in  
\> 2:38  
\> a prominent and compelling way for  
\> 2:40  
\> example when I won a prize at Tech  
\> 2:42  
\> crunch disrupt I spent a ton of time  
\> 2:44  
\> talking with the engineers from the  
\> 2:46  
\> sponsoring companies one of them was  
\> 2:47  
\> ezri a map related SAS company during  
\> 2:50  
\> our conversation I asked about a  
\> 2:52  
\> specific animation feature in their  
\> 2:54  
\> JavaScript SDK that was essentially  
\> 2:56  
\> missing from their mobile SDK the  
\> 2:58  
\> engineers admitted to me that that they  
\> 3:00  
\> didn't have a solution for it yet and  
\> 3:02  
\> it's something that they've been  
\> 3:03  
\> actually just trying to implement it for  
\> 3:05  
\> some time internally and at that moment  
\> 3:08  
\> I realized that there was an opportunity  
\> 3:10  
\> so I took my chance and I asked him hey  
\> 3:12  
\> if our team created that capability and  
\> 3:14  
\> presented a compelling app showcasing  
\> 3:16  
\> your map experience with like the  
\> 3:18  
\> animations itself could you choose us as  
\> 3:20  
\> winners and they essentially called us  
\> 3:22  
\> on our bed and said if you do it we'll  
\> 3:24  
\> give you the win so we got to work it  
\> 3:27  
\> took us the entire night to pull it off  
\> 3:29  
\> but but because there was a clear path  
\> 3:32  
\> to winning it made it worth it and the  
\> 3:34  
\> next day we presented our project and  
\> 3:36  
\> the engineers were thrilled we ended up  
\> 3:38  
\> winning $5,000 for just a simple hack  
\> 3:41  
\> not so bad for a single days of work and  
\> 3:44  
\> you know what the funny thing is is that  
\> 3:46  
\> I actually entered this hackathon right  
\> 3:48  
\> after my boot camp I actually haven't  
\> 3:50  
\> even landed my first full-time software  
\> 3:52  
\> engineering job yet in this example by  
\> Example  
\> 3:55  
\> talking to sponsors we identified a  
\> 3:57  
\> clear problem the company was facing and  
\> 4:00  
\> we gave them a simple solution for it  
\> 4:02  
\> now this doesn't mean that you always  
\> 4:04  
\> need to improve like a company's  
\> 4:06  
\> codebase to win a hackathon um but the  
\> 4:08  
\> key takeaway here is that you want to  
\> 4:11  
\> start the project by understanding how  
\> 4:14  
\> to impress your sponsors directly you  
\> 4:16  
\> know you need to solve their problems  
\> 4:18  
\> for example most of the other hackathons  
\> 4:20  
\> that I've won were mainly by talking to  
\> 4:23  
\> sponsors and figuring out what they  
\> 4:25  
\> cared about and why they were there in  
\> 4:27  
\> that event in the first place it's like  
\> 4:28  
\> market analysis you want to know what  
\> 4:31  
\> your customers want before you even  
\> 4:33  
\> write a single line of code so now what  
\> 4:36  
\> does this mean for beginners Well it  
\> 4:38  
\> means that there is a clear way for you  
\> 4:40  
\> to contribute even if you don't know how  
\> 4:41  
\> to code so here's a few practical ways  
\> Practical Tips  
\> 4:44  
\> that you can shine as a hacker you can  
\> 4:46  
\> be the product manager for your team  
\> 4:48  
\> your job essentially would be to go and  
\> 4:51  
\> talk to sponsors figuring out the best  
\> 4:53  
\> product to build and how to essentially  
\> 4:55  
\> use some of their Technologies you know  
\> 4:57  
\> combining multiple apis from various  
\> 4:59  
\> companies in a cisive way that makes  
\> 5:02  
\> sense and while you're doing this you  
\> 5:03  
\> want to essentially ask the sponsors  
\> 5:06  
\> what kind of projects that they would  
\> 5:08  
\> love to see you know and also pitch them  
\> 5:10  
\> your ideas and see how they like react  
\> 5:13  
\> right and after you've done all of this  
\> 5:14  
\> and you finish your market research  
\> 5:16  
\> essentially you can then translate those  
\> 5:18  
\> ideas into kind of like a product spec  
\> 5:20  
\> for your team so this is one really  
\> 5:23  
\> clear example and clear role that you  
\> 5:25  
\> can do another great role that you can  
\> 5:27  
\> take on is the presenter I myself  
\> 5:29  
\> actually did this for my first hackathon  
\> 5:32  
\> I didn't code at all all I did was  
\> 5:34  
\> present the idea we didn't win that one  
\> 5:35  
\> but it was a great learning experience  
\> 5:37  
\> so what is a presenter usually at  
\> 5:40  
\> hackathons you always end up presenting  
\> 5:42  
\> your project and preparing and  
\> 5:45  
\> delivering a strong 3 to 5 minute  
\> 5:47  
\> presentation takes time and effort you  
\> 5:49  
\> need to be confident and remember a  
\> 5:51  
\> winning presentation is one that makes  
\> 5:53  
\> the sponsor companies look amazing i'  
\> 5:56  
\> estimate that a great presentation is  
\> 5:59  
\> basically how half the project in fact I  
\> 6:01  
\> recommend working backwards from a  
\> 6:03  
\> presentation itself at the start of your  
\> 6:05  
\> project think about the key points of  
\> 6:07  
\> your presentation and the features you  
\> 6:09  
\> want to showcase now make sure these  
\> 6:11  
\> features that you decide to build  
\> 6:13  
\> highlights the sponsors companies having  
\> 6:15  
\> a Clear Vision of the presentation will  
\> 6:17  
\> make it essentially easier for your team  
\> 6:19  
\> to focus on the exact screens and  
\> 6:21  
\> features that they need to build and in  
\> 6:24  
\> my opinion this step is extremely  
\> 6:26  
\> important because at a hackathon you  
\> 6:28  
\> know time really isn't on your side you  
\> 6:30  
\> just simply don't have enough time to do  
\> 6:32  
\> everything that you want to do so I  
\> 6:34  
\> recommend you to essentially mock up  
\> 6:36  
\> what you need to take shortcuts where it  
\> 6:38  
\> makes sense you know it's a hack not a  
\> 6:41  
\> production ready software however you  
\> 6:43  
\> still do want to code a large part of  
\> 6:45  
\> your project and make sure that it's  
\> 6:47  
\> actually kind of working sponsors do end  
\> 6:49  
\> up checking your repo to ensure that  
\> 6:51  
\> you're actually building something that  
\> 6:53  
\> is working and has all of like kind of  
\> 6:55  
\> the important parts that you're talking  
\> 6:57  
\> about and that you're not just  
\> 6:58  
\> submitting a power Power Point  
\> 7:00  
\> presentation now if you follow all of  
\> 7:02  
\> these tips I guarantee that you can win  
\> 7:05  
\> a hackathon even if you're a beginner  
\> 7:07  
\> you know start off small with smaller  
\> 7:09  
\> events bring a friend and just have fun  
\> 7:12  
\> hackathons are essentially an easy way  
\> 7:14  
\> for you to make your resume shine in the  
\> 7:17  
\> beginning I myself did this when I had  
\> 7:19  
\> no experience I won three hackathons or  
\> 7:21  
\> so during my time at the boot camp and  
\> 7:23  
\> my resume was essentially just all  
\> 7:25  
\> hackathon projects and my boot camp  
\> 7:27  
\> stuff if you want to see that video  
\> 7:29  
\> where I break down my exact resume that  
\> 7:31  
\> landed my first software engineering job  
\> 7:33  
\> you can check it out here with that said  
\> 7:36  
\> I hope you learned something new about  
\> 7:38  
\> hackathons and I hope that you win a  
\> 7:40  
\> bunch of them be sure to message me if  
\> 7:42  
\> this video has helped you win a  
\> 7:43  
\> hackathon but yeah that's it that's my  
\> 7:45  
\> tips on hackathons if you enjoy this  
\> 7:47  
\> video don't forget to subscribe I'm also  
\> 7:49  
\> thinking about making a bunch of videos  
\> 7:52  
\> on AI and various topics about AI in the  
\> 7:55  
\> future I actually have a ton of relevant  
\> 7:57  
\> experience on AI I just haven't made any  
\> 7:59  
\> videos on it if you're interested  
\> 8:01  
\> comment below AI the word Ai and I'll  
\> 8:04  
\> make some videos depending on how many  
\> 8:06  
\> people comment but that's it for today I  
\> 8:08  
\> hope you guys enjoyed it thanks for  
\> 8:10  
\> watching and I'll see you guys next time  
\> 8:12  
\> bye

\> \*\*Attachment: attachment · txt · 10.6 KB\*\*  
\>  
\> Capítulo 1: Introducing Treehacks  
\> 0:000 segundosI'm here at Stanford's largest hackathon.  
\> 0:022 segundosThere's a thousand hackers here from 12 countries competing for half a million in prizes. Each team has only 36 hours to build an original piece of technology.  
\> 0:1212 segundosAnd the stakes are super high, because I'm going to try to guess who the $12,000 grand prize winner is.  
\> 0:1919 segundosI really need to get this right because I just don't want to be wrong on YouTube. I've got some very different criteria for predicting who's going to win this.  
\> 0:2525 segundosNumber one: am I excited by the idea? Number two: do they have that dog in them? Number three: are they sleep deprived?  
\> 0:3333 segundosLet's go find our grand prize winner. You guys mind if we pop in? What are you guys building?  
\> Capítulo 2: AI-powered chemistry  
\> 0:4141 segundosThe short and sweet is we're building an AI chemistry lab. That is incredible. Darn. Well, we've got a little more calibration to do.  
\> 0:4949 segundosWould you guys say you have the dog in you? You have that dog in you. Andrew's definitely got it. I think we both do have the doggy.  
\> 0:5555 segundosAre you guys sleep deprived? Of course. I think that they hit all three. And let's see if everyone else I talk to also hits all three, which is very likely.  
\> 1:051 minuto y 5 segundosOh, hello. What are you guys building? So basically the concept is we're trying to build agentic AI remote surgery.  
\> Capítulo 3: Remote surgery hardware  
\> 1:131 minuto y 13 segundosThis camera, which is streaming live, the view from this camera to the Meta Quest 3\. Also the Meta Quest 3 when you look up, down, left, right.  
\> 1:201 minuto y 20 segundoshe motion is in sync to this robotic arm. Do you feel like you have that dog in you? I see the vision. Yeah. How sleep deprived are you guys?  
\> 1:291 minuto y 29 segundosWe're about to take a nap.  
\> 1:321 minuto y 32 segundosLike every other human I spoke to you they fit all three of my main criteria. I really like these guys. I love the concept. It has that wow factor.  
\> 1:391 minuto y 39 segundosYo, look, it's Timbermarket. Yeah, our project is Timbermarket, which is a prediction market exclusively for TreeHacks.  
\> Capítulo 4: A prediction market for the hackathon  
\> 1:461 minuto y 46 segundosSo the idea is to build something that kind of brings the TreeHacks community together around forecasting and predicting any specific questions that we're all interested in.  
\> 1:541 minuto y 54 segundosWe'll put up some markets: who’ll win the grand prize? Who will win like some other prizes. Someone just bet 100 that someone is going to boil the ocean.  
\> 2:022 minutos y 2 segundosYeah. Do you feel like you have that dog in you? 100%. Oh, yeah. Oh, yeah. You’ve been up how long? I've been up for the past 33 hours. Nice.  
\> 2:112 minutos y 11 segundosAm I excited by this idea?  
\> 2:122 minutos y 12 segundosYes, I am excited by this idea because I love the idea of real time data to help me further my goals of finding the grand prize winner. First place grand prize for TreeHacks this year goes to...  
\> Capítulo 5: Dagsen’s strategy  
\> 2:302 minutos y 30 segundosSo there are 350 projects this year. That's obviously too many projects for me to see myself. So I'm going to be talking to as many judges as possible to ask them what they like the most.  
\> 2:392 minutos y 39 segundosAnd I'm going to be using tree market to see what the data flows are telling me. They made a group chat. They put me in it with 30 judges.  
\> 2:472 minutos y 47 segundosThey're probably going to start texting if they see any interesting projects. All right you can go start judging. Oh, they opened the gates. Let's go. Wait. Come on, come on guys.  
\> 2:552 minutos y 55 segundosWhere are we going? Let's go. Okay, now, this is something.  
\> 3:023 minutos y 2 segundosA huge issue with these earthquakes is there’s tons of people trapped under rubble that, if not removed from them, they could die. And so we really need humanoid robots that are capable of removing this rubble.  
\> Capítulo 6: Rescue robot  
\> 3:113 minutos y 11 segundosYeah. How much sleep are you on? We actually got a pretty good amount of sleep, you know, maybe like 5 or 6 hours each night.  
\> 3:193 minutos y 19 segundosI want to find out where all the hardware superstars are, because I'm pretty confident that a hardware project is going to be in the top three this year.  
\> Capítulo 7: Semi-autonomous diving robot  
\> 3:273 minutos y 27 segundosOkay, so what are you building? Yeah, so I'm building Dive Buddy to help out divers when they're doing scientific surveys. Right. Do you have the dog in you? Do I have that dog in me?  
\> 3:363 minutos y 36 segundosI think so. You know, I didn't sleep for 36 hours.  
\> 3:413 minutos y 41 segundosI want to find something that's really going to change the world. Yo. Yeah, I like this song, actually.  
\> Capítulo 8: AI-powered dancing game  
\> Capítulo 9: Packing optimizer powered by AI  
\> 3:493 minutos y 49 segundosOur mission, bring intelligence and digital infrastructure to physical inventory. Can I upload my Zyn? Yeah\! Upload the Zyns\!  
\> 3:563 minutos y 56 segundosI got intel from some people that 238 is worth checking out. What are you guys building? Yeah. So we buil;t MindOS, which is that we allow you to control the computer just through your mind.  
\> Capítulo 10: Control a computer with your mind  
\> 4:054 minutos y 5 segundosDo you guys have that dog in you? We do, yes. Final question. How much did you guys sleep last night? Two hours.  
\> 4:124 minutos y 12 segundosWell actually wrong, wrong way, wrong way. It's a hackathon. I don't know where anything is. So what are you guys building?  
\> Capítulo 11: Turn any vehicle into a self-driving car  
\> 4:184 minutos y 18 segundosYou can make any car run state of the art self-driving car models. Oh my God. Oh. What vehicle are you running in the demo. That's a 2018 Honda Accord.  
\> 4:254 minutos y 25 segundosThat's eight years old. Let's go. Do you have that dog in you? Hello\! Long time no see. How are you?  
\> 4:334 minutos y 33 segundosI am on a secret mission right now to identify the grand prize winner of TreeHacks.  
\> 4:384 minutos y 38 segundosCan we spin up a market about “will Dagsen find the grand prize winner?” Is that possible? Let's make the market right.  
\> 4:474 minutos y 47 segundosAll right, so it is live. We have. Will Dagsen correctly predict the first place winner? I look forward to seeing the prediction. We only have 30 minutes left and the stakes are higher than ever.  
\> 4:564 minutos y 56 segundosWait, what are you guys building? Mira is an AI agent that lives in your AR glasses. It's built for Alzheimer's patients.  
\> Capítulo 12: AR help for Alzheimer’s patients  
\> 5:025 minutos y 2 segundosSay “where are my pills?” Where are my pills? Hey, that's a question I've asked before. And it animates to the black chair.  
\> 5:095 minutos y 9 segundosDo you have that dog in you? Yeah. Let's go. Where is 124? What are you building? So a lot of people, a lot of my friends are deleting Instagram. Yes.  
\> Capítulo 13: Tool to block addictive social media features  
\> 5:185 minutos y 18 segundosNot because Instagram is a bad app. Because reels are the worst thing invented.  
\> 5:235 minutos y 23 segundosYes. So Bubble lets you partially block features. Do you have that dog in you? Yeah. Hey, how much you sleep?  
\> 5:305 minutos y 30 segundosI've slept for two hours in 40 hours.  
\> 5:335 minutos y 33 segundosI’m on a secret mission to find the grand prize winner of TreeHacks with my three criteria. You guys pass all swimmingly. I want your product. I think they fit all three of my criteria.  
\> 5:415 minutos y 41 segundosLike almost everyone I have spoken to. And now I am running into the same issue that the organizers and the judges are running into. Of sorting through all of these incredible companies.  
\> Capítulo 14: Checking back in with the robot surgery team  
\> 5:505 minutos y 50 segundosI am considering making one final sprint to see if they made the Robosurge thing actually happen. It's one of the most popular markets on Timbermarket right.  
\> 5:595 minutos y 59 segundosRight now it's at 79% that it will win top three grand prize. You mind if I stick my hand in there? Go ahead bro. You have a knife, though? Oh, yeah.  
\> 6:086 minutos y 8 segundosI see you guys are currently in the lead, for winning one of the grand prizes on Timbermarket. Do you know this? Look at that.  
\> 6:166 minutos y 16 segundosWill Robosurge win top three grand prize? How are you guys feeling right now? We’re doing alright. We’re actually getting judged as we speak.  
\> 6:246 minutos y 24 segundosWhat are you building?  
\> 6:256 minutos y 25 segundosYeah, basically, we're building, like, a AR world where you can orchestrate all of your Claude code agents. Let's see what.  
\> Capítulo 15: Putting Claude Code agents into AR  
\> 6:336 minutos y 33 segundosYo\! Oh my God. Hello. Just walk up to a Claude agent and ask you what it's doing.  
\> 6:406 minutos y 40 segundosI've never seen so many incredible projects in one place. This is pure hackathon. So judging has ended.  
\> 6:476 minutos y 47 segundosI had a chance to speak to more companies than I thought I could.  
\> Capítulo 16: And the winner is…  
\> 6:506 minutos y 50 segundosI'd say right now I have absolutely no idea who it could be. Dude, I realize I might be cooked.  
\> 7:007 minutosMy final pick for the grand prize winner first place of TreeHacks 2026 is Bubble.  
\> 7:077 minutos y 7 segundosI am going to use this because I hate watching Instagram Reels. Melts my brain. It's poison.  
\> 7:137 minutos y 13 segundosFirst place grand prize for TreeHacks this year Team Shepherd. What? What?  
\> 7:207 minutos y 20 segundosI completely missed this. I missed this. I can’t believe I got it so wrong.  
\> 7:287 minutos y 28 segundosWe built Shepherd, which is a smart for the visually impaired.  
\> 7:327 minutos y 32 segundosWait. So basically we we take the existing LiDar sensors and cameras of an iPhone Pro model. That's our main sensor interface.  
\> 7:407 minutos y 40 segundosAnd then we scan for objects ahead of us by the LiDAR scanner, and then we have a center line detection. Did you guys expect to win?  
\> 7:477 minutos y 47 segundosWe were confident in our idea. We were very excited. Obviously, it's always a toss up. You never really know what's going on behind the scenes in judging.  
\> 7:547 minutos y 54 segundosDo you guys feel that you have the dog in you? Yeah. Yeah, you definitely do. After meeting this winning team, I have adjusted my criteria majorly.  
\> 8:038 minutos y 3 segundosThese people at Bubble, my pick, solves a problem I care about a lot. I am not visually impaired myself. I think that my perspective was too myopic.  
\> 8:118 minutos y 11 segundosAnd the data backs this up.  
\>   
\> Sincronizar con el tiempo del vídeo

Criterios  
Asegúrate de revisar los criterios de las recompensas de los patrocinadores a las que te postulas (consulta la sección dedicada al patrocinador en Hacki). Los proyectos presentados se evaluarán según los siguientes criterios:  
Tecnicismo

\* ¿Qué retos técnicos aborda el proyecto?  
\* ¿Demuestra habilidades avanzadas de resolución de problemas e ingeniería?  
\* ¿La solución es completa y funcional, o el equipo tiene un plan claro sobre cómo la terminarían?

Originalidad

\* ¿Es el proyecto innovador y único?  
\* ¿El proyecto aborda problemas específicos?  
\* ¿Propone una nueva solución o un enfoque creativo para un problema existente?

UI/UX/DX

\* ¿Qué tan fácil de usar y accesible es el proyecto?  
\* ¿La interfaz de usuario, la experiencia del usuario y la experiencia del desarrollador están bien diseñadas y son intuitivas?

Sentido práctico

\* ¿Qué tan práctico y factible es el proyecto?  
\* ¿Tiene aplicaciones prácticas en el mundo real y puede implementarse de forma eficaz?

Presentación

\* ¿El proyecto está claramente explicado y bien presentado?  
\* ¿El equipo comunica su idea de forma eficaz a través de su presentación, demostración y materiales de apoyo?

🌞 General Track  
Crecimiento · you can enter 1 track from this sponsor  
🎯 Overview  
This Track is designed to recognize the most outstanding projects built during the hackathon, regardless of their category. Whether you're building in Crypto, Web3, AI, Robotics or another. This track rewards teams that demonstrate strong execution, and deliver high-impact solutions.  
🏆 Prize breakdown  
Total Prize Pool: $1,000

\* 🥇 1st place — $500 in USDC  
\* 🥈 2nd place — $500 in USDC

💬 Mentors  
Multiple mentors available in our \[Mentor’s Directory\](https://alephhackathon.notion.site/mentors)

Cuestion claude, ayudame a no solo armar un proyecto que sirva para encontrar el proyecto ganadora partir de las victorias anteriores, sino también que me ayudes a craer un proyecto que cumpla con lo que quieren los patrocinadores en cada track que te mandé. Haceme una lista de proyectos top y que cumplan en lo que más podría ganar cada cosa, un documento que incluya toda la información que te pasé en este chat hasta ahora citando todo, los tracks, normas, cosas a tener en cuenta, la manera en la que tenemos que hacer el video,  etc, que sea completo. Porque quiero compartirselo a otra ia para que formule también una lista de ideas que cumplan los bountys o quizás la posibilidad de ganar en lo general.

Te comaprto transcripcion de videos para ver si hay alguna información o ocnesejo importante o para entender que proyectosson los más valorados, sumale a esto y al prompt qeu le prepares a la ia a la que le tenés que pasar todo el contexto que te dí sobre este tema, el hecho de que busque por su cuenta los proyectos ganadores en cada aspecto de hackatones pasadas. 

Tengo este video que no tiene transcripción: https://www.youtube.com/watch?v=6h\_7gzUso1I

0:00  
0 segundos  
El primer lugar es \[aplausos\] Buenas, estamos acá en la Platanus Hack de cero producto en 36 horas.  
0:13  
13 segundos  
Acá tenemos distintos stands. Eh, está uno de Amazon, otro de Bu, eh, otro de Macha, estos que \[risas\] este le tocó negro.  
0:23  
23 segundos  
Y nada, aquí estamos en la terraza y ahora hay que bajar, ¿eh? Así que, ¿cómo estamos, Agustín? Estamos listos para estar 26 horas.  
0:31  
31 segundos  
Estamos ready readyó laatón. Ahora estamos buscando idea.  
0:39  
39 segundos  
Idea. Oye, limpia la cámara. No hay mucha. No sé por qué se ve así.  
0:43  
43 segundos  
Eh, entonces el tema que elegimos es hum human enhasement. Es track. Eh, el track. El track.  
0:50  
50 segundos  
El track. Las ideas que tenemos hasta ahora es primero una herramienta para bomberos.  
0:55  
55 segundos  
Sexto sentido para los bomberos. Claro, el sexo \[risas\] corta corte corte corte es un casco que tiene una un sensor que  
1:05  
1 minuto y 5 segundos  
te permite ver a través del humo y detectar posibles obstáculos, eh gente atrapada, peligros, etcétera. La segunda idea tiene que ver más con más del  
1:12  
1 minuto y 12 segundos  
aspecto social, como por ejemplo para gente que le cuesta sociabilizar, por ejemplo. \[risas\]  
1:21  
1 minuto y 21 segundos  
Claro, claro, claro. \[risas\] Igual ese producto es mejor porque se patea y aquí \[risas\]  
1:33  
1 minuto y 33 segundos  
así que sabemos cuáles son los dolores.  
1:36  
1 minuto y 36 segundos  
\[risas\]  
1:37  
1 minuto y 37 segundos  
Trabajando desde el problema para el problema.  
1:40  
1 minuto y 40 segundos  
Sí. Así que nos vamos todos a poner a promptear para que la nos dé alguna idea mejor. Aquí tomándose unos cafecitos.  
1:51  
1 minuto y 51 segundos  
Son las 5 de la mañana. Sí.  
1:55  
1 minuto y 55 segundos  
Y todavía no tenemos idea. Se supone que todavía quedan como, no sé, 30 horas.  
2:01  
2 minutos y 1 segundo  
Bueno, lo más difícil ha sido definir la idea. E no sé si será porque somos cinco y es más difícil ponernos de acuerdo o  
2:09  
2 minutos y 9 segundos  
simplemente no hemos dado con algo que realmente genere el impacto y que nos convenza para empezar a trabajar en eso.  
2:17  
2 minutos y 17 segundos  
Quizás como que uno la duda demasiado, le da demasiadas vueltas, porque es como la idea que vas a elegir y es como que le vas a dedicar el poco tiempo que  
2:26  
2 minutos y 26 segundos  
tienes a esa idea y piensas que no va a haber tanta oportunidad de echarte para atrás. 7:45 de la mañana, eh, no hemos  
2:34  
2 minutos y 34 segundos  
dormido nada. Bueno, el pan ahí ya murió. \[risas\] Aquí mi brother peleando con Android  
2:42  
2 minutos y 42 segundos  
Studio. \[risas\] ¿Por qué Android Studio?  
2:47  
2 minutos y 47 segundos  
Acá bueno, scrapeando la página. Parece que se cayó. Revivió. Ya vamos. Vuelve, vuelve.  
2:55  
2 minutos y 55 segundos  
En serio, se cayó como si no nada que ver. Buena, buena.  
3:04  
3 minutos y 4 segundos  
Quedan 12 horas. Hón, vamos probando con con gente random.  
3:23  
3 minutos y 23 segundos  
Foto, dame foto. Toma.  
3:34  
3 minutos y 34 segundos  
Sí, el primer lugar  
3:44  
3 minutos y 44 segundos  
de Human Es  
3:57  
3 minutos y 57 segundos  
\[aplausos\]  
4:01  
4 minutos y 1 segundo  
\[aplausos\]  
4:13  
4 minutos y 13 segundos  
bueno, ya pasaron las 36 horas, hón, eh. Ganamos.  
4:20  
4 minutos y 20 segundos  
\[risas\]  
4:22  
4 minutos y 22 segundos  
No me lo creo. Y después volvimos a lo mismo. Y no vieron cascos de bomberos en la presentación.  
4:29  
4 minutos y 29 segundos  
Casco de bombero. Sí.  
4:35  
4 minutos y 35 segundos  
Ni cómo obviamente quizás hubiera sido más difícil si lo hubiera pato. Ah, el pato es que no suena pato queast.  
4:42  
4 minutos y 42 segundos  
Sí, por eso era mudo. Por eso no hablamos.  
4:44  
4 minutos y 44 segundos  
Oh, hón que meo. ¿Qué? \[risas\] No carga.  
Sincronizar con el tiempo del vídeo

The self-writing internet has officially arrived with Caffeine AI powered by the Internet Computer Protocol, ICP. On July  
0:08  
8 segundos  
15th, builders from all backgrounds, both technical and non-technical, came together in San Francisco for the  
0:15  
15 segundos  
Caffeine AI hackathon. In just a few hours, with Caffeine's powerful noode builder, they turn their ideas into  
0:22  
22 segundos  
fully functional blockchain powered web applications using only natural language and a chat window. These aren't your  
0:29  
29 segundos  
typical web 2 no code apps. These apps are decentralized, sovereign, AI integrated web applications that are  
0:37  
37 segundos  
immune to cyber attack. The hackathon produced a stunning variety of projects from healthcare to legal tech, civic  
0:45  
45 segundos  
tools to hobby learning and more. Let's cover the six winning projects.  
0:49  
49 segundos  
Non-technical third place winner, dental tracks. Created by a practicing dentist, this app solves a major pain point,  
0:57  
57 segundos  
scattered dental records. It gives patients a secure HIPPA compliant space to store X-rays, treatment history,  
1:05  
1 minuto y 5 segundos  
billing info, etc., all visualized on a dynamic tooth chart. It reads your records, interprets your codes, and  
1:13  
1 minuto y 13 segundos  
updates your dental health automatically, empowering both you and your provider. Non-technical second place winner, Willmaker. Willmaker makes  
1:22  
1 minuto y 22 segundos  
estate planning and legal consultation simple and affordable. No lawyers, no templates, just a clear guided  
1:30  
1 minuto y 30 segundos  
experience for drafting a valid will, power of attorney or healthcare directive. Built by a law student, it  
1:37  
1 minuto y 37 segundos  
includes legal validation tools, support for crypto assets, and even California specific compliance. Non-technical first  
1:45  
1 minuto y 45 segundos  
place winner, Blue Lens. Blue Lens is public health transparency in action.  
1:51  
1 minuto y 51 segundos  
Using voice AI and live government data, it helps residents quickly check the source quality and compliance status of  
1:59  
1 minuto y 59 segundos  
their local water supply. From boil notices to Eoli violations, just ask a question and get instant answers from  
2:06  
2 minutos y 6 segundos  
the AI. Technical third prize winner, Skillsprout. Want to master a hobby but don't know where to start? Skill Sprout  
2:14  
2 minutos y 14 segundos  
turns learning into growth. Literally, every skill you pursue is visualized as a plant in your garden, progressing from  
2:22  
2 minutos y 22 segundos  
seed to bloom as you complete bite-size goals and tasks with curated learning paths, YouTube integration, and a  
2:30  
2 minutos y 30 segundos  
communal hive for social support. It makes self-improvement fun, visual, and interactive. Technical second place  
2:38  
2 minutos y 38 segundos  
winner, Project K. Project Cade tackles a silent epidemic, leaked API keys and security flaws in application code. It  
2:47  
2 minutos y 47 segundos  
scans your project, flags vulnerabilities, and offers AI powered recommendations for fixing them, all in real time. With a security score and  
2:56  
2 minutos y 56 segundos  
clear guidance for fixes, it gives developers peace of mind before they deploy. Technical first place winner,  
3:03  
3 minutos y 3 segundos  
Road Patrol. A crowdpowered civic tool for reporting potholes, trash, and street hazards. Just tap the map, log  
3:11  
3 minutos y 11 segundos  
the issue, and upload a photo. The more votes a report gets, the more visibility it triggers right up to city officials.  
3:18  
3 minutos y 18 segundos  
With built-in chats, leaderboards, and plans for AI photo verification, it's ways meets 311\. Congrats to all the winners of the Caffeine AI hackathon.  
3:28  
3 minutos y 28 segundos  
This is the future of the internet.  
3:30  
3 minutos y 30 segundos  
Self-writing, decentralized, sovereign, and secure. Now imagine, what can you build with Caffeine AI? Head to  
3:38  
3 minutos y 38 segundos  
caffeine.a AI and sign up for early access today.  
Sincronizar con el tiempo del vídeo

Quiero que recopiles bien todo slos pilares más que nada de las fuentes de the aleph para ver bien qué proyecto podríamos encarar, su uso diario, que entiendas bien los criterios y que nos ayude a tener la idea de un proyecto sólido

Projects submitted will be judged based on the following criteria:

\* Technicality  
   \* What technical challenges does the project address?  
   \* Does it demonstrate advanced problem-solving and engineering skills?  
   \* Is the solution complete and functional, or does the team have a clear plan on how they would finish it?  
\* Originality  
   \* Is the project innovative and unique?  
   \* Does the project address specific pain points?  
   \* Does it propose a new solution or a creative approach to an existing problem?  
\* UI/UX/DX:  
   \* How user-friendly and accessible is the project?  
   \* Is the user interface, user experience, and developer experience well-designed and intuitive?  
\* Practicality:  
   \* How practical and feasible is the project?  
   \* Does it have real-world applications, and can it be implemented effectively?  
\* Presentation:  
   \* Is the project clearly explained and well-presented?  
   \* Does the team communicate their idea effectively through their pitch, demo, and supporting materials?  
Crecimiento  
Hello Emiliano Campos\!  
Mañana comienza Aleph Hackathon y acá está toda la información que tenés que saber.  
👋 Check-in & Location  
In-person  
Aleph Hub, Vedia 3892, Cdad. Autónoma de Buenos Aires  
Register at the front desk, grab your bracelet and exclusive merch | 10 AM \- 11 AM  
Online  
Join us at 11:30 AM on our YouTube channel or Twitter for live streaming  
⚒️ Workshops pre-hackathon  
Today at 11 AM (GMT \-3) we'll have a workshop with the Pears team from Tether, who will be sharing tips and helping us prepare for their track. Follow it via Aleph Hackathon's Twitter or Crecimiento's YouTube channel.  
Tomorrow, we'll have an in-person workshop in Buenos Aires and an online workshop for all chapters and hackers on the three Tether technologies that are part of the tracks. These will take place before the hackathon's opening ceremony.  
💬 Join our Telegram group chat  
This Telegram group will be your source of truth and our only communication channel throughout the hackathon. If you don't have an account yet, make sure to download the app right now (really, otherwise you will miss a lot of information).  
📖 Read the Hacker's Manual  
Everything you need to know about the hackathon is in the Hacker's Manual. Literally, EVERYTHING: the agenda, the mentors, the FAQ, the guidelines, the tracks, and more.  
📫 Discover the Tracks & Create your account on the Hackathon Platform  
Create your profile on Hacki  
Submit your project on Hacki by Sunday at 12 PM (GMT \-3), no worries, we'll tell you more on Saturday  
🤝 Stay connected  
Check out our Telegram for the full daily agenda, workshops, updates, and to talk to the juries, sponsors and other hackers. Remember to always check the Hacker's Suite.  
See you tomorrow\!  
The Aleph Hackathon Team  
Mentor’s Directory \- Aleph Hackathon  
We’ve gathered the best mentors out there to help you succeed and make the most of this hackathon. Whatever challenge you’re facing, there’s a mentor for you\!  
Here’s how it works:  
      \* Use the filters to find mentors who can support you on product, dev, design, business, AI, growth, and more.  
      \* Book a slot directly through their Calendly link and let them know by DMing them on Telegram (e.g “Hello\! I’m Tomi from the hackathon. Just booked a slot with you at 4PM. I need some help with my smart contract”)  
⚠️ Important: If you book a slot but don’t show up (the mentor will notify us), you’ll lose points in your final project evaluation.  
You also have access to sponsor’s mentors directly in the hackathon’s \[Telegram group chat\](https://t.me/+r3bV\_2KPZA0wYjM5). Each sponsor has a dedicated topic where their mentors are tagged and pinned.  
Don’t hesitate to reach out to them for specific questions\!  
\[Untitled\](https://app.notion.com/3e70eb7f25e7829fb1f3810880dc0f69?pvs=21)  
\* 

Te paso la lista de mentores por si se te ocurre que deb ocontactar a alguno o como hacerlo de la manera más eficiente y óptima

Esto es todo lo que tengo, hacé todo lo pedido, la lista de las ideas, todo lo que te pido en el lo que va de este largo mensaje y el contexto de todo para que otra ia pueda trabajar también a partir de toda la información que te di con todas las fuentes.

Armame también un archivo con todos lso consejos o cosas a tener en cuenta durante la hackaton, un análisis de cada uno de los vídeos que te mandé, que pudiste extraer util de cada uno? Te comparto datos de ejecución pasados: Ahora sí hay tracks concretos. Esto cambia todo el cálculo — y encontré tres contradicciones entre documentos que te pueden costar la descalificación. Armo el documento completo.

Se crearon 2 archivos, ejecutó un comando, archivo leído · 1 nota

Ahí están los dos documentos. El dossier tiene todo — tracks, requisitos textuales, reglas, criterios, patrones, ideas, guion del video, mentores, checklist — y el prompt está escrito para que se lo pases junto con el dossier a otra IA.

Lo importante de esta ronda:

Encontré tres contradicciones entre documentos oficiales, y una te puede descalificar. Los tres tracks de Tether dicen que podés reutilizar código existente y que solo evalúan lo construido durante el fin de semana. Crecimiento dice que el código se crea desde cero, sin excepciones, y que revisan todo. Si reutilizás, podés ganar un bounty de Tether y quedar descalificado del evento. Construí todo desde cero. Las otras dos: los tres tracks de Tether dicen cada uno "podés entrar a 1 track de este sponsor" y los tres son Tether, así que probablemente solo puedas elegir uno de los tres (más el General) — preguntalo mañana porque cambia toda la estrategia; y el premio de Pears figura como $1.000 en el manual y $1.500 en el documento del track.

El mejor ratio está en Pears, y es casi matemático. El requisito es binario: si pear install pear://\<key\> no funciona, los jueces no consideran la entrada. No la puntúan bajo — la descartan. Pear y Bare no son Node.js y los modelos de IA asumen que sí, así que una porción grande de los que se anoten va a fallar ese gate. Sumale que el juez es el creador de la plataforma y que la demo tiene un momento visual regalado: la dirección extra de BLE-Swarm, donde apagás el wifi en cámara y sigue andando. Ellos mismos cuentan que esa demo causó sensación en Buenos Aires.

Dentro de QVAC hay un hueco parecido. El sponsor señaló con el dedo la conciliación de facturas como caso principal, así que ahí van a ir todos. Pero el segundo premio pide algo distinto: correr la misma tarea N veces y mostrar la tasa de éxito, con los modos de fallo que no pudiste arreglar incluidos. Dijeron textualmente "pruebas, no impresiones". Ningún equipo apurado hace evaluación con N corridas — y encima es lo más difícil de simular con IA, que es justo lo que están filtrando.

Dos cosas para hacer hoy, no mañana. Descargar el modelo de QVAC son 2,5 GB y configurar un paymaster de Candide o Pimlico no es código del proyecto: es preparación de entorno, permitida, y hacerla el sábado a las 12 es regalar horas. Y el Vault Guardian ($500 a repartir entre todos los que lo superen) es independiente de tu proyecto — asigná 45 minutos del sábado a la tarde a intentarlo, temprano, porque el pozo se divide entre más gente cuanto más tarde.

Raquel Carrasco es la persona más importante del evento para ustedes. Es mentora y jueza de WDK y de QVAC. Es exactamente el caso del ingeniero de Meta que ganó $30.000: la persona del stand es quien puntúa. No le pidas una idea — andá con dos direcciones concretas y preguntale cuál está más alineada con lo que quieren ver. Ojo con reservar Calendly y no aparecer: el mentor lo reporta y perdés puntos en la evaluación final.

Y una advertencia sobre los ganadores anteriores: seguí sin poder verificarlos. Los nombres que circulan pueden estar alucinados, así que los marqué como no verificados y le puse a la otra IA la tarea de buscarlos con instrucción explícita de marcar cada afirmación como verificada o no. Las ceremonias de cierre de ediciones pasadas están grabadas en el YouTube de Crecimiento — ahí está la respuesta real.

Si mañana conseguís aclaración sobre lo de "1 track de Tether", avisame y ajusto el cálculo.

\# Aleph Hackathon — Agosto 2026  
\#\# Dossier operativo completo

\*\*Documento generado:\*\* viernes 21 de agosto de 2026  
\*\*Evento:\*\* sábado 22 (12:00) → domingo 23 (12:00), hora Argentina  
\*\*Tiempo real de construcción: 24 horas exactas\*\*  
\*\*Equipo:\*\* primera hackathon para todos los integrantes

\---

\# 1\. El reloj

No son 48 horas. Son 24, y el domingo al mediodía se cierra sin excepción.

| Momento | Qué pasa |  
|---|---|  
| \*\*Hoy 11:00\*\* | Workshop de Pears (Tether) — streaming en Twitter de Aleph Hackathon / YouTube de Crecimiento |  
| \*\*Sáb 9:30\*\* | Workshop QVAC — "IA local que realmente funciona" \+ prácticas de coding con IA |  
| \*\*Sáb 10:00–11:00\*\* | Check-in presencial: \*\*Aleph Hub, Vedia 3892, CABA\*\*. Pulsera y merch |  
| \*\*Sáb 10:00\*\* | Workshop WDK — fundamentos \+ cómo codear con IA sin romper el entregable |  
| \*\*Sáb 11:30\*\* | Ceremonia de apertura (presencial \+ streaming). Se revelan detalles finales |  
| \*\*Sáb 12:00\*\* | \*\*ARRANCA EL RELOJ\*\* |  
| \*\*Dom 12:00\*\* | \*\*CIERRE DE SUBMISSION.\*\* Sin prórroga |  
| \*\*Dom 13:00\*\* | Empieza el juicio, \~4 horas, 100% online y asíncrono |  
| \*\*Dom 17:00 o 18:00\*\* | Ceremonia de cierre y anuncio de ganadores \*(ver contradicción \#3)\* |

\*\*Los tres workshops son de los sponsors que ponen el 83% de la plata.\*\* Ir a los de sábado 9:30 y 10:00 no es opcional: los dictan las mismas personas que después juzgan, y ambos prometen que te vas con el entorno funcionando. Dos horas ahí valen más que dos horas de código a ciegas.

\---

\# 2\. Reglas duras

\#\# Lo que descalifica

\- \*\*Trabajo previo.\*\* Crecimiento: presentar proyectos preexistentes no está permitido, el trabajo tiene que empezar cuando arranca la hackathon, y \*"no hay excepciones, todo será chequeado"\*. Las features de startups cuentan, pero la regla de preexistencia aplica: el código se crea desde cero.  
\- \*\*Deadline.\*\* Domingo 23 antes de las 12:00 (GMT-3) en la plataforma. No se extiende.  
\- \*\*Video sin inglés.\*\* El video de 3 minutos debe ser en inglés, o en español \*\*con subtítulos en inglés precisos\*\*. La organización aclara que esto último \*puede impactar la nota final\*.  
\- \*\*Código no open source.\*\* Link público obligatorio.  
\- \*\*Contrato sin dirección.\*\* Si desplegás un contrato, la address va sí o sí.  
\- \*\*Faltar a un mentor.\*\* Si reservás un slot en el Calendly de un mentor y no aparecés, el mentor lo reporta y \*\*perdés puntos en la evaluación final\*\*. Reservá solo lo que vas a usar.

\#\# Tres contradicciones que detecté entre documentos

Estas no son detalles: dos de ellas te pueden costar el premio. Preguntalas mañana en el Telegram apenas abra.

\*\*① Reutilización de código: Crecimiento y Tether dicen lo opuesto.\*\*  
Los tres tracks de Tether dicen textualmente que \*podés reutilizar código existente y que solo evaluarán lo construido durante el hackathon\* — lo único que debe ser nuevo es la integración con WDK / QVAC / Pear. Crecimiento dice que el código se crea desde cero, sin excepciones, y que revisan todo.  
→ \*\*Postura segura: construir todo desde cero.\*\* Así calificás para las dos cosas. Si reutilizás, podés ganar un bounty de Tether y quedar descalificado del General Track y del evento. No vale la pena.

\*\*② "1 track por sponsor" y los tres tracks son de Tether.\*\*  
WDK, Pears y QVAC dicen cada uno \*"Tether · podés entrar a 1 track de este sponsor"\*. Los tres son productos de Tether. La lectura conservadora es que \*\*solo podés entrar a UNO de los tres\*\*. El General Track es de Crecimiento, o sea que sería un track aparte.  
→ \*\*Máximo realista: 1 track de Tether \+ General Track \= 2 tiros.\*\* Confirmalo, porque si me equivoco y se puede entrar a los tres, el cálculo de la sección 4 cambia completamente.

\*\*③ Premio de Pears y hora de cierre.\*\*  
El Hacker's Manual dice "Pears Track, up to 1,000 USD". El documento del track de Pears dice hasta 1.500 USD (1° $1.000 \+ 2° $500). Y la ceremonia de cierre figura a las 18:00 en la agenda y a las 17:00 en la sección de juicio. Menor, pero verificá.

\#\# Aclarado por la comunidad (confirmar igual)

\- \*\*Se puede usar IA para desarrollar.\*\* No solo permitido: los tres tracks de Tether lo recomiendan explícitamente. Con una advertencia feroz — ver sección 5\.  
\- \*\*Preparar entorno sí, codear no.\*\* Configurar cuentas, instalar SDKs, tener el \`claude.md\` listo: legítimo. La regla es sobre el código del proyecto.  
\- \*\*Acceso presencial:\*\* con estar en la lista de aceptados alcanza.

\---

\# 3\. Los cuatro tracks

Prize pool total: \*\*+$6.000 USD\*\*. Esto es un orden de magnitud menos que las ediciones anteriores (agosto 2024 repartió más de $100.000 entre 12 sponsors). Menos plata suele significar menos equipos mercenarios y más peso relativo de cada bounty individual.

| Track | Sponsor | Total | Desglose |  
|---|---|---|---|  
| \*\*QVAC\*\* | Tether | $2.000 | 1° $1.000 · 2° $500 · Vault Guardian $500 (pozo compartido) |  
| \*\*WDK\*\* | Tether | $1.500 | 1° $1.000 (CLI/MCP) · 2° $500 (gasless) |  
| \*\*Pears\*\* | Tether / Holepunch | $1.000–1.500 | 1° $1.000 · 2° $500 |  
| \*\*General\*\* | Crecimiento | $1.000 | 1° $500 USDC · 2° $500 USDC |

\*"Hasta"\* porque los sponsors se reservan el derecho de no otorgar el bounty completo si las entregas no cumplen expectativas.

\---

\#\# 3.1 QVAC — IA local en el dispositivo ($2.000)

\*\*Qué es:\*\* SDK de IA que corre modelos enteramente en la máquina del usuario. Sin nube, sin API keys, sin que los datos salgan del equipo. Un solo SDK cubre generación de texto, embeddings, RAG, fine-tuning, multimodal, OCR, transcripción, TTS y traducción. Tiene servidor HTTP compatible con OpenAI, así que apuntás cualquier herramienta existente a localhost y anda.

\*\*La restricción interesante, en sus palabras:\*\* estás trabajando con modelos chicos; el desafío es lograr que un modelo de 1B–4B haga tareas reales de forma confiable.

\#\#\# 🥇 Premio 1 — $1.000 — Agentes locales que reemplazan trabajo de operaciones

El sponsor es inusualmente explícito sobre qué quiere:

\> \*\*Conciliación de facturas\*\* es el caso de uso principal. Importar facturas (PDF, fotos, escaneos) con OCR, extraer los detalles, compararlos contra órdenes de compra o extractos bancarios, y señalar discrepancias con una explicación que un humano pueda verificar en cinco segundos. \*"Si lo dominás, sos competitivo."\*

Otras direcciones que listan: flujo post-disparo de riesgo crediticio, análisis de pagos y anomalías en transacciones, NLP financiero (contrato → calendario de pagos, recibos → libro mayor), comprensión multimodal de documentos (foto de recibo con poca luz → datos estructurados; remito manuscrito → partidas).

\*\*Qué hace fuerte a una entrega, textual:\*\* que funcione con datos reales y complejos, no con un PDF limpio elegido a mano. Que muestre su razonamiento para que un humano pueda revisarlo. Y que sea honesto sobre lo que no puede hacer — \*un agente que señala incertidumbre es mejor que uno que predice un número con demasiada confianza.\*

\#\#\# 🥈 Premio 2 — $500 — Modelos chicos, tareas difíciles: tool use y fiabilidad

Los modelos chicos fallan de formas reconocibles: olvidan un paso a mitad de la cadena, ignoran el resultado real de la herramienta y responden de memoria, o inventan un resultado cuando la llamada falla.

\*\*Qué hace fuerte a una entrega acá:\*\* \*"pruebas, no impresiones"\*. Correr la misma tarea N veces y mostrar la tasa de éxito. Mostrar tanto los fallos que arreglaste como los que no. \*Un proyecto que muestra honestamente dónde falla un modelo chico vale más que uno que demuestra una sola corrida impecable.\*

\#\#\# 🛡️ Vault Guardian — $500 a repartir entre todos los que lo superen

Juego de prompt injection: una IA defensora local guarda un secreto y hay que convencerla de liberarlo. Para el hackathon, el Guardian tiene \*\*una billetera WDK con fondos reales\*\*. Es independiente de tu proyecto — podés participar compitas o no por un premio. La implementación de referencia se comparte durante el evento.

\*\*Detalle económico:\*\* cuanto antes y más gente lo logre, menor es la parte de cada uno. O sea que conviene intentarlo \*\*temprano\*\*, no el domingo.

\#\#\# Requisitos técnicos

\- QVAC como capa de inferencia: \`@qvac/sdk\` (JS/TS) o \`tetherto-qvac-sdk\` (Python). \*\*Toda la inferencia debe correr localmente.\*\* Usar el servidor HTTP compatible con OpenAI cuenta; llamar a una API en la nube no.  
\- \*\*RAM:\*\* un modelo 4B en Q4 pide \~4 GB (el límite práctico de un portátil normal); 8B pide \~8 GB. La descarga inicial es de \~2,5 GB para un 4B. \*\*Descarguen el modelo el viernes, no el sábado a las 12.\*\*  
\- Modelos en Hugging Face (\`huggingface.co/qvac\`), pero se puede usar cualquier modelo abierto.  
\- \*\*VisionPsy no está soportado todavía\*\* — usar las capacidades multimodal y OCR del SDK.  
\- \*\*Salteen generación de imágenes y video.\*\* Están en el SDK pero \*"la calidad de salida no es la que buscamos para una entrega evaluada; los proyectos que dependan de eso no van a puntuar bien"\*.  
\- Prohibido pegar QVAC al costado: un proyecto que ya tiene su capa de IA en la nube y le agrega QVAC para llevarse el premio queda descartado.

\*\*Entrega:\*\* repo público con README \+ \*\*permalinks de GitHub a las líneas exactas donde ocurre la inferencia\*\* (dicen que es lo primero que miran) \+ video \+ detalles de modelo, cuantización, máquina y latencia aproximada \+ instrucciones que funcionen desde un clon limpio.

\*\*Juez y mentora:\*\* Raquel Carrasco, DevRel de Tether. Telegram @rraigal.

\---

\#\# 3.2 WDK — Wallet Development Kit ($1.500)

\*\*Qué es:\*\* kit open source y sin custodia para crear billeteras y flujos de pago. Una interfaz consistente para Bitcoin, Lightning, EVM, Solana, TON, TRON y más, con módulos para swaps, puentes, préstamos y conversión fiat. Hay SDK (Node.js, Bare, React Native), una CLI con servidor MCP integrado, y módulos gasless para pagar comisiones en USD₮ en vez de tokens de gas nativos.

\*\*El párrafo que más te importa, dado que son principiantes:\*\* \*"no necesitás escribir ni un solo contrato inteligente para ganar esta categoría. WDK maneja claves, direcciones, saldos y transacciones; vos te enfocás en el producto."\*

\#\#\# 🥇 Premio 1 — $1.000 — Mejor proyecto con la CLI de WDK

La CLI es una billetera local de línea de comandos: crea y desbloquea billeteras, deriva direcciones, consulta saldos e historial, envía activos y tokens, administra redes y tokens custom, genera links de on/off-ramp de MoonPay. Incluye \`wdk-mcp\`, un servidor MCP que expone esas operaciones a clientes compatibles (Claude Desktop, Claude Code, OpenClaw).

Direcciones sugeridas:  
\- \*\*Darle una billetera a un agente de IA.\*\* Que consulte saldos, cotice y envíe USD₮ bajo restricciones definidas por el usuario: límites de gasto, listas de permitidos, pedidos de confirmación. \*"Se valorará positivamente un modelo de seguridad bien pensado."\*  
\- \*\*Tesorería y pagos automatizados.\*\* Herramienta de nómina, grants o pago de recompensas: lee un CSV, previsualiza cada transferencia, ejecuta por lotes, genera registro de recibos con salida \`--json\`.  
\- \*\*Herramientas de comercio/facturación.\*\* POS o verificador de facturas que monitorea una dirección, detecta pagos entrantes en USD₮ y dispara un webhook o imprime un recibo.  
\- \*\*Utilidades de dev.\*\* Faucet bot, asistente de testnet, UI de portafolio, tarea de CI que usa la CLI como backend de billetera.  
\- \*\*Pagos de agentes.\*\* CLI/MCP \+ x402 para que un agente pague por llamada a API.

\#\#\# 🥈 Premio 2 — $500 — Algo gasless

Los módulos gasless permiten transaccionar sin tener gas nativo: las comisiones las paga un paymaster y se liquidan en USD₮/USD₮0.

Direcciones: onboarding sin saldo inicial (el usuario llega con la billetera vacía, recibe USD₮ y puede enviarlo enseguida, sin comprar SOL primero, mostrando la cotización de la comisión en USD₮ antes de firmar); EIP-7702 para actualizar la EOA que el usuario ya tiene manteniendo la misma dirección; remesas Solana o pagos P2P donde la cuenta de token del destinatario se crea automáticamente; suscripciones, propinas o economías in-game; flujos gasless cross-chain.

\*\*Trampa de infraestructura:\*\* no proveen endpoints de paymaster, cada uno consigue el suyo (Candide o Pimlico, minutos desde su panel). Y la \*\*testnet de USD₮ solo existe en Sepolia\*\*. Para cualquier otra cadena hay que desplegar un token ficticio propio y apuntar el paymaster ahí — no sirve la stablecoin de otro. O trabajar en mainnet con montos chicos.

\*\*Qué van a analizar:\*\* ¿resuelve un problema real del usuario? ¿funciona de punta a punta en la demo? ¿la integración es significativa y no un wrapper de una sola llamada? ¿la UX la podría usar una persona sin conocimientos de cripto, o un agente?

\*\*Requisitos:\*\* \`@tetherto/wdk\` como dependencia principal. Para Pista 1, \`@tetherto/wdk-cli\` (¡el paquete con scope\! \`wdk-cli\` sin scope en npm es otro proyecto). Para Pista 2, al menos un módulo gasless. Node.js \*\*22.18.0 o posterior\*\*. Los paquetes están en beta: usar billetera de prueba con fondos limitados, nunca una personal.

\*\*Entrega:\*\* repo con README \+ \*\*permalinks a la integración WDK\*\* (lo primero que miran) \+ video \+ lista de paquetes y versiones \+ instrucciones desde clon limpio \+ \`.env.example\` \+ detalles de red y token (si desplegaron un USD₮ falso, la address del contrato).

\*\*Juez y mentora:\*\* Raquel Carrasco.

\---

\#\# 3.3 Pears — P2P sin servidores ($1.000–1.500)

\*\*Qué es:\*\* plataforma de desarrollo, deploy y ejecución peer-to-peer de Holepunch. Creás una app, la desplegás con la CLI de Pear y llega a los usuarios directamente por la red: sin servidores, sin app store, sin registro de paquetes, sin infraestructura que pagar. Las actualizaciones también fluyen P2P. Abajo está Bare, un runtime de JavaScript chico y embebible; tu app y el runtime se compilan en un binario independiente por OS y arquitectura, y el usuario no necesita Node, ni Bare, ni la CLI de Pear.

\#\#\# El desafío (uno solo, dos premios)

Crear una herramienta CLI independiente, desplegarla con la CLI de Pear, e instalable con \`pear install pear://\<key\>\` con actualizaciones OTA P2P.

\*\*El requisito indispensable, textual:\*\* que la herramienta se pueda instalar con \`pear install pear://\<key\>\`. Un repo que compila localmente no alcanza. \*\*Los jueces la instalan igual que cualquier usuario, así que si ese comando no funciona, la entrada no se considera.\*\*

\*\*Esa frase es la información más valiosa de todo este documento.\*\* Es un filtro binario que va a eliminar a la mayoría de los que se anoten. Volvé a la sección 4\.

Direcciones sugeridas: herramienta de sistema (referencia: la CLI \`swap\`, que se autoactualiza entre pares); juego de terminal (autocontenido, divertido de mostrar, y las OTA permiten ajustar balance mientras la gente juega); UI de mensajería (chat, notas, subir/bajar archivos — acá Hyperswarm rinde); herramienta de dev; servicios, demonios, REPLs.

\*\*Elegir la rama correcta de \`hello-pear-bare\` es parte de hacerlo bien:\*\*

| Rama | Forma | Para |  
|---|---|---|  
| \`main\` | Updater en worker thread | Programas de larga duración (TUI, REPL, servicios) |  
| \`variant/single-thread\` | Updater en el proceso principal | Larga duración sin thread separado |  
| \`variant/daemon\` | Demonio independiente actualiza en segundo plano | Comandos de un solo uso y corta duración, tipo git |

\#\#\# 🔵 Dirección extra: BLE-Swarm

Descubrimiento entre pares por Bluetooth Low Energy: los dispositivos se encuentran y se comunican directamente, sin internet. Dicen textualmente que \*\*en una sala llena de hackers en Buenos Aires esta demo causó sensación: apagás el wifi y sigue funcionando.\*\* Admiten que es tosco y que esa es la gracia de un hackathon. Chat local-first, compartir archivos entre laptops contiguas, un juego que encuentra oponentes en la sala, sync offline: cualquier cosa donde la falta de internet sea ventaja.

\*\*Setup:\*\*  
\`\`\`bash  
curl https://install.pears.com/pear.sh | sh     \# macOS / Linux  
irm https://install.pears.com/pear.ps1 | iex    \# Windows  
git clone https://github.com/holepunchto/hello-pear-bare  
cd hello-pear-bare && npm install  
pear touch                \# genera tu link de upgrade  
\# pegarlo en el campo "upgrade" de package.json — la app no arranca sin él  
npm start                 \# modo dev, updates deshabilitadas  
npm run make              \# binario independiente en out/\<platform\>-\<arch\>  
\`\`\`

\*\*Dos cosas que rompen a todos, avisadas por ellos mismos:\*\* la plantilla trae un link de upgrade placeholder y falla con \`INVALID\_URL\` hasta que lo reemplacés con uno real de \`pear touch\`. Y en la variante \`daemon\` ese error va a \`\<storage\>/updates.log\` en vez de a la terminal.

\*\*Aviso sobre IA:\*\* Pear y Bare \*\*no son Node.js\*\*, y los modelos asumen con confianza que sí. Esperá APIs de Node inventadas, nombres de módulos incorrectos y flags imaginarios.

\*\*Entrega:\*\* repo con README indicando de qué rama partieron \+ \*\*tu link \`pear://\` activo durante todo el juicio\*\* \+ video mostrando la instalación y la llegada de una actualización OTA \+ para qué plataformas compilaron.

\*\*Juez:\*\* dmc, \*\*creador de Pear\*\*. Keet @dmc0, Twitter @davidmarkclem.

\---

\#\# 3.4 General Track — Crecimiento ($1.000)

Reconoce los proyectos más destacados construidos durante el hackathon, sin importar la categoría: crypto, Web3, IA, robótica o lo que sea. Premia equipos que demuestren ejecución fuerte y soluciones de alto impacto. 1° $500 USDC, 2° $500 USDC.

Se juzga con los cinco criterios generales (sección 5). \*\*Este es el track al que entra tu proyecto además del de Tether\*\*, sin trabajo extra.

\---

\# 4\. La matemática: a qué track entrar

No elijas por monto. El valor esperado es:

\`\`\`  
                    premio del track  
    EV  ≈  ─────────────────────────────────  
           proyectos que van a competir ahí  
\`\`\`

Con \~200 proyectos esperables y solo cuatro tracks, el denominador importa muchísimo más que el numerador. Lo que mueve el denominador no es el premio: es \*\*la fricción de entrada\*\*.

| Track | Premio | Fricción de entrada | Competidores esperables |  
|---|---|---|---|  
| QVAC | $2.000 | Media-alta: 4 GB de RAM, descarga de 2,5 GB, OCR sobre datos sucios | \*\*Alta.\*\* Dice "IA" y "agentes". Es el imán del evento |  
| WDK P1 | $1.000 | Baja: sin contratos, CLI ya hecha, MCP listo | Media-alta |  
| WDK P2 | $500 | Media: paymaster propio, testnet solo en Sepolia | \*\*Baja\*\* |  
| Pears | $1.000+ | \*\*Muy alta:\*\* runtime que no es Node, deploy P2P, OTA verificable | \*\*Muy baja\*\* |  
| General | $1.000 | Ninguna: entran todos | Todos |

\*\*Tres lecturas:\*\*

\*\*① Pears es, con diferencia, el track con mejor ratio.\*\* El gate es binario y verificable — \`pear install pear://\<key\>\` funciona o no funciona — y los jueces lo van a ejecutar. Una fracción grande de los que se anoten va a fallar ahí y quedar fuera de consideración, no puntuados bajo: \*\*fuera\*\*. Además el juez es el creador de la plataforma, o sea que valora que hayas entendido su modelo mental (elegir la rama correcta, mostrar la OTA real). Sumale que la demo tiene un momento visual gratis: apagar el wifi y que siga andando.

\*\*② QVAC tiene la plata pero también la multitud.\*\* Y adentro de QVAC hay una asimetría fuerte: el Premio 1 (conciliación de facturas) es donde va a ir todo el mundo porque el sponsor lo señaló con el dedo. El Premio 2 (fiabilidad de modelos chicos) pide \*\*evidencia experimental\*\* — correr N veces, tabla de tasa de éxito, modos de fallo documentados — y eso es exactamente lo que un equipo de hackathon apurado no hace nunca. Menos competencia, y además es el tipo de trabajo que puntúa altísimo en \*Technicality\*.

\*\*③ El Vault Guardian es dinero casi gratis y nadie lo va a mirar el sábado.\*\* No requiere que tu proyecto sea nada. Es un juego de prompt injection contra un modelo local. Asignen 45 minutos del sábado a la tarde a que una persona lo intente mientras los demás codean. Y háganlo temprano: el pozo se reparte entre todos los que lo logren.

\*\*Recomendación:\*\* un proyecto, dos tracks (uno de Tether \+ General), y el Vault Guardian en paralelo como side bet.

\---

\# 5\. Los criterios de evaluación

Cinco criterios, \*\*puntuados del 1 al 5 cada uno\*\*. No hay pesos publicados: asumí que valen lo mismo. Eso significa que un proyecto 4/5 en los cinco (20 puntos) le gana a uno 5/5 en dos y 2/5 en tres (16 puntos). \*\*La rúbrica castiga la especialización extrema\*\*, que es justo el modo de fallo típico de un equipo de primera vez que se enamora del backend.

| Criterio | Preguntas textuales | Qué significa en la práctica |  
|---|---|---|  
| \*\*Technicality\*\* | ¿Qué desafíos técnicos aborda? ¿Demuestra resolución de problemas e ingeniería avanzada? \*\*¿La solución está completa y funcional, o el equipo tiene un plan claro de cómo la terminaría?\*\* | Esa última cláusula es un regalo: un roadmap honesto y específico recupera puntos de lo que no llegaste a terminar. Ponelo en el video. |  
| \*\*Originality\*\* | ¿Es innovador y único? \*\*¿Aborda pain points específicos?\*\* ¿Propone una solución nueva o un enfoque creativo? | "Específicos" es la palabra clave. Un problema angosto y nombrado gana a uno amplio y difuso. |  
| \*\*UI/UX/DX\*\* | ¿Qué tan usable y accesible es? ¿La interfaz, la experiencia de usuario y la de desarrollador están bien diseñadas? | \*\*Un quinto de la nota, y es lo primero que se sacrifica.\*\* Notá que dice DX: para una herramienta CLI (Pears, WDK), el README, los mensajes de error y el \`--help\` \*son\* la UX. |  
| \*\*Practicality\*\* | ¿Qué tan práctico y factible? ¿Tiene aplicaciones reales y puede implementarse efectivamente? | Acá es donde históricamente falla el campo — ver sección 6\. |  
| \*\*Presentation\*\* | ¿Está claramente explicado? ¿El equipo comunica la idea efectivamente por pitch, demo y materiales? | Sin pitch en vivo: \*\*el video ES la presentación\*\*, y el README es el material de apoyo. |

Además, cada bounty de sponsor tiene sus propios criterios (las preguntas de "qué vamos a analizar" que copié en la sección 3). \*\*Son evaluaciones separadas.\*\*

\#\# La advertencia sobre código generado con IA

Los tres tracks de Tether recomiendan usar asistentes de IA y a la vez dicen, con palabras casi idénticas, que descartan sin revisión las entregas con errores evidentes de IA: \*\*APIs inventadas, código obsoleto, un README que describe funciones inexistentes, métodos del SDK que no existen, wrappers sobre-diseñados, o una demo que solo funciona con una entrada específica.\*\*

WDK lo pone así: las integraciones requieren pocas líneas de código; los modelos tienden a complicarlas de más, inventar métodos y generar configuraciones arbitrarias. Pear avisa que no es Node.js y los modelos asumen que sí. QVAC dice que la orquestación de modelos chicos es fácil de simular y difícil de implementar bien.

\*\*Traducción operativa:\*\*  
\- Usar las \*Agent Skills\* y el \*MCP Toolkit\* de WDK, y la doc real, para anclar al asistente. Existen justamente para esto.  
\- \*\*Correr el código antes de entregar.\*\* Con entradas que no elegiste vos.  
\- Si el README menciona una feature, esa feature tiene que existir.  
\- Menos líneas es mejor. Si tu integración con WDK tiene 300 líneas, algo está mal.

\---

\# 6\. Patrones de ganadores

Sintetizado de las transcripciones de hackathons (ganadores y perdedores) y del historial de Aleph. Marco con \*\*\[Aleph\]\*\* lo que viene de esta hackathon específicamente.

\#\# Lo que aparece en fuentes independientes

\*\*Los sponsors son los jueces de sus propios premios, y están ahí por marketing.\*\* Un ingeniero de Meta que ganó más de $30.000 en hackathons lo dice sin vueltas: hay una razón de negocio por la que las empresas ponen miles de dólares y personal; es un evento de marketing. La gente que atiende el stand suele ser quien juzga el premio de ese sponsor, y su criterio no es el código más elegante: es qué proyecto muestra mejor su tecnología. Su caso concreto: preguntó a los ingenieros de un sponsor por una feature faltante en su SDK móvil, ellos admitieron que no la tenían resuelta, él ofreció construirla, y le dijeron que si lo lograba ganaba. Ganó $5.000.  
→ \*\*Acá el equivalente es Raquel Carrasco\*\*, que es mentora \*y\* jueza de WDK y QVAC. Y dmc, que es el creador de Pear y su juez.

\*\*Diseñar desde la demo hacia atrás.\*\* Un estudiante de Columbia que gana hackathons seguido: piensa cuál sería la demo más impactante para un juez y trabaja para atrás desde ahí. El de Meta dice lo mismo desde el otro ángulo: trabajá para atrás desde la presentación, definí los puntos clave y las features que vas a mostrar, y asegurate de que esas features destaquen al sponsor. Estima que una buena presentación es \*\*la mitad del proyecto\*\*.

\*\*No pasarse del scope.\*\* El vlogger español en ETHGlobal Lisboa, sobre su propio proyecto: \*"hemos pecado un poco de ambición"\*, no llegaron a implementar todo, perdieron el premio grande — \*\*pero ganaron dos premios de sponsor\*\*. Es el caso de estudio perfecto de por qué los bounties de sponsor son el objetivo realista de un equipo nuevo.

\*\*Entregar aunque esté incompleto.\*\* El organizador que dio más de un millón en premios cuenta que ve equipos talentosos que probablemente podían ganar y entregan 12:01, 12:05, 12:30 — o no entregan. Su modelo: si construir el producto perfecto son 10 pasos, en un hackathon llegás al 1, al 2, con suerte al 3\. \*\*Entregá igual.\*\* Un vlog de TreeHacks muestra el otro lado: archivo corrupto a las 5:30 AM, dependencias que hay que reinstalar, el video filmándose a último momento, y la organización extendiendo 15 minutos — con lo que no se puede contar.

\*\*El equipo grande decide más lento.\*\* Equipo de cinco en la Platanus Hack: 5 de la mañana y todavía sin idea, \*"no sé si será porque somos cinco y es más difícil ponernos de acuerdo"\*. Ganaron igual, pero perdieron un tercio del tiempo. Con 24 horas no tenés ese margen. \*\*Decidan la dirección hoy.\*\*

\*\*Trabajo en paralelo mientras hacés otra cosa.\*\* Un founder que fue a un hackathon a hacer networking dejó a su asistente de código trabajando de forma autónoma mientras hablaba con gente, y dice que sin eso prácticamente no hubiera avanzado nada ese día.

\*\*El wow factor y la falta de sueño no predicen nada.\*\* Un YouTuber intentó adivinar el ganador de TreeHacks 2026 con tres criterios (idea emocionante, garra, privación de sueño) y \*\*todos los equipos cumplían los tres\*\*. Falló la predicción. Ganó \*Shepherd\*, un bastón inteligente para personas con discapacidad visual que usa el LiDAR y las cámaras que el iPhone Pro ya tiene. Su conclusión: su perspectiva había sido \*demasiado miope\* — eligió lo que resolvía un problema propio.  
→ \*\*Los proyectos que ganan resuelven el problema de alguien más, y usan lo que ya existe en vez de inventar hardware.\*\*

\*\*Los jueces preguntan si probaste con gente real.\*\* En el showcase de MIT, los tres jueces preguntaron variantes de lo mismo a casi todos los equipos: \*¿probaste esto con alguien fuera de tu familia?\* Los equipos que tenían respuesta concreta (vecinos, dos especialistas en rehabilitación, feedback documentado que derivó en cambios) se llevaron los premios. \*\*Conseguir tres personas que prueben tu cosa el domingo a la mañana y decir eso en el video es de lo más barato que podés hacer para subir \*Practicality\*.\*\*

\*\*Los ganadores de otras hackathons resuelven cosas aburridas y específicas.\*\* En una hackathon de IA: registros dentales dispersos, hacer un testamento válido sin abogado, chequear la calidad del agua de tu barrio con datos de gobierno, reportar baches, escanear claves de API filtradas en el código. Ninguno inventó una categoría. Todos nombraron un usuario.

\#\# \[Aleph\] Lo específico de esta hackathon

\*\*La debilidad histórica del campo es el modelo de negocio.\*\* Una jurado de la edición de agosto 2024 evaluó 14 proyectos, de los cuales 3 quedaron en el top 5 del evento, y su lectura pública fue: \*\*muchas buenas ideas y pocos modelos de negocio\*\*, con un largo camino por recorrer para esos equipos. Eso mapea directo a \*Practicality\*.  
→ \*\*Treinta segundos del video dedicados a quién paga esto y por qué te ponen por encima de la mayoría del campo.\*\* Casi nadie lo hace.

\*\*Escala:\*\* agosto 2024 tuvo 150 hackers y 54 proyectos según la página oficial (la cobertura de prensa habla de más de 300 hackers de 20 países y 55 proyectos presentados el domingo a la mañana, con 12 empresas presentando desafíos); diciembre 2024, 125/37; marzo 2025, 210/61; agosto 2025, 660/194; marzo 2026, 430/142.

⚠️ \*\*No pude verificar\*\* los listados de ganadores de ediciones anteriores que circulan (AutoBounty, Piggy Quiz, Sportchain, Clever, TreasuryPilot, Consient, AlephRob, Elemgame). No aparecen en fuentes públicas verificables y las descripciones detalladas de cada uno son justo el tipo de detalle que un modelo rellena solo. De la lista pública de proyectos presentados en agosto 2024 sí figuran "Tornado Codes" y "ValidAr", que coinciden con dos de los tres finalistas que se mencionan. \*\*Verificalo vos en DoraHacks antes de usar cualquiera de esos nombres como precedente.\*\*

\---

\# 7\. Ideas de proyecto, por track

Criterios usados para rankear: (a) cumple los requisitos duros del sponsor, (b) terminable en 24h por un equipo de primera vez, (c) tiene un momento visual claro en los primeros 30 segundos del video, (d) puntúa en los cinco criterios generales, (e) no es lo que van a hacer otros veinte equipos.

\#\# 🍐 Pears — el mejor ratio

\#\#\# P1. Sala — compartir archivos y chat entre laptops sin internet  
\*\*Qué:\*\* CLI que descubre otras máquinas en la misma sala por BLE-Swarm y permite mandarse archivos y mensajes. Sin wifi, sin servidor, sin cuenta.  
\*\*El momento de la demo:\*\* apagás el wifi en cámara y seguís mandando un archivo. Ellos mismos dicen que esa demo causó sensación en Buenos Aires.  
\*\*Por qué gana:\*\* el problema es real y el juez lo vivió (wifi saturado en venues de hackathon); usa la dirección experimental que ellos destacaron; la OTA se demuestra fácil (mandás una versión que agrega un comando y aparece sola).  
\*\*Rama:\*\* \`main\` (proceso de larga duración con TUI).  
\*\*Riesgo:\*\* BLE es tosco, ellos lo advierten. \*\*Mitigación: que funcione sobre Hyperswarm por defecto y BLE como modo \`--offline\`.\*\* Así nunca tenés una demo muerta.  
\*\*Dificultad 24h:\*\* media-alta. ★★★★☆

\#\#\# P2. Un juego de terminal con balanceo por OTA  
\*\*Qué:\*\* juego de terminal autocontenido, multijugador por Hyperswarm.  
\*\*El momento de la demo:\*\* mostrás a alguien jugando, publicás un cambio de balance o un nivel nuevo, y le llega \*\*mientras sigue jugando\*\*. Eso demuestra la OTA de una forma que ningún otro tipo de proyecto logra.  
\*\*Por qué gana:\*\* ellos lo sugieren explícitamente ("las actualizaciones OTA permiten ajustar el balance mientras los jugadores siguen jugando"), es divertido de mostrar y el gate técnico es el mismo que cualquier otro.  
\*\*Riesgo:\*\* \*Practicality\* baja. Compensar con el ángulo de "canal de distribución sin app store".  
\*\*Dificultad 24h:\*\* media. ★★★★☆

\#\#\# P3. Herramienta de dev de un solo uso, siempre actualizada  
\*\*Qué:\*\* el script de shell que ibas a escribir igual, pero distribuido como binario multiplataforma que se autoactualiza. Rama \`variant/daemon\`.  
\*\*Por qué gana:\*\* es la arquitectura de referencia que ellos señalan (la CLI \`swap\`), o sea que demuestra que leíste. DX es un criterio y acá el producto \*es\* DX.  
\*\*Riesgo:\*\* \*Originality\* baja si la herramienta es genérica. Elegí una tarea específica y molesta.  
\*\*Dificultad 24h:\*\* baja. ★★★☆☆ — buena opción de repliegue si algo se complica.

\#\# 🔷 QVAC

\#\#\# Q1. Conciliador de facturas con documentos argentinos reales  
\*\*Qué:\*\* cargás fotos de facturas (A, B, C), remitos manuscritos y un extracto bancario; el agente hace OCR local, extrae los campos, cruza contra el extracto y marca discrepancias con una explicación de una línea verificable en cinco segundos.  
\*\*El diferenciador, que es todo:\*\* los otros veinte equipos van a demostrar con PDFs limpios. \*\*Ustedes usan fotos sacadas con el celular, torcidas, con poca luz, arrugadas, con sellos encima.\*\* El sponsor dijo textualmente que lo que hace fuerte a una entrega es que funcione con datos reales y complejos, no con un PDF prolijo elegido a mano.  
\*\*Además:\*\* privacidad como argumento real — un contador no puede subir la facturación de sus clientes a una API de terceros. Ese es el modelo de negocio, y responde a la debilidad histórica del campo en Aleph.  
\*\*Mostrá incertidumbre:\*\* cuando el modelo no está seguro, que lo diga y lo mande a revisión humana. Explícitamente premiado.  
\*\*Riesgo:\*\* es el caso de uso que el sponsor señaló → máxima competencia. Ganás por la calidad de los datos de prueba, no por la idea.  
\*\*Dificultad 24h:\*\* media. ★★★★☆

\#\#\# Q2. Banco de pruebas de fiabilidad para modelos chicos ← el hueco  
\*\*Qué:\*\* un agente local que encadena varias herramientas (OCR → calculadora → base local → lector de archivos) para una tarea concreta, \*\*más un harness que corre la misma tarea N veces y reporta tasa de éxito, modos de fallo y el efecto de cada capa de mitigación\*\* (validación, reintentos, salida estructurada forzada, auto-chequeo).  
\*\*El momento de la demo:\*\* una tabla. \`sin validación: 41% · con salida estructurada: 68% · con auto-chequeo: 89%\`. Y abajo: "estos tres modos de fallo no los pudimos arreglar".  
\*\*Por qué gana:\*\* el sponsor pidió literalmente \*"pruebas, no impresiones"\* y dijo que un proyecto honesto sobre dónde falla vale más que una corrida impecable. \*\*Ningún equipo apurado hace evaluación con N corridas.\*\* Puntúa altísimo en Technicality y es casi imposible de simular con IA, que es justo lo que están filtrando.  
\*\*Riesgo:\*\* UI/UX flojo si es solo una tabla en terminal. Poné media hora en un reporte HTML lindo.  
\*\*Dificultad 24h:\*\* media. ★★★★★ \*\*— mi favorita en QVAC por ratio.\*\*

\#\#\# Q3. Q1 \+ Q2 combinadas  
El conciliador de facturas \*\*es\*\* una cadena de herramientas multi-paso. Construyan Q1 y midan Q1 con el harness de Q2. Un proyecto, apunta a los dos premios del track. Es la jugada de mayor valor esperado si el equipo rinde.  
\*\*Dificultad 24h:\*\* alta. ★★★★☆

\#\# 🟧 WDK

\#\#\# W1. Agente con billetera y modelo de seguridad explícito  
\*\*Qué:\*\* agente conectado por MCP que consulta saldos, cotiza y envía USD₮ bajo restricciones que define el usuario: tope por transacción, tope diario, lista de destinatarios permitidos, confirmación obligatoria arriba de cierto monto, modo dry-run.  
\*\*El momento de la demo:\*\* le pedís al agente que pague algo fuera de la lista de permitidos y \*\*se niega, explicando qué regla lo bloqueó\*\*. Después le pedís algo válido y ejecuta.  
\*\*Por qué gana:\*\* ellos dicen que se valorará positivamente un modelo de seguridad bien pensado, y ese "no" en cámara es más memorable que cualquier transferencia exitosa. Además conecta con el Vault Guardian temáticamente.  
\*\*Dificultad 24h:\*\* media-baja (no hay contratos). ★★★★☆

\#\#\# W2. Pagos por lote desde CSV con recibos verificables  
\*\*Qué:\*\* leés un CSV de nómina o de bounties, previsualizás cada transferencia, ejecutás por lotes, y generás un registro de recibos con la salida \`--json\`.  
\*\*Por qué gana:\*\* es exactamente lo que ellos sugieren, es aburrido en el buen sentido, y es el proyecto con menos formas de salir mal en 24 horas. \*Practicality\* altísima.  
\*\*Riesgo:\*\* \*Originality\* baja. Diferenciá con el caso de uso: pagar a colaboradores en LATAM sin cuenta bancaria en dólares.  
\*\*Dificultad 24h:\*\* baja. ★★★☆☆

\#\#\# W3. Onboarding gasless de cero (Premio 2, menos competido)  
\*\*Qué:\*\* el usuario llega con la billetera vacía, recibe USD₮ y puede enviarlo \*\*en el mismo minuto\*\*, sin comprar SOL ni ETH primero, viendo la comisión cotizada en USD₮ antes de firmar.  
\*\*El momento de la demo:\*\* billetera en cero → recibe → envía. Sin ningún paso intermedio. Cualquiera entiende por qué eso importa.  
\*\*Riesgo alto:\*\* paymaster propio (Candide/Pimlico) y testnet USD₮ solo en Sepolia. \*\*Resolvé la infra hoy o mañana temprano, antes de que arranque el reloj\*\* — configurar un paymaster no es código del proyecto.  
\*\*Dificultad 24h:\*\* media-alta por infra. ★★★☆☆

\#\# 🌞 General Track  
No requiere idea propia: entra el mismo proyecto. Lo que cambia es el énfasis del video — para el sponsor mostrás integración profunda, para el General mostrás \*\*problema, usuario, impacto y modelo de negocio\*\*.

\---

\# 8\. El video: la mitad del proyecto

No hay pitch en vivo. El juez ve tu video, tu repo y tu README. \*\*El video es toda tu presentación.\*\*

\#\# Reglas  
\- \*\*3 minutos.\*\* En inglés. O en español con subtítulos en inglés precisos, sobre todo en los términos técnicos — con la advertencia de que puede impactar la nota.  
\- Si el inglés es un problema: la organización sugiere escribir el discurso en español, traducirlo y leerlo tratando de que suene natural.  
\- Grabado y adjunto a la submission. Asíncrono.

\#\# Estructura minuto a minuto

| Tiempo | Contenido |  
|---|---|  
| 0:00–0:15 | \*\*El problema, con un número.\*\* No quiénes son. El problema. |  
| 0:15–1:45 | \*\*Demo funcionando de punta a punta.\*\* El 50% del video. Pantalla real, no slides. |  
| 1:45–2:15 | \*\*Cómo funciona:\*\* la decisión técnica interesante y \*\*dónde entra la tecnología del sponsor\*\*. Permalinks en pantalla. |  
| 2:15–2:40 | \*\*Practicality:\*\* quién lo usa, quién paga, qué probaron con usuarios reales. |  
| 2:40–3:00 | \*\*Qué falta y cómo lo terminarían.\*\* La rúbrica de Technicality premia explícitamente un plan claro. Cierre firme. |

\*\*Errores caros:\*\* gastar dos minutos en pitch de startup y dejar el hack para el final (el jurado vino a ver el hack); slides con código y diagramas que obligan a leer en vez de escuchar; pasarse del tiempo.

\#\# Checklist de lo que el video debe mostrar, por track

\- \*\*Todos:\*\* el flujo funcionando de punta a punta, no un mockup.  
\- \*\*WDK:\*\* el flujo con la integración WDK visible en acción.  
\- \*\*QVAC:\*\* que corre \*\*local\*\* de punta a punta. Decí el modelo, la cuantización, la máquina y la latencia.  
\- \*\*Pears:\*\* \*\*la instalación con \`pear install pear://\<key\>\` y una actualización OTA llegando\*\*. Sin eso no cuenta.

\#\# Grabalo el domingo a las 8:00, no a las 11:30  
Es el seguro contra que el wifi se caiga, contra un archivo corrupto y contra pasarte del deadline. Todos los relatos de hackathon coinciden en que ahí es donde se pierde. Y si mejorás algo después, editás la submission — se puede.

\---

\# 9\. Mentores: a quién y cómo

\*\*Cómo funciona:\*\* buscás en el Mentor's Directory, reservás por su Calendly, y \*\*le avisás por Telegram\*\* con un mensaje corto tipo \*"Hola, soy \[nombre\] del hackathon. Reservé un slot a las 16\. Necesito ayuda con \[cosa específica\]"\*. Los mentores de sponsors están fijados en el topic de cada sponsor en el Telegram del hackathon.

⚠️ \*\*Reservar y no aparecer resta puntos en la evaluación final.\*\* Reservá solo lo que vas a usar.

\#\# Prioridad 1 — Raquel Carrasco (Tether, Developer Relations)  
Telegram \`@rraigal\` · Twitter \`@rraigal\_\` · IRL \+ Online · Backend, Smart Contracts, DeFi, AI/ML.

\*\*Es mentora y jueza de WDK y de QVAC.\*\* Es la persona más importante del evento para ustedes. Es el equivalente exacto del caso del ingeniero de Meta: la persona del stand es quien puntúa.

\*\*Cómo usarla bien:\*\* no le pidas "una idea". Andá con dos direcciones concretas y preguntale cuál le parece más alineada con lo que quieren ver, y qué errores ve repetirse en las entregas. Una segunda charla el sábado a la noche mostrándole el avance vale más que la primera: te registra como equipo que ejecuta.

\#\# Prioridad 2 — según lo que necesiten  
\- \*\*Gabriel Aufgang\*\* (5SEIS, Creative Director) — \*\*Pitching \+ UX/UI\*\*, solo presencial. Si están en el Aleph Hub, es la persona para revisar el guion del video el sábado a la noche. UI/UX es un quinto de la nota.  
\- \*\*Wendy Lopez\*\* (Reap, LATAM Marketing) — GTM, Pitching, Marketing. Online \+ IRL. Para la parte de \*Practicality\* / modelo de negocio, que es la debilidad histórica del campo acá.  
\- \*\*Lucas Agustín Vittor\*\* (Harvard, Research Scholar) — AI/ML \+ Backend. IRL \+ Online. Si van por QVAC, sobre todo por la idea Q2 de evaluación y fiabilidad.  
\- \*\*Patricio Iturraspe\*\* (Mate & Build, Founder) — GTM, AI/ML, Pitching. IRL \+ Online.  
\- \*\*Tomas Del manzo Oliver\*\* (Clawpump, CTO) — el perfil más amplio: DeFi, contratos, AI/ML, frontend, backend, pitching, GTM. IRL \+ Online.  
\- \*\*Segundo d'augerot\*\* (Cascara) — Creative \+ Product Management. Solo español.  
\- Para blockchain/contratos: \*\*Nelson Galdeman\*\* (Convexity Labs, Protocol Engineer), \*\*Sebastián Luján\*\* (Backend Engineer), \*\*Franco Perez\*\* (Crisol Studio).

\#\# Para lo técnico profundo, los canales de ingeniería  
Los mentores derivan ahí: WDK y QVAC → Discord de Tether Dev. Pear → sala de Keet (Pear no tiene Discord). Están en los documentos de cada track.

\---

\# 10\. Checklist de submission

\*\*Plataforma:\*\* el Hacker's Manual menciona \*\*Hacki\*\* como la plataforma y a la vez da pasos para \*\*DoraHacks\*\*. Confirmá cuál es mañana; probablemente Hacki reemplazó a DoraHacks esta edición y quedó texto viejo. Password que figura: \`Aleph-hackathon26\` (con A mayúscula).

\- \[ \] Todos los integrantes con cuenta propia en la plataforma, registrados y logueados  
\- \[ \] Todos los emails del equipo cargados en la sección Team Member  
\- \[ \] Nombre, descripción e info del proyecto  
\- \[ \] Link al repo público  
\- \[ \] Link al video de 3 minutos  
\- \[ \] \*\*Seleccionar explícitamente los tracks/bounties a los que aplican\*\* y explicar en la aplicación a cuáles aplican y qué contratos presentan  
\- \[ \] Dirección del contrato si desplegaron alguno  
\- \[ \] README con qué construyeron y qué módulos usaron  
\- \[ \] \*\*Permalinks de GitHub a las líneas exactas de integración\*\* (WDK y QVAC dicen que es lo primero que miran)  
\- \[ \] Instrucciones que funcionen desde un clon limpio \+ \`.env.example\`  
\- \[ \] \*\*Pears:\*\* link \`pear://\` activo y funcionando durante todo el juicio  
\- \[ \] \*\*WDK:\*\* lista de paquetes y versiones \+ red y token usados  
\- \[ \] \*\*QVAC:\*\* modelo, cuantización, hardware, latencia  
\- \[ \] Entregado \*\*antes\*\* de las 12:00 del domingo (apuntar a las 10:30)

\---

\# 11\. Plan de las 24 horas

\*\*Hoy (viernes)\*\*  
\- Ver el workshop de Pears de las 11:00 si llegan  
\- Instalar todo: Node 22.18+, CLI de Pear, SDK de QVAC, \*\*descargar el modelo (2,5 GB)\*\*, cuentas de Candide/Pimlico si van por gasless  
\- Leer el Hacker's Manual completo, los cuatro. Y las reglas y código de conducta  
\- Entrar al Telegram y a cada topic de sponsor  
\- Crear cuenta en la plataforma los cuatro  
\- \*\*Decidir la dirección del track esta noche.\*\* No la idea final: la dirección  
\- Preguntar en el Telegram las tres contradicciones de la sección 2

\*\*Sábado\*\*  
\- 9:30 workshop QVAC · 10:00 check-in \+ workshop WDK · 11:30 apertura  
\- \*\*12:00–13:00\*\* — idea final, roles por escrito, repo creado, primer commit. Escribir el guion del video \*\*antes\*\* de codear  
\- \*\*13:00–14:00\*\* — hablar con Raquel y con los mentores que necesiten. Reservar solo lo que van a usar  
\- \*\*14:00–02:00\*\* — el camino feliz completo de punta a punta, aunque esté hardcodeado. Cada 4 horas: ¿esto se puede mostrar?  
\- \*\*\~16:00\*\* — una persona, 45 minutos, al Vault Guardian  
\- \*\*02:00\*\* — dormir por turnos. Nadie decide bien a las 6 AM sin dormir

\*\*Domingo\*\*  
\- \*\*06:00–08:00\*\* — \*\*congelamiento de features.\*\* UI, estados vacíos, mensajes de error, README, permalinks  
\- \*\*08:00–09:30\*\* — grabar el video. Cronometrado  
\- \*\*09:30–10:30\*\* — probar con 2–3 personas reales del venue y mencionarlo en el video o el README  
\- \*\*10:30\*\* — \*\*entregar.\*\* Después siguen editando si quieren  
\- \*\*12:00\*\* — cierre · \*\*13:00\*\* juicio · \*\*17:00/18:00\*\* resultados

\---

\# 12\. Qué queda por confirmar

1\. ¿Se puede entrar a más de un track de Tether, o es uno solo? \*(cambia toda la estrategia)\*  
2\. ¿Cuál es la plataforma de submission definitiva, Hacki o DoraHacks?  
3\. ¿El premio de Pears es hasta $1.000 o hasta $1.500?  
4\. ¿La regla de reutilización de código de Tether anula la de Crecimiento, o al revés? \*(asumir la más estricta)\*  
5\. ¿La ceremonia de cierre es 17:00 o 18:00?  
6\. ¿Quiénes son los jueces del General Track?

\---

\# 13\. Fuentes

\- \*\*Oficiales:\*\* \`alephhackathon.crecimiento.build\` · Hacker's Manual · reglas en \`alephhackathon.notion.site/rules\` · Mentor's Directory · email de Crecimiento del 21/8 · documentos de los tracks WDK, Pears, QVAC y General · chat de Telegram del hackathon  
\- \*\*Docs de sponsors:\*\* \`docs.wdk.tether.io\` · \`docs.qvac.tether.io\` · \`docs.pears.com\` · \`github.com/holepunchto/hello-pear-bare\` · \`huggingface.co/qvac\`  
\- \*\*Historial de Aleph:\*\* páginas de DoraHacks de ediciones anteriores · cobertura de prensa de agosto 2024 (iProUP, Editora PI9) incluyendo la cita de la jurado  
\- \*\*Patrones de hackathon:\*\* transcripciones de charlas y vlogs de ganadores y no-ganadores (ETHGlobal Lisboa, TreeHacks 2026, Platanus Hack, hackathon de OpenAI en CDMX, YHack, showcase de MIT App Inventor, hackathon de Caffeine AI) · análisis de 8.200 proyectos de ETHGlobal (Simon Brown, jun-2026, dataset abierto)  
\- \*\*Marcado como no verificado:\*\* listados de ganadores de ediciones anteriores de Aleph que circulan en resúmenes de IA

\# Prompt para pasarle a otra IA

\> Copiá todo lo que está debajo de la línea y pegáselo a la otra IA, \*\*junto con el  
\> archivo \`aleph-dossier-completo.md\` adjunto\*\*. El prompt está escrito para que  
\> funcione con el dossier adjunto; sin él, la otra IA no tiene los datos.

\---

\#\# CONTEXTO

Sos un asesor de hackathons con experiencia real ganando bounties de sponsors, y  
un analista riguroso de información. Trabajás para un equipo que compite \*\*mañana\*\*  
y no tiene tiempo para respuestas genéricas.

\*\*Situación:\*\* equipo de hasta 4 personas, \*\*primera hackathon para todos\*\*,  
compitiendo en el \*\*Aleph Hackathon de Crecimiento, Buenos Aires, 22–23 de agosto  
de 2026\*\*. Tiempo real de construcción: \*\*24 horas exactas\*\*, de sábado 12:00 a  
domingo 12:00 (GMT-3). Juicio 100% asíncrono: no hay pitch en vivo, los jueces ven  
un \*\*video de 3 minutos en inglés\*\*, el repo y el README.

Te adjunto un dossier con toda la información verificada: los cuatro tracks con  
sus requisitos técnicos textuales, los criterios de evaluación, las reglas que  
descalifican, el historial del evento y los patrones extraídos de charlas y vlogs  
de ganadores y no-ganadores de otras hackathons. \*\*Leelo entero antes de responder.\*\*

\#\# LO QUE NECESITO

\#\#\# Parte 1 — Investigación propia (hacela primero, con búsquedas)

El dossier tiene un vacío marcado explícitamente: \*\*no se pudieron verificar los  
proyectos ganadores de ediciones anteriores del Aleph Hackathon.\*\* Circulan  
listados (AutoBounty, Piggy Quiz, Sportchain, Clever, TreasuryPilot, Consient,  
AlephRob, Elemgame, Zuma, TuCausa, ZKredit, Micdrop, Acepay, Regalito) que no  
aparecen en fuentes públicas verificables y que podrían estar parcial o totalmente  
alucinados por otro modelo.

Buscá y verificá:

1\. \*\*Ganadores reales de las ediciones anteriores de Aleph\*\* (ago-2024, dic-2024,  
   mar-2025, ago-2025, mar-2026). Buscá en DoraHacks las páginas de cada edición y  
   sus BUIDLs, en el Twitter/X de @alephhackathon y @crecimientoar, en el YouTube  
   de Crecimiento (las ceremonias de cierre están grabadas), y en prensa argentina  
   de tecnología. Para cada ganador que confirmes: qué problema resolvía, qué  
   tecnología del sponsor usaba y de qué forma, qué track ganó, y qué mostraba la  
   demo.  
2\. \*\*Proyectos ganadores en otras hackathons con estas mismas tecnologías\*\*:  
   WDK de Tether, QVAC de Tether, y Pear/Bare/Hyperswarm de Holepunch. Son  
   tecnologías nuevas y con poco historial, así que si no hay ganadores previos  
   decilo — eso en sí mismo es información valiosa (categoría virgen).  
3\. \*\*Cualquier cosa publicada después del 21 de agosto de 2026\*\* sobre esta  
   edición: tracks agregados, jueces anunciados, cambios de reglas.

\*\*Regla de rigor:\*\* marcá cada afirmación como VERIFICADA (con link) o NO  
VERIFICADA. Si no encontrás algo, decilo explícitamente en vez de rellenar. Un  
listado inventado de ganadores es peor que no tener listado, porque se usa para  
tomar decisiones. Si contradecís algo del dossier, mostrá la fuente.

\#\#\# Parte 2 — Lista de ideas de proyecto

Generá \*\*entre 12 y 20 ideas\*\*, distribuidas entre los cuatro tracks, con foco en  
las oportunidades de mejor ratio identificadas en el dossier (sección 4).

Para cada idea, dame exactamente esto:

\- \*\*Nombre\*\* y una línea de qué es  
\- \*\*Track y premio específico\*\* al que apunta  
\- \*\*El problema concreto y quién lo sufre\*\* (una persona nombrable, no "los usuarios")  
\- \*\*Los primeros 30 segundos del video\*\*: qué se ve exactamente en pantalla  
\- \*\*Cómo se cumple el requisito duro del sponsor\*\* (para Pears: que  
  \`pear install pear://\<key\>\` funcione y se demuestre una OTA real; para WDK:  
  integración significativa, no un wrapper de una llamada; para QVAC: toda la  
  inferencia local)  
\- \*\*Puntaje estimado 1–5 en cada uno de los cinco criterios\*\* (Technicality,  
  Originality, UI/UX/DX, Practicality, Presentation) \*\*y el total sobre 25\*\*  
\- \*\*Factibilidad en 24h\*\* para un equipo de primera vez: 1–5  
\- \*\*Cuántos equipos estimás que van a hacer algo parecido\*\*, y por qué  
\- \*\*El riesgo principal y su mitigación\*\*, incluyendo qué se corta primero si a  
  las 12 horas van atrasados  
\- \*\*Modelo de negocio en una frase\*\*: quién paga y por qué \*(la debilidad  
  histórica documentada del campo en este evento)\*

Después ordená las ideas por \*\*valor esperado\*\*, no por lo interesantes que son, y  
justificá el orden.

\#\#\# Parte 3 — Recomendación

Elegí \*\*una idea primaria y una de repliegue\*\*, y defendé la elección contra las  
dos alternativas más fuertes. Incluí un plan hora por hora de las 24 horas para la  
idea primaria, con el punto de decisión de "si a esta hora no tenemos X, cortamos Y".

\#\# CÓMO QUIERO QUE PIENSES

\- \*\*El ratio manda.\*\* Un premio de $500 con 8 competidores vale más que uno de  
  $2.000 con 200\. La fricción de entrada es lo que mueve el denominador. Priorizá  
  donde el gate técnico elimina competencia.  
\- \*\*Angosto y terminado le gana a amplio y roto.\*\* Con 24 horas y un equipo nuevo,  
  cualquier idea que necesite dos sistemas nuevos está muerta.  
\- \*\*Los cinco criterios pesan igual (1 a 5 cada uno).\*\* Un 4 parejo gana a dos 5 y  
  tres 2\. Penalizá las ideas que sacrifican UI/UX/DX.  
\- \*\*La demo primero, la arquitectura después.\*\* Diseñá desde lo que el juez ve en  
  los primeros 30 segundos hacia atrás.  
\- \*\*El sponsor es el juez de su propio bounty.\*\* Las ideas que hacen quedar bien a  
  la tecnología del sponsor ganan sobre las técnicamente superiores que la usan de  
  costado.  
\- \*\*Los tres tracks de Tether descartan sin revisión el código con errores  
  evidentes de IA\*\*: APIs inventadas, métodos que no existen, READMEs que  
  describen funciones inexistentes, demos que solo andan con una entrada. Prefiere  
  ideas con superficie de integración chica y verificable.  
\- \*\*No propongas nada que requiera trabajo previo.\*\* Todo el código se escribe  
  durante el evento.

\#\# FORMATO

Markdown. Las ideas en fichas, no en prosa. Sin preámbulos ni "excelente  
pregunta". Empezá por los hallazgos de la investigación de la Parte 1, porque si  
encontrás ganadores reales de ediciones anteriores eso debería cambiar las ideas  
que propongas.

Si algo del dossier te parece equivocado, decilo.

Hacelos mejor, armá la lista de las mejores ideas y a qué track están orientadas, un prompt para cada una de esas ideas en un paso a paos para crear la arquitectura del programa, posibles espectros en la realización de la idea, y todo lo necesario para ganar

\# Claude — Aug 21, 2026, 3:15 PM

Ahora sí, con los tracks concretos y los videos nuevos, puedo afinar las ideas mucho más. Dos cosas que cambian el ranking respecto a lo anterior, y las incorporo a todo.

\*\*File: ideas-y-arquitecturas.md\*\*

\`\`\`\`markdown  
\# Aleph Hackathon — Ideas, arquitecturas y prompts  
\#\#\# Documento operativo · 21 de agosto de 2026 · 24 horas de construcción

\---

\# 0\. Las dos decisiones estratégicas antes de las ideas

\#\# Decisión 1: secuenciar por gate, no por idea

Esta es la corrección más importante respecto a cualquier plan anterior.

Cada track tiene un \*\*gate binario\*\*: una condición que, si no se cumple, te saca  
de consideración por completo, sin importar lo bueno que sea el proyecto.

| Track | Gate binario | Cuánto tarda en resolverse |  
|---|---|---|  
| \*\*Pears\*\* | \`pear install pear://\<key\>\` tiene que funcionar desde otra máquina | 1–3 horas |  
| \*\*QVAC\*\* | Un modelo local corriendo OCR sobre una foto sucia real | 1–2 horas (+2,5 GB de descarga) |  
| \*\*WDK\*\* | Una transacción real ejecutada por la CLI en una red de prueba | 1–2 horas |

\*\*La secuencia correcta es: pasar el gate con lo más trivial posible, verificarlo  
desde una segunda máquina, y recién ahí construir el producto.\*\*

Suena obvio y casi nadie lo hace, porque la tentación es diseñar el producto lindo  
primero y dejar el deploy para el final. Ese es exactamente el equipo que a las  
10 de la mañana del domingo descubre que el link \`pear://\` no instala.

Concretamente, para Pears: hora 1 a 3, deployás un \`hello-pear-bare\` que solo  
imprime "hola", lo instalás desde la notebook de otro integrante, publicás una  
actualización que cambie el texto y verificás que llegue sola. \*\*Con eso ya estás  
adentro del track.\*\* Todo lo que hagas después es upside. Si algo se pudre a las  
4 de la mañana, todavía tenés una entrada válida.

\#\# Decisión 2: el "hueco" está donde el sponsor pidió trabajo aburrido

Los sponsors dijeron muy claramente qué quieren. Donde señalaron con el dedo un  
caso de uso concreto (conciliación de facturas en QVAC), van a ir todos. Donde  
pidieron algo que \*\*no se puede simular\*\* —evidencia experimental, un deploy P2P  
que se verifica ejecutándolo— van a ir pocos, porque requiere trabajo real y no  
se puede fingir con un asistente de IA.

Ese es el filtro que ellos mismos están aplicando, y dicen textualmente que  
descartan sin revisión las entregas con errores evidentes de IA. \*\*Elegí ideas  
cuya evidencia sea verificable ejecutándola.\*\*

\---

\# 1\. Ranking general

Ordenadas por valor esperado, no por lo interesantes que son.

| \# | Idea | Track | 24h | Competencia | ★ |  
|---|---|---|---|---|---|  
| \*\*1\*\* | \*\*Llave\*\* — secretos entre máquinas sin servidor | Pears | Alta | Muy baja | ★★★★★ |  
| \*\*2\*\* | \*\*Banco de pruebas de fiabilidad\*\* | QVAC P2 | Media | Baja | ★★★★★ |  
| \*\*3\*\* | \*\*Vecino\*\* — archivos y chat sin internet | Pears | Media | Muy baja | ★★★★☆ |  
| \*\*4\*\* | \*\*Portero\*\* — agente con billetera que sabe decir que no | WDK P1 | Media | Media | ★★★★☆ |  
| \*\*5\*\* | \*\*Conciliador con datos sucios\*\* | QVAC P1 | Media | \*\*Alta\*\* | ★★★★☆ |  
| \*\*6\*\* | \*\*Extracto → castellano\*\* | QVAC P1 | Media | Baja | ★★★★☆ |  
| \*\*7\*\* | \*\*Nómina desde CSV con recibos\*\* | WDK P1 | Baja | Media | ★★★☆☆ |  
| \*\*8\*\* | \*\*Duelo\*\* — juego de terminal con parche en vivo | Pears | Media | Baja | ★★★☆☆ |  
| \*\*9\*\* | \*\*Primer envío sin gas\*\* | WDK P2 | Alta | Baja | ★★★☆☆ |  
| — | \*\*Vault Guardian\*\* | QVAC extra | 45 min | — | apuesta paralela |

\*\*Recomendación:\*\* idea 1 como primaria, idea 3 como repliegue dentro del mismo  
track (comparten el 80% del andamiaje), Vault Guardian en paralelo el sábado a la  
tarde. Si el equipo se inclina fuerte por IA en vez de P2P, entonces idea 2 como  
primaria con idea 5 adentro.

\---

\# 2\. Cómo usar los prompts de este documento

Cada idea trae un prompt listo para pegar en Claude Code o el asistente que usen.  
Están escritos con tres propiedades deliberadas:

1\. \*\*Anclan al asistente en la documentación real.\*\* Los tres tracks avisan que  
   los modelos inventan métodos que no existen. WDK y QVAC publican \*Agent Skills\*  
   y un \*MCP Toolkit\* justamente para esto. Los prompts empiezan mandando a leer.  
2\. \*\*Ordenan por riesgo, no por prolijidad.\*\* Primero el gate, después el producto.  
3\. \*\*Prohíben explícitamente el sobre-diseño.\*\* WDK dice que sus integraciones son  
   pocas líneas y que los modelos las complican de más. Si la integración con el  
   SDK del sponsor tiene 300 líneas, algo se rompió.

\*\*Antes de pegar cualquiera de estos prompts, hacé esto una sola vez:\*\*

\`\`\`  
Contexto permanente del proyecto (guardalo en CLAUDE.md o el equivalente):

\- Competimos en Aleph Hackathon, 24 horas, cierre domingo 12:00 GMT-3.  
\- Todo el código se escribe durante el evento. No reutilizamos nada previo.  
\- El sponsor DESCARTA SIN REVISAR entregas con APIs inventadas, métodos que no  
  existen en el SDK, READMEs que describen funciones inexistentes, o demos que  
  solo funcionan con una entrada específica.  
\- Por lo tanto: si no estás seguro de que un método existe, buscalo en la doc  
  antes de escribirlo. Si no lo encontrás, decímelo en vez de inventarlo.  
\- Preferí siempre la solución de menos líneas. La integración con el SDK del  
  sponsor debe ser mínima y verificable.  
\- Después de cada paso, corré el código. No avances si el paso anterior no corre.  
\- No escribas features que no te pedí. No agregues abstracciones "por si acaso".  
\`\`\`

\---

\# 3\. PEARS — el track de mejor ratio

\*\*Gate:\*\* los jueces instalan tu herramienta con \`pear install pear://\<key\>\` igual  
que cualquier usuario. Si el comando no funciona, la entrada no se considera.  
\*\*Juez:\*\* dmc, creador de Pear.  
\*\*Premio:\*\* 1° $1.000 · 2° $500.

Por qué este track tiene el mejor ratio: el gate es binario, verificable y difícil  
por una razón específica — \*\*Pear y Bare no son Node.js, y los modelos de IA  
asumen con total confianza que sí lo son.\*\* Los propios docs avisan que hay que  
esperar APIs de Node inventadas, nombres de módulos incorrectos y flags  
imaginarios. Una parte grande de los que se anoten va a fallar el gate.

\---

\#\# 💡 Idea 1 — \*\*Llave\*\*  
\#\#\# Mandar secretos entre dos máquinas sin que pasen por ningún servidor

\*\*Qué es:\*\* una CLI que manda un archivo \`.env\`, una clave de API o cualquier  
secreto directo de una máquina a otra. Sin nube, sin Slack, sin pastebin, sin  
cuenta. Se genera un código de un solo uso, el otro lo pega, el secreto viaja  
cifrado punta a punta por la red de pares y el canal muere.

\*\*El problema y quién lo sufre:\*\* todo equipo de desarrollo pasa credenciales por  
Slack, WhatsApp o mail. Quedan en el historial de una empresa para siempre. En  
este mismo hackathon, mañana a las 13:00, alguien de tu equipo va a pegar una  
clave de API en el chat grupal. Es un problema universal, aburrido, real, y con  
una solución mala instalada en todos lados.

\*\*Por qué P2P no es decorativo acá:\*\* es el único caso donde "no hay servidor" no  
es una característica técnica sino \*el producto entero\*. Cualquier alternativa  
con servidor tiene el problema de confiar en el servidor. Es la respuesta perfecta  
a la pregunta de si la tecnología es esencial.

\*\*Los primeros 30 segundos del video:\*\*  
\`\`\`  
Pantalla dividida. Dos terminales.

Izquierda:  $ llave send .env  
            → código: pino-42-rojo  
            → esperando...

Derecha:    $ llave get pino-42-rojo  
            → .env recibido (847 bytes)

Izquierda:  → entregado. canal cerrado.  
            $ llave get pino-42-rojo  
            → ese código ya se usó.  
\`\`\`  
Doce segundos. No hace falta explicar nada. Cualquiera entiende qué pasó.

\*\*Rama:\*\* \`variant/daemon\` — es un comando de un solo uso y de corta duración, la  
herramienta sale mientras el demonio se actualiza en segundo plano. Elegir bien la  
rama es explícitamente parte de hacerlo bien, y el juez es quien diseñó las ramas.

\*\*Puntaje estimado:\*\* Technicality 4 · Originality 4 · UI/UX/DX 5 · Practicality 5  
· Presentation 5 → \*\*23/25\*\*

\*\*Riesgo principal:\*\* el error \`INVALID\_URL\` de la plantilla, que aparece hasta  
que reemplacés el link de upgrade placeholder por uno real de \`pear touch\`. Y en  
la variante \`daemon\` ese error va a \`\<storage\>/updates.log\`, no a la terminal.  
Los docs lo avisan; ahí es donde se traba todo el mundo.

\#\#\# Prompt de arquitectura

\`\`\`  
Vamos a construir "llave": una CLI peer-to-peer para mandar secretos entre dos  
máquinas sin servidor, desplegada con Pear de Holepunch.

REGLA CRÍTICA: Pear y Bare NO son Node.js. Muchas APIs de Node no existen. Antes  
de usar cualquier módulo, verificá que exista en el catálogo de módulos Bare  
(docs.pears.com/reference/modules/bare-modules) o Pear  
(docs.pears.com/reference/modules/pear-modules). Si necesitás algo que no está  
ahí, decímelo en vez de asumir que anda.

PASO 1 — El gate, antes que nada.  
Cloná github.com/holepunchto/hello-pear-bare, cambiá a la rama variant/daemon,  
instalá dependencias. Corré \`pear touch\` para generar el link de upgrade y pegalo  
en el campo "upgrade" del package.json (la app no arranca sin esto). Verificá con  
\`npm start\` que corre en modo dev. Después desplegá y dame el link pear://.  
No escribas nada del producto todavía. Cuando esto funcione, pará y avisame:  
voy a instalarlo desde otra máquina antes de seguir.

PASO 2 — Transporte.  
Usando Hyperswarm, implementá:  
\- \`llave send \<archivo\>\`: genera un código legible de tres palabras (usá una  
  lista de palabras corta y embebida, no una dependencia), deriva de él un topic  
  de Hyperswarm, se anuncia y queda esperando un peer.  
\- \`llave get \<codigo\>\`: deriva el mismo topic, se conecta, recibe el archivo,  
  lo escribe en disco.  
La conexión de Hyperswarm ya viene cifrada; no implementes criptografía propia.  
Probalo con dos terminales en la misma máquina antes de seguir.

PASO 3 — Un solo uso.  
Una vez transferido, el emisor cierra el topic y guarda el código en una lista  
local de códigos usados. Un segundo \`get\` con el mismo código tiene que fallar  
con un mensaje claro: "ese código ya se usó". Agregá un timeout de 10 minutos.

PASO 4 — DX. Este paso vale un quinto de la nota, no lo saltees.  
\- \`llave \--help\` claro y corto.  
\- Mensajes de error que digan qué pasó y qué hacer, nunca un stack trace.  
\- Barra de progreso en transferencias grandes.  
\- Salida con colores solo si la terminal los soporta.  
\- \`llave send \--text\` para pegar un secreto directo sin archivo.

PASO 5 — La actualización OTA.  
Publicá una versión nueva que agregue un comando visible (por ejemplo  
\`llave verify\`, que muestre el hash del último archivo recibido). Verificá que  
la actualización llegue sola a una copia ya instalada. Grabá esto: es requisito  
de entrega.

PASO 6 — Binarios y README.  
\`npm run make\` para las plataformas que podamos. README con: qué es, de qué rama  
partimos y por qué (daemon \= comando de un solo uso y corta duración), cómo  
instalar con pear install, para qué plataformas compilamos, y el link pear://.

NO HAGAS: interfaz web, cuentas de usuario, base de datos, criptografía propia,  
soporte de carpetas enteras, ni ninguna feature que no esté en estos seis pasos.  
\`\`\`

\#\#\# Espectro de realización

| Escenario | Qué pasó | Qué entregás |  
|---|---|---|  
| \*\*A — todo sale\*\* | Los 6 pasos | \`llave\` completa, OTA demostrada, binarios multiplataforma. Apunta al 1° puesto |  
| \*\*B — a mitad de camino\*\* | Pasos 1–4, sin OTA lujosa | Sigue siendo entrada válida y fuerte. La OTA mínima del paso 1 ya cuenta |  
| \*\*C — se rompe el transporte\*\* | Hyperswarm no conecta entre redes distintas | Demostrás en LAN o entre dos terminales de la misma máquina. Lo decís en el video como limitación conocida, con el plan de cómo se resuelve. La rúbrica de \*Technicality\* premia explícitamente tener un plan claro |  
| \*\*D — desastre\*\* | Nada del producto anda | Entregás la herramienta trivial del paso 1 con un README honesto. Es una entrada válida. Cero es no entregar |

\*\*Qué se corta primero, en orden:\*\* binarios para múltiples plataformas → barra de  
progreso → \`--text\` → códigos de un solo uso. \*\*Lo último que se corta es la  
instalación por \`pear install\` y la OTA\*\*, porque son el gate.

\---

\#\# 💡 Idea 3 — \*\*Vecino\*\*  
\#\#\# Archivos y chat entre las máquinas de la sala, sin internet

\*\*Qué es:\*\* una CLI que descubre otras máquinas cerca y permite mandarse archivos  
y mensajes. Funciona por Hyperswarm cuando hay red, y por Bluetooth de baja  
energía cuando no hay nada.

\*\*El momento de la demo, que es todo:\*\* apagás el wifi en cámara y seguís mandando  
un archivo. Los propios docs de Pear cuentan que en una sala llena de hackers en  
Buenos Aires esa demo causó sensación. \*\*El juez ya vio esa demo y le gustó.\*\*

\*\*Por qué el problema es real para quien juzga:\*\* el wifi de los venues de  
hackathon se satura siempre. Es el problema del propio evento donde estás  
compitiendo, resuelto en vivo, en la sala.

\*\*Puntaje estimado:\*\* Technicality 5 · Originality 5 · UI/UX/DX 4 · Practicality 3  
· Presentation 5 → \*\*22/25\*\*

\*\*Riesgo:\*\* BLE-Swarm es experimental y los propios docs lo llaman tosco.  
\*\*Mitigación no negociable: Hyperswarm por defecto, BLE como modo \`--offline\`.\*\*  
Así nunca tenés una demo muerta: si el Bluetooth falla en cámara, mostrás el modo  
normal y explicás el experimental.

\#\#\# Prompt de arquitectura

\`\`\`  
Vamos a construir "vecino": una CLI peer-to-peer para compartir archivos y chatear  
entre máquinas de una misma sala, con Pear de Holepunch. Funciona con red normal  
y también sin internet, por Bluetooth de baja energía.

REGLA CRÍTICA: Pear y Bare NO son Node.js. Verificá cada módulo contra el catálogo  
real en docs.pears.com antes de usarlo. Si algo no existe ahí, decímelo.

ARQUITECTURA EN DOS CAPAS. Esto es lo más importante del diseño: el transporte es  
intercambiable y el producto funciona igual con cualquiera de los dos.  
  capa transporte: HyperswarmTransport | BleTransport  
  capa producto:   descubrimiento de pares, envío de archivos, chat  
El producto NUNCA habla directo con Hyperswarm ni con BLE, solo con una interfaz  
común de tres métodos: anunciar(sala), alConectar(cb), enviar(peer, datos).

PASO 1 — El gate.  
hello-pear-bare, rama main (es un proceso de larga duración con interfaz de  
terminal, así que el updater va en un worker thread). \`pear touch\`, pegar el link  
de upgrade en package.json, verificar con npm start, desplegar, darme el link  
pear://. Pará acá: lo instalo desde otra máquina antes de seguir.

PASO 2 — HyperswarmTransport.  
Implementá la interfaz de transporte sobre Hyperswarm. El topic se deriva del  
nombre de sala (por defecto "aleph"). Al conectarse un peer, mostrarlo en la lista.

PASO 3 — El producto, sobre la interfaz, sin tocar Hyperswarm.  
\- \`vecino\` sin argumentos: interfaz de terminal con la lista de vecinos conectados.  
\- \`vecino send \<archivo\>\`: elegís un vecino de la lista y se lo mandás.  
\- chat de texto en la misma pantalla.  
Probalo entre dos máquinas en la misma red antes de seguir.

PASO 4 — BleTransport, detrás de la bandera \--offline.  
Basándote en github.com/mafintosh/ble-swarm, implementá la misma interfaz de tres  
métodos. Es experimental: si no funciona en 3 horas, lo dejamos como está y  
seguimos con Hyperswarm. NO refactorices el producto para acomodar BLE; si no  
entra en la interfaz de tres métodos, el problema es la interfaz, avisame.

PASO 5 — DX y la demo.  
Un indicador visible arriba que diga por qué transporte estás conectado:  
\[red\] o \[bluetooth\]. Que sea grande y legible en video. Cuando se cae la red y  
\--offline está activo, que el indicador cambie solo. Ese cambio EN CÁMARA es la  
demo entera.

PASO 6 — OTA, binarios, README indicando la rama y por qué.

NO HAGAS: historial persistente, cuentas, cifrado propio, transferencia de  
carpetas, interfaz web.  
\`\`\`

\#\#\# Espectro

| Escenario | Qué entregás |  
|---|---|  
| \*\*A\*\* | Los dos transportes, cambio en vivo al apagar el wifi. Demo estelar |  
| \*\*B\*\* | Solo Hyperswarm, BLE explicado como trabajo siguiente con la interfaz ya lista para recibirlo. Sigue siendo fuerte: mostrás que la arquitectura lo contempla |  
| \*\*C\*\* | Solo chat, sin archivos. Válido |  
| \*\*D\*\* | La herramienta del paso 1 con README honesto |

\---

\#\# 💡 Idea 8 — \*\*Duelo\*\*  
\#\#\# Juego de terminal donde el balanceo llega mientras estás jugando

\*\*Qué es:\*\* un juego de terminal para dos jugadores por Hyperswarm. Lo interesante  
no es el juego: es que publicás un cambio de balance o un nivel nuevo y \*\*le llega  
al jugador mientras sigue jugando\*\*.

\*\*Por qué está en la lista:\*\* es la única forma de demostrar la actualización OTA  
de un modo que ninguna otra categoría de proyecto logra. Los docs de Pear lo  
sugieren explícitamente. Y el ángulo serio es real: distribución y live-ops sin  
app store, sin revisión, sin backend.

\*\*Puntaje estimado:\*\* Technicality 4 · Originality 4 · UI/UX/DX 4 · Practicality 2  
· Presentation 5 → \*\*19/25\*\*. La \*Practicality\* es el techo.

\*\*Cuándo elegirla:\*\* si el equipo tiene alguien fuerte en interfaces de terminal y  
quieren algo divertido de mostrar. El nombre y el gancho importan: un equipo de  
TreeHacks le puso omnom a su robot y le colgó la comida de una soga, y ellos  
mismos dijeron que ese detalle podía ser el factor diferenciador.

\*(Prompt: el mismo esqueleto de Vecino, cambiando el paso 3 por la lógica del  
juego y agregando un archivo \`balance.json\` que se lee al inicio de cada partida  
para que el parche OTA tenga efecto visible sin reiniciar.)\*

\---

\# 4\. QVAC — IA local

\*\*Gate:\*\* toda la inferencia corre localmente. Usar el servidor HTTP compatible  
con OpenAI cuenta; llamar a una API en la nube no.  
\*\*Jueza:\*\* Raquel Carrasco, DevRel de Tether.  
\*\*Premio:\*\* 1° $1.000 (agentes de operaciones) · 2° $500 (fiabilidad) · $500 del  
Vault Guardian a repartir.

\*\*Preparativo obligatorio de hoy:\*\* descargar el modelo son \~2,5 GB para un 4B, y  
un 4B en Q4 pide \~4 GB de RAM. Bajarlo mañana al mediodía es regalar una hora.

\---

\#\# 💡 Idea 2 — \*\*Banco de pruebas de fiabilidad\*\*  
\#\#\# El hueco más grande del evento

\*\*Qué es:\*\* un agente local que encadena varias herramientas para una tarea  
concreta, \*\*más un harness que corre la misma tarea N veces y reporta la tasa de  
éxito\*\*, los modos de fallo, y cuánto aporta cada capa de mitigación.

\*\*Por qué es el hueco:\*\* el sponsor pidió textualmente \*"pruebas, no impresiones"\*.  
Dijo que hay que correr la tarea N veces y mostrar la tasa de éxito, y que un  
proyecto honesto sobre dónde falla vale más que uno que muestra una sola corrida  
impecable. \*\*Ningún equipo apurado hace evaluación con N corridas.\*\* Y encima es  
lo más difícil de simular con un asistente de IA, que es justo lo que están  
filtrando.

\*\*Los primeros 30 segundos del video:\*\* una tabla.

\`\`\`  
tarea: extraer 6 campos de un remito y cruzarlos contra el extracto  
modelo: Qwen 4B Q4 · local · 47 corridas por configuración

  configuración                          éxito     falla silenciosa  
  ────────────────────────────────────────────────────────────────  
  base                                    41%           23%  
  \+ salida estructurada forzada           68%            9%  
  \+ reintento con el error de vuelta      81%            6%  
  \+ auto-chequeo antes de responder       89%            2%

  3 modos de fallo que NO pudimos arreglar → ver README  
\`\`\`

Esa tabla es un argumento que nadie más va a poder mostrar, y "falla silenciosa"  
—responder con confianza algo incorrecto— es la métrica que más le importa a  
quien evalúa modelos chicos.

\*\*Puntaje estimado:\*\* Technicality 5 · Originality 4 · UI/UX/DX 3 · Practicality 4  
· Presentation 5 → \*\*21/25\*\*. \*\*UI/UX es el punto débil: media hora en un reporte  
HTML lo sube a 4.\*\*

\#\#\# Prompt de arquitectura

\`\`\`  
Vamos a construir un agente local con QVAC de Tether MÁS un harness de fiabilidad  
que mida cuán confiable es. El harness no es una herramienta auxiliar: es la mitad  
del producto y la mitad de la demo.

REGLA CRÍTICA: toda la inferencia corre local con @qvac/sdk. Ninguna llamada a API  
en la nube. Antes de usar cualquier método del SDK, verificalo contra  
docs.qvac.tether.io/reference/api/. Si no lo encontrás ahí, decímelo en vez de  
inventarlo. La orquestación de modelos chicos es fácil de simular y difícil de  
hacer bien; no me des código que parezca que funciona.

PASO 1 — El gate.  
Instalá el SDK, cargá un modelo de 4B en Q4 y corré una generación de texto y un  
OCR sobre UNA imagen sucia real (foto de un remito sacada con celular). Decime  
qué modelo, qué cuantización, cuánta RAM usa y cuánto tarda. Si no entra en la  
RAM disponible, bajamos a un modelo más chico ahora, no después.

PASO 2 — La tarea. Una sola, concreta, encadenando 3 o 4 herramientas.  
  OCR sobre la imagen → extracción de campos estructurados → cálculo →  
  búsqueda en un archivo local → respuesta  
Implementala de la forma más simple posible. Sin capas de mitigación todavía:  
queremos ver cuán mal anda la versión base.

PASO 3 — El harness. Este es el corazón.  
Un módulo que:  
\- corre la misma tarea N veces sobre el mismo conjunto de entradas  
\- clasifica cada corrida en: correcta / incorrecta declarada / INCORRECTA  
  SILENCIOSA (respondió con confianza algo mal) / se colgó  
\- guarda cada corrida cruda para poder auditarla después  
\- calcula tasas y las escribe en un JSON  
La distinción entre "incorrecta declarada" e "incorrecta silenciosa" es la métrica  
más importante del proyecto. No la colapses en una sola.

PASO 4 — Las capas de mitigación, una por una, midiendo entre cada una.  
  a) salida estructurada forzada  
  b) reintento devolviéndole al modelo su propio error de validación  
  c) paso de auto-chequeo antes de responder  
  d) abstención: si la confianza es baja, que diga "no sé" en vez de inventar  
Después de CADA capa, corré el harness completo y anotá el número. Necesito la  
tabla comparativa, no solo el resultado final.

PASO 5 — El reporte. Vale un quinto de la nota.  
Un HTML estático generado desde el JSON: la tabla comparativa, un gráfico de  
barras, y la posibilidad de hacer clic en una corrida fallida para ver la traza  
completa. Sin frameworks, sin build. Que se vea bien en un video.

PASO 6 — README con: permalinks de GitHub a las líneas exactas donde ocurre la  
inferencia (es lo primero que miran), modelo, cuantización, máquina, latencia,  
instrucciones desde un clon limpio, y una sección honesta de "modos de fallo que  
no pudimos resolver".

NO HAGAS: interfaz de usuario para la tarea, generación de imágenes o video (el  
sponsor dice explícitamente que no puntúan bien), soporte multi-modelo, ni  
ninguna capa de mitigación que no midas.  
\`\`\`

\#\#\# Espectro

| Escenario | Qué entregás |  
|---|---|  
| \*\*A\*\* | Tarea \+ harness \+ 4 capas medidas \+ reporte HTML. Apunta al 2° premio con fuerza y toca el 1° |  
| \*\*B\*\* | Tarea \+ harness \+ 2 capas | Sigue siendo la única entrega con evidencia experimental. Fuerte |  
| \*\*C\*\* | El modelo no entra en RAM | Bajás a un modelo más chico. La tabla queda \*más\* interesante, porque los modos de fallo son más visibles. No es un fracaso: es el tema del track |  
| \*\*D\*\* | El OCR no sirve sobre datos sucios | Cambiás la tarea a una de solo texto (contrato → calendario de pagos). El harness es idéntico. \*\*Por eso el harness va antes que la tarea en importancia\*\* |

\---

\#\# 💡 Idea 5 — \*\*Conciliador con datos sucios\*\*

\*\*Qué es:\*\* cargás fotos de facturas (A, B, C), remitos manuscritos y un extracto  
bancario. El agente hace OCR local, extrae campos, cruza contra el extracto y  
marca discrepancias con una explicación de una línea verificable en cinco segundos.

\*\*Advertencia:\*\* este es el caso de uso que el sponsor señaló con el dedo y dijo  
\*"si lo dominás, sos competitivo"\*. \*\*Todos van a ir para acá.\*\* No ganás por la  
idea; ganás por una sola cosa:

\*\*El diferenciador:\*\* los otros van a demostrar con PDFs limpios. Ustedes usan  
fotos sacadas con el celular — torcidas, con poca luz, arrugadas, con un sello  
encima, con un remito escrito a mano. El sponsor dijo textualmente que lo que hace  
fuerte a una entrega es que funcione con datos reales y complejos, \*\*no con un PDF  
prolijo elegido a mano\*\*. Eso significa que la tarea número uno no es programar:  
es \*\*juntar 20 documentos horribles de verdad esta noche\*\*. Pedile a tu familia  
facturas viejas, sacales fotos malas a propósito.

\*\*El segundo diferenciador:\*\* que muestre incertidumbre. Cuando el modelo no está  
seguro, que lo diga y lo mande a revisión humana. Está explícitamente premiado:  
\*un agente que señala incertidumbre es mejor que uno que predice un número con  
demasiada confianza.\*

\*\*Modelo de negocio en una frase:\*\* un contador no puede subir la facturación de  
sus clientes a una API de terceros; local es la única opción legal y por eso se  
paga.

\*\*Puntaje:\*\* Technicality 4 · Originality 3 · UI/UX/DX 4 · Practicality 5 ·  
Presentation 4 → \*\*20/25\*\*

\*\*La jugada superior:\*\* construí esta idea y \*\*medila con el harness de la idea 2\*\*.  
Un proyecto, los dos premios del track. Es el mayor valor esperado de QVAC si el  
equipo rinde.

\---

\#\# 💡 Idea 6 — \*\*Extracto → castellano\*\*

\*\*Qué es:\*\* cargás el extracto bancario o el resumen de tarjeta del mes y el  
agente local responde en lenguaje llano: qué cambió respecto al mes pasado y por  
qué. Categoriza comercios, detecta cargos duplicados, marca anomalías.

\*\*Por qué está acá:\*\* el sponsor lo lista como dirección válida ("resúmenes en  
lenguaje sencillo sobre qué cambió este mes y por qué") pero \*\*no lo señaló como  
el caso principal\*\*, así que va a estar mucho menos poblado que las facturas.  
Y el argumento de privacidad es todavía más fuerte: nadie quiere subir su resumen  
de tarjeta a una nube.

\*\*Los primeros 30 segundos:\*\* arrastrás un PDF de resumen y aparecen tres frases:  
\*"gastaste 34% más en delivery que en julio"\*, \*"hay dos cargos idénticos de  
$8.400 el 12 y el 13"\*, \*"apareció una suscripción nueva de $2.100"\*. Sin  
configurar nada, sin subir nada.

\*\*Puntaje:\*\* Technicality 3 · Originality 4 · UI/UX/DX 4 · Practicality 5 ·  
Presentation 5 → \*\*21/25\*\*

\*(Prompt: el de la idea 2, reemplazando el paso 2 por: parseo del extracto →  
categorización con el modelo local → comparación mes contra mes → detección de  
duplicados por regla, no por modelo. Regla importante: \*\*lo determinístico se  
resuelve con código, no con el modelo\*\*. Los duplicados se detectan comparando  
montos y fechas, no preguntándole al LLM. Eso sube la fiabilidad y es exactamente  
el tipo de decisión de ingeniería que puntúa en Technicality.)\*

\---

\#\# 🛡️ Vault Guardian — apuesta paralela, 45 minutos

$500 a repartir entre todos los que lo superen. \*\*Independiente de tu proyecto.\*\*  
Es un juego de prompt injection contra una IA local que guarda un secreto y tiene  
una billetera WDK con fondos reales. La implementación de referencia se comparte  
durante el evento.

\*\*Detalle económico que casi nadie va a calcular:\*\* el pozo se divide entre todos  
los que lo logren. Cuanto antes lo intentes, menos gente lo logró. Asigná a una  
persona el sábado a la tarde, temprano, 45 minutos, mientras los demás codean.  
No lo dejes para el domingo.

\---

\# 5\. WDK — billeteras y pagos

\*\*Gate:\*\* \`@tetherto/wdk\` como dependencia principal. Para la CLI, el paquete es  
\`@tetherto/wdk-cli\` \*\*con scope\*\* — el \`wdk-cli\` sin scope en npm es otro proyecto  
distinto. Node.js 22.18.0 o posterior. Billetera de prueba con fondos limitados,  
nunca una personal: los paquetes están en beta.  
\*\*Jueza:\*\* Raquel Carrasco.  
\*\*Premio:\*\* 1° $1.000 (CLI/MCP) · 2° $500 (gasless).

\*\*El párrafo que más les importa siendo principiantes:\*\* el sponsor dice que no  
hace falta escribir ni un solo contrato inteligente para ganar esta categoría.  
WDK maneja claves, direcciones, saldos y transacciones.

\---

\#\# 💡 Idea 4 — \*\*Portero\*\*  
\#\#\# Un agente con billetera que sabe decir que no

\*\*Qué es:\*\* un agente conectado por MCP que puede consultar saldos, cotizar y  
enviar USD₮, pero \*\*bajo un conjunto de reglas que define el usuario en un archivo  
legible\*\*: tope por transacción, tope diario, lista de destinatarios permitidos,  
confirmación obligatoria por encima de cierto monto, modo simulación.

\*\*El momento de la demo, que es todo:\*\*

\`\`\`  
\> mandale 500 USDT a 0x9f3a...  
  ⛔ bloqueado por: destinatario no está en la lista de permitidos  
     (regla 3 de politica.yaml, línea 14\)

\> mandale 20 USDT a proveedor-A  
  ✓ dentro del tope por transacción (50)  
  ✓ dentro del tope diario (restante: 130\)  
  ✓ destinatario permitido  
  → enviado. hash: 0x4b2...  
\`\`\`

\*\*Por qué gana:\*\* el sponsor dice que \*"se valorará positivamente un modelo de  
seguridad bien pensado"\*. Y ese \*\*"no" en cámara es más memorable que cualquier  
transferencia exitosa\*\*, porque todo el mundo entiende inmediatamente por qué  
importa. Es la demo que responde sola a la objeción obvia de darle plata a un  
agente.

\*\*Puntaje:\*\* Technicality 4 · Originality 4 · UI/UX/DX 5 · Practicality 5 ·  
Presentation 5 → \*\*23/25\*\*

\#\#\# Prompt de arquitectura

\`\`\`  
Vamos a construir "portero": una capa de política de seguridad para un agente de  
IA con billetera, usando el WDK de Tether y su servidor MCP.

REGLAS CRÍTICAS:  
\- El paquete es @tetherto/wdk-cli CON SCOPE. El wdk-cli sin scope en npm es otro  
  proyecto y no sirve.  
\- Node.js 22.18.0 o posterior.  
\- Billetera de prueba con fondos mínimos. Nunca una personal.  
\- Las integraciones de WDK son POCAS LÍNEAS. Si tu integración crece mucho,  
  probablemente estés inventando métodos. Verificá todo contra  
  docs.wdk.tether.io/cli/api-reference/ antes de escribirlo.  
\- Leé docs.wdk.tether.io/cli/reference/security-model/ antes de desbloquear una  
  billetera con fondos.

PASO 1 — El gate.  
Instalá la CLI, creá una billetera de prueba, derivá una dirección, conseguí  
fondos de testnet y ejecutá UNA transferencia real desde la línea de comandos.  
Nada de código propio todavía. Cuando funcione, avisame.

PASO 2 — MCP.  
Conectá wdk mcp a nuestro cliente MCP y verificá que el agente puede consultar  
saldo. Solo lectura por ahora.

PASO 3 — El motor de políticas. Este es el producto, no la billetera.  
Un archivo politica.yaml legible por humanos con: tope por transacción, tope  
diario, lista de destinatarios permitidos con alias, umbral de confirmación  
obligatoria, y modo simulación global.  
Un módulo que recibe una operación propuesta y devuelve  
{permitido: bool, reglas\_evaluadas: \[...\], motivo: string}.  
El motor NO habla con WDK. Es una función pura sobre datos. Eso lo hace testeable  
y es lo que quiero mostrar.

PASO 4 — Conectar los dos.  
El agente propone una operación → el motor la evalúa → si pasa, se ejecuta por  
WDK; si no, se rechaza citando la regla exacta y su número de línea.  
Registro de auditoría en JSON de TODA operación propuesta, permitida o no.

PASO 5 — DX. Vale un quinto de la nota.  
\- La salida de una operación bloqueada tiene que ser hermosa y clara en la  
  terminal: qué regla, qué línea, qué valor la violó.  
\- \`portero simular\` corre todo sin ejecutar nada.  
\- \`portero log\` muestra el historial de decisiones.  
\- Mensajes de error accionables.

PASO 6 — Pruebas del motor de políticas.  
Como es una función pura, escribí una tabla de casos: monto justo en el límite,  
un centavo por encima, destinatario con alias, tope diario acumulado, etc.  
Mostrarlas corriendo en el video sube Technicality.

PASO 7 — README con permalinks de GitHub a las líneas exactas de integración WDK  
(es lo primero que miran), lista de paquetes y versiones, red y token usados,  
.env.example, instrucciones desde clon limpio.

NO HAGAS: interfaz web, contratos inteligentes, criptografía propia, soporte  
multi-cadena, ni features fuera de estos siete pasos.  
\`\`\`

\#\#\# Espectro

| Escenario | Qué entregás |  
|---|---|  
| \*\*A\*\* | Los 7 pasos, con la tabla de casos corriendo |  
| \*\*B\*\* | Sin registro de auditoría ni \`portero log\`. Sigue completa la demo central |  
| \*\*C\*\* | El MCP no conecta bien | El motor de políticas anda igual sobre la CLI directo. La demo del "no" se mantiene, que es lo único imprescindible |  
| \*\*D\*\* | No conseguís fondos de testnet | Modo simulación puro, honesto en el video. Débil, pero entregable |

\---

\#\# 💡 Idea 7 — \*\*Nómina desde CSV con recibos\*\*

\*\*Qué es:\*\* leés un CSV de colaboradores o de bounties, previsualizás cada  
transferencia, ejecutás por lotes, y generás un registro de recibos con la salida  
\`--json\`.

\*\*Por qué está en la lista:\*\* es literalmente lo que el sponsor sugiere, y es  
\*\*el proyecto con menos formas de salir mal en 24 horas\*\*. Si el equipo está  
inseguro o alguien se enferma, esto se termina.

\*\*El riesgo es de originalidad\*\*, no de ejecución. Diferenciá con el caso de uso  
concreto: pagar a colaboradores en LATAM que no tienen cuenta bancaria en dólares.  
Eso convierte una utilidad genérica en un producto con usuario nombrable.

\*\*Puntaje:\*\* Technicality 3 · Originality 2 · UI/UX/DX 4 · Practicality 5 ·  
Presentation 4 → \*\*18/25\*\*. Es el piso seguro, no el techo.

\---

\#\# 💡 Idea 9 — \*\*Primer envío sin gas\*\* (Premio 2 de WDK)

\*\*Qué es:\*\* el usuario llega con la billetera vacía, recibe USD₮ y puede enviarlo  
en el mismo minuto, sin comprar SOL ni ETH primero, viendo la comisión cotizada en  
USD₮ antes de firmar.

\*\*Menos competido\*\* que el premio 1, por una razón concreta: hay fricción de  
infraestructura. No proveen endpoints de paymaster — cada uno consigue el suyo en  
Candide o Pimlico. Y \*\*la testnet de USD₮ solo existe en Sepolia\*\*; para cualquier  
otra cadena hay que desplegar un token ficticio propio y apuntar el paymaster ahí.

\*\*Recomendación fuerte: si van por acá, quedate en Sepolia.\*\* Es el único camino  
sin fricción y ellos mismos lo dicen.

\*\*Preparativo de hoy:\*\* conseguir el endpoint de paymaster. Son minutos desde el  
panel de Candide o Pimlico, y \*\*no es código del proyecto\*\*, así que es preparación  
de entorno legítima. Hacerlo el sábado a las 12 es regalar una hora del reloj.

\*\*Puntaje:\*\* Technicality 4 · Originality 3 · UI/UX/DX 5 · Practicality 4 ·  
Presentation 5 → \*\*21/25\*\*, pero con la factibilidad más baja de la lista.

\---

\# 6\. Cómo se elige, esta noche

No lo decidan por votación abierta. Usen este filtro, en orden. La primera  
respuesta mala mata la idea.

1\. \*\*¿Alguien del equipo ya instaló la tecnología del track y le funcionó?\*\*  
   Si nadie tocó QVAC y el modelo no baja, no importa lo linda que sea la idea.  
2\. \*\*¿Podés describir los primeros 30 segundos del video sin explicar nada?\*\*  
   Si necesitás una frase de contexto antes de que se entienda, la idea no está  
   lista.  
3\. \*\*¿Hay alguien nombrable que sufre este problema?\*\* No "los usuarios". Un  
   contador, un dev que pega claves en Slack, el que administra los pagos.  
4\. \*\*¿Se termina la versión chica en 12 horas?\*\* No 24: 12\. Las otras 12 se van  
   en cosas que no calculaste.  
5\. \*\*¿Qué se corta si a las 12 horas van atrasados?\*\* Si no tenés respuesta,  
   volvé al punto 4\.

\*\*Y una regla que sale de un equipo que ganó:\*\* un equipo de cinco en la Platanus  
Hack estuvo hasta las 5 de la mañana sin idea, con 30 horas por delante, y ellos  
mismos dijeron que quizás era porque siendo cinco costaba más ponerse de acuerdo.  
Ganaron igual — \*\*pero presentaron algo distinto de lo que habían planeado al  
principio.\*\* Con 24 horas no tenés ese margen. Decidan la dirección esta noche y  
permítanse pivotear sin drama si a las 6 horas la cosa no cierra.

\---

\# 7\. Lo que aplica a todas las ideas

\#\# Nombre y gancho  
Un equipo de TreeHacks le puso omnom a su robot y le colgó la comida de una soga  
para tener que cortarla, y dijeron en cámara que ese detalle podía ser el factor  
diferenciador. Ganaron Most Creative. \*\*Un nombre corto y una analogía de una  
línea valen media hora de trabajo.\*\* Uno de los ganadores de otra hackathon se  
describía como "Waze meets 311". Eso se entiende sin explicación.

\#\# Probar con gente real  
En el showcase de MIT los tres jueces le preguntaron a casi todos los equipos  
alguna variante de \*"¿probaste esto con alguien que no sea de tu familia?"\*. Los  
que tenían respuesta concreta —vecinos, dos especialistas, feedback documentado  
que derivó en cambios— se llevaron los premios.

\*\*El domingo a las 9:30, agarrá a tres personas del venue, que usen la  
herramienta, y decilo en el video y en el README.\*\* Es lo más barato que podés  
hacer para subir \*Practicality\*, que es la debilidad histórica documentada del  
campo en este evento.

\#\# Lo determinístico va en código  
Si algo se puede resolver con una comparación o una regla, no se lo preguntes al  
modelo. Sube la fiabilidad y es el tipo de decisión de ingeniería que puntúa.  
Un ganador del showcase de MIT explicó que extraían el esqueleto de la persona en  
vez de analizar la imagen cruda, para que el modelo ignorara tono de piel,  
iluminación y fondo. Explicaron ese razonamiento en el pitch y ganaron  
innovación creativa. \*\*La decisión de ingeniería explicada vale puntos.\*\*

\#\# El plan de lo que falta  
La rúbrica de \*Technicality\* pregunta si la solución está completa y funcional  
\*\*o si el equipo tiene un plan claro de cómo la terminaría\*\*. Eso es un regalo:  
los últimos 20 segundos del video, dedicados a "esto no llegamos a hacerlo, y así  
lo terminaríamos", recuperan puntos de lo que no cerraste. Específico, no vago.

\#\# Entregar temprano y editar  
Se puede editar la submission después de enviarla. Un ganador de YHack lo dice en  
su vlog: entregá y después editás. El organizador que dio más de un millón en  
premios cuenta que ve equipos talentosos que probablemente podían ganar entregando  
a las 12:01, 12:05, 12:30 — o no entregando. \*\*Apunten a las 10:30 del domingo.\*\*

\`\`\`\`

\*\*File: manual-de-campo.md\*\*

\`\`\`markdown  
\# Manual de campo — Aleph Hackathon  
\#\#\# Qué enseñó cada video, y cómo se traduce en decisiones durante las 24 horas

\---

\# Parte 1 — Análisis de cada video

Once fuentes. Marco con ✅ lo que aparece en tres o más fuentes independientes  
(eso es consenso del campo, no la manía de un tipo), y con ⚠️ lo que aparece en  
una sola pero es específico y verificable.

\---

\#\# 1\. El organizador que repartió más de un millón en premios  
\*Cinco tips para ganar una hackathon\*

\*\*Lo útil, en orden de valor:\*\*

⚠️ \*\*El método del "lockbox".\*\* Nombrado por un equipo que ganó tres hackathons  
seguidas. La idea: hay que mostrarle al sponsor que estás ahí por su tecnología y  
que querés convertir esto en algo real, no por la comida gratis. Que los jueces  
sepan quién sos y que estás para ganar. Es reconocimiento previo al juicio.

⚠️ \*\*El método "AA".\*\* Dos personas que ganaron cinco seguidas y se llevaron más  
de $100.000: construían siempre algo \*\*visualmente impresionante y tangible\*\*, que  
se pudiera tocar y jugar. Cuando pitcheás contra 15 equipos más, tenés que hacer  
algo que destaque.

✅ \*\*Llegar con la idea pensada de antes.\*\* Dice que un juez ama ver que  
invertiste tu propio tiempo entendiendo la tecnología antes de llegar. Así  
cerrás la idea en la primera hora en vez de perder diez.  
→ \*\*Acá se aplica hoy:\*\* los tres workshops son hoy y mañana temprano. Ir es  
llegar con la idea pensada.

✅ \*\*No perder el deadline.\*\* Ve todos los años equipos talentosos que entregan a  
las 12:01, 12:05, 12:30 — o no entregan — por querer perfeccionar una cosa más.  
Su modelo mental: si construir el producto perfecto son 10 pasos, en una hackathon  
llegás al 1, al 2, con suerte al 3\. \*\*Entregá igual.\*\*

\---

\#\# 2\. ETHGlobal Lisboa — vlog de un equipo de Valencia  
\*Tres días, no ganó el premio grande, ganó dos de sponsor\*

\*\*El caso de estudio más útil de todos\*\*, porque es un equipo promedio contando la  
verdad.

✅ \*\*Perdieron el primer día definiendo la idea.\*\* Llegaron el jueves, y a las 12  
de la noche todavía estaban cerrando el tema. Su propia frase: tardaron mucho más  
de lo que les hubiera gustado.

✅ \*\*Admitieron sobre-ambición.\*\* Textual: pecaron de ambición, la cosa quedó  
"semi completada", no llegaron a implementar todo. Calcularon ocho horas de  
trabajo y ahí adentro había cuatro de sueño.

🎯 \*\*El desenlace es la lección:\*\* de 197 participantes, \*\*no ganaron nada del  
premio grande, pero ganaron dos premios de sponsor.\*\* Y el chico estaba  
genuinamente feliz.  
→ \*\*Los bounties de sponsor son el objetivo realista de un equipo nuevo. El  
premio general es lotería.\*\* En este evento eso significa: apuntá al track de  
Tether, y que el General Track sea el upside gratis.

⚠️ Tres horas de sueño en tres días, y en cámara dice que siente que está  
delirando. Ver el punto sobre dormir en la Parte 2\.

\---

\#\# 3\. Fundador de DAPTA — hackathon en San Francisco  
\*Fue a hacer networking, no terminó el proyecto, y aun así\*

✅ \*\*Trabajo autónomo en paralelo.\*\* Lo más accionable del video: dejó su  
asistente de código trabajando solo mientras él hablaba con la gente que se  
acercaba, y dice que sin eso prácticamente no hubiera avanzado nada ese día.  
→ \*\*Traducción directa: la persona que va a hablar con Raquel Carrasco deja una  
tarea corriendo antes de levantarse de la silla.\*\*

⚠️ \*\*Resolver desde primeros principios.\*\* Cuando le explica a un compañero cómo  
hubiera resuelto el reto rápido, el argumento es: no necesitás backend, no  
necesitás llamar a un modelo, usá la primitiva más simple que te da el resultado.  
→ Esto es exactamente lo mismo que "lo determinístico va en código". Cada llamada  
al modelo que evitás es fiabilidad que ganás.

⚠️ \*\*Spec-driven development.\*\* Aprendió un framework donde primero se construye  
muy bien el requerimiento y recién al final se escribe el código. Su cierre: en  
una hackathon, si aprendiste algo, ganaste.

\---

\#\# 4\. Hackathon de OpenAI en Ciudad de México  
\*13 horas, primera hackathon del autor, no ganó\*

🎯 \*\*La frase más valiosa de todo el material.\*\* A mitad del evento explica por  
qué van a pasar de tres nodos a seis: porque la narrativa es mejor \*\*y porque la  
ronda uno y la ronda dos están en la rúbrica.\*\*

Eso es un equipo optimizando explícitamente contra el documento de evaluación, en  
voz alta. Es lo que hay que hacer.  
→ \*\*Acá: los cinco criterios se puntúan del 1 al 5 cada uno. Antes de agregar  
cualquier feature, preguntate a cuál de los cinco le suma. Si no le suma a  
ninguno, no la agregues.\*\*

✅ Entregaron a horario, terminaron con tiempo. No ganaron igual.

⚠️ \*\*Al final le preguntaron a los jueces qué les faltó.\*\* Su reflexión es que lo  
importante no es no desanimarse sino ver en qué parte fallaste y cómo aplicarlo  
después. Es la única fuente que menciona pedir feedback post-mortem.  
→ El domingo después del cierre, preguntenle a Raquel qué vio en las entregas.  
Sirve para la próxima y además te deja registrado como equipo serio.

\---

\#\# 5\. Showcase final del Global AI Hackathon en el MIT  
\*Seis equipos, tres jueces, tres premios\*

🎯 \*\*El patrón más fuerte de todo el corpus: los tres jueces preguntaron  
básicamente lo mismo a casi todos los equipos.\*\* ¿Probaste esto con alguien que no  
sea de tu familia? ¿Con usuarios reales? ¿Qué feedback recibiste, positivo y  
negativo?

Un equipo respondió que había testeado con vecinos además de familia. Otro  
respondió con detalle: dos especialistas en rehabilitación que les compartieron  
datos y organizaron reuniones con pacientes, más un experto en IA que les sugirió  
agregar videos de demostración y cambios en la interfaz. \*\*Ese equipo ganó  
innovación creativa.\*\*

⚠️ \*\*La decisión de ingeniería explicada gana puntos.\*\* El mismo equipo contó que  
extraían el esqueleto de la persona en vez de analizar la imagen cruda, para que  
el modelo se enfocara solo en el movimiento e ignorara tono de piel, forma del  
cuerpo, iluminación y fondo. Lo explicaron como una decisión sobre sesgo. No es un  
detalle técnico: es una decisión con razonamiento, contada.

⚠️ \*\*Números concretos sobre los datos.\*\* Cuando les preguntaron por el dataset,  
respondieron con la cifra exacta: nueve modelos, doscientas imágenes por modelo,  
mil ochocientas en total. La precisión transmite rigor.

⚠️ \*\*Los premios eran de categorías distintas\*\* — mejor diseño, impacto  
comunitario, innovación creativa — y ganaron proyectos distintos. El de mejor  
diseño ganó por interfaz intuitiva y ciclos de retroalimentación. El de impacto  
comunitario ganó explícitamente porque el juez dijo que impactaba a mucha gente  
un poco, aunque no fuera enorme para cada persona.  
→ \*\*Acá hay cuatro premios y criterios de sponsor separados. Un proyecto puede  
ganar por una dimensión que no es la que vos creías que era tu fuerte.\*\*

\---

\#\# 6\. Estudiante de Columbia — YHack  
\*Cero horas de sueño, ganó\*

🎯 \*\*"Pienso cuál sería la demo más impactante para un juez y trabajo para atrás  
desde ahí."\*\* Es la frase que mejor resume el método correcto. Aparece también en  
el video del ingeniero de Meta, desde el otro ángulo.

⚠️ \*\*La idea vino de un posteo de Twitter que había visto.\*\* No de un brainstorm.  
Vio algo sobre el cambio rápido de usuario en macOS y construyó un agente que  
corre en un perfil de usuario separado. Las ideas buenas vienen de una  
observación específica, no de una sesión de lluvia de ideas.

⚠️ \*\*Su setup de herramientas es un multiplicador real.\*\* Menciona tres cosas:  
\*skills\* que hacen al asistente experto en algo puntual (usa una de diseño de  
frontend), un servidor MCP para anotar diseños de interfaz y pegar las  
anotaciones de vuelta para que haga arreglos dirigidos, y \*git worktrees\* para  
tener varias ramas abiertas a la vez y trabajar en cinco features en paralelo.  
→ \*\*Si van a usar asistentes de IA en serio, worktrees es lo más barato de  
adoptar y lo que más paraleliza a un equipo de cuatro.\*\*

⚠️ \*\*La curva de sueño.\*\* Dice que las 4 y las 8 de la mañana son cuando más pega  
la falta de sueño, pero que lo peor es las 2 de la tarde del día siguiente.  
→ En este evento el juicio es a las 13:00 del domingo. \*\*Ustedes van a estar en su  
peor momento fisiológico exactamente cuando tengan que entregar.\*\* Por eso el  
video se graba a las 8 de la mañana.

⚠️ Cuando duda si entregar, un compañero le dice que entregue igual porque después  
se puede editar. Entregó.

\---

\#\# 7\. TreeHacks — el equipo del robot  
\*Ganó Most Creative\*

✅ \*\*Todo se rompe entre las 4 y las 6 de la mañana.\*\* En el video: un archivo se  
corrompe a las 5:30, tienen que rebajar todas las dependencias del entorno  
virtual, la unidad de medición inercial se cuelga. Textual, mientras pasa: "¿por  
qué está corrupto?".

⚠️ \*\*El gancho memorable fue una decisión consciente.\*\* Le pusieron omnom al robot  
—por el personaje de Cut the Rope— y decidieron colgar la comida de una soga para  
tener que cortarla. En cámara dicen que ese detalle podía ser el factor  
diferenciador. Ganaron Most Creative.

✅ \*\*Filmaron el video de demo a las 5:30 de la mañana\*\*, con tres horas para el  
cierre, y terminaron de editarlo a las 7\. La organización extendió el deadline 15  
minutos, con lo que nunca se puede contar.

⚠️ Los cuatro con cero horas de sueño llegando al juicio, y él diciendo que  
siente que le va a dar un infarto.

\---

\#\# 8\. TreeHacks — el que intentó adivinar al ganador  
\*1.000 hackers, 350 proyectos, falló la predicción\*

🎯 \*\*La lección metodológica más importante del corpus.\*\* Fue con tres criterios:  
¿me entusiasma la idea?, ¿tienen garra?, ¿están privados de sueño? Y descubrió  
que \*\*todos los equipos cumplían los tres\*\*. Su predicción falló.

→ \*\*Un criterio que cumple todo el mundo no es un criterio.\*\* Todos los equipos  
del sábado van a estar entusiasmados, todos van a tener garra, todos van a dormir  
poco. Nada de eso te diferencia. Lo que diferencia es lo que la mayoría \*\*no\*\*  
hace: pasar el gate técnico, medir la fiabilidad, probar con usuarios reales,  
entregar temprano.

🎯 \*\*Qué ganó realmente:\*\* un bastón inteligente para personas con discapacidad  
visual que usa el LiDAR y las cámaras que un iPhone Pro ya tiene.

Y su autocrítica al final: su propia elección resolvía un problema que él tenía, y  
concluye que su perspectiva había sido demasiado miope.  
→ \*\*Dos cosas: los ganadores resuelven el problema de otro, y usan lo que ya  
existe en vez de construir hardware nuevo.\*\*

\---

\#\# 9\. Ingeniero de Meta — más de $30.000 en premios  
\*El video más denso en estrategia\*

🎯 \*\*La tesis central:\*\* todas las hackathons están patrocinadas por empresas, y  
eso no es un detalle administrativo. Hay una razón de negocio por la que ponen  
miles de dólares y personal: es un evento de marketing. \*\*La gente que atiende el  
stand suele ser la que juzga el premio de ese sponsor\*\*, y su criterio no es el  
código más elegante — es qué proyecto muestra su tecnología de la forma más  
prominente y convincente.

🎯 \*\*Su caso concreto:\*\* en un evento habló mucho con los ingenieros de un sponsor  
de mapas, les preguntó por una feature de animación que estaba en su SDK de  
JavaScript pero faltaba en el móvil. Los ingenieros admitieron que no la tenían  
resuelta y que venían intentando implementarla internamente. Él les preguntó  
directamente si, en caso de construirla y presentar una app que la mostrara, los  
elegían ganadores. Le dijeron que si lo lograban, ganaban. Trabajaron toda la  
noche. Ganaron $5.000.

→ \*\*Acá el equivalente exacto es Raquel Carrasco\*\*, mentora \*y\* jueza de WDK y de  
QVAC. Y dmc, creador de Pear y juez del track de Pear.  
→ \*\*La pregunta a hacerles no es "¿qué te parece mi idea?". Es "¿qué les gustaría  
ver construido con esto este fin de semana?" y "¿qué error ven repetirse en las  
entregas?".\*\*

⚠️ \*\*Roles para quien no programa.\*\* Dos que valen: el que hace de product manager  
(habla con los sponsors, averigua qué quieren, traduce a especificación) y el  
presentador. Estima que \*\*una buena presentación es la mitad del proyecto\*\*, y  
recomienda trabajar para atrás desde ella: definir los puntos clave, las features  
que vas a mostrar, y asegurarte de que esas features destaquen al sponsor.

⚠️ \*\*Los sponsors revisan el repo\*\* para asegurarse de que construiste algo que  
funciona y no estás entregando solo una presentación.  
→ Coincide exactamente con que WDK y QVAC pidan permalinks a las líneas exactas  
de integración y digan que es lo primero que miran.

\---

\#\# 10\. Platanus Hack (Chile) — 36 horas  
\*Equipo de cinco, ganó el primer puesto de su track\*

🎯 \*\*La parálisis de idea es el asesino número uno de tiempo.\*\* A las 5 de la  
mañana seguían sin idea, con unas 30 horas restantes. Su propia hipótesis: quizás  
era porque siendo cinco costaba más ponerse de acuerdo. Y la explicación que dan  
es psicológicamente exacta: uno duda demasiado porque es la idea a la que le vas a  
dedicar el poco tiempo que tenés, y sentís que después no vas a poder echarte  
atrás.

→ \*\*Con 24 horas eso es fatal.\*\* Decidan la dirección esta noche. Y sepan que  
pivotear es barato: ver el punto siguiente.

🎯 \*\*Pivotearon y ganaron.\*\* Tenían dos ideas: un casco con sensores para  
bomberos que permitiera ver a través del humo, y algo del lado social. Al final  
del video, celebrando el primer puesto, alguien comenta que en la presentación  
\*\*no se vio ningún casco de bombero.\*\* Cambiaron de idea y ganaron.  
→ \*\*Si a las 6 horas la idea no cierra, cambiar no es un fracaso.\*\*

⚠️ \*\*Probaron con gente random del venue\*\* cuando quedaban 12 horas. Mismo patrón  
que en el MIT.

⚠️ A las 7:45 de la mañana, sin dormir nada, uno peleando con el entorno de  
desarrollo y el scraping de una página caído. La infraestructura ajena se cae  
siempre.

\---

\#\# 11\. Ganadores de la hackathon de Caffeine AI  
\*Seis proyectos ganadores, técnicos y no técnicos\*

🎯 \*\*El patrón más claro de todo el corpus, y se repite en los seis.\*\* Cada  
ganador fue construido por alguien con \*\*proximidad al dominio\*\*:

| Proyecto | Quién lo construyó | Qué resolvía |  
|---|---|---|  
| Historia clínica dental | Un dentista en ejercicio | Registros dentales dispersos |  
| Testamentos | Un estudiante de derecho | Hacer un testamento válido sin abogado |  
| Calidad del agua | — | Consultar el agua de tu barrio con datos públicos de gobierno |  
| Aprender un hobby | — | Progreso visualizado como una planta que crece |  
| Escáner de seguridad | — | Claves de API filtradas en el código |  
| Reportar baches | — | Reportes con votos que escalan a las autoridades |

Ninguno inventó una categoría nueva. Todos nombraron un usuario. Varios usaron  
datos públicos que ya existían.

⚠️ \*\*Analogías de una línea.\*\* Uno de los ganadores se describe como Waze  
cruzado con el 311, la línea de reportes municipales. Se entiende sin explicación.  
→ \*\*Consigan la suya.\*\* "Es AirDrop pero para secretos y entre sistemas  
operativos distintos" es infinitamente mejor que tres párrafos de descripción.

⚠️ \*\*Había una categoría no técnica y ganó gente sin perfil de programador.\*\* El  
dominio le ganó a la habilidad técnica.

\---

\# Parte 2 — Reglas de las 24 horas

Destiladas de todo lo anterior más los documentos oficiales.

\---

\#\# Antes de que arranque el reloj

\*\*Hoy, viernes\*\*

\- \[ \] Instalar y verificar la tecnología del track elegido. \*\*Si algo no instala  
      hoy, no elijan ese track.\*\*  
\- \[ \] Si van por QVAC: descargar el modelo (\~2,5 GB) y verificar que entra en RAM  
\- \[ \] Si van por WDK gasless: endpoint de paymaster en Candide o Pimlico  
\- \[ \] Si van por Pears: instalar la CLI de Pear y clonar \`hello-pear-bare\`  
\- \[ \] Leer el Hacker's Manual completo, los cuatro integrantes  
\- \[ \] Entrar al Telegram y a cada topic de sponsor  
\- \[ \] Cuenta en la plataforma de submission, los cuatro, verificada  
\- \[ \] Preguntar en el Telegram las tres contradicciones del dossier  
\- \[ \] \*\*Decidir la dirección del track esta noche\*\*, con el filtro de 5 preguntas  
\- \[ \] Si van a juntar datos sucios para QVAC: sacar las fotos hoy  
\- \[ \] Acordar cómo se rompen los empates a las 4 de la mañana. Alguien decide.

\*\*Sábado antes de las 12\*\*

\- \[ \] 9:30 workshop de QVAC · 10:00 check-in y workshop de WDK · 11:30 apertura  
\- \[ \] Ir a los workshops: los dicta la gente que después juzga, y ambos prometen  
      que te vas con el entorno funcionando

\---

\#\# Las diez reglas

\*\*1. El gate primero, siempre.\*\*  
Antes de escribir una línea del producto, pasá la condición binaria del track y  
verificala desde otra máquina. Todo lo demás es upside.

\*\*2. Cada feature tiene que apuntar a un criterio nombrable.\*\*  
Cinco criterios, del 1 al 5 cada uno. Antes de agregar algo, decí en voz alta a  
cuál le suma. Si no le suma a ninguno, no va.

\*\*3. Un 4 parejo le gana a dos 5 y tres 2.\*\*  
20 puntos contra 16\. La rúbrica castiga la especialización. El backend perfecto  
sin interfaz pierde contra el proyecto equilibrado.

\*\*4. Hablá con los mentores-jueces el sábado temprano, con dos opciones concretas.\*\*  
No pidas una idea. Preguntá cuál de estas dos está más alineada con lo que quieren  
ver, y qué errores ven repetirse. Volvé a la noche a mostrar el avance: te  
registra como equipo que ejecuta.  
⚠️ Reservar un slot de Calendly y no aparecer \*\*resta puntos en la evaluación  
final\*\*. Reservá solo lo que vas a usar.

\*\*5. Lo determinístico va en código, no en el modelo.\*\*  
Cada llamada al modelo que evitás es fiabilidad ganada, y la decisión explicada  
puntúa en Technicality.

\*\*6. Dejá algo corriendo antes de levantarte de la silla.\*\*  
Cada vez que alguien va a hablar con un mentor, a comer o al baño, deja una tarea  
autónoma andando.

\*\*7. Congelamiento de features a las 18 horas del reloj.\*\*  
Domingo 6 de la mañana. Después de eso solo: interfaz, mensajes de error, estados  
vacíos, README, permalinks, video. Agregar features hasta el final es el error  
número uno documentado.

\*\*8. El video se graba a las 8 de la mañana del domingo.\*\*  
Cuatro horas antes del cierre. Es el seguro contra el wifi caído, el archivo  
corrupto y la falta de sueño. Además, a las 13:00 del domingo van a estar en su  
peor momento fisiológico y el juicio empieza justo ahí.

\*\*9. Entregá a las 10:30, no a las 11:59. Después editás.\*\*  
La submission se puede editar. El deadline no se mueve.

\*\*10. Dormir por turnos no es debilidad, es estrategia.\*\*  
Todos los vlogs muestran gente delirando a las 5 de la mañana peleando con  
entornos rotos. Ninguno muestra que eso les haya sumado. Dos personas duermen de  
2 a 6, dos de 6 a 10\. Nadie decide bien sin dormir, y a las 6 de la mañana es  
cuando hay que decidir qué se corta.

\---

\#\# La curva de las 24 horas, con lo que se rompe

| Reloj | Hora real | Qué pasa | Qué hacer |  
|---|---|---|---|  
| 0–1 | Sáb 12–13 | Idea final, roles, repo, primer commit | \*\*Escribir el guion del video antes de codear.\*\* Si no lo podés escribir, la idea no está lista |  
| 1–3 | 13–15 | \*\*El gate\*\* | No escribas producto hasta que el gate pase y esté verificado desde otra máquina |  
| 3–4 | 15–16 | Mentores | Dos opciones concretas, no una pregunta abierta |  
| 4 | 16 | Vault Guardian | Una persona, 45 minutos, mientras los demás siguen |  
| 4–14 | 16–02 | El camino feliz completo | Cada 4 horas: ¿esto se puede mostrar? Si la respuesta es no dos veces seguidas, están construyendo hacia adentro |  
| 14–18 | 02–06 | Turnos de sueño | \*\*Acá se corrompen los archivos y se cuelgan las dependencias.\*\* Commiteá antes de dormir |  
| 18–20 | 06–08 | \*\*Congelamiento.\*\* Interfaz, errores, README, permalinks | Nada de features nuevas |  
| 20–21 | 08–09:30 | \*\*Grabar el video\*\* | Cronometrado. Tres tomas máximo |  
| 21–22 | 09:30–10:30 | Probar con 3 personas del venue | Mencionarlo en el video o el README |  
| 22 | 10:30 | \*\*Entregar\*\* | Después siguen editando si quieren |  
| 24 | 12:00 | Cierre | Sin prórroga |

\---

\#\# Los seis errores que aparecen en más de un video

1\. \*\*Definir la idea toma más de lo que cualquiera calcula.\*\* Dos equipos  
   distintos llegaron a las 5 de la mañana sin idea cerrada. Uno ganó igual, pero  
   tenía 36 horas. Ustedes tienen 24\.  
2\. \*\*Sobre-ambición.\*\* El equipo de Lisboa lo dice con esas palabras. Terminaron  
   "semi completados" y perdieron el premio grande.  
3\. \*\*Agregar features hasta el final.\*\*  
4\. \*\*Entregar tarde o no entregar.\*\* El organizador lo ve todos los años.  
5\. \*\*No hablar con los sponsors.\*\* El error que el ingeniero de Meta señala como  
   el más caro de todos: equipos que se sientan a programar sin pasar por los  
   stands.  
6\. \*\*Confundir "todos hacen esto" con una ventaja.\*\* Entusiasmo, garra y no  
   dormir no te diferencian de nadie.

\---

\#\# Qué decir en los últimos 20 segundos del video

La rúbrica de \*Technicality\* pregunta si la solución está completa \*\*o si el  
equipo tiene un plan claro de cómo la terminaría.\*\* Eso es puntaje regalado para  
lo que no llegaste a hacer, siempre que seas específico.

Mal: \*"con más tiempo lo mejoraríamos"\*.  
Bien: \*"no llegamos a implementar el transporte por Bluetooth. La interfaz de  
transporte ya está aislada en tres métodos, así que es reemplazar una clase.  
Calculamos seis horas."\*

Lo mismo con las limitaciones: un agente que señala lo que no sabe puntúa mejor  
que uno que finge certeza. El sponsor de QVAC lo dice literalmente sobre los  
modelos, pero aplica igual al equipo que presenta.

\`\`\`

Ahí están. Cuatro documentos: el dossier de la ronda anterior, las nueve ideas con sus prompts de arquitectura, el manual de campo con el análisis de los once videos, y el prompt actualizado para la otra IA.

\*\*Lo más importante de esta ronda es una corrección de secuencia, no una idea.\*\*

Cada track tiene un gate binario que te saca de consideración si no lo cumplís. En Pears es literal: si \`pear install pear://\<key\>\` no funciona, los jueces no puntúan la entrada — la descartan. La conclusión no es "elegí Pears porque es difícil". Es esto: \*\*el gate se pasa con lo más trivial posible en las primeras tres horas, y recién después construís el producto.\*\*

Concretamente: hora 1 a 3, desplegás un \`hello-pear-bare\` que solo imprime "hola", lo instalás desde la notebook de otro integrante, publicás una actualización que cambie el texto y verificás que llegue sola. Con eso ya estás dentro del track. Si a las 4 de la mañana se pudre todo, todavía tenés una entrada válida. Casi nadie hace esto porque la tentación es diseñar el producto lindo primero y dejar el deploy para el final — que es exactamente el equipo que a las 10 del domingo descubre que su link no instala.

\*\*Sobre las ideas.\*\* La número uno es \*\*Llave\*\*: mandar un \`.env\` o una clave de API de una máquina a otra sin que pase por ningún servidor. Código de tres palabras, un solo uso, canal cifrado punta a punta. Es la única idea donde "no hay servidor" no es una característica técnica sino el producto entero — cualquier alternativa con servidor tiene el problema de confiar en el servidor. Y el problema es real y aburrido: mañana a las 13:00 alguien de tu equipo va a pegar una clave en el Telegram del hackathon.

La número dos es el \*\*banco de pruebas de fiabilidad\*\* de QVAC, que sigue siendo el hueco más grande del evento por la razón que ya te dije: el sponsor pidió "pruebas, no impresiones", y correr la misma tarea 47 veces para armar una tabla de tasa de éxito es justo lo que un equipo apurado no hace nunca. Le agregué una métrica que vale oro y que nadie más va a reportar: separar "incorrecta declarada" de \*\*"incorrecta silenciosa"\*\* — el modelo respondiendo con confianza algo que está mal. Es la métrica que más le importa a quien evalúa modelos chicos.

Cada idea trae un prompt de arquitectura listo para pegar, con tres propiedades deliberadas: ancla al asistente en la documentación real (los tres tracks avisan que los modelos inventan métodos), ordena por riesgo en vez de por prolijidad, y prohíbe explícitamente el sobre-diseño. También le puse a cada una un \*\*espectro de ejecución\*\*: qué entregás si sale todo bien, si sale a medias, si se rompe el componente central, y si es un desastre. En el escenario D siempre hay algo que entregar, porque cero es no entregar.

\*\*De los videos nuevos salieron tres cosas que no tenía.\*\*

El equipo de la Platanus Hack ganó el primer puesto y, celebrando, alguien comenta que en la presentación \*\*no se vio ningún casco de bombero\*\* — que era su idea original. Pivotearon y ganaron. Contra eso, el equipo de Lisboa perdió el premio grande admitiendo en cámara que "pecaron de ambición". Los dos juntos dicen lo mismo: la idea inicial no es sagrada, la ambición sí te mata.

Los seis ganadores de la hackathon de Caffeine AI comparten un patrón perfecto: \*\*proximidad al dominio\*\*. Un dentista construyó la herramienta de historias clínicas dentales, un estudiante de derecho la de testamentos. Ninguno inventó una categoría. Todos nombraron un usuario.

Y la más útil metodológicamente: el que intentó adivinar al ganador de TreeHacks falló porque sus tres criterios —idea entusiasmante, garra, falta de sueño— los cumplían absolutamente todos los equipos. \*\*Un criterio que cumple todo el mundo no es un criterio.\*\* Mañana todos van a estar entusiasmados y todos van a dormir poco. Lo que diferencia es lo que la mayoría no hace: pasar el gate, medir, probar con usuarios reales, entregar a las 10:30.

Dos cosas para esta noche: si van por QVAC, bajá el modelo ahora (2,5 GB) y verificá que entra en RAM. Y si van por la idea del conciliador, la tarea número uno no es programar — es juntar veinte documentos horribles de verdad. Pedile facturas viejas a tu familia y sacales fotos malas a propósito. Ese corpus es el diferenciador entero contra los otros veinte equipos que van a demostrar con PDFs limpios.

Si mañana aclaran lo de "1 track de Tether", avisame y reordeno el ranking.

\# Human — Aug 21, 2026, 5:44 PM

\> \*\*Attachment: attachment · txt · 38.9 KB\*\*  
\>  
\> Parte 1 — Lo que pude verificar y lo que no  
\> 1.1 Hallazgo más importante: el dossier acertó en desconfiar de la lista de ganadores, pero hoy ya puede corregirse  
\>  
\> El dossier decía que no podía verificar los ganadores de las cinco ediciones anteriores y advertía específicamente sobre nombres como AutoBounty, Piggy Quiz, Sportchain, Clever, TreasuryPilot, Consient, AlephRob, Elemgame, etc.  
\>  
\> Eso ya no es correcto para varias ediciones. Encontré fuentes oficiales de Crecimiento que permiten reconstruir un historial bastante sólido.  
\>  
\> Agosto 2024 — primera edición  
\>  
\> VERIFICADA. Crecimiento identifica como tres finalistas/ganadores a TornadoCodes, ValidAR y Certo. La edición tuvo 55 proyectos y más de 300 hackers presenciales.  
\>  
\> Hay una distinción importante: la fuente oficial de Crecimiento habla de los tres finalistas/ganadores, mientras que testimonios de participantes y prensa identifican a TornadoCodes como 1.º puesto general. Nicolas Fainstein dice explícitamente que su equipo quedó primero entre 54 equipos.  
\>  
\> Proyecto	Estado	Qué resolvía	Tecnología	Track  
\> TornadoCodes	VERIFICADO	Dar acceso a una aplicación Web3 sin recopilar primero direcciones de wallet.	Tecnología inspirada en Tornado Cash: hashes de Pedersen \+ Merkle trees.	General/Aleph; 1.º general según el equipo  
\> ValidAR	VERIFICADO como finalista	Simplificar identidad/documentación verificable en Web3.	Blockchain / identidad verificable.	Exacto del sponsor NO VERIFICADO  
\> Certo	VERIFICADO como finalista	Evitar manipulación de respuestas en investigaciones y mejorar su reproducibilidad.	Blockchain \+ ZK \+ World ID \+ almacenamiento descentralizado.	Exacto del sponsor NO VERIFICADO  
\>  
\> Para Certo encontré además la descripción del propio equipo: las respuestas se registraban on-chain antes de llegar al investigador, y World ID podía exigirse para garantizar unicidad humana.  
\>  
\> Para TornadoCodes encontré una descripción mucho más concreta del creador: códigos únicos, link de acceso y verificación on-chain por cualquier wallet, sin recopilar previamente las direcciones.  
\>  
\> Demostración que sí puedo sostener: TornadoCodes mostraba el flujo de generación de un código, distribución del enlace y acceso verificado; Certo mostraba el flujo de encuesta/respuesta verificable. El metraje original de las demos no pude recuperarlo con suficiente fiabilidad, así que no voy a inventar una secuencia de pantalla exacta.  
\>  
\> Diciembre 2024 — segunda edición  
\>  
\> VERIFICADA. Crecimiento dice que los ganadores fueron Adversarium, Superswap y Underloans, con OptimismPay como mención especial. La edición tuvo 280 builders, 37/55? proyectos según distintas fuentes históricas, y más de US$70.000 en premios.  
\>  
\> Proyecto	Estado	Qué resolvía	Tecnología / sponsor	Track  
\> Adversarium	VERIFICADO como ganador	Aplicación relacionada con privacidad/FHE.	Zama es el sponsor asociado de la edición, pero la correspondencia técnica exacta NO LA PUDE VERIFICAR con una fuente primaria suficientemente clara.	NO VERIFICADO  
\> Superswap	VERIFICADO como ganador	Agregación/intercambio de liquidez.	Optimism / ecosistema Superchain.	NO VERIFICADO  
\> Underloans	VERIFICADO como ganador	Lending / préstamos.	Exacta tecnología del sponsor NO VERIFICADA.	NO VERIFICADO  
\>  
\> Hay evidencia externa de que SuperSwap terminó como un agregador/DEX del ecosistema Superchain, pero no pude demostrar que esa implementación sea exactamente la versión presentada en Aleph diciembre 2024; por eso no lo uso para inferir la demo de aquella edición.  
\>  
\> Conclusión útil: la fuente oficial confirma los nombres; no confirma suficiente detalle técnico para usar esos tres como modelos de arquitectura. No los usaría como precedentes técnicos.  
\>  
\> Marzo 2025 — tercera edición  
\>  
\> VERIFICADA. Crecimiento identifica como ganadores de sponsor:  
\>  
\> Circuls — World  
\> Big Brain MCP — Mantle, mejor aplicación de IA  
\> MetaCitizen — ZKsync  
\> OpenProxy Gov — Polkadot  
\> PayGo — Stellar  
\>  
\> Y como menciones especiales: ObscuraProtocol, Stellar Orbit y Passwallet.  
\>  
\> Acá hay un dato estratégicamente importante: no fue un único ganador general, sino una colección de ganadores por sponsor.  
\>  
\> Proyecto	Estado	Sponsor/track	Qué sé con seguridad  
\> Circuls	VERIFICADO	World	Ganó el track de World.  
\> Big Brain MCP	VERIFICADO	Mantle	Ganó el premio a mejor aplicación de IA.  
\> MetaCitizen	VERIFICADO	ZKsync	Ganó mejor app ZKsync.  
\> OpenProxy Gov	VERIFICADO	Polkadot	Ganó Polkadot.  
\> PayGo	VERIFICADO	Stellar	Ganó Stellar.  
\>  
\> Las descripciones detalladas de problema, arquitectura y demo para estos cinco NO LAS CONSIDERO suficientemente verificadas a partir de las fuentes que encontré; no voy a rellenarlas con resultados de agregadores.  
\>  
\> Agosto 2025 — cuarta edición  
\>  
\> Acá hay una corrección fuerte respecto del dossier: los nombres que éste marcaba como dudosos sí existen.  
\>  
\> Crecimiento publica explícitamente:  
\>  
\> Sportchain — Lisk Founders Track  
\> Zuma — Zama Track  
\> Piggy Quiz — Base Track  
\> Acepay — Flare Track  
\> TuCausa — Filecoin Track  
\> Regalito — AI Track by Protocol Labs  
\> deliberation-agents-governance — Citrea Track  
\> ZKredit — Crecimiento Builders Track by ENS  
\> Micdrop — V0 Track  
\> Elemgame Relay Symbiotic — Symbiotic Track.  
\>  
\> Esto implica:  
\>  
\> VERIFICADO: Sportchain, Zuma, Piggy Quiz, Acepay, TuCausa, Regalito, ZKredit, Micdrop y Elemgame no eran alucinaciones.  
\>  
\> También hay una discrepancia estadística interesante: el dossier hablaba de 660 hackers/194 proyectos, mientras que la recap oficial posterior de Crecimiento habla de 1.300 builders y 320 proyectos.  
\>  
\> Para esta edición, los nombres de los tracks están verificados; las descripciones técnicas exactas de cada proyecto no las consideraría verificadas sin abrir sus respectivos BUIDLs.  
\>  
\> Marzo 2026 — quinta edición  
\>  
\> VERIFICADA. Crecimiento publica:  
\>  
\> AutoBounty — Avalanche Track  
\> Clever — Fiserv Track  
\> TreasuryPilot — GenLayer Track  
\> Consient — Biotech Track  
\> AlephRob — Robotics Track  
\> AutoBounty — además Best Project PL Genesis.  
\>  
\> Por tanto, el dossier nuevamente estaba equivocado al tratar esos nombres como posibles alucinaciones.  
\>  
\> Confirmado además: AutoBounty ganó doble premio.  
\>  
\> No encontré para todos una fuente suficientemente buena que me permita reconstruir problema \+ integración exacta \+ secuencia de demo, así que no voy a inventarlas.  
\>  
\> 1.2 Patrón histórico real que sí cambia la estrategia  
\>  
\> El precedente más útil no es "qué idea exacta ganó", sino qué forma tienen los ganadores.  
\>  
\> Los datos verificables muestran:  
\>  
\> 1\. Los ganadores suelen resolver algo muy concreto.  
\> TornadoCodes: acceso Web3 sin recolección previa de wallets. Certo: integridad de encuestas científicas. Los dos son problemas extremadamente específicos.  
\>  
\> 2\. Los sponsors sí pueden producir múltiples ganadores independientes.  
\> Marzo 2025 y agosto 2025 muestran claramente premios por sponsor/track.  
\>  
\> 3\. La integración con la tecnología importa más que "tener una app linda".  
\> El patrón de 2025-26 refuerza exactamente el supuesto central del dossier: entrar en el modelo mental del sponsor es una ventaja.  
\>  
\> 4\. Los proyectos no tienen que inventar una categoría.  
\> Eso sí coincide con el corpus del dossier: los precedentes reales son herramientas concretas, no "plataformas para revolucionar X".  
\>  
\> 1.3 ¿Hubo ganadores previos con WDK, QVAC o Pears?  
\>  
\> Acá encontré información mucho más interesante que la que existía al momento de escribir el dossier.  
\>  
\> WDK  
\>  
\> VERIFICADO: en el Tether Developers Cup 2026, Tarkam ganó tanto el campeonato general como el track WDK.  
\>  
\> El proyecto es un escrow autocustodiado para premios de torneos de fútbol amateur: pagos de entrada en USDT, estado verificable on-chain y distribución de premios. La descripción del constructor dice que usa WDK para generación de wallet, signing y gasless account abstraction.  
\>  
\> Ese proyecto es especialmente instructivo para ustedes porque combina:  
\>  
\> problema físico concreto \+ dinero real \+ workflow sencillo \+ WDK central.  
\>  
\> No es una wallet "porque sí".  
\>  
\> QVAC  
\>  
\> VERIFICADO: en el Tether Developers Cup 2026, el proyecto Scout quedó como ganador del track QVAC. El sponsor lo identifica como proyecto construido sobre QVAC, y el repositorio se describe como on-device football AI powered by QVAC SDK.  
\>  
\> Además, antes de ese evento, Tether realizó el QVAC Hackathon I, un hackathon exclusivamente orientado a IA local. La organización exigía que toda la inferencia usara @qvac/sdk, sin cloud inference.  
\>  
\> Esto contradice una intuición del dossier: QVAC ya no es una categoría completamente virgen. Hay al menos un precedente fuerte y extremadamente reciente.  
\>  
\> Pero sigue habiendo una ventaja: el corpus de proyectos reales todavía es pequeño.  
\>  
\> Pears / Bare / Hyperswarm  
\>  
\> VERIFICADO: el Tether Developers Cup 2026 tuvo como ganador de Pears a Curva, una watch-party P2P de fútbol.  
\>  
\> El proyecto:  
\>  
\> sincroniza la visualización entre personas en distintos continentes;  
\> tiene chat;  
\> usa traducción local con QVAC;  
\> permite tipping con WDK;  
\> usa Pears con múltiples primitivas de Holepunch;  
\> no tiene servidores.  
\>  
\> Esto es importantísimo para ustedes.  
\>  
\> La idea "Pears \= chat/watch party" ya tiene precedente ganador.  
\>  
\> Por eso no recomendaría copiar P1 del dossier literalmente. La demostración "mando algo sin Internet" sigue siendo extraordinaria, pero ya existe una línea de competencia real alrededor de P2P social \+ football \+ QVAC \+ WDK.  
\>  
\> 1.4 La edición de agosto 2026: ¿qué cambió después del 21?  
\>  
\> Al momento de esta investigación, no encontré una modificación publicada después del 21 de agosto que agregue tracks o cambie los jueces.  
\>  
\> Pero sí pude corregir una incertidumbre del dossier:  
\>  
\> Submission  
\>  
\> VERIFICADO: la web oficial de la edición dice explícitamente que la submission se realiza por DoraHacks.  
\>  
\> Eso resuelve la duda "Hacki o DoraHacks" del dossier: DoraHacks.  
\>  
\> Trabajo previo  
\>  
\> VERIFICADO: la propia página actual de Crecimiento dice que el trabajo previo no está permitido y que el código debe escribirse desde cero salvo aprobación explícita.  
\>  
\> Esto respalda la estrategia conservadora del dossier.  
\>  
\> Tamaño de equipo  
\>  
\> VERIFICADO: hasta 4 personas.  
\>  
\> 48 horas vs 24 horas  
\>  
\> Hay una discrepancia editorial interesante:  
\>  
\> el sitio oficial promociona la edición como "48 hours";  
\> el dossier operativo fija el build efectivo en 12:00 sábado → 12:00 domingo \= 24 horas.  
\>  
\> Para tomar decisiones de ingeniería, trataría las 24 horas como límite duro, porque el cronograma operativo del dossier es mucho más específico.  
\>  
\> "Después del 21 de agosto"  
\>  
\> Hoy es 21 de agosto de 2026\. Por definición, no puedo verificar publicaciones posteriores al 21 todavía. Lo correcto es marcar esta parte como:  
\>  
\> NO VERIFICABLE AÚN.  
\>  
\> 1.5 Dos archivos que no pude verificar como adjuntos  
\>  
\> Busqué específicamente:  
\>  
\> ideas-y-arquitecturas.md  
\> manual-de-campo.md  
\>  
\> No aparecieron como archivos adjuntos disponibles. Solo pude recuperar aleph-dossier-completo.md.  
\>  
\> Por eso no voy a afirmar que "leí enteros" esos dos documentos. Sí usé los principios que están reproducidos explícitamente dentro del dossier, incluidos gate binario, proximidad al usuario, testing con 3 personas, modelo de negocio y demo-first.  
\>  
\> Parte 2 — Ideas  
\> Cómo estoy calculando el valor esperado  
\>  
\> No tomo el premio nominal como ranking.  
\>  
\> Uso:  
\>  
\> EV ≈ calidad esperable × probabilidad de pasar el gate × diferenciación × factibilidad / competencia estimada.  
\>  
\> Y, como pediste, pondero los cinco criterios por igual.  
\>  
\> Las cantidades de competidores son estimaciones mías, no datos de la organización.  
\>  
\> 🥇 \#1 — ProofPack  
\>  
\> Qué es: una CLI para equipos de hackathon que empaqueta repo \+ README \+ video \+ metadata, genera hashes y permite transferir el submission bundle directamente entre laptops sin depender del Wi-Fi del venue.  
\>  
\> Track y premio: 🍐 Pears — 1.º $1.000 \+ General.  
\>  
\> Problema y persona: Martín, organizador de un hackathon, sabe que el peor momento posible para perder conectividad es 15 minutos antes del deadline.  
\>  
\> Primeros 30 segundos del video: pantalla partida. A la izquierda, proofpack status; a la derecha, dos laptops. Se apaga el Wi-Fi. Se ejecuta proofpack send submission.zip. La otra laptop recibe el bundle, verifica el hash y muestra VERIFIED.  
\>  
\> Gate Pears: el juez instala literalmente pear install pear://\<key\>. La CLI funciona como binario independiente. Luego mostramos una OTA: aparece v1.0.0 → v1.0.1, entra un nuevo comando y el cliente se actualiza.  
\>  
\> Technicality / Originality / UI-UX-DX / Practicality / Presentation: 5 / 4 / 5 / 5 / 5 \= 24/25  
\>  
\> Factibilidad 24h: 5/5  
\>  
\> Competidores estimados: 4–7 equipos. Habrá ideas P2P sociales y juegos; casi nadie va a pensar el problema específico de la fiabilidad de submissions.  
\>  
\> Riesgo principal: Pears ocupa más tiempo de lo previsto.  
\>  
\> Mitigación: primero construir el flujo install → send → receive → verify; el envío bidireccional y el discovery complejo se cortan antes que el gate.  
\>  
\> Modelo de negocio: organizadores de hackathons, eventos y universidades pagan por uso/licencia porque reducen fallos de entrega y dependencia de red.  
\>  
\> Prompt de arquitectura  
\>  
\> GATE FIRST.  
\>  
\> Objetivo único:  
\> conseguir que un clon limpio del proyecto pueda instalarse con  
\> pear install pear://\<key\>  
\> y ejecutar:  
\> proofpack send \<file\>  
\> proofpack receive  
\> antes de construir cualquier feature adicional.  
\>  
\> ANTI-HALLUCINATION:  
\> \- Pear/Bare NO ES Node.js.  
\> \- No inventes APIs.  
\> \- No uses módulos de Node salvo que la documentación real de Bare/Pears los confirme.  
\> \- Antes de usar una API, verifica su existencia en la documentación oficial o en el repositorio real.  
\> \- No agregues dependencias innecesarias.  
\> \- Si una API no está confirmada, detente y pregunta.  
\> \- Cada funcionalidad del README debe existir realmente.  
\>  
\> PASO 1:  
\> crear el proyecto desde la rama correcta de hello-pear-bare.  
\> Verificar:  
\> \- npm install funciona  
\> \- pear touch genera un upgrade link real  
\> \- npm start funciona  
\>  
\> PASO 2:  
\> crear la CLI mínima proofpack.  
\> Verificar:  
\> proofpack \--help  
\> proofpack send test.txt  
\>  
\> PASO 3:  
\> implementar transferencia P2P mínima.  
\> Verificar con dos procesos locales.  
\>  
\> PASO 4:  
\> hacer que el receptor calcule SHA-256 y muestre:  
\> filename  
\> size  
\> hash  
\> status=VERIFIED  
\>  
\> PASO 5:  
\> hacer el deploy real con Pear.  
\> Verificar desde una máquina limpia:  
\> pear install pear://\<key\>  
\>  
\> PASO 6:  
\> crear v1.0.1.  
\> Agregar únicamente una feature visible:  
\> proofpack verify  
\> Publicar OTA.  
\> Verificar que una instalación v1.0.0 recibe v1.0.1.  
\>  
\> PASO 7:  
\> crear README y demo script.  
\>  
\> NO CONSTRUIR:  
\> \- autenticación  
\> \- cuentas  
\> \- base de datos  
\> \- nube  
\> \- dashboard web  
\> \- pagos  
\> \- múltiples protocolos P2P  
\> \- sincronización compleja  
\> \- cifrado propio  
\> \- sistema de usuarios  
\> 🥈 \#2 — RemitoLens  
\>  
\> Qué es: conciliación local de remitos manuscritos argentinos contra órdenes de compra y factura.  
\>  
\> Track y premio: 🔷 QVAC — 1.º $1.000 \+ General.  
\>  
\> Problema y persona: Carolina, administrativa de una distribuidora, recibe remitos manuscritos y facturas por WhatsApp y pierde horas verificando diferencias.  
\>  
\> Primeros 30 segundos: se muestra una foto real, arrugada y torcida de un remito. QVAC extrae producto / cantidad / precio; el sistema compara contra la orden y resalta en rojo: 12 cajas pedidas / 10 entregadas.  
\>  
\> Gate QVAC: toda inferencia local con QVAC; OCR/extracción/reasoning pasan por @qvac/sdk. Nada de API cloud.  
\>  
\> Technicality / Originality / UI-UX-DX / Practicality / Presentation: 5 / 4 / 5 / 5 / 5 \= 24/25  
\>  
\> Factibilidad: 4/5  
\>  
\> Competidores estimados: 15–25. Muchos irán a factura porque el sponsor lo dijo explícitamente. Menos irán a remitos argentinos sucios.  
\>  
\> Riesgo: OCR mediocre.  
\>  
\> Mitigación: dataset pequeño pero feo; si el OCR no alcanza, cortar cross-document automation antes que la extracción \+ explicación verificable.  
\>  
\> Modelo de negocio: distribuidoras pagan por puesto/mes porque reducen horas administrativas y errores de recepción.  
\>  
\> Prompt de arquitectura  
\>  
\> GATE FIRST.  
\>  
\> Primera meta:  
\> ejecutar una inferencia real mediante @qvac/sdk sobre una imagen/documento  
\> local y obtener un JSON estructurado.  
\>  
\> ANTI-HALLUCINATION:  
\> \- usar únicamente APIs presentes en la versión instalada de @qvac/sdk  
\> \- no inventar métodos  
\> \- no usar OpenAI, Ollama, Gemini u otra inferencia externa  
\> \- no afirmar OCR multimodal si el SDK real instalado no lo soporta  
\> \- cada ejemplo del README debe ejecutarse realmente  
\>  
\> PASO 1:  
\> instalar QVAC y comprobar quickstart oficial.  
\>  
\> PASO 2:  
\> crear una única función:  
\> extract\_remito(input)  
\>  
\> Debe devolver:  
\> supplier  
\> document\_number  
\> date  
\> items\[\]  
\> confidence  
\>  
\> Verificar con 3 imágenes diferentes.  
\>  
\> PASO 3:  
\> crear una orden de compra local en JSON.  
\>  
\> PASO 4:  
\> comparar remito vs orden de compra.  
\> No usar LLM para comparar números.  
\> Usar lógica determinista.  
\>  
\> PASO 5:  
\> generar explicación humana de discrepancias con QVAC.  
\>  
\> PASO 6:  
\> crear UI para:  
\> documento  
\> datos extraídos  
\> discrepancias  
\> confidence  
\>  
\> PASO 7:  
\> probar con entradas feas y registrar errores.  
\>  
\> NO CONSTRUIR:  
\> \- backend remoto  
\> \- login  
\> \- multiusuario  
\> \- SaaS  
\> \- base SQL  
\> \- billing  
\> \- chatbot genérico  
\> \- agentes autónomos innecesarios  
\> 🥉 \#3 — SpendShield  
\>  
\> Qué es: agente que posee una wallet WDK pero está encerrado dentro de una política de gasto verificable.  
\>  
\> Track y premio: 🟧 WDK CLI/MCP — 1.º $1.000 \+ General.  
\>  
\> Problema y persona: Lucía administra pagos de una agencia y quiere automatizarlos sin permitir que un agente mande dinero a cualquier dirección.  
\>  
\> Primeros 30 segundos: el agente recibe Send $25 to alice. Lo intenta. Pantalla roja: BLOCKED — recipient not allowlisted. Luego recibe una transferencia permitida y la ejecuta.  
\>  
\> Gate WDK: WDK es el backend principal; wallet, balance, signing y envío pasan por WDK/MCP. No es un wrapper de una única llamada.  
\>  
\> Technicality / Originality / UI-UX-DX / Practicality / Presentation: 5 / 5 / 5 / 5 / 5 \= 25/25  
\>  
\> Factibilidad: 4/5  
\>  
\> Competidores estimados: 10–18. "Agente con wallet" es atractivo y aparece explícitamente en el brief; "agente que falla de forma segura" es bastante menos común.  
\>  
\> Riesgo: integración MCP o wallet inesperadamente problemática.  
\>  
\> Mitigación: primero implementar CLI WDK directa; MCP solo después. Si a las 8 horas MCP no está estable, demo desde CLI \+ interfaz propia.  
\>  
\> Modelo de negocio: empresas pagan por automatizar pagos manteniendo límites auditables, porque el coste real es reducir el riesgo de un agente autónomo mal configurado.  
\>  
\> Prompt de arquitectura  
\>  
\> GATE FIRST.  
\>  
\> Meta inicial:  
\> crear una wallet de prueba con @tetherto/wdk y ejecutar:  
\> balance  
\> send  
\> antes de cualquier agente.  
\>  
\> ANTI-HALLUCINATION:  
\> \- usar documentación WDK oficial y versión instalada  
\> \- no inventar métodos  
\> \- no crear wrappers complejos  
\> \- no usar contratos inteligentes  
\> \- todos los imports deben ser ejecutables  
\>  
\> PASO 1:  
\> Node \>= 22.18.  
\> Instalar WDK.  
\> Crear wallet de prueba.  
\> Verificar address.  
\>  
\> PASO 2:  
\> leer balance.  
\> Verificar resultado real.  
\>  
\> PASO 3:  
\> hacer send mínimo.  
\> Verificar transaction/hash.  
\>  
\> PASO 4:  
\> crear policy engine local:  
\> MAX\_TX  
\> MAX\_DAILY  
\> ALLOWLIST  
\> REQUIRE\_CONFIRMATION\_OVER  
\>  
\> PASO 5:  
\> hacer que TODA transferencia pase por policy.  
\>  
\> PASO 6:  
\> agregar MCP/CLI solo para exponer esas operaciones.  
\>  
\> PASO 7:  
\> crear dos demos:  
\> blocked transfer  
\> allowed transfer  
\>  
\> NO CONSTRUIR:  
\> \- smart contracts  
\> \- autonomous trading  
\> \- cross-chain  
\> \- swaps  
\> \- database  
\> \- user auth  
\> \- mobile app  
\> \- token creation  
\> \#4 — DriftBench  
\>  
\> Qué es: benchmark reproducible para medir cuánto falla un modelo pequeño local cuando usa herramientas.  
\>  
\> Track y premio: 🔷 QVAC — 2.º $500  
\>  
\> Problema y persona: Diego, desarrollador que quiere saber si un modelo local realmente puede ejecutar una cadena de tareas, no si una demo aislada "parece inteligente".  
\>  
\> Primeros 30 segundos: tabla en pantalla:  
\>  
\> Baseline 43%  
\> Structured Output 69%  
\> Tool Result Validation 82%  
\> Self-check 88%  
\>  
\> Abajo aparecen tres fallos reales.  
\>  
\> Gate: toda inferencia mediante QVAC; las N corridas también.  
\>  
\> Score: 5 / 5 / 4 / 5 / 4 \= 23/25  
\>  
\> Factibilidad: 5/5  
\>  
\> Competidores: 5–10. El gran filtro es que la mayoría no va a invertir tiempo en evaluación estadística.  
\>  
\> Riesgo: parecer una herramienta para investigadores y no un producto.  
\>  
\> Mitigación: usar una tarea real: conciliación de pagos, generación de recibos o clasificación de tickets.  
\>  
\> Modelo de negocio: equipos que despliegan IA local pagan por el benchmark porque evita enviar un modelo inestable a producción.  
\>  
\> Prompt de arquitectura  
\>  
\> GATE FIRST.  
\>  
\> Primero:  
\> una tarea sencilla debe ejecutarse N veces con QVAC real.  
\>  
\> ANTI-HALLUCINATION:  
\> \- no inventar benchmarks  
\> \- no medir llamadas ficticias  
\> \- guardar cada input/output real  
\> \- registrar errores, no solo éxitos  
\>  
\> PASO 1:  
\> implementar una tarea determinista.  
\>  
\> PASO 2:  
\> conectar QVAC.  
\>  
\> PASO 3:  
\> ejecutar N=20.  
\>  
\> PASO 4:  
\> guardar cada corrida en JSONL.  
\>  
\> PASO 5:  
\> agregar una única mitigación.  
\>  
\> PASO 6:  
\> volver a N=20.  
\>  
\> PASO 7:  
\> generar reporte HTML:  
\> success rate  
\> latency  
\> failure modes  
\>  
\> NO CONSTRUIR:  
\> \- plataforma SaaS  
\> \- dashboard multiusuario  
\> \- fine-tuning  
\> \- RAG enorme  
\> \- agentes multi-modelo  
\> \#5 — PayBatch LATAM  
\>  
\> Qué es: CLI para pagar bounties a colaboradores desde CSV con previsualización y comprobantes verificables.  
\>  
\> Track: 🟧 WDK CLI — 1.º $1.000  
\>  
\> Problema: Sofía, fundadora de una startup argentina, debe pagar a ocho freelancers latinoamericanos en USDT y hoy hace las transferencias una por una.  
\>  
\> Primeros 30 segundos: arrastra contributors.csv; aparece una tabla; clic en Preview; luego Execute; ocho pagos y un receipts.json.  
\>  
\> Gate: WDK CLI como dependencia principal; operaciones de wallet y transferencias vía WDK.  
\>  
\> Score: 5 / 3 / 5 / 5 / 5 \= 23/25  
\>  
\> Factibilidad: 5/5  
\>  
\> Competidores: 12–20.  
\>  
\> Riesgo: parecer exactamente la idea que el sponsor propuso.  
\>  
\> Mitigación: especializarlo en colaboradores LATAM \+ reconciliación de comprobantes.  
\>  
\> Modelo de negocio: equipos pequeños pagan una suscripción baja por automatizar payouts y conciliación.  
\>  
\> Prompt de arquitectura  
\>  
\> GATE FIRST.  
\>  
\> Verificar:  
\> wdk-cli funciona desde clon limpio y puede crear/desbloquear wallet,  
\> consultar balance y enviar una transferencia.  
\>  
\> ANTI-HALLUCINATION:  
\> \- usar únicamente comandos verificados  
\> \- no inventar flags  
\> \- no usar una API distinta a la documentada  
\>  
\> PASO 1:  
\> CSV parser.  
\>  
\> PASO 2:  
\> validation:  
\> address  
\> amount  
\> currency  
\>  
\> PASO 3:  
\> preview table.  
\>  
\> PASO 4:  
\> execute sequentially.  
\>  
\> PASO 5:  
\> generate receipts.json.  
\>  
\> PASO 6:  
\> rerun with one invalid row.  
\>  
\> NO CONSTRUIR:  
\> \- ERP  
\> \- payroll completo  
\> \- fiat conversion  
\> \- smart contracts  
\> \- mobile app  
\> \#6 — LocalLedger  
\>  
\> Qué es: convierte un PDF/CSV de movimientos bancarios \+ facturas en un libro de conciliación local, con explicación verificable.  
\>  
\> Track: 🔷 QVAC — 1.º  
\>  
\> Problema: Mariano, contador de una pyme, no quiere enviar información financiera de clientes a una API externa.  
\>  
\> Primeros 30 segundos: factura AR1.240.000;extractoAR1.180.000; pantalla: MISMATCH — AR$60.000.  
\>  
\> Gate: OCR/extracción/reasoning local con QVAC.  
\>  
\> Score: 5 / 4 / 5 / 5 / 5 \= 24/25  
\>  
\> Factibilidad: 4/5  
\>  
\> Competidores: 20–30.  
\>  
\> Riesgo: competir exactamente contra el ejemplo estrella del sponsor.  
\>  
\> Mitigación: no hacer "invoice AI"; hacer audit trail de conciliación y mostrar incertidumbre \+ regla determinista.  
\>  
\> Modelo de negocio: estudios contables pagan por puesto porque privacidad y tiempo administrativo tienen valor económico claro.  
\>  
\> Prompt de arquitectura  
\>  
\> GATE FIRST.  
\>  
\> Objetivo:  
\> extraer un documento financiero localmente con QVAC y obtener JSON.  
\>  
\> ANTI-HALLUCINATION:  
\> \- ninguna inferencia cloud  
\> \- APIs verificadas  
\> \- números comparados mediante código determinista  
\>  
\> PASO 1:  
\> extract invoice.  
\>  
\> PASO 2:  
\> extract bank movement.  
\>  
\> PASO 3:  
\> normalize currency/date/reference.  
\>  
\> PASO 4:  
\> reconcile deterministically.  
\>  
\> PASO 5:  
\> use QVAC to generate human-readable explanation.  
\>  
\> PASO 6:  
\> show confidence and unresolved cases.  
\>  
\> NO CONSTRUIR:  
\> \- accounting SaaS  
\> \- bank connectors  
\> \- live banking APIs  
\> \- tax filing  
\> \- chatbot  
\> \#7 — SafeDrop  
\>  
\> Qué es: una CLI que permite a una escuela o evento distribuir paquetes de archivos a laptops cercanas aunque el Wi-Fi se caiga.  
\>  
\> Track: 🍐 Pears — 1.º  
\>  
\> Problema: Laura, docente, quiere distribuir material a 30 computadoras de un aula con Wi-Fi inestable.  
\>  
\> Primeros 30 segundos: 3 laptops sin Internet; una descarga un paquete de 80 MB desde otra; aparece peer transfer complete.  
\>  
\> Gate: pear install pear://\<key\> \+ OTA.  
\>  
\> Score: 5 / 4 / 4 / 5 / 5 \= 23/25  
\>  
\> Factibilidad: 4/5  
\>  
\> Competidores: 4–8.  
\>  
\> Riesgo: discovery entre muchos peers.  
\>  
\> Mitigación: empezar con transferencia 1-to-1; multi-peer es feature recortable.  
\>  
\> Modelo de negocio: escuelas, eventos y empresas pagan por despliegue local sin infraestructura.  
\>  
\> Prompt de arquitectura  
\>  
\> GATE FIRST.  
\>  
\> Pear install debe funcionar antes de añadir descubrimiento complejo.  
\>  
\> ANTI-HALLUCINATION:  
\> \- Pear/Bare no es Node  
\> \- confirmar cada API en documentación real  
\> \- evitar módulos Node no soportados  
\>  
\> PASO 1:  
\> hello-pear-bare funcional.  
\>  
\> PASO 2:  
\> transferir un archivo entre dos peers.  
\>  
\> PASO 3:  
\> agregar manifest:  
\> filename  
\> size  
\> hash  
\>  
\> PASO 4:  
\> mostrar progreso.  
\>  
\> PASO 5:  
\> deploy con pear://.  
\>  
\> PASO 6:  
\> OTA visible.  
\>  
\> NO CONSTRUIR:  
\> \- account system  
\> \- cloud server  
\> \- encrypted messaging  
\> \- multi-tenant backend  
\> \- database  
\> \#8 — AgentReceipt  
\>  
\> Qué es: agente de pagos que no solo ejecuta una transferencia WDK sino que produce un recibo humano \+ JSON reproducible.  
\>  
\> Track: 🟧 WDK CLI/MCP — 1.º $1.000  
\>  
\> Problema: Tomás, encargado de operaciones, necesita saber exactamente qué pagó un agente, a quién, bajo qué regla y con qué resultado.  
\>  
\> Demo: Pay Juan $75 → policy → transaction → Receipt \#0042 con wallet, amount, timestamp, hash y reason.  
\>  
\> Gate: WDK wallet \+ actual transaction.  
\>  
\> Score: 5 / 4 / 5 / 5 / 5 \= 24/25  
\>  
\> Factibilidad: 5/5  
\>  
\> Competidores: 7–12.  
\>  
\> Riesgo: parecer wrapper de WDK.  
\>  
\> Mitigación: el producto central es auditabilidad, no enviar dinero; tener policy \+ receipt \+ failure recovery.  
\>  
\> Modelo de negocio: equipos que delegan pagos a agentes pagan por trazabilidad y control.  
\>  
\> Prompt de arquitectura  
\>  
\> GATE FIRST.  
\>  
\> Confirmar wallet \+ transaction real.  
\>  
\> ANTI-HALLUCINATION:  
\> cada receipt debe corresponder a una transacción real.  
\> Nunca mockear hashes.  
\>  
\> PASO 1:  
\> WDK wallet.  
\>  
\> PASO 2:  
\> send.  
\>  
\> PASO 3:  
\> capture actual transaction result.  
\>  
\> PASO 4:  
\> build typed receipt.  
\>  
\> PASO 5:  
\> store local JSONL.  
\>  
\> PASO 6:  
\> CLI:  
\> agentreceipt list  
\> agentreceipt show \<id\>  
\>  
\> NO CONSTRUIR:  
\> \- block explorer  
\> \- custom chain  
\> \- contracts  
\> \- AI chatbot  
\> \#9 — FailSafe Remittance  
\>  
\> Qué es: onboarding gasless para alguien que recibe USDT y no debería tener que comprar gas antes de enviar.  
\>  
\> Track: 🟧 WDK gasless — 2.º $500  
\>  
\> Problema: Elena recibe stablecoins en una wallet nueva pero no puede moverlas porque tiene saldo cero del token de gas.  
\>  
\> Primeros 30 segundos: Wallet: 0 gas → recibe USDT → Send → paga comisión en USDT.  
\>  
\> Gate: módulo gasless real, paymaster operativo y flujo verificable.  
\>  
\> Score: 5 / 5 / 4 / 5 / 5 \= 24/25  
\>  
\> Factibilidad: 3/5  
\>  
\> Competidores: 4–8.  
\>  
\> Riesgo: infraestructura paymaster/testnet.  
\>  
\> Mitigación: resolver el paymaster antes del comienzo; si no, matar esta idea a la hora 3\.  
\>  
\> Modelo de negocio: wallets/remittance apps pagan por onboarding porque cada usuario perdido antes de su primera transferencia tiene coste de adquisición.  
\>  
\> Prompt de arquitectura  
\>  
\> GATE FIRST.  
\>  
\> ANTES DEL PRODUCTO:  
\> \- paymaster real  
\> \- red soportada  
\> \- token soportado  
\> \- transferencia gasless real  
\>  
\> ANTI-HALLUCINATION:  
\> \- no asumir que el paymaster existe  
\> \- verificar proveedor  
\> \- verificar token/network  
\> \- no usar contratos inventados  
\>  
\> PASO 1:  
\> crear wallet de prueba.  
\>  
\> PASO 2:  
\> conseguir USDT.  
\>  
\> PASO 3:  
\> hacer transferencia gasless real.  
\>  
\> PASO 4:  
\> mostrar fee quote.  
\>  
\> PASO 5:  
\> crear UI mínima onboarding.  
\>  
\> NO CONSTRUIR:  
\> \- cross-chain  
\> \- swaps  
\> \- bridge  
\> \- social wallet  
\> \- account recovery  
\> \#10 — InvoiceTruth  
\>  
\> Qué es: una herramienta que no dice "la factura es correcta", sino exactamente qué partes del documento no pudo verificar.  
\>  
\> Track: 🔷 QVAC — 2.º $500  
\>  
\> Problema: Andrea, auditora, pierde tiempo revisando documentos donde el modelo "adivina" los datos dudosos.  
\>  
\> Demo: factura borrosa → TOTAL confidence 96%, CUIT confidence 61%, date confidence 99%; solo CUIT enviado a revisión.  
\>  
\> Gate: QVAC local en extracción y análisis.  
\>  
\> Score: 5 / 5 / 5 / 5 / 5 \= 25/25  
\>  
\> Factibilidad: 4/5  
\>  
\> Competidores: 7–12.  
\>  
\> Riesgo: confidence mal calibrada.  
\>  
\> Mitigación: no mostrar una probabilidad inventada; mostrar estados verified / uncertain / missing derivados de validaciones reales.  
\>  
\> Modelo de negocio: estudios contables pagan porque reducen la revisión manual sin fingir precisión.  
\>  
\> Prompt de arquitectura  
\>  
\> GATE FIRST.  
\>  
\> Construir extraction local con QVAC.  
\>  
\> ANTI-HALLUCINATION:  
\> NO inventar confidence numérica si el modelo no entrega una métrica válida.  
\> Usar:  
\> verified  
\> uncertain  
\> missing  
\>  
\> PASO 1:  
\> extract fields.  
\>  
\> PASO 2:  
\> validate deterministic fields.  
\>  
\> PASO 3:  
\> mark uncertainty.  
\>  
\> PASO 4:  
\> generate human explanation.  
\>  
\> PASO 5:  
\> test on five different documents.  
\>  
\> NO CONSTRUIR:  
\> \- automated tax filing  
\> \- accounting ERP  
\> \- generic AI assistant  
\> \#11 — DeadlineOS  
\>  
\> Qué es: una herramienta que controla automáticamente qué partes de un hackathon están realmente listas para enviar.  
\>  
\> Track: ☀️ General — 1.º/2.º $500  
\>  
\> Problema: Emiliano, primerizo en hackathons, tiene un proyecto funcionando a las 10:15 pero README, video, links y variables están rotos.  
\>  
\> Primeros 30 segundos: terminal:  
\>  
\> CODE      ✅  
\> README    ✅  
\> VIDEO     ✅  
\> REPO      ✅  
\> DEMO      ✅  
\> CLEAN CLONE ❌  
\> .env      ❌  
\>  
\> Después corrige y vuelve a verde.  
\>  
\> Gate sponsor: no aplica; General no tiene gate técnico de sponsor.  
\>  
\> Score: 4 / 5 / 5 / 5 / 5 \= 24/25  
\>  
\> Factibilidad: 5/5  
\>  
\> Competidores: 8–15.  
\>  
\> Riesgo: parecer una checklist con UI.  
\>  
\> Mitigación: convertirlo en verificador real de submission, no gestor de tareas.  
\>  
\> Modelo de negocio: hackathons y universidades pagan por reducir submissions inválidas y soporte manual.  
\>  
\> Prompt de arquitectura  
\>  
\> GATE FIRST.  
\>  
\> Debe existir un comando:  
\> deadlineos check  
\>  
\> que realmente inspeccione el repositorio.  
\>  
\> ANTI-HALLUCINATION:  
\> cada check debe ser verificable localmente.  
\> Nunca marcar PASS por heurística falsa.  
\>  
\> PASO 1:  
\> repo detection.  
\>  
\> PASO 2:  
\> README validation.  
\>  
\> PASO 3:  
\> required URL validation.  
\>  
\> PASO 4:  
\> .env.example validation.  
\>  
\> PASO 5:  
\> build/test validation.  
\>  
\> PASO 6:  
\> generate report.  
\>  
\> NO CONSTRUIR:  
\> \- project management suite  
\> \- chat  
\> \- AI copilot  
\> \- team accounts  
\> \- cloud dashboard  
\> \#12 — ReceiptFlow  
\>  
\> Qué es: una herramienta local para un pequeño comercio que convierte comprobantes de pago en un ledger de operaciones y detecta inconsistencias.  
\>  
\> Track: ☀️ General — 1.º/2.º $500  
\>  
\> Problema: Sergio, dueño de un comercio, recibe comprobantes por WhatsApp y no tiene una forma rápida de verificar cuáles ya fueron conciliados.  
\>  
\> Primeros 30 segundos: entra una carpeta de comprobantes; el sistema muestra:  
\>  
\> 17 pagos  
\> 15 matched  
\> 1 duplicate  
\> 1 unresolved  
\>  
\> Gate sponsor: ninguno obligatorio para General; se podría añadir WDK como integración secundaria solo si el tiempo sobra.  
\>  
\> Score: 4 / 4 / 5 / 5 / 5 \= 23/25  
\>  
\> Factibilidad: 5/5  
\>  
\> Competidores: 15–25.  
\>  
\> Riesgo: convertirlo en otra app contable genérica.  
\>  
\> Mitigación: limitar el scope a comprobantes \+ conciliación.  
\>  
\> Modelo de negocio: pequeños comercios pagan una tarifa mensual baja porque ahorrar una hora administrativa por semana ya justifica el precio.  
\>  
\> Prompt de arquitectura  
\>  
\> GATE FIRST.  
\>  
\> Primero:  
\> un comprobante local debe entrar y producir un objeto estructurado.  
\>  
\> ANTI-HALLUCINATION:  
\> \- no usar API cloud  
\> \- no inventar OCR APIs  
\> \- validar cada campo  
\> \- marcar unknown cuando no sea visible  
\>  
\> PASO 1:  
\> input image.  
\>  
\> PASO 2:  
\> extract fields.  
\>  
\> PASO 3:  
\> normalize.  
\>  
\> PASO 4:  
\> deduplicate.  
\>  
\> PASO 5:  
\> show matched/unresolved.  
\>  
\> PASO 6:  
\> export CSV/JSON.  
\>  
\> NO CONSTRUIR:  
\> \- banking integrations  
\> \- payments  
\> \- accounting suite  
\> \- user management  
\> Ranking final por valor esperado  
\> \#	Idea	Track	Score	Factibilidad	Competencia est.	Gate	EV relativo  
\> 1	ProofPack	Pears	24	5	4–7	Muy alto	9.5/10  
\> 2	RemitoLens	QVAC	24	4	15–25	Alto	8.9/10  
\> 3	SpendShield	WDK P1	25	4	10–18	Medio	8.6/10  
\> 4	DriftBench	QVAC P2	23	5	5–10	Alto	8.5/10  
\> 5	PayBatch LATAM	WDK P1	23	5	12–20	Medio	8.0/10  
\> 6	InvoiceTruth	QVAC P2	25	4	7–12	Alto	7.9/10  
\> 7	SafeDrop	Pears	23	4	4–8	Muy alto	7.8/10  
\> 8	AgentReceipt	WDK P1	24	5	7–12	Medio	7.7/10  
\> 9	FailSafe Remittance	WDK P2	24	3	4–8	Muy alto	7.2/10  
\> 10	DeadlineOS	General	24	5	8–15	Ninguno	6.6/10  
\> 11	LocalLedger	QVAC	24	4	20–30	Alto	6.5/10  
\> 12	ReceiptFlow	General	23	5	15–25	Ninguno	5.9/10  
\> Parte 3 — Recomendación  
\> Idea primaria: ProofPack  
\>  
\> No elegiría la idea "más sofisticada". Elegiría la que tiene la mejor relación:  
\>  
\> gate difícil \+ demo obvia \+ problema específico \+ competencia baja \+ implementación corta.  
\>  
\> Y eso hoy es Pears.  
\>  
\> Por qué no elegiría P1 original del dossier  
\>  
\> El dossier proponía sala/chat/transferencia offline. Es buena idea, pero ahora tenemos una señal que no existía al redactarlo: el ganador reciente de Pears del Tether Developers Cup fue Curva, una aplicación P2P social/football con watch-party, chat, QVAC y tipping.  
\>  
\> Yo evitaría entrar a competir contra ese patrón con un "otro chat P2P".  
\>  
\> ProofPack cambia completamente el problema:  
\>  
\> no vendemos P2P; usamos P2P para solucionar un punto de fallo crítico del propio hackathon.  
\>  
\> Eso es mucho más específico.  
\>  
\> Por qué no elegiría QVAC como primaria  
\>  
\> QVAC tiene más dinero, pero ya existen señales claras de competencia:  
\>  
\> el sponsor puso conciliación de facturas como caso estrella;  
\> ya existe un QVAC Hackathon específico;  
\> Scout ganó el track QVAC del Tether Developers Cup.  
\>  
\> QVAC sigue siendo excelente, pero yo lo usaría como primera alternativa, no como apuesta principal.  
\>  
\> Y hay una excepción  
\>  
\> Si en el workshop de mañana los ingenieros de QVAC dicen explícitamente:  
\>  
\> "Queremos ver evaluación/benchmarking; casi nadie está haciendo esto"  
\>  
\> entonces DriftBench sube a \#1.  
\>  
\> Por qué no elegiría WDK como primaria  
\>  
\> WDK probablemente sea el track más sencillo de producir, pero también es el que tiene menos fricción de entrada: el propio dossier señala que no requiere smart contracts y que la CLI ya está hecha.  
\>  
\> Además ya tenemos un ganador extremadamente claro y reciente:  
\>  
\> Tarkam \= WDK \+ problema concreto \+ dinero real \+ workflow real.  
\>  
\> Por eso no intentaría ganar WDK haciendo "otra wallet".  
\>  
\> SpendShield es la excepción porque convierte WDK en un sistema de seguridad, no en la feature.  
\>  
\> Plan de las 24 horas para ProofPack  
\> Viernes, antes de empezar  
\>  
\> No construir código del producto.  
\>  
\> Solo:  
\>  
\> instalar Pear CLI;  
\> verificar pear \--version;  
\> preparar Node/Bare;  
\> leer hello-pear-bare;  
\> ejecutar pear touch;  
\> probar el entorno;  
\> dejar lista la herramienta de grabación;  
\> descargar/instalar todo lo necesario;  
\> decidir que el objetivo no negociable es pear install pear://....  
\> Sábado 12:00–13:00  
\> 12:00  
\>  
\> Crear repo.  
\>  
\> Primer commit:  
\>  
\> docs: project scope  
\>  
\> README inicial:  
\>  
\> Problem  
\> Demo  
\> Pears integration  
\> What must work  
\> What we explicitly won't build  
\> 12:30  
\>  
\> Hacer funcionar hello-pear-bare con un comando trivial:  
\>  
\> proofpack \--help  
\> Decisión 13:00  
\>  
\> Si no pueden ejecutar Pear correctamente desde cero:  
\>  
\> cortar toda idea de producto y convertirlo en una CLI mínima que pase el gate.  
\>  
\> No se discute.  
\>  
\> 13:00–15:00 — Gate  
\>  
\> Implementar solamente:  
\>  
\> proofpack send file  
\> proofpack receive  
\>  
\> entre dos peers.  
\>  
\> Nada de UI.  
\>  
\> Nada de auth.  
\>  
\> Nada de cuentas.  
\>  
\> 15:00–17:00 — integridad  
\>  
\> Agregar:  
\>  
\> filename  
\> size  
\> sha256  
\>  
\> El receptor debe mostrar:  
\>  
\> TRANSFER COMPLETE  
\> HASH VERIFIED  
\> Punto de decisión 17:00  
\>  
\> Si una máquina puede:  
\>  
\> instalar desde pear://;  
\> recibir un archivo;  
\> verificar hash;  
\>  
\> el proyecto ya existe.  
\>  
\> Todo lo demás es mejora.  
\>  
\> 17:00–19:00 — OTA  
\>  
\> Crear v1.0.1.  
\>  
\> Agregar un único comando:  
\>  
\> proofpack verify  
\>  
\> Mostrar que un cliente instalado previamente recibe la actualización.  
\>  
\> Este momento es el corazón de la demo porque demuestra que entendieron Pear y no solo utilizaron un canal P2P.  
\>  
\> 19:00–21:00 — UX  
\>  
\> Hacer la CLI extremadamente limpia:  
\>  
\> proofpack send submission.zip  
\>  
\> Peer found  
\> Uploading ........ 100%  
\>  
\> SHA256  
\> a81f...  
\>  
\> Verified ✓  
\>  
\> Agregar:  
\>  
\> proofpack status  
\> proofpack \--help  
\> 21:00–22:00 — prueba externa  
\>  
\> Dar el comando a tres personas del venue.  
\>  
\> No explicar demasiado.  
\>  
\> Medir:  
\>  
\> ¿pudieron instalar?  
\> ¿entendieron qué hace?  
\> ¿supieron enviar?  
\> ¿entendieron qué significa VERIFIED?  
\>  
\> Anotar exactamente las tres fricciones.  
\>  
\> Eso les da evidencia real para Practicality y UX, en vez de decir "lo probamos con amigos".  
\>  
\> 22:00–00:00 — robustez  
\>  
\> Probar:  
\>  
\> archivo pequeño;  
\> archivo grande;  
\> nombre con espacios;  
\> peer que desaparece;  
\> archivo corrupto;  
\> instalación limpia.  
\> Regla  
\>  
\> No agregar features.  
\>  
\> Solo arreglar cosas visibles.  
\>  
\> 00:00–02:00 — congelamiento técnico  
\>  
\> Generar:  
\>  
\> README final;  
\> comandos exactos;  
\> versión;  
\> pear://;  
\> plataformas soportadas;  
\> screenshots.  
\> 02:00–06:00 — dormir por turnos  
\>  
\> No intentaría hacer una all-nighter continua.  
\>  
\> Con una demo de CLI, el coste de una estupidez a las 05:00 es mayor que las cuatro horas adicionales de features.  
\>  
\> Domingo 06:00–07:00 — submission hardening  
\>  
\> Un integrante hace una instalación desde cero.  
\>  
\> Otro lee README como si fuera juez.  
\>  
\> Otro verifica link Pear.  
\>  
\> Otro prepara video.  
\>  
\> 07:00–08:00 — demo rehearsal  
\>  
\> Guion:  
\>  
\> 0:00–0:10  
\>  
\> "Hackathon deadlines fail for a boring reason: the network."  
\>  
\> Pantalla: Wi-Fi OFF.  
\>  
\> 0:10–0:35  
\>  
\> pear install pear://...  
\>  
\> 0:35–1:00  
\>  
\> proofpack send  
\>  
\> 1:00–1:20  
\>  
\> Hash verificado.  
\>  
\> 1:20–1:40  
\>  
\> OTA.  
\>  
\> 1:40–2:00  
\>  
\> "Built on Pear because the distribution layer itself is peer-to-peer."  
\>  
\> 2:00–2:30  
\>  
\> Usuario \+ modelo económico \+ test con 3 personas.  
\>  
\> 2:30–3:00  
\>  
\> Limitaciones \+ qué construirían después.  
\>  
\> 08:00–09:00 — grabar  
\>  
\> No graben a las 11:30.  
\>  
\> El propio dossier identifica precisamente ese momento como uno de los mayores puntos de fallo.  
\>  
\> 09:00–10:00 — prueba final  
\>  
\> Tres personas del venue.  
\>  
\> Último clean clone.  
\>  
\> Último pear install.  
\>  
\> Última OTA.  
\>  
\> 10:00–10:30 — entregar  
\>  
\> Objetivo: submission a las 10:30.  
\>  
\> No a las 11:58.  
\>  
\> Punto de abandono absoluto  
\>  
\> Hay una condición que usaría como regla de equipo:  
\>  
\> Si a las 15:00 del sábado no tenemos una instalación real con pear install pear://\<key\>, ProofPack deja de ser un producto y pasa a ser una demo mínima de Pear.  
\>  
\> Y una segunda:  
\>  
\> Si a las 19:00 no tenemos OTA real, cortamos cualquier feature de producto que no sea necesaria para demostrar install \+ transfer \+ verify.  
\>  
\> No intentaría salvar una arquitectura ambiciosa.  
\>  
\> Repliegue: DriftBench  
\>  
\> Este sería mi backup porque tiene una propiedad muy diferente:  
\>  
\> no depende de una demo de red distribuida difícil de depurar.  
\>  
\> Si Pear se rompe, DriftBench permite que tres personas construyan:  
\>  
\> una tarea;  
\> una inferencia QVAC;  
\> 20 corridas;  
\> logging;  
\> comparación entre mitigaciones;  
\> reporte.  
\>  
\> Y, sobre todo, su ventaja competitiva es evidencia, no código voluminoso.  
\>  
\> El propio brief de QVAC dice que quiere "pruebas, no impresiones": repetir N veces, medir éxito y mostrar también los fallos.  
\>  
\> Mi decisión final  
\> Apostaría:  
\>  
\> 🥇 ProofPack — Pears  
\>  
\> Porque el gate es brutal, verificable y convierte automáticamente la demo en un argumento de producto.  
\>  
\> Repliegue:  
\>  
\> 🥈 DriftBench — QVAC  
\>  
\> Porque es probablemente la mejor manera de atacar el segundo premio de QVAC sin entrar a competir frontalmente por la conciliación de facturas.  
\>  
\> Tercera opción:  
\>  
\> 🥉 SpendShield — WDK  
\>  
\> Porque el "agent wallet que dice NO" es mucho más memorable que otro bot que simplemente manda USDT.  
\>  
\> Y la señal histórica más importante que me deja la investigación es esta:  
\>  
\> No intenten descubrir "la próxima gran categoría". Los ganadores reales de Aleph tienden a convertir una tecnología nueva en una herramienta extremadamente concreta para una persona concreta. TornadoCodes, Certo, Tarkam y Curva son ejemplos distintos de la misma mecánica.  
\>  
\> Para mañana, yo preferiría que el jurado recuerde "los que hicieron que el submission sobreviviera aunque se cayera Internet" antes que "otro equipo que hizo un agente con AI y una wallet".

Esto me devolvió el análisis una i.a y esto devolvió otra:

Asumiendo que necesitan maximizar el valor esperado inmediatamente y que mi formato debe ajustarse a restricciones operativas estrictas, aquí tienen el análisis priorizado. Como inteligencia artificial, tengo bloqueado el acceso a búsquedas web en vivo por instrucciones del sistema, por lo que debo ser totalmente frontal: no puedo verificar los repositorios externos ni el historial en línea.  
1\. Verificación de Historial

\* NO VERIFICADA: La lista histórica de ganadores no puede ser contrastada con internet en este momento.  
\* VERIFICADO: De la lista pública de proyectos presentados en agosto 2024 sí figuran "Tornado Codes" y "ValidAr".  
\* VERIFICADO: Las tecnologías WDK, QVAC y Pears son versiones beta o plataformas nuevas. Carecen de un historial amplio de hackathons.

2\. Idea Primaria: FacturIA Local

\* Track: QVAC (Premios 1 y 2\) y General.  
\* Problema: Un contador independiente que no puede subir comprobantes arrugados o informales a una IA en la nube por privacidad del cliente.  
\* Demo y Sponsor: Mostrar una foto sacada con el celular procesada con OCR local. El agente cruza datos, muestra incertidumbre y reporta una tabla de fiabilidad con N corridas.  
\* Puntaje y Factibilidad: Total 22/25. Factibilidad 3/5. El riesgo es la calidad del OCR. Si a las 12 horas el OCR falla constantemente, corten la extracción dinámica y usen imágenes pre-procesadas para asegurar que la inferencia local funcione.

3\. Idea de Repliegue: No-Fi Sync

\* Track: Pears y General.  
\* Problema: Hackers en un evento masivo (como el mismo Aleph Hackathon) que sufren caídas de red y no pueden compartir archivos.  
\* Demo y Sponsor: Apagar el wifi en cámara y enviar un archivo por BLE-Swarm. Demostrar la instalación exitosa con \`pear install pear://\<key\>\`.  
\* Puntaje y Factibilidad: Total 20/25. Factibilidad 4/5. El riesgo es la inestabilidad del Bluetooth. La mitigación es usar Hyperswarm por defecto y BLE solo como modo offline secundario.

4\. Recomendación y Plan de Ejecución

\* Elección: Avancen con FacturIA Local porque apunta exactamente al caso de conciliación de facturas que el sponsor señaló como clave.  
\* 12:00 \- 14:00 (Sábado): Redacten el guion del video antes de programar y validen el enfoque técnico con la jueza Raquel Carrasco.  
\* 06:00 (Domingo): Congelamiento estricto de código. Corten las funcionalidades incompletas y dedíquense exclusivamente a grabar el video, redactar el README y preparar los permalinks.  
\* Prompt de Arquitectura: "Actúa como experto en QVAC. Paso 1: Configura el gate técnico (inferencia 100% local). Paso 2: Implementa la extracción sin inventar APIs de Node.js. Paso 3: Detente para verificar antes de orquestar el agente."

Estoy leyendo el documento de ideas y arquitecturas, podrías a partir de las que ya tenemos agregar a ese documento una idea que sea simple y pueda competir, darme a entender mejor para cuáles bountys estaría participando y de cuánto es el valor, hay alguna idea que abarque muchos bountys o al menos 2 y les haga un buen uso?  Además dame una parte orientativa con las ideas que esté en un subtítulo o como nota porque mis compañeros de equipo son vibecoders y necesitan tener también una mejor noción de lo que implica cada idea y su arquitectura detrás y qué podría hacer cada uno, como hacemos para vibecodear todos juntos en un entorno o un mismo proyecto, como diviríamos cada tarea de cada idea que roles podría cumplir cada uno

\# Claude — Aug 21, 2026, 5:49 PM

El otro análisis hizo algo que yo no pude: verificó los ganadores. Tenía razón y yo estaba equivocado — los nombres eran reales. Y encontró algo que cambia tu pregunta sobre los bounties múltiples.

El anexo está agregado al documento de ideas. Cuatro cosas nuevas.

\*\*Primero, una corrección mía.\*\* Marqué los ganadores anteriores como posiblemente alucinados y me equivoqué: eran reales. Sportchain, Piggy Quiz, AutoBounty, Clever, TreasuryPilot, Consient — todos verificados contra fuentes de Crecimiento. La cautela era razonable con lo que yo tenía, pero la conclusión estaba mal, y conviene que lo sepas porque significa que los precedentes que te habían pasado al principio sí sirven como referencia.

Y ahí hay un dato que responde directo a tu pregunta: \*\*AutoBounty ganó el track de Avalanche y además el Best Project. Un proyecto, dos premios.\*\* Apuntar a varios bounties con una sola construcción funciona en este evento específicamente.

\*\*Segundo, sobre la regla de "1 pista por patrocinador": creo que fui demasiado pesimista.\*\* Cada documento \*es\* una pista (WDK, Pears, QVAC) y adentro tiene sub-pistas. Leído así, la frase significa "dentro de este documento elegí una de las dos sub-pistas", no "elegí uno de los tres documentos". Y el FAQ oficial pregunta explícitamente si se puede aplicar a varios bounties y responde que sí, a uno o a varios. Con esa lectura, un solo proyecto puede alcanzar \*\*$3.500\*\* (mil de QVAC \+ mil de WDK \+ mil de Pears \+ quinientos del General) en lugar de $1.500. Confirmalo mañana, pero fijate que la decisión no cambia: construir algo que califique para varios y anotarlo a todos los que cumpla es correcto en los dos escenarios.

\*\*Tercero, la idea multi-bounty: Vaquita.\*\* Sacás foto de la cuenta del restaurante, QVAC la lee en tu teléfono, Pears encuentra a los demás de la mesa sin internet, cada uno marca lo que consumió y se salda en USD₮ con WDK gasless. Las tres tecnologías son imprescindibles y se puede defender en quince segundos: el ticket tiene datos que no querés subir a ninguna nube, sin servidor no hay cuentas ni nada que se caiga, y el que te debe cuatro mil pesos no va a comprar ETH para pagarte.

Lo que me convenció de proponerla es que \*\*Curva ganó el track de Pears del Tether Developers Cup haciendo exactamente esa combinación\*\* — P2P con traducción por QVAC y propinas por WDK. La forma está probada; el dominio es distinto.

Le puse una escalera de repliegue de cinco escalones donde \*\*cada escalón sigue siendo una entrega válida a un bounty distinto\*\*: gate de Pear (1.000),másdivisiónmanual(1.500), más QVAC (2.500),másWDK(3.500). Construís en ese orden y anotás solo los escalones que cerraste. Nunca te anotás a un bounty que no cumpliste, porque eso es justo lo que descartan sin revisar.

\*\*Cuarto, la idea simple: Ventanilla.\*\* Foto de la carta que te pide trámites, fotos de los papeles que tenés, y te dice qué te falta. Dos inferencias y una comparación de conjuntos. Sin red, sin pagos, sin estado distribuido. Un equipo de vibecoders la tiene andando en ocho horas y usa las otras dieciséis en que se vea impecable, que es donde casi nadie invierte. Factibilidad 5 de 5\.

\*\*Y la sección para tus compañeros.\*\* El problema que nadie avisa es que cuatro personas con asistentes de IA sobre el mismo repo no es cuatro veces más rápido — sin reglas es más lento que una sola persona, porque los agentes no saben qué está tocando el otro. La solución no es técnica sino de organización: cada uno es dueño de una carpeta y nadie edita la de otro.

Ahí está el protocolo completo: el \`CLAUDE.md\` con los límites de propiedad, el \`CONTRATO.md\` de cuatro líneas que define qué recibe y devuelve cada módulo, la regla de los muñecos en la hora dos (cada módulo devolviendo datos falsos con la forma correcta, para que los cuatro avancen en paralelo desde el principio en vez de esperar), y ramas por persona con merge en el reloj a las 14, 16, 18 y 20\.

Los roles son cuatro y ninguno es de ayudante: Integración (pasa el gate, dueño de \`main\`, el trabajo más importante y menos glamoroso), Núcleo, Cara — interfaz y README, que es un quinto de la nota y lo primero que se sacrifica — y Relato, que escribe el guion antes de que nadie codee, habla con los mentores, testea con gente del venue y entrega. Ese último no requiere programar. Hay una tabla de reparto hora por hora para Vaquita, Llave, Banco de pruebas y Ventanilla.

Si mañana te confirman lo de las pistas, avisame y ajusto el mapa de plata.

\# Human — Aug 21, 2026, 9:05 PM

Estoy leyendo el contenido de las ideas, o sea la primer idea lo único que hace es enviar un mensaje a otro y hacerlo de manera segura entendí o sea que no quede en ningún servidor ni nada? Ok.. no sé muy bien a que baunty apunta.  De la idea 1 que era llave, pasa a la idea vecino que sería al parecer la 3, la analizo. Bueno, es una buena idea, pero siento que podría estar en un repositorio de github, no es algo wow en cuanto a impresión, pero bueno, dejémoslo, tengo entendido que esta diea como la de la llave entran en lo de usar la tecnología peer, tambien la de duelo vendría tomando el uso de peer, pero no me convence del todo. Luego lo siguiente con QVAC la idea traducida a palabras simples es el uso de una ia local. No tenemos ningun remito como para que se pueda poner a prueba el proyecto de analizar los remitos, aunque en un bien practico es algo bastante util, debo admitirlo, pero no tenemos 20 remitos para ejecutarlos en pruebas.

Me gustaría que resumas cada idea que planteás vos, en lenguaje simple, porque hay mucha tecnicidad en el texto, de manera tal que lo expliques un poco que propone cada requisito y como lo planteas vos en una idea como estas pero explicada de manera simple, asi yo puedo usar la imaginación y crear algo a partir del entendiminento y el jeemplo de las ideas estas, también explicá si tienen algun requisito como el de los remitos en la idea aquella. La idea del portero está interesante. Quiero que además de todo esto, me pases el prompt para crear diapositivas enteras explicando cada una de las ideas planteadas y su beneficio para nosotros en el bounty. Todavía no instalamos qvac pero armame un tutorial para instarlarlo tengo windows 11 y uso cmd, tengo un ryzen 9 y 32gb de ram y no tengo placa de video estoy en laptop, si vos claude podés llegar a tener un buen manejo de esta ia local y no tendrías problemas en ver como se maneja cada cosa, podríamos considerarla, pero si no sabes muy bien como manejarla y sus errores, entonces estamos un poco fritos. ¿Hay alguna idea que englobe un poco de cada cosa, la ia local de qvac? Estaría bueno que haya un apartado de ideas más influenciado o inspirado en lo que ganaron los participantes con sus proyectos anteriores, pero aplicado más a lo que podría esperar el sponsor. Veo que un poco lo que pedí en el prompt está, porque está justamente vaquita que toca 3 bounties. Lo de vaquita es una linda idea, me doy cuenta que se puede usar lo de la i.a local.

Hacé el prompt de una presentación para cada idea, que explique bein ventajas y desventajas el prompt que conlleva la creación completa, la dificultad de vibecodearlo, hacer una tierlist de la que más sumaría, todo eso.

La idea de qvac se orienta más por lo que creo a tickets y fotos y más que nada el uso de la ia local de qvac, puede funcionar con tickets como con otras muchas cosas, quizás si se le suma a eso pears haciendo que la foto del menú luego se seleccione lo que pagó cada uno, o haciendo que haya menos fricción o algo a partir de un menú de un qr de un restaurante sería bastante sencillo, aunque habría fricción, luego la de wdk no la entendpí me gustaría entenderla mejor pero creo que es la que contiene la idea de portero que me gustó muchísimo.

Si se hace una aplicación que haga esto sería muuuuuy loco, Tres notebooks sobre una mesa. Un ticket de restaurante arrugado.  
1\.  Foto del ticket.  →  aparecen 8 ítems con precios. Nada salió del equipo.  
2\.  Se apaga el wifi EN CÁMARA.  
3\.  Las otras dos notebooks aparecen solas en la lista.  
4\.  Cada uno toca lo que comió. Los totales se actualizan en las tres pantallas.  
5\.  "vos ponés $4.200"  →  pagar  →  ✓ enviado en USD₮, comisión pagada en USD₮.  
6\.  El wifi sigue apagado.

Lo que pasa es que en restaurantes por lo general pagamos con mercado pago, hay manera de implementar con aquello, o si es usando cripto, como l opodríamos integrar para el díá a día,  pero me gusta la idea, me gustaría que la presentación expliqeu un poco lo que se pide en cada requisito de manera simple, y estaría bueno que se explique el funcionamiento detallado con animaciones de como vender la idea de cada proyecto, eso sería clave porque yo sería el juez que debería validar cada idea y ver con cual me quedó, por lo que creá un prompt super extenso para crear en la presentación.

Analizá bien las ideas que más me gustaron.

Esto es clave también: 8\. Qué elegir, en una línea

\* Si el equipo quiere el máximo y aguanta la presión → Vaquita. Tres bounties más el General, con escalera de repliegue en cada escalón.  
\* Si quieren el mejor ratio con riesgo controlado → Llave. Un gate que elimina competencia, y cuatro trabajos independientes.  
\* Si alguien está inseguro, o son tres en vez de cuatro → Ventanilla. Se termina, se ve bien, y compite por Practicality y presentación.  
\* Si en el workshop de mañana los de QVAC dicen que quieren ver evaluación y benchmarking → Banco de pruebas, sin dudarlo.

Hacé lo de la presentación que te pedí y además todo el resto, docuemntación donde vaya y lo que corresponde

\# Claude — Aug 21, 2026, 9:12 PM

Antes de escribir el tutorial de QVAC tengo que verificar algo, porque inventar comandos de instalación es exactamente el error que los sponsors descartan sin revisar.

Encontré algo importante que puede decidir si QVAC es viable para ustedes. Voy a la página del SDK.

Verificado. Y hay un dato que puede decidir todo: \*\*en Windows, QVAC exige Vulkan 1.4 o superior aunque solo uses el procesador.\*\* No es opcional. Te armo el tutorial con eso adelante.

\*\*File: ideas-en-simple.md\*\*

\`\`\`\`markdown  
\# Las ideas en castellano simple  
\#\#\# Sin tecnicismos, con lo que hace falta tener para cada una

\---

\# Parte 1 — Qué pide cada track, explicado como si no supieras nada

\#\# 🍐 Pears — "hacé un programa que se instale sin tienda de aplicaciones"

\*\*Qué es Pear, en una frase:\*\* una forma de repartir un programa donde el programa  
viaja \*\*de computadora en computadora\*\*, sin que exista ningún servidor ni ninguna  
tienda de aplicaciones en el medio.

\*\*La analogía:\*\* hoy, para instalar algo, vas a una tienda (Play Store, App Store,  
npm). Esa tienda es un lugar central: alguien la paga, alguien la controla, y si  
se cae, nadie instala nada. Pear elimina la tienda. Vos publicás y tu programa se  
copia de una computadora a la otra, como se pasaban música por Ares o los archivos  
por torrent.

\*\*Y lo mismo con las actualizaciones.\*\* Si sacás la versión 2, le llega sola a  
todos los que ya tienen la versión 1, sin que nadie apruebe nada y sin servidor.

\*\*Lo que te piden:\*\* hacer una herramienta que se use desde la consola (la ventana  
negra de comandos) y que se pueda instalar escribiendo \`pear install pear://\` más  
un código. \*\*Los jueces van a escribir literalmente ese comando.\*\* Si no anda, ni  
la miran.

\*\*Qué NO te piden:\*\* que el programa en sí sea peer-to-peer. Puede hacer cualquier  
cosa. Lo único obligatorio es que se instale y se actualice por esa vía.

\*\*Lo que hay que tener:\*\* nada. Solo una computadora. Es el track sin requisitos  
previos.

\*\*Plata:\*\* 1° $1.000 · 2° $500

\---

\#\# 🔷 QVAC — "usá inteligencia artificial que corra en la computadora del usuario"

\*\*Qué es QVAC, en una frase:\*\* es como tener ChatGPT pero corriendo \*\*adentro de  
tu computadora\*\*, sin internet, sin cuenta, sin pagar por uso, y sin que lo que  
escribas salga nunca de tu máquina.

\*\*Por qué a alguien le importaría eso:\*\* porque hay cosas que no podés subir a la  
nube. Un contador no puede subir la facturación de sus clientes. Un médico no  
puede subir historias clínicas. Vos no querés subir tu resumen de tarjeta. Y  
además, si no hay internet, la nube no existe.

\*\*El truco y la dificultad:\*\* los modelos que entran en una laptop son chicos —  
mil a cuatro mil millones de parámetros, contra los cientos de miles de millones  
de los grandes. Son más tontos. \*\*El desafío del track es hacer que un modelo  
tonto haga una tarea real de manera confiable.\*\*

\*\*Lo que sabe hacer QVAC:\*\* leer texto de imágenes (OCR), entender imágenes,  
transcribir audio, traducir, generar texto, buscar en documentos tuyos.

\*\*Los dos premios:\*\*  
\- \*\*Pista 1 ($1.000):\*\* un agente que haga trabajo administrativo. Leer  
  documentos, encontrar diferencias, avisar cuando algo no cierra.  
\- \*\*Pista 2 ($500):\*\* demostrar que lograste que un modelo chico sea confiable,  
  \*\*con mediciones\*\*. No "mirá qué lindo anduvo una vez", sino "lo corrí 47 veces  
  y acertó el 89%, y acá están las 5 veces que falló".

\*\*Lo que hay que tener:\*\* el modelo bajado (unos 2,5 GB), y \*\*documentos de prueba  
de verdad\*\*. Ver la Parte 3, porque acá está el problema que planteaste.

\*\*Plata:\*\* $1.000 \+ $500 \+ $500 del Vault Guardian

\---

\#\# 🟧 WDK — "hacé algo que mueva plata, sin tener que aprender blockchain"

\*\*Qué es WDK, en una frase:\*\* una caja de herramientas que te deja crear una  
billetera de dólares digitales (USD₮) y mandar plata \*\*sin que tengas que escribir  
un solo contrato inteligente ni entender cómo funciona una blockchain por dentro.\*\*

\*\*La analogía:\*\* es como la librería de Mercado Pago para desarrolladores, pero  
para dólares digitales y sin que exista Mercado Pago en el medio. Vos escribís  
\`wdk send 20 USDT a esta dirección\` y listo.

\*\*Esto es lo que no entendías, y es la parte importante:\*\* el sponsor dice  
textualmente que \*\*no hace falta escribir ningún contrato inteligente para ganar  
este track.\*\* WDK maneja las claves, las direcciones, los saldos y las  
transacciones. Vos hacés el producto encima.

\*\*Los dos premios:\*\*

\- \*\*Pista 1 ($1.000) — algo hecho con la consola de WDK o su servidor MCP.\*\*  
  \*Qué es MCP en simple:\* un enchufe estándar que le permite a una IA usar  
  herramientas. Si conectás la billetera por MCP, \*\*tu asistente de IA puede  
  consultar saldos y mandar plata hablándole en castellano.\*\* Ese es el juguete  
  que quieren ver.  
\- \*\*Pista 2 ($500) — "sin gas".\*\*  
  \*Qué es el gas, en simple:\* en las blockchains, para mover plata tenés que pagar  
  una comisión, y esa comisión hay que pagarla en la moneda propia de esa red. O  
  sea: \*\*te mandaron dólares digitales pero no los podés mover porque no tenés la  
  otra moneda para pagar la comisión.\*\* Es absurdo y es la razón número uno por la  
  que la gente normal abandona. Los módulos "sin gas" arreglan eso: la comisión se  
  paga con los mismos dólares que estás mandando.

\*\*Lo que hay que tener:\*\* Node.js 22.18 o más nuevo, y una billetera de prueba.  
Para la Pista 2, además, una cuenta gratuita en Candide o Pimlico (minutos).

\*\*Plata:\*\* $1.000 \+ $500

\---

\#\# 🌞 General — "el mejor proyecto, sea de lo que sea"

Sin requisitos técnicos. Entra el mismo proyecto que hiciste para cualquier otro  
track. \*\*Es plata gratis: no hay que construir nada extra.\*\*

\*\*Plata:\*\* 1° $500 · 2° $500

\---

\# Parte 2 — Cada idea en simple

Para cada una: qué hace, a qué bounty va, cuánta plata, y \*\*qué hace falta tener\*\*.

\---

\#\# 🔑 Llave — Pears — $1.000 \+ $500 del General

\*\*En una frase:\*\* mandar una contraseña o un archivo secreto de tu computadora a  
la de otra persona \*\*sin que pase por ningún lado en el medio\*\*.

\*\*No es un mensaje común.\*\* Es específicamente para secretos: la clave de una API,  
el archivo de configuración con las contraseñas de la base de datos, un token.

\*\*El problema real:\*\* hoy eso se manda por WhatsApp, Slack o mail. Y queda ahí  
para siempre, en el servidor de una empresa que no es tuya. Mañana a las 13:00  
alguien de tu equipo va a pegar una clave en el Telegram del hackathon. Está mal y  
todos lo hacen igual porque no hay una alternativa fácil.

\*\*Cómo se ve:\*\* vos escribís \`llave send .env\`, te da un código de tres palabras  
tipo "pino-42-rojo", se lo decís al otro por teléfono, él escribe  
\`llave get pino-42-rojo\` y le llega. El código sirve una sola vez y se muere.

\*\*Tenés razón en que "podría ser un repo de GitHub".\*\* Ese es justamente el punto:  
es una herramienta, no una plataforma. Y las herramientas simples ganan hackathons  
cuando resuelven algo que todos sufren. Pero \*\*es honesto decir que el "wow" es  
bajo\*\* — no hay un momento visual impactante, solo dos terminales.

\*\*Qué hace falta tener:\*\* nada.

\---

\#\# 🏠 Vecino — Pears — $1.000 \+ $500

\*\*En una frase:\*\* pasarse archivos y chatear entre las computadoras de una misma  
sala, aunque no haya internet.

\*\*El momento fuerte:\*\* apagás el wifi en cámara y sigue funcionando.

\*\*Coincido con vos, y hay una razón nueva para bajarla:\*\* en el Tether Developers  
Cup ganó el track de Pears un proyecto llamado \*\*Curva\*\*, que era P2P social con  
chat. Repetir esa forma es competir de frente contra un ganador reciente del mismo  
sponsor. \*\*La bajé de puesto.\*\*

\*\*Qué hace falta tener:\*\* nada, aunque el modo Bluetooth es experimental y puede  
no andar.

\---

\#\# 🎮 Duelo — Pears — $1.000

\*\*En una frase:\*\* un jueguito de consola donde publicás un cambio y le llega al  
jugador \*\*mientras está jugando\*\*.

\*\*Para qué sirve realmente:\*\* demuestra la actualización automática mejor que  
cualquier otra cosa. El ángulo serio es "distribuir y actualizar software sin  
tienda de aplicaciones y sin backend".

\*\*Coincido con que no convence.\*\* El problema es \*Practicality\*: un juego de  
consola no le resuelve un problema a nadie. Es 2 de 5 en ese criterio, y son  
cinco criterios que pesan igual.

\*\*Qué hace falta tener:\*\* nada.

\---

\#\# 🛡️ Portero — WDK Pista 1 — $1.000 \+ $500 ⭐ \*la que te gustó\*

\*\*En una frase:\*\* le das una billetera a una inteligencia artificial, \*\*pero  
encerrada dentro de reglas que vos escribís\*\*.

\*\*El problema real:\*\* los agentes de IA ya pueden hacer cosas solos. Darle plata a  
uno da miedo, con razón: se puede equivocar, lo pueden engañar, puede malinterpretar  
una instrucción. Hoy la respuesta a "¿le doy plata a un agente?" es "ni loco". Este  
proyecto convierte esa respuesta en "sí, dentro de estos límites".

\*\*Cómo se ve:\*\* hay un archivo de reglas que cualquiera puede leer:  
\`\`\`  
tope por operación:     50 USDT  
tope por día:           200 USDT  
solo puede pagarle a:   proveedor-A, proveedor-B, juan  
arriba de 100:          pedir confirmación  
\`\`\`  
Y después le hablás al agente en castellano:  
\`\`\`  
vos: mandale 500 dólares a esta dirección desconocida  
     ⛔ BLOQUEADO — el destinatario no está en la lista permitida  
        (regla 3, línea 14\)

vos: pagale 20 a proveedor-A  
     ✓ dentro del tope por operación  
     ✓ dentro del tope diario (quedan 130\)  
     ✓ destinatario permitido  
     → enviado  
\`\`\`

\*\*Por qué es tan buena y por qué te gustó:\*\* la demo es el \*\*"no"\*\*. Todo el mundo  
entiende en dos segundos por qué eso importa. Es más memorable que cualquier  
transferencia exitosa, porque responde sola a la objeción obvia. Y el sponsor dice  
textualmente que "se valorará positivamente un modelo de seguridad bien pensado".

\*\*El otro motivo:\*\* en el Tether Developers Cup, el ganador general \*\*y\*\* del track  
de WDK fue \*\*Tarkam\*\* — un sistema de premios para torneos de fútbol amateur con  
plata real. El molde del ganador de WDK es: \*\*problema concreto \+ plata de verdad \+  
flujo simple\*\*. Portero encaja perfecto en ese molde.

\*\*Qué hace falta tener:\*\* Node.js 22.18+, y fondos de prueba (gratis, de un  
"faucet"). Nada más.

\---

\#\# 🧾 Conciliador de facturas / remitos — QVAC Pista 1 — $1.000 \+ $500

\*\*En una frase:\*\* sacás fotos de facturas y remitos, y el programa te dice qué no  
coincide con lo que pediste o con lo que dice el banco.

\*\*Acá tenés razón y es un problema serio.\*\* Necesitás unos 20 documentos feos de  
verdad — arrugados, torcidos, con sellos, escritos a mano. \*\*Sin ese material, la  
idea no se puede ni probar ni demostrar.\*\* Y no sirve conseguir tres PDFs limpios:  
el diferenciador es justamente que funcione con basura real.

\*\*Veredicto: descartala\*\*, salvo que consigas los documentos esta noche.

\*\*Pero atención a la distinción:\*\* \*remitos\* no tenés. \*\*Tickets de supermercado y  
de restaurante sí.\*\* Tenés en la billetera, en el cajón, tu familia tiene. En una  
hora juntás treinta. Ver Vaquita y Ventanilla.

\*\*Qué hace falta tener:\*\* \~20 documentos reales. No los tenés.

\---

\#\# 📊 Banco de pruebas de fiabilidad — QVAC Pista 2 — $500 \+ $500

\*\*En una frase:\*\* en vez de mostrar que tu IA anda, \*\*demostrás con números cuánto  
falla y cuánto la mejoraste\*\*.

\*\*Qué significa eso en concreto:\*\* corrés la misma tarea 47 veces y armás una  
tabla:  
\`\`\`  
sin ninguna mejora ............ acierta 41%  
con salida ordenada ........... acierta 68%  
con reintento ................. acierta 81%  
con auto-revisión ............. acierta 89%  
\`\`\`  
Y decís: "estas 3 fallas no las pudimos arreglar, y son estas".

\*\*Por qué es un hueco:\*\* el sponsor pidió con esas palabras \*"pruebas, no  
impresiones"\*. Y ningún equipo apurado corre nada 47 veces.

\*\*La métrica que nadie más va a mostrar:\*\* separar "se equivocó y lo dijo" de  
\*\*"se equivocó con total seguridad"\*\*. Lo segundo es lo peligroso y es lo que más  
le importa a quien evalúa modelos chicos.

\*\*Qué hace falta tener:\*\* el modelo bajado, y \*\*una tarea con respuesta correcta  
conocida\*\*, para poder decir si acertó o no. Eso puede ser algo tan simple como  
20 tickets donde vos ya sabés cuál es el total.

\---

\#\# 📄 Ventanilla — QVAC Pista 1 — $1.000 \+ $500

\*\*En una frase:\*\* foto de la carta que te pide trámites \+ fotos de los papeles que  
tenés \= \*\*te dice qué te falta\*\*.

\*\*Cómo se ve:\*\*  
\`\`\`  
foto de la carta del banco  
  → te piden 4 cosas: DNI, constancia de CUIT, recibo de sueldo,  
    comprobante de domicilio

fotos de tus papeles  
  → DNI                       ✓  
  → constancia de CUIT        ✓  
  → recibo de sueldo          ✓  (es de junio, piden el último)  
  → comprobante de domicilio  ✗  FALTA  
\`\`\`

\*\*Por qué es la más segura:\*\* son dos lecturas y una comparación de listas. No hay  
red, no hay pagos, no hay nada distribuido. Se termina en ocho horas y te quedan  
dieciséis para que se vea impecable.

\*\*Qué hace falta tener:\*\* cartas o formularios que pidan documentación, y  
documentos. \*\*Esto sí lo conseguís\*\*: cualquier resumen de banco, una carta del  
consorcio, un formulario de la facultad, un contrato de alquiler. Y documentos  
tenés todos: DNI, constancia de CUIT, factura de luz.

\---

\#\# 🐄 Vaquita — Pears \+ QVAC \+ WDK \+ General — hasta $3.500 ⭐⭐

\*\*En una frase:\*\* sacás foto de la cuenta del restaurante, el teléfono la lee solo,  
aparecen los que están en la mesa sin internet, cada uno marca lo que comió, y se  
salda la deuda entre ustedes.

\*\*Es la única que toca tres bounties.\*\* Y no es una ensalada: si sacás cualquiera  
de las tres piezas, el producto se rompe.

\*\*Ver la Parte 4\*\*, donde reescribo la idea entera por tu comentario de Mercado  
Pago, que es correcto y le cambia el pitch para mejor.

\*\*Qué hace falta tener:\*\* tickets de restaurante o súper. \*\*Los conseguís hoy.\*\*

\---

\# Parte 3 — El problema del material de prueba, ordenado

Esto es lo que planteaste y es la restricción más importante para elegir.

| Idea | Qué material necesita | ¿Lo pueden conseguir hoy? |  
|---|---|---|  
| Llave | Nada | ✅ |  
| Vecino | Nada | ✅ |  
| Duelo | Nada | ✅ |  
| Portero | Fondos de prueba, gratis | ✅ |  
| \*\*Conciliador de remitos\*\* | \*\*\~20 remitos y facturas B2B feas\*\* | ❌ \*\*No\*\* |  
| Banco de pruebas | Una tarea con respuesta conocida | ✅ (usando tickets) |  
| Ventanilla | Cartas que pidan trámites \+ documentos personales | ✅ Fácil |  
| Vaquita | Tickets de restaurante y súper | ✅ Fácil |

\*\*La conclusión práctica:\*\* el problema no es QVAC. El problema es el \*tipo\* de  
documento. Remitos no tienen. Tickets tienen a montones.

\*\*Tarea de esta noche, 40 minutos, la hace el rol de Relato:\*\* juntar 25 tickets.  
De la billetera de todos, del cajón de la cocina, pedile a tu vieja, pedile al  
grupo de amigos. Sacales fotos \*\*malas a propósito\*\*: torcidas, con poca luz,  
arrugados, con el pulgar tapando una esquina. Ese sobre de fotos feas es el activo  
más valioso que pueden llevar mañana, y \*\*sirve para tres ideas distintas\*\*:  
Vaquita, Ventanilla y el Banco de pruebas.

\---

\# Parte 4 — Vaquita, corregida por lo de Mercado Pago

\*\*Tu objeción es correcta y mata la versión original.\*\* En Argentina nadie le paga  
al restaurante en dólares digitales. El restaurante cobra con Mercado Pago,  
transferencia o efectivo. Si la demo muestra pagarle al mozo en USD₮, cualquier  
juez argentino piensa "esto no pasa".

\*\*La corrección le cambia el pitch, y queda mejor.\*\*

\#\# El problema real no es pagarle al restaurante. Es la deuda entre ustedes.

Pensá qué pasa de verdad: \*\*uno paga todo con su Mercado Pago\*\* —porque es más  
rápido, porque el mozo trae un solo posnet, porque el que tiene saldo paga— y  
después arranca la parte molesta:

\- sacar la cuenta de quién comió qué, a ojo  
\- "yo no tomé vino"  
\- "después te lo paso", y no te lo pasa  
\- el que se fue temprano  
\- el que no tiene Mercado Pago  
\- el amigo que está de visita desde Chile o Brasil y \*\*no puede transferirte\*\*

\*\*Ahí está el producto.\*\* Vaquita no reemplaza a Mercado Pago: \*\*reemplaza el  
"después te lo paso".\*\*

\#\# Cómo queda la demo, corregida

\`\`\`  
Tres notebooks. Un ticket arrugado.

1\. Uno pagó todo con Mercado Pago. Saca foto del ticket.  
   → aparecen 8 ítems con precios. La foto nunca sale del equipo.

2\. Se apaga el wifi EN CÁMARA.

3\. Las otras dos notebooks aparecen solas en la lista. Sin cuentas,  
   sin agregarse como contactos, sin wifi.

4\. Cada uno toca lo que comió. Los totales se actualizan en las tres.

5\. "vos le debés $4.200 a Emi"  →  pagar  →  ✓ saldado en USD₮  
   Comisión pagada con los mismos dólares. Sin comprar nada raro antes.

6\. El wifi sigue apagado.  
\`\`\`

\#\# Por qué ahora los dólares digitales tienen sentido de verdad

\- \*\*El que está de visita desde otro país te puede pagar.\*\* Mercado Pago no cruza  
  fronteras. Esto sí, al instante y sin comisión de cambio.  
\- \*\*No hace falta que los dos tengan el mismo banco ni la misma app.\*\*  
\- \*\*Sin internet igual funciona el reparto\*\*, y el pago sale cuando vuelve la señal.  
\- \*\*No hay servidor\*\*, entonces no hay una empresa registrando dónde comés, con  
  quién y cuánto gastás.

\#\# Y esto vale para el pitch

La versión honesta que le decís al juez es:

\> "No estamos reemplazando a Mercado Pago. El restaurante cobra como siempre.  
\> Nosotros arreglamos lo que pasa \*después\*: la deuda entre amigos, que hoy se  
\> resuelve con capturas de pantalla y buena memoria — y que directamente no se  
\> resuelve si el que te debe está en otro país."

\*\*Es más creíble, y "más creíble" es literalmente el criterio de \*Practicality\*.\*\*

\#\# Tu idea del menú por QR

La mencionaste y es buena, pero \*\*elegiría el ticket, no el menú\*\*, por tres  
motivos:

1\. El menú te dice los precios, \*\*pero no qué pidieron ustedes\*\*. Igual hay que  
   marcar todo a mano. El ticket ya tiene lo que consumieron.  
2\. El menú por QR necesita internet para abrirse. El ticket es papel: funciona  
   apagando el wifi, que es tu mejor momento de demo.  
3\. Leer un ticket arrugado con un modelo chico es \*\*más difícil\*\* y por lo tanto  
   puntúa más alto en dificultad técnica. Un menú por QR es texto limpio, o sea  
   que el modelo casi no trabaja — y si el modelo casi no trabaja, el sponsor de  
   QVAC se da cuenta.

\*\*Guardala como plan B:\*\* si el OCR del ticket no anda a la hora 13, cambiás a  
cargar los ítems a mano y el producto sigue vivo.

\---

\# Parte 5 — Ideas inspiradas en los que ganaron

Pediste esto y es una buena forma de pensar. Miremos qué forma tienen los  
ganadores verificados y qué se deduce.

| Ganador | Qué era | La forma |  
|---|---|---|  
| \*\*Tarkam\*\* (WDK, campeón general) | Premios de torneos de fútbol amateur en USD₮: inscripción, estado verificable, reparto | Plata real entre gente que se conoce, con un flujo simple |  
| \*\*Curva\*\* (Pears) | Ver un partido sincronizado entre continentes, con chat, traducción local y propinas | Sin servidores \+ las tres tecnologías juntas |  
| \*\*Scout\*\* (QVAC) | IA de fútbol corriendo en el dispositivo | Un dominio específico, no "un asistente" |  
| \*\*AutoBounty\*\* (Aleph, dos premios) | Publicás una tarea, alguien la hace, la IA verifica el trabajo y se libera el pago | La IA \*\*decide\*\*, la blockchain \*\*ejecuta\*\* |  
| \*\*Piggy Quiz\*\* (Aleph, Base) | Trivia que enseña finanzas con premios reales | Cosa aburrida \+ experiencia divertida |  
| \*\*Clever\*\* (Aleph, Fiserv) | Ayuda a comercios a cuadrar ventas, liquidaciones y extractos | Problema empresarial concreto y sin glamour |  
| \*\*TornadoCodes\*\* (Aleph 2024, 1°) | Dar acceso a una app sin recolectar antes las direcciones de todos | Una fricción específica, eliminada |

\*\*Los tres patrones que se repiten:\*\*

1\. \*\*Plata de verdad moviéndose entre personas que se conocen.\*\* Tarkam, AutoBounty,  
   Piggy Quiz. → \*\*Vaquita y Portero están en ese patrón.\*\*  
2\. \*\*La IA decide o verifica; la plata se ejecuta sola.\*\* AutoBounty es el ejemplo  
   puro. → \*\*Portero es exactamente eso, dado vuelta: la IA propone, las reglas  
   deciden.\*\*  
3\. \*\*Nadie inventó una categoría.\*\* Todos agarraron algo que ya existe y le  
   sacaron una fricción puntual.

\#\# Tres ideas nuevas que salen de ese patrón

\#\#\# 🎫 \*\*Fiado\*\* — WDK \+ QVAC — $1.000 \+ $1.000 \+ $500  
El kiosquero anota fiado en un cuaderno. Sacás foto de la página del cuaderno, el  
modelo local lee los nombres y los montos, y cada cliente recibe un link para  
saldar en USD₮. \*Patrón Tarkam: plata real, gente que se conoce, flujo simple.\*  
\*\*Material necesario:\*\* un cuaderno escrito a mano. Lo hacés vos en cinco minutos.

\#\#\# ⚖️ \*\*Árbitro\*\* — WDK \+ QVAC — $1.000 \+ $1.000 \+ $500  
Dos personas acuerdan algo ("te hago el logo por 50 dólares"). La plata queda  
retenida. Cuando el trabajo se entrega, \*\*un modelo local revisa si cumple lo  
pactado\*\* y libera el pago, o lo marca para revisión humana si no está seguro.  
\*Es AutoBounty, que ganó dos premios en marzo, pero con IA local en vez de  
blockchain — que es justo lo que este sponsor quiere ver.\*  
\*\*Ojo:\*\* es más ambicioso que Portero y comparte su mejor momento de demo.

\#\#\# 🧑‍🍳 \*\*Changa\*\* — WDK Pista 2 — $500 \+ $500  
Le pagás a alguien que hizo una changa y \*\*no tiene banco, ni tarjeta, ni saldo de  
ninguna cripto\*\*. Recibe dólares digitales y los puede mover en el mismo minuto,  
sin comprar nada antes. \*Es el caso puro de "sin gas", con un usuario latinoamericano  
nombrable.\*  
\*\*Requiere:\*\* resolver el paymaster hoy.

\---

\# Parte 6 — Tier list

Ponderando: plata alcanzable, probabilidad de terminarla, competencia esperable,  
material que hace falta, y qué tan impactante es la demo.

\#\# 🟥 S — las dos que yo defendería

| Idea | Track | Plata | Por qué |  
|---|---|---|---|  
| \*\*🐄 Vaquita\*\* | Pears \+ QVAC \+ WDK \+ General | \*\*$3.500\*\* | Única con tres bounties. Demo imbatible. Escalera de repliegue en cada escalón. Difícil, pero cada escalón ya es una entrega válida |  
| \*\*🛡️ Portero\*\* | WDK P1 \+ General | \*\*$1.500\*\* | La demo del "no" es el mejor momento del documento. Encaja en el molde de Tarkam. \*\*Es la más fácil de terminar de todas las S\*\* |

\#\# 🟧 A — muy buenas

| Idea | Track | Plata | Por qué |  
|---|---|---|---|  
| \*\*📄 Ventanilla\*\* | QVAC P1 \+ General | $1.500 | La más segura de terminar. Material fácil de conseguir. Problema que todos sufren |  
| \*\*📊 Banco de pruebas\*\* | QVAC P2 \+ General | $1.000 | El hueco más claro. Puntaje técnico altísimo. Poca competencia |  
| \*\*🔑 Llave\*\* | Pears \+ General | $1.500 | Mejor relación esfuerzo/competencia. Pero el "wow" es bajo, como dijiste |

\#\# 🟨 B — funcionan, no destacan

| Idea | Track | Plata | Por qué |  
|---|---|---|---|  
| \*\*🎫 Fiado\*\* | WDK \+ QVAC \+ General | $2.500 | Patrón ganador, pero menos memorable que Portero |  
| \*\*⚖️ Árbitro\*\* | WDK \+ QVAC \+ General | $2.500 | Muy bueno, demasiado ambicioso para 24h siendo primerizos |  
| \*\*🧾 Nómina CSV\*\* | WDK P1 \+ General | $1.500 | Imposible de arruinar, imposible de destacar |  
| \*\*🏠 Vecino\*\* | Pears \+ General | $1.500 | Buena, pero Curva ya ocupó ese lugar |

\#\# 🟦 C — solo si algo falla

| Idea | Por qué |  
|---|---|  
| \*\*🎮 Duelo\*\* | \*Practicality\* 2 de 5 |  
| \*\*🧑‍🍳 Changa / sin gas\*\* | Depende de infraestructura que puede fallar |  
| \*\*🧾 Conciliador de remitos\*\* | \*\*No tienen el material\*\* |

\---

\# Parte 7 — Mi recomendación, en tres líneas

1\. \*\*Si el equipo se anima: Vaquita.\*\* Tres bounties, la mejor demo, y cada  
   escalón de la escalera ya es una entrega válida. Construida en el orden  
   correcto, el riesgo es mucho menor de lo que parece.  
2\. \*\*Si quieren algo más contenido pero igual de fuerte: Portero.\*\* Es la que más  
   te gustó, la demo es memorable, y es de las más fáciles de terminar.  
3\. \*\*Y hay una jugada que combina las dos:\*\* Vaquita \*\*incluye\*\* el motor de  
   reglas de Portero. La parte de pagos de Vaquita puede tener límites de gasto y  
   confirmaciones — o sea que si Vaquita se complica en QVAC o en Pears, \*\*lo que  
   ya construiste sigue siendo Portero\*\*, y te presentás a WDK igual.

Esa es la razón real por la que Vaquita es menos riesgosa de lo que parece: \*\*su  
plan de emergencia es la otra idea que te gustó.\*\*

\`\`\`\`

Ahora el tutorial de QVAC, con los datos verificados de la documentación oficial.

\*\*File: instalar-qvac-windows.md\*\*

\`\`\`\`markdown  
\# Instalar QVAC en Windows 11  
\#\#\# Verificado contra la documentación oficial el 21/8/2026 · para Ryzen 9, 32 GB RAM, sin placa de video dedicada

\---

\# ⚠️ Leé esto antes de empezar

\*\*En Windows, QVAC exige Vulkan 1.4 o superior AUNQUE uses solo el procesador.\*\*  
No es opcional y no es "recomendado": la documentación oficial lo dice  
explícitamente en la tabla de plataformas soportadas. En Linux y Mac se puede  
esquivar; \*\*en Windows no.\*\*

Tu situación probablemente esté bien: aunque no tengas placa de video dedicada, un  
Ryzen 9 de laptop trae gráficos Radeon integrados, y el driver de AMD instala  
Vulkan. \*\*Pero hay que verificarlo antes de hacer nada más\*\*, porque si no está,  
todo lo demás es tiempo perdido.

\*\*Tus 32 GB de RAM son una ventaja grande.\*\* El requisito mínimo son 2 GB  
(recomendado 4), y por debajo de 4 la mayoría de los modelos ni cargan. Con 32  
podés correr modelos bastante más grandes que el resto de los equipos. Eso es una  
ventaja competitiva real que casi nadie va a tener en una laptop.

\---

\# Paso 0 — Verificar Vulkan (5 minutos, hacelo primero)

Abrí \`cmd\` y probá:

\`\`\`cmd  
vulkaninfo \--summary  
\`\`\`

\*\*Si te dice que el comando no existe\*\*, no significa que Vulkan falte: significa  
que no tenés instaladas las herramientas de diagnóstico. Instalá el Vulkan SDK  
desde \`https://vulkan.lunarg.com\` y volvé a probar. La doc oficial recomienda  
exactamente eso para verificar.

\*\*Qué mirar en la salida:\*\* la versión de la API. Necesitás \*\*1.4 o superior\*\*.

\*\*Si tenés menos de 1.4 o no aparece nada:\*\*  
1\. Actualizá el driver de gráficos de AMD desde la página de AMD (no desde Windows  
   Update, que suele traer versiones viejas).  
2\. Reiniciá.  
3\. Volvé a probar.

\*\*Si después de eso sigue sin funcionar:\*\* QVAC no va a correr en esa máquina.  
No es negociable. Pasá al plan B del final de este documento.

\---

\# Paso 1 — Node.js

QVAC pide \*\*Node.js 22.17 o superior\*\* y \*\*npm 10.9 o superior\*\* para el SDK de  
JavaScript. Fijate que WDK pide 22.18, así que si vas a tocar los dos, instalá  
una versión igual o mayor a 22.18 y quedás cubierto para ambos.

Verificá qué tenés:

\`\`\`cmd  
node \--version  
npm \--version  
\`\`\`

Si te falta o está viejo, bajalo de \`https://nodejs.org\` (versión LTS actual) o:

\`\`\`cmd  
winget install OpenJS.NodeJS.LTS  
\`\`\`

Cerrá y volvé a abrir \`cmd\` después de instalar, si no el sistema no ve el  
comando nuevo.

\---

\# Paso 2 — Espacio en disco

La doc pide \*\*5 GB libres como mínimo\*\* en la carpeta donde vayas a trabajar,  
porque los modelos pesan varios GB cada uno. Si vas a probar dos o tres modelos,  
dejá 15 GB.

\---

\# Paso 3 — Crear el proyecto e instalar el SDK

\`\`\`cmd  
mkdir C:\\hack\\qvac-pruebas  
cd C:\\hack\\qvac-pruebas  
npm init \-y  
npm pkg set type=module  
npm i @qvac/sdk  
\`\`\`

Esos cuatro comandos son textualmente los del quickstart oficial. El  
\`npm pkg set type=module\` no es un detalle: sin eso los ejemplos de la  
documentación no corren, porque usan \`import\` en vez de \`require\`.

\---

\# Paso 4 — El archivo de configuración

Por defecto el SDK \*\*no imprime nada\*\*. Si algo falla, no vas a ver por qué. Crear  
este archivo es lo que te permite depurar.

Creá \`qvac.config.json\` en la carpeta del proyecto:

\`\`\`json  
{  
  "loggerLevel": "info",  
  "loggerConsoleOutput": true,  
  "httpDownloadConcurrency": 3,  
  "httpConnectionTimeoutMs": 10000  
}  
\`\`\`

\---

\# Paso 5 — El diagnóstico automático

QVAC trae un comando que revisa tu máquina y te dice exactamente qué falta:

\`\`\`cmd  
npx qvac doctor  
\`\`\`

Te chequea la versión de Node, si tu sistema está soportado, la RAM total, la RAM  
disponible, el espacio en disco y las herramientas opcionales.

\*\*Cómo leer el resultado:\*\*  
\- \`pass\` — bien  
\- \`warn\` — no es obligatorio, seguí  
\- \`fail\` — \*\*esto hay que arreglarlo sí o sí\*\*, y te imprime la pista de cómo  
\- \`skip\` / \`info\` — informativo, ignoralo

Si querés el detalle en crudo: \`npx qvac doctor \--json\`

\---

\# Paso 6 — La primera inferencia

Creá \`prueba.js\` en la carpeta del proyecto. \*\*Este código sale del quickstart  
oficial\*\*, no lo inventé:

\`\`\`javascript  
import { loadModel, LLAMA\_3\_2\_1B\_INST\_Q4\_0, completion, unloadModel } from '@qvac/sdk';

try {  
  const modelId \= await loadModel({  
    modelSrc: LLAMA\_3\_2\_1B\_INST\_Q4\_0,  
    onProgress: (p) \=\> {  
      const mb \= (n) \=\> (n / 1e6).toFixed(1);  
      process.stderr.write(\`\\rBajando p.percentage.toFixed(0)%({mb(p.downloaded)}/${mb(p.total)} MB)\`);  
      if (p.percentage \>= 100\) process.stderr.write('\\n');  
    }  
  });

  const history \= \[{ role: 'user', content: 'Explicá qué es una factura en una oración' }\];  
  const result \= completion({ modelId, history, stream: true });  
  for await (const token of result.tokenStream) {  
    process.stdout.write(token);  
  }

  await unloadModel({ modelId });  
} catch (error) {  
  console.error('✖', error);  
  process.exit(1);  
}  
\`\`\`

Corrélo así — en \`cmd\` de Windows la variable de entorno se pone con \`set\`, no  
como en Linux:

\`\`\`cmd  
set QVAC\_CONFIG\_PATH=./qvac.config.json  
node prueba.js  
\`\`\`

\*\*La primera vez baja el modelo\*\*, así que va a tardar. \`LLAMA\_3\_2\_1B\_INST\_Q4\_0\`  
es un modelo de mil millones de parámetros: el más chico y el que más rápido baja.  
Empezá por ese aunque después uses uno más grande — \*\*lo que querés verificar  
ahora es que la cadena entera funciona\*\*, no la calidad.

\*\*Si esto imprime texto en pantalla, ya está: QVAC anda en tu máquina.\*\* Ese es el  
gate del track, y lo pasaste antes de que empiece el hackathon.

\---

\# Paso 7 — Lo que realmente les importa: leer una imagen

Las ideas de ustedes necesitan leer texto de una foto. Eso está en dos páginas  
distintas de la documentación:

\- OCR: \`https://docs.qvac.tether.io/ai-capabilities/ocr/\`  
\- Multimodal: \`https://docs.qvac.tether.io/ai-capabilities/multimodal/\`

\*\*No te copio código de acá porque no lo verifiqué\*\*, y copiar de memoria es  
exactamente cómo se inventan métodos que no existen — el error que los tres  
sponsors dicen que descartan sin revisar.

\*\*Hacé esto:\*\* entrá a esas dos páginas, copiá el ejemplo tal cual está, y  
probalo con \*\*una foto de un ticket real, sacada con el celular, torcida y con  
poca luz.\*\* No con una imagen limpia.

Ese es el momento de la verdad del track de QVAC: si un ticket arrugado sale  
legible, las ideas de Vaquita, Ventanilla y el Banco de pruebas son todas viables.  
Si sale ilegible, lo sabés hoy y elegís otro track. \*\*Vale más que cualquier otra  
cosa que puedas hacer esta noche.\*\*

\---

\# Paso 8 — El atajo que puede ahorrarles horas

QVAC trae un servidor HTTP \*\*compatible con la API de OpenAI\*\*:

\`https://docs.qvac.tether.io/cli/http-server/\`

Qué significa en simple: levantás ese servidor y cualquier herramienta que ya sepa  
hablar con OpenAI le habla a tu modelo local \*\*cambiando una sola dirección\*\*, sin  
tocar nada más.

\*\*Por qué les importa mucho a ustedes:\*\* si el equipo ya sabe usar la API de  
OpenAI, no tienen que aprender un SDK nuevo. Y \*\*el sponsor aclara explícitamente  
que usar ese servidor cuenta como inferencia local\*\* y califica para el track.  
Llamar a una API en la nube no cuenta; esto sí.

Es probablemente el camino más rápido para un equipo de vibecoders.

\---

\# Cosas que te van a romper, y qué hacer

| Síntoma | Causa probable | Solución |  
|---|---|---|  
| No imprime ningún log | Falta el archivo de config o la variable | \`set QVAC\_CONFIG\_PATH=./qvac.config.json\` |  
| \`Cannot use import outside a module\` | Falta el tipo módulo | \`npm pkg set type=module\` |  
| Error de Vulkan al cargar el modelo | Driver de AMD viejo | Actualizar desde AMD, no desde Windows Update |  
| El modelo no carga y se queda colgado | Poca RAM disponible en ese momento | Cerrá el navegador. Con 32 GB no debería pasar |  
| \`npx qvac doctor\` no existe | Node viejo o npm desactualizado | Actualizar Node a 22.18+ |  
| La descarga del modelo se corta | Timeout corto | Subí \`httpConnectionTimeoutMs\` en el config |

Página oficial de problemas: \`https://docs.qvac.tether.io/troubleshooting/\`

\---

\# Un detalle raro que conviene preguntar mañana

El documento del track dice que \*\*VisionPsy todavía no está soportado por el SDK\*\*  
y que usen las capacidades multimodal y OCR en su lugar. Pero la documentación  
oficial tiene hoy un cartel arriba anunciando \*\*VisionPsy-Nano\*\*, un modelo de  
visión de 460 millones de parámetros, con link de descarga.

Puede ser que el documento del track esté desactualizado, o que el modelo exista  
pero todavía no se pueda usar desde el SDK. \*\*Es exactamente el tipo de pregunta  
para hacerle a Raquel Carrasco en el workshop de las 9:30\*\*, y hacerla te muestra  
como equipo que leyó todo.

Si VisionPsy-Nano sí anda desde el SDK, es una noticia grande: un modelo de visión  
de 460M carga en cualquier máquina y es mucho más rápido que uno de 4B.

\---

\# Y ahora la parte incómoda: qué tan bien manejo yo esto

Preguntaste directamente, así que te contesto directo.

\*\*No tengo experiencia práctica con QVAC.\*\* Es un SDK muy nuevo, está en beta, y  
está en el límite o después de mi corte de conocimiento. Todo lo que hay en este  
documento lo saqué de la documentación oficial hoy, leyéndola — no de haberlo  
usado.

\*\*Qué significa eso en la práctica:\*\*

\*\*Lo que sí puedo hacer bien:\*\*  
\- Leer la documentación con vos y traducirla  
\- Diseñar la arquitectura alrededor de QVAC: qué módulos, qué interfaces, qué se  
  hace con código y qué con el modelo, cómo aislar la parte de IA para poder  
  cortarla si falla  
\- Todo lo que rodea al modelo: OCR mediocre, validación, reintentos, medición de  
  fiabilidad, manejo de incertidumbre. Eso es conocimiento general y lo tengo  
\- Depurar errores concretos si me pasás el mensaje exacto

\*\*Lo que NO puedo hacer:\*\*  
\- Decirte de memoria cómo se llama un método del SDK. \*\*Si lo hago, desconfiá.\*\*  
\- Anticipar los errores raros específicos de QVAC en Windows  
\- Saber qué tan bueno es el OCR con un ticket argentino arrugado. \*\*Eso solo lo  
  sabés probándolo hoy.\*\*

\*\*La regla que nos protege a los dos:\*\* cuando trabajemos con QVAC, pegame el  
fragmento de la documentación oficial de la función que vayas a usar. Con eso en  
pantalla trabajo bien. Sin eso, estoy adivinando, y adivinar es justo lo que hace  
que un proyecto quede descartado sin revisión.

\*\*Tres cosas que reducen ese riesgo casi a cero:\*\*  
1\. \*\*El workshop del sábado a las 9:30.\*\* Prometen que salís con un modelo  
   corriendo y un esqueleto de proyecto. Es la solución directa a este problema.  
2\. \*\*La documentación tiene un "Ask AI" propio\*\*, entrenado sobre la doc real.  
   Para preguntas de API, preguntale a eso antes que a mí.  
3\. \*\*El Discord de Tether Dev\*\*, donde está el equipo de ingeniería.

\---

\# Plan B si Vulkan no anda

Si el paso 0 falla y no lo podés arreglar hoy, \*\*no pierdas la noche peleándola.\*\*  
Las opciones, en orden:

1\. \*\*Probá en la máquina de otro integrante.\*\* Con que QVAC corra en una sola  
   laptop del equipo alcanza para demostrar. La persona con esa máquina toma el  
   rol de Núcleo.  
2\. \*\*Cambiá de track.\*\* Portero (WDK) y Llave (Pears) no necesitan QVAC para nada  
   y las dos son de tier alto. Portero es la que más te gustó y no depende de esto.  
3\. \*\*Vaquita sin QVAC.\*\* Los ítems se cargan a mano y seguís apuntando a Pears \+  
   WDK \+ General. Perdés $1.000 de cuatro posibles, pero el proyecto sigue en pie.  
   \*\*Ese es el motivo por el que la arquitectura de Vaquita separa el lector en su  
   propio módulo con una versión falsa.\*\*

Ninguno de esos tres caminos es un desastre. El desastre es descubrirlo mañana a  
las dos de la tarde.

\`\`\`\`

Ahora el prompt de la presentación, que es lo más largo.

\*\*File: prompt-presentacion.md\*\*

\`\`\`markdown  
\# Prompt para generar la presentación de decisión

\> \*\*Cómo usarlo:\*\* copiá TODO lo que está debajo de la línea y pegáselo a Claude  
\> (o al asistente que uses) \*\*junto con el archivo \`ideas-en-simple.md\` adjunto\*\*.  
\> Si tu herramienta permite artefactos o crear archivos, va a devolverte un HTML  
\> único que abrís en el navegador. Si le podés adjuntar también  
\> \`ideas-y-arquitecturas.md\`, mejor: va a tener los prompts de arquitectura y los  
\> puntajes detallados.  
\>  
\> \*\*Para qué sirve:\*\* no es una presentación para los jueces. Es una herramienta  
\> para que vos y tus tres compañeros se sienten quince minutos, la pasen entera, y  
\> salgan con una idea elegida y los roles repartidos.

\---

\# CONTEXTO

Sos un diseñador de producto y un buen explicador. Tenés que construir una  
\*\*presentación interactiva en HTML\*\* que sirva para que un equipo de cuatro  
personas elija con qué proyecto compite mañana en un hackathon.

\*\*Quiénes la van a ver:\*\* cuatro personas de entre 18 y 25 años. Es la primera  
hackathon de todos. Programan con asistentes de IA — saben construir cosas, pero  
no son ingenieros de sistemas y \*\*los tecnicismos los pierden\*\*. Uno de ellos va a  
hacer de juez y decidir. La presentación tiene que dejarlos decidir con criterio,  
no impresionarlos.

\*\*El evento:\*\* Aleph Hackathon, Buenos Aires. Sábado 22 a las 12:00 hasta domingo  
23 a las 12:00. \*\*24 horas exactas.\*\* El jurado no ve un pitch en vivo: ve un  
video de 3 minutos, el repositorio y el README. Se puntúa del 1 al 5 en cinco  
criterios que pesan igual: dificultad técnica, originalidad, interfaz y  
experiencia, practicidad, y presentación.

\*\*Los cuatro tracks y su plata:\*\*  
\- 🍐 \*\*Pears\*\* — programas que se instalan y actualizan de computadora a  
  computadora, sin tienda de aplicaciones. $1.000 / $500  
\- 🔷 \*\*QVAC\*\* — inteligencia artificial corriendo dentro del dispositivo del  
  usuario, sin nube. $1.000 (agentes administrativos) \+ $500 (fiabilidad medida)  
\- 🟧 \*\*WDK\*\* — mover dólares digitales sin escribir contratos inteligentes.  
  $1.000 (consola/MCP) \+ $500 (sin comisión de gas)  
\- 🌞 \*\*General\*\* — el mejor proyecto, sin requisitos. $500 / $500

Te adjunto un documento con todas las ideas ya desarrolladas. \*\*Usalo como fuente  
de verdad. No inventes ideas nuevas ni cambies los números.\*\*

\---

\# QUÉ TENÉS QUE CONSTRUIR

Un \*\*único archivo HTML\*\* que funcione abriéndolo en el navegador, sin instalar  
nada, sin conexión a internet y sin ningún proceso de compilación. Todo el CSS y  
el JavaScript van adentro del mismo archivo. Sin librerías externas, sin fuentes  
descargadas de internet, sin imágenes externas.

Se navega con las flechas del teclado, con la barra espaciadora y con dos botones  
en pantalla. Abajo, una barra de progreso.

\---

\# LA REGLA MÁS IMPORTANTE DE TODAS

\*\*Cada mecanismo se muestra animado, no se describe con palabras.\*\*

Si una diapositiva dice "sincroniza el estado entre pares", fallaste. Esa misma  
diapositiva tiene que mostrar tres rectángulos que representan tres computadoras,  
uno cambia de color, y el cambio se propaga visiblemente a los otros dos con un  
retardo.

\*\*Todas las animaciones son SVG y CSS puros\*\*, dibujados por vos: rectángulos,  
círculos, líneas, flechas, texto. Nada de emojis haciendo de gráficos, nada de  
imágenes.

Cada animación tiene que:  
\- arrancar sola al entrar a la diapositiva  
\- repetirse en loop, o tener un botón de "volver a ver"  
\- durar entre 4 y 8 segundos  
\- entenderse \*\*sin leer nada\*\*

Si una animación necesita una leyenda para entenderse, rehacela.

\---

\# ESTRUCTURA

\#\# Bloque 1 — Entender el juego (5 diapositivas)

\*\*1. Portada.\*\* Título, la fecha, y una sola frase: cuánta plata hay en juego en  
total y cuántas horas tienen. Nada más.

\*\*2. Cómo se gana.\*\*  
Animación: cinco barras que se llenan hasta 5\. A la izquierda, un proyecto con  
dos barras en 5 y tres en 2 → total 16\. A la derecha, uno con las cinco en 4 →  
total 20\. El de la derecha se ilumina y gana.  
El mensaje, en una línea abajo: \*un proyecto parejo le gana a uno brillante y  
desparejo.\*

\*\*3. La plata, mapeada.\*\*  
Un diagrama de los cuatro tracks con sus premios, en escala: el rectángulo de  
$1.000 es el doble de alto que el de $500. Que se vea de un vistazo dónde está la  
plata.

\*\*4. Qué es un "gate".\*\*  
La idea más importante de todo el mazo, y hay que hacerla sentir.  
Animación: veinte puntitos representan veinte equipos. Aparece una puerta.  
Catorce puntitos chocan y desaparecen. Seis pasan. Del otro lado, el premio.  
Debajo: \*en Pears, el juez escribe \`pear install pear://...\`. Si no anda, no  
puntúa bajo: directamente no mira.\*  
Después, la conclusión: \*por eso el gate se pasa en las primeras 3 horas con algo  
trivial, y recién después se construye el producto.\*

\*\*5. Las 24 horas.\*\*  
Una línea de tiempo horizontal que se dibuja sola, con marcas: gate a la hora 3,  
mentores a la 4, congelamiento a la 18, video a la 20, entrega a la 22, cierre a  
la 24\. Que se vea lo poco que es.

\#\# Bloque 2 — Qué pide cada track (4 diapositivas, una por track)

Cada una tiene que explicar la tecnología \*\*a alguien que nunca la escuchó  
nombrar\*\*, con una animación que muestre el concepto.

\*\*6. Pears.\*\*  
Animación en dos tiempos. Arriba: cinco computadoras piden un programa a un  
servidor central; el servidor se cae y las cinco quedan en gris. Abajo: las mismas  
cinco se pasan el programa entre ellas; se saca una del medio y las demás siguen.  
Debajo: qué te piden exactamente, y que no hace falta tener nada para empezar.

\*\*7. QVAC.\*\*  
Animación: un documento sale de una laptop, viaja por un cable hasta una nube,  
vuelve. Al lado, el mismo documento se queda adentro de la laptop y da vueltas  
ahí. Tachá el primero.  
Después una segunda parte: dos cerebros, uno grande y uno chico. El chico es el  
que entra en la laptop, y \*\*es más tonto\*\*. Debajo: \*el desafío del track es  
hacer que el chico sea confiable.\*

\*\*8. WDK.\*\*  
Acá hay que explicar bien el "gas", porque es lo que nadie entiende.  
Animación: llegan 100 dólares digitales a una billetera. La persona quiere  
mandarlos. Aparece un cartel: \*comisión: 0,003 de otra moneda que no tenés\*. La  
transferencia se traba. Segunda parte: la comisión se paga con los mismos dólares  
y la transferencia sale.  
Debajo, en grande: \*\*no hace falta escribir ningún contrato inteligente para ganar  
este track.\*\*

\*\*9. General.\*\* Corta. El mismo proyecto entra sin trabajo extra. Es plata gratis.

\#\# Bloque 3 — Las ideas (una sección por idea)

Este es el corazón. \*\*Para cada idea, tres diapositivas seguidas.\*\*

Las ideas a cubrir, en este orden: \*\*Vaquita, Portero, Ventanilla, Banco de  
pruebas, Llave, Fiado, Árbitro, Vecino, Duelo, Nómina CSV.\*\*

\#\#\# Diapositiva A — "Qué es"

\- El nombre, grande.  
\- Una sola frase que lo explique, en castellano de todos los días.  
\- \*\*La animación del producto funcionando\*\*, que es la parte más importante de  
  toda la presentación. Tiene que ser el flujo real, paso a paso, con retardos  
  entre pasos para que se pueda seguir.

Ejemplos de qué animar en cada una:

\- \*\*Vaquita:\*\* un ticket de papel → se convierte en una lista de 8 ítems → aparece  
  un cartel de WIFI APAGADO tachado → dos computadoras más aparecen solas en la  
  lista → alguien toca dos ítems y los totales cambian en las tres pantallas a la  
  vez → sale una transferencia → tilde verde.  
\- \*\*Portero:\*\* una instrucción entra. Pasa por tres compuertas: monto ✓, límite  
  diario ✓, destinatario ✗. \*\*La tercera se pone roja y frena todo.\*\* Después  
  entra otra instrucción y pasa las tres. \*El "no" tiene que durar más en pantalla  
  que el "sí".\*  
\- \*\*Ventanilla:\*\* una carta con cuatro renglones → tres papeles caen y se acoplan  
  a tres renglones con tilde → el cuarto renglón queda vacío y parpadea en rojo.  
\- \*\*Banco de pruebas:\*\* una tabla que se llena sola, fila por fila: 41% → 68% →  
  81% → 89%. Una barra que crece con cada fila.  
\- \*\*Llave:\*\* dos terminales lado a lado. Aparece un código de tres palabras, viaja  
  como una línea punteada, llega, y \*\*el código original se desintegra\*\*.  
\- \*\*Fiado:\*\* una hoja de cuaderno escrita a mano → se convierte en una lista de  
  nombres y montos → uno se marca como saldado.  
\- \*\*Árbitro:\*\* plata que queda retenida en el medio → llega un entregable → una  
  lupa lo revisa → se libera hacia la derecha.  
\- \*\*Vecino:\*\* computadoras en una sala, un archivo saltando entre ellas, el wifi  
  tachado.  
\- \*\*Duelo:\*\* dos consolas jugando; llega un parche desde arriba y un número cambia  
  \*\*sin que el juego se corte\*\*.  
\- \*\*Nómina CSV:\*\* una tabla de ocho filas → ocho flechas salen en secuencia → ocho  
  tildes.

\#\#\# Diapositiva B — "Qué gana y qué cuesta"

Dos columnas, sin texto corrido.

\*\*A la izquierda, la plata.\*\* Los bounties a los que apunta, cada uno con su  
monto, y el total abajo en grande. Que se vea al instante que Vaquita dice $3.500  
y Duelo dice $1.000.

\*\*A la derecha, cuatro medidores\*\* de 1 a 5, dibujados como barras que se llenan  
al entrar:

\- \*\*Dificultad de vibecodearla\*\* — 1 es fácil, 5 es que te vas a pelear con el  
  entorno. Al lado, media línea explicando \*por qué\*: "son tres SDKs distintos" o  
  "es una sola llamada y una comparación".  
\- \*\*Cuánto impresiona la demo\*\* — qué tan fuerte es el momento de los primeros 30  
  segundos del video.  
\- \*\*Probabilidad de terminarla en 24 horas.\*\*  
\- \*\*Cuánta competencia esperamos\*\* — acá al revés: menos es mejor. Marcalo con  
  color distinto para que no se confunda.

Debajo, tres líneas fijas:  
\- ✅ \*\*Lo mejor que tiene:\*\* una frase.  
\- ⚠️ \*\*El riesgo:\*\* una frase.  
\- 📦 \*\*Qué hace falta tener:\*\* el material de prueba. Si no hace falta nada,  
  decilo explícitamente: \*nada, se puede empezar ya.\* Esto es importante: hay  
  ideas que necesitan 20 documentos que el equipo no tiene.

\#\#\# Diapositiva C — "Cómo se construye y quién hace qué"

Dos partes.

\*\*Arriba, la arquitectura, dibujada.\*\* Cajas y flechas. Cada caja es un módulo con  
un nombre en castellano y una línea de qué hace. Las flechas muestran qué le pasa  
a qué. \*\*Máximo cinco cajas.\*\* Si necesitás más, la idea es demasiado compleja  
para 24 horas y eso hay que decirlo en la diapositiva.

Pintá cada caja del color del rol que la construye.

\*\*Abajo, el reparto de las cuatro personas\*\*, con los colores coincidiendo:

\- 🔑 \*\*Integración\*\* — pasa el gate, es dueño de la rama principal, mergea, hace  
  la prueba final desde cero  
\- ⚙️ \*\*Núcleo\*\* — la lógica y los SDKs  
\- 🎨 \*\*Cara\*\* — todo lo que se ve: pantallas, mensajes de error, README  
\- 🎬 \*\*Relato\*\* — guion del video, mentores, testeo con gente, entrega

Para cada rol, una línea de qué hace \*\*en esta idea puntual\*\*. No genérico.

Y una franja abajo de todo: \*\*la escalera de repliegue.\*\* Cuatro escalones  
horizontales que muestren qué se entrega si el proyecto queda a medias, y a qué  
bounty califica cada escalón. Esto tiene que quedar clarísimo: \*\*quedarse a mitad  
de camino no es perder.\*\*

\#\# Bloque 4 — Decidir (4 diapositivas)

\*\*Tabla comparativa.\*\* Todas las ideas en filas. Columnas: plata, dificultad,  
demo, terminable, competencia, material necesario. Que se pueda ordenar haciendo  
clic en el encabezado de cada columna. Colores de fondo según el valor: verde  
bien, amarillo medio, rojo mal.

\*\*Tier list.\*\* S, A, B, C con las ideas acomodadas en filas de colores, como una  
tier list de internet. S arriba en rojo. Que las tarjetas sean lo bastante grandes  
para leerse de lejos.

\*\*Las cuatro preguntas.\*\* Una pregunta por vez, con las opciones como botones  
grandes. Según lo que elijan, al final muestra qué idea les corresponde.  
1\. ¿Cuánta gente son de verdad y van a estar las 24 horas? → 3 o 4  
2\. ¿Alguien probó QVAC y le anduvo? → sí / no / todavía no  
3\. ¿Prefieren jugarla grande o ir a lo seguro? → grande / seguro  
4\. ¿Consiguieron tickets y documentos de prueba? → sí / no

Las reglas de decisión:  
\- Si QVAC no anduvo → sacá de la lista todo lo que lo use  
\- Si no consiguieron material → sacá Vaquita y Ventanilla  
\- Si son 3 personas → Ventanilla o Portero  
\- Si van a lo grande y todo lo demás está → Vaquita  
\- Si van a lo seguro → Portero

\*\*Cierre.\*\* La recomendación en tres líneas, y abajo la lista de lo que hay que  
hacer esta noche: instalar la tecnología del track elegido, juntar el material de  
prueba, escribir el contrato de módulos, decidir los roles, y preguntar en el  
Telegram si se puede entrar a varios tracks de Tether.

\---

\# ESTILO VISUAL

\*\*Elegí una dirección y sostenela.\*\* No uses el degradado violeta que usan todas  
las presentaciones generadas por IA. Algo que se sienta como una herramienta de  
trabajo, no como un pitch de startup.

Una sugerencia que funciona: fondo casi negro azulado, texto blanco hueso, y \*\*un  
solo color de acento\*\* para lo que importa — la plata, los tildes, las barras  
llenas. Un rojo distinto y exclusivo para los bloqueos y los riesgos. Tipografía  
monoespaciada para números, comandos y todo lo que sea dato; una sin serifa del  
sistema para el texto.

\*\*Reglas duras:\*\*  
\- \*\*Máximo 40 palabras por diapositiva\*\*, sin contar tablas. Si te pasás, cortá.  
\- Nada de párrafos. Frases sueltas, listas cortas, números grandes.  
\- Los números importantes van enormes: \`$3.500\` ocupa media pantalla.  
\- Que se lea desde dos metros: alguien va a mirar por encima del hombro.  
\- Sin emojis decorativos. Solo los cuatro de los roles y los de los tracks, que  
  funcionan como código de color.  
\- Respetá \`prefers-reduced-motion\`: si está activo, las animaciones muestran su  
  estado final sin moverse.

\---

\# CÓMO ESCRIBIR EL TEXTO

\- Castellano rioplatense. Vos, no tú.  
\- Cero anglicismos innecesarios. "Sin servidor" antes que "serverless". "De  
  computadora a computadora" antes que "peer-to-peer" — aunque el nombre del track  
  sea ese, la explicación va en castellano.  
\- Si tenés que usar un término técnico, explicalo la primera vez en cinco palabras  
  y no lo vuelvas a explicar.  
\- \*\*Nunca escribas una ventaja sin su desventaja al lado.\*\* El que mira esto tiene  
  que poder desconfiar de cada idea. Una presentación que solo vende no sirve para  
  decidir.  
\- No exageres. Si una idea es riesgosa, decilo con esa palabra.

\---

\# LO QUE NO TENÉS QUE HACER

\- No inventes ideas que no están en el documento adjunto.  
\- No cambies los montos ni los puntajes.  
\- No uses librerías, ni CDNs, ni fuentes de internet, ni imágenes externas.  
\- No uses almacenamiento del navegador.  
\- No hagas diapositivas de relleno tipo "gracias" o "preguntas".  
\- No escribas párrafos explicativos. Si algo necesita un párrafo, hacelo animación.  
\- No pongas la recomendación al principio: el equipo tiene que llegar solo.

\---

\# ENTREGABLE

Un archivo HTML. Si podés crear archivos, guardalo y pasame el link. Si trabajás  
con artefactos, dejalo como artefacto.

Antes de empezar a escribir código, decime en cinco líneas: qué dirección visual  
elegiste, cuántas diapositivas van a ser, y cuáles son las tres animaciones que te  
parecen más difíciles de lograr. Después construilo entero.

Si algo de este pedido te parece equivocado o imposible, decilo antes de empezar.

\`\`\`

Tres documentos. Te contesto lo importante en orden.

\*\*Primero, la pregunta que hiciste directo, porque de eso depende todo lo demás: no tengo experiencia práctica con QVAC.\*\* Es un SDK nuevo, está en beta, y cae en el límite de lo que sé. Todo lo que hay en el tutorial lo leí hoy de la documentación oficial, no de haberlo usado. Puedo diseñar la arquitectura alrededor, puedo hacer bien todo lo que rodea al modelo — validación, reintentos, medición, manejo de incertidumbre — y puedo depurar errores concretos si me pasás el mensaje exacto. Lo que no puedo es decirte de memoria cómo se llama un método del SDK. Si lo hago, desconfiá.

La regla que nos protege: cuando toquemos QVAC, pegame el fragmento de la documentación de la función que vas a usar. Con eso en pantalla trabajo bien. Sin eso estoy adivinando, que es exactamente lo que hace que un proyecto quede descartado sin revisión.

Y hay tres cosas que bajan ese riesgo casi a cero: el workshop del sábado a las 9:30 promete que salís con un modelo corriendo, la documentación tiene su propio "Ask AI" entrenado sobre la doc real, y está el Discord de Tether Dev.

\*\*Lo urgente del tutorial: en Windows, QVAC exige Vulkan 1.4 o superior aunque uses solo el procesador.\*\* No es opcional. Tu Ryzen 9 trae Radeon integrada y el driver de AMD instala Vulkan, así que probablemente estés bien, pero verificalo antes de cualquier otra cosa — son cinco minutos y si falla, todo lo demás es tiempo perdido. Tus 32 GB, por otro lado, son una ventaja seria: el mínimo son 2 GB y podés correr modelos bastante más grandes que el resto de los equipos en una laptop.

\*\*Sobre los remitos, tenías razón y hay una distinción que lo cambia:\*\* remitos no tienen. \*\*Tickets de supermercado y restaurante sí.\*\* Tenés en la billetera, en el cajón, tu familia tiene. En cuarenta minutos juntás veinticinco y les sacás fotos malas a propósito — torcidas, con poca luz, arrugadas. Ese sobre de fotos feas sirve para tres ideas distintas y es el activo más valioso que pueden llevar mañana. La idea de conciliar remitos B2B queda descartada; las de tickets quedan vivas.

\*\*Sobre Mercado Pago: tu objeción mata la versión original de Vaquita, y la corrección la mejora.\*\* Nadie le paga al restaurante en dólares digitales, tenés razón. Pero ese no es el problema real. El problema real es lo que pasa \*después\*: uno paga todo con su Mercado Pago y arranca el "después te lo paso" que no te pasa, el que se fue temprano, y el amigo que vino de Chile y directamente no puede transferirte.

Vaquita no reemplaza a Mercado Pago. \*\*Reemplaza el "después te lo paso".\*\* El restaurante cobra como siempre. Y ahí los dólares digitales sí tienen sentido de verdad: cruzan fronteras, no dependen de que los dos tengan el mismo banco, y no hay una empresa registrando dónde comés y con quién. Es más creíble, y "más creíble" es literalmente el criterio de \*Practicality\*.

Sobre tu idea del menú por QR: buena, pero elegiría el ticket. El menú te da los precios pero no qué pidieron ustedes, necesita internet para abrirse — te mata el mejor momento de la demo — y es texto limpio, o sea que el modelo casi no trabaja. Y si el modelo casi no trabaja, el sponsor de QVAC se da cuenta. Guardala como plan B por si el OCR del ticket no anda.

\*\*Sobre Llave, para aclarar la confusión:\*\* no es mandar un mensaje. Es mandar específicamente secretos — la clave de una API, el archivo de configuración con las contraseñas. Va al track de Pears, $1.000 más $500 del General. Y coincido con tu lectura: el "wow" es bajo. Son dos terminales, no hay momento visual impactante.

\*\*Y una cosa que no habías notado sobre Portero, que era la que más te gustó:\*\* en el Tether Developers Cup el ganador general \*y\* del track de WDK fue Tarkam — premios de torneos de fútbol amateur con plata real. El molde del ganador de WDK es problema concreto, plata de verdad, flujo simple. Portero encaja exacto en ese molde.

Pero lo mejor es esto: \*\*Vaquita incluye el motor de reglas de Portero.\*\* La parte de pagos de Vaquita puede tener límites y confirmaciones. Si Vaquita se complica en QVAC o en Pears, lo que ya construiste \*sigue siendo Portero\* y te presentás a WDK igual. Esa es la razón real por la que Vaquita es menos riesgosa de lo que parece: su plan de emergencia es la otra idea que te gustó.

Las dos tareas de esta noche, en orden: correr \`vulkaninfo \--summary\` y juntar los veinticinco tickets.

\# Human — Aug 21, 2026, 11:34 PM

\> \*\*Attachment: attachment · txt · 4.5 KB\*\*  
\>  
\> 🍐 Pears — "hacé un programa que se instale sin tienda de aplicaciones"  
\>  
\> Qué es Pear, en una frase: una forma de repartir un programa donde el programa viaja de computadora en computadora, sin que exista ningún servidor ni ninguna tienda de aplicaciones en el medio.  
\>  
\> La analogía: hoy, para instalar algo, vas a una tienda (Play Store, App Store, npm). Esa tienda es un lugar central: alguien la paga, alguien la controla, y si se cae, nadie instala nada. Pear elimina la tienda. Vos publicás y tu programa se copia de una computadora a la otra, como se pasaban música por Ares o los archivos por torrent.  
\>  
\> Y lo mismo con las actualizaciones. Si sacás la versión 2, le llega sola a todos los que ya tienen la versión 1, sin que nadie apruebe nada y sin servidor.  
\>  
\> Lo que te piden: hacer una herramienta que se use desde la consola (la ventana negra de comandos) y que se pueda instalar escribiendo pear install pear:// más un código. Los jueces van a escribir literalmente ese comando. Si no anda, ni la miran.  
\>  
\> Qué NO te piden: que el programa en sí sea peer-to-peer. Puede hacer cualquier cosa. Lo único obligatorio es que se instale y se actualice por esa vía.  
\>  
\> Lo que hay que tener: nada. Solo una computadora. Es el track sin requisitos previos.  
\>  
\> Plata: 1° $1.000 · 2° $500  
\>  
\> 🔷 QVAC — "usá inteligencia artificial que corra en la computadora del usuario"  
\>  
\> Qué es QVAC, en una frase: es como tener ChatGPT pero corriendo adentro de tu computadora, sin internet, sin cuenta, sin pagar por uso, y sin que lo que escribas salga nunca de tu máquina.  
\>  
\> Por qué a alguien le importaría eso: porque hay cosas que no podés subir a la nube. Un contador no puede subir la facturación de sus clientes. Un médico no puede subir historias clínicas. Vos no querés subir tu resumen de tarjeta. Y además, si no hay internet, la nube no existe.  
\>  
\> El truco y la dificultad: los modelos que entran en una laptop son chicos — mil a cuatro mil millones de parámetros, contra los cientos de miles de millones de los grandes. Son más tontos. El desafío del track es hacer que un modelo tonto haga una tarea real de manera confiable.  
\>  
\> Lo que sabe hacer QVAC: leer texto de imágenes (OCR), entender imágenes, transcribir audio, traducir, generar texto, buscar en documentos tuyos.  
\>  
\> Los dos premios:  
\>  
\> Pista 1 ($1.000): un agente que haga trabajo administrativo. Leer documentos, encontrar diferencias, avisar cuando algo no cierra.  
\> Pista 2 ($500): demostrar que lograste que un modelo chico sea confiable, con mediciones. No "mirá qué lindo anduvo una vez", sino "lo corrí 47 veces y acertó el 89%, y acá están las 5 veces que falló".  
\>  
\> Lo que hay que tener: el modelo bajado (unos 2,5 GB), y documentos de prueba de verdad. Ver la Parte 3, porque acá está el problema que planteaste.  
\>  
\> Plata: $1.000 \+ $500 \+ $500 del Vault Guardian  
\>  
\> 🟧 WDK — "hacé algo que mueva plata, sin tener que aprender blockchain"  
\>  
\> Qué es WDK, en una frase: una caja de herramientas que te deja crear una billetera de dólares digitales (USD₮) y mandar plata sin que tengas que escribir un solo contrato inteligente ni entender cómo funciona una blockchain por dentro.  
\>  
\> La analogía: es como la librería de Mercado Pago para desarrolladores, pero para dólares digitales y sin que exista Mercado Pago en el medio. Vos escribís wdk send 20 USDT a esta dirección y listo.  
\>  
\> Esto es lo que no entendías, y es la parte importante: el sponsor dice textualmente que no hace falta escribir ningún contrato inteligente para ganar este track. WDK maneja las claves, las direcciones, los saldos y las transacciones. Vos hacés el producto encima.  
\>  
\> Los dos premios:  
\>  
\> Pista 1 ($1.000) — algo hecho con la consola de WDK o su servidor MCP. Qué es MCP en simple: un enchufe estándar que le permite a una IA usar herramientas. Si conectás la billetera por MCP, tu asistente de IA puede consultar saldos y mandar plata hablándole en castellano. Ese es el juguete que quieren ver.  
\> Pista 2 ($500) — "sin gas". Qué es el gas, en simple: en las blockchains, para mover plata tenés que pagar una comisión, y esa comisión hay que pagarla en la moneda propia de esa red. O sea: te mandaron dólares digitales pero no los podés mover porque no tenés la otra moneda para pagar la comisión. Es absurdo y es la razón número uno por la que la gente normal abandona. Los módulos "sin gas" arreglan eso: la comisión se paga con los mismos dólares que estás mandando.  
\>  
\> Lo que hay que tener: Node.js 22.18 o más nuevo, y una billetera de prueba. Para la Pista 2, además, una cuenta gratuita en Candide o Pimlico (minutos).  
\>  
\> Plata: $1.000 \+ $500

Necesito más ideas, por ahora las que más me gustaron fueron las de la vaquita, en un principio la de mensajería privada es buena, le sumaría más cosas, como quizás poder hacer llamada si es que se soporta y además enviar archivos ¿Qué mas les agregarías a todo esto? ¿Podría ser posible que funcionen sin internet?

Ejecutando lo que sería el documento de instalar qvac windows, esto me queda en la terminal: Microsoft Windows \[Versión 10.0.26200.9168\]  
(c) Microsoft Corporation. Todos los derechos reservados.  
C:\\Users\\Emi\>node \--version  
v22.20.0  
C:\\Users\\Emi\>npm \--version  
10.9.3  
C:\\Users\\Emi\>mkdir C:\\hack\\qvac-pruebas  
C:\\Users\\Emi\>cd C:\\hack\\qvac-pruebas  
C:\\hack\\qvac-pruebas\>npm init \-y  
Wrote to C:\\hack\\qvac-pruebas\\package.json:  
{  
  "name": "qvac-pruebas",  
  "version": "1.0.0",  
  "description": "",  
  "main": "index.js",  
  "scripts": {  
    "test": "echo \\"Error: no test specified\\" && exit 1"  
  },  
  "keywords": \[\],  
  "author": "",  
  "license": "ISC"  
}  
C:\\hack\\qvac-pruebas\>npm pkg set type=module  
C:\\hack\\qvac-pruebas\>npm i @qvac/sdk  
added 186 packages, and audited 187 packages in 3m  
1 package is looking for funding  
  run \`npm fund\` for details  
found 0 vulnerabilities  
C:\\hack\\qvac-pruebas\>vulkaninfo \--summary  
WARNING: \[Loader Message\] Code 0 : windows\_read\_data\_files\_in\_registry: Registry lookup failed to get layer manifest files.  
WARNING: \[Loader Message\] Code 0 : vkGetPhysicalDeviceSurfaceCapabilities2KHR: Emulation found unrecognized structure type in pSurfaceInfo-\>pNext \- this struct will be ignored  
\==========  
VULKANINFO  
\==========  
Vulkan Instance Version: 1.3.301  
Instance Extensions: count \= 13  
\-------------------------------  
VK\_EXT\_debug\_report                    : extension revision 10  
VK\_EXT\_debug\_utils                     : extension revision 2  
VK\_EXT\_swapchain\_colorspace            : extension revision 5  
VK\_KHR\_device\_group\_creation           : extension revision 1  
VK\_KHR\_external\_fence\_capabilities     : extension revision 1  
VK\_KHR\_external\_memory\_capabilities    : extension revision 1  
VK\_KHR\_external\_semaphore\_capabilities : extension revision 1  
VK\_KHR\_get\_physical\_device\_properties2 : extension revision 2  
VK\_KHR\_get\_surface\_capabilities2       : extension revision 1  
VK\_KHR\_portability\_enumeration         : extension revision 1  
VK\_KHR\_surface                         : extension revision 25  
VK\_KHR\_win32\_surface                   : extension revision 6  
VK\_LUNARG\_direct\_driver\_loading        : extension revision 1  
Instance Layers: count \= 4  
\--------------------------  
VK\_LAYER\_AMD\_switchable\_graphics AMD switchable graphics layer  1.3.302  version 1  
VK\_LAYER\_OBS\_HOOK                Open Broadcaster Software hook 1.3.216  version 1  
VK\_LAYER\_VALVE\_steam\_fossilize   Steam Pipeline Caching Layer   1.4.303  version 1  
VK\_LAYER\_VALVE\_steam\_overlay     Steam Overlay Layer            1.3.207  version 1  
Devices:  
\========  
GPU0:  
        apiVersion         \= 1.3.302  
        driverVersion      \= 2.0.331  
        vendorID           \= 0x1002  
        deviceID           \= 0x150e  
        deviceType         \= PHYSICAL\_DEVICE\_TYPE\_INTEGRATED\_GPU  
        deviceName         \= AMD Radeon(TM) 880M Graphics  
        driverID           \= DRIVER\_ID\_AMD\_PROPRIETARY  
        driverName         \= AMD proprietary driver  
        driverInfo         \= 24.30.22.03 (LLPC)  
        conformanceVersion \= 1.3.9.2  
        deviceUUID         \= 00000000-6300-0000-0000-000000000000  
        driverUUID         \= 414d442d-5749-4e2d-4452-560000000000  
C:\\hack\\qvac-pruebas\> 

No sé como modificar el qvac.config.json porque no sé donde está exactamente. Prepará más bien, una documento como este que es para instalar qvac en windows, pero para instalar y darle uso a estas 3 tecnologías, qvac, la de pears y la de los wallet cripto, para que corriendo los comandos en cmd mis amigos puedan en sus computadoras acceder a todo rápidamente. Que las instalaciones y pruebas de errores y demás información sean todas extraídas de las páginas oficiales. Planteá nuevas ideas a partir de las definiciones de cada track: Pears, qvac y wdk, que otras ideas se te ocurren. Veo que la mensajería de archivos y mensajes con pears ya es algo tomado porque lo ganaron con el p2p social con chat como dijiste, con el proyecto llamado curva, confirmame si se cae la idea realmente, necesito que sumes más ideas así en simple. 

Vaquita podría funcionar para teléfonos móviles? Porque dudo que en la cena del restaurante todos saquen la notebook, pero me encanta como lo planteás acá.

"Parte 4 — Vaquita, corregida por lo de Mercado Pago  
Tu objeción es correcta y mata la versión original. En Argentina nadie le paga al restaurante en dólares digitales. El restaurante cobra con Mercado Pago, transferencia o efectivo. Si la demo muestra pagarle al mozo en USD₮, cualquier juez argentino piensa "esto no pasa".  
La corrección le cambia el pitch, y queda mejor.  
El problema real no es pagarle al restaurante. Es la deuda entre ustedes.  
Pensá qué pasa de verdad: uno paga todo con su Mercado Pago —porque es más rápido, porque el mozo trae un solo posnet, porque el que tiene saldo paga— y después arranca la parte molesta:

\* sacar la cuenta de quién comió qué, a ojo  
\* "yo no tomé vino"  
\* "después te lo paso", y no te lo pasa  
\* el que se fue temprano  
\* el que no tiene Mercado Pago  
\* el amigo que está de visita desde Chile o Brasil y no puede transferirte

Ahí está el producto. Vaquita no reemplaza a Mercado Pago: reemplaza el "después te lo paso".  
Cómo queda la demo, corregida

\`\`\`  
Tres notebooks. Un ticket arrugado.

1\. Uno pagó todo con Mercado Pago. Saca foto del ticket.  
   → aparecen 8 ítems con precios. La foto nunca sale del equipo.

2\. Se apaga el wifi EN CÁMARA.

3\. Las otras dos notebooks aparecen solas en la lista. Sin cuentas,  
   sin agregarse como contactos, sin wifi.

4\. Cada uno toca lo que comió. Los totales se actualizan en las tres.

5\. "vos le debés $4.200 a Emi"  →  pagar  →  ✓ saldado en USD₮  
   Comisión pagada con los mismos dólares. Sin comprar nada raro antes.

6\. El wifi sigue apagado.  
\`\`\`

Por qué ahora los dólares digitales tienen sentido de verdad

\* El que está de visita desde otro país te puede pagar. Mercado Pago no cruza fronteras. Esto sí, al instante y sin comisión de cambio.  
\* No hace falta que los dos tengan el mismo banco ni la misma app.  
\* Sin internet igual funciona el reparto, y el pago sale cuando vuelve la señal.  
\* No hay servidor, entonces no hay una empresa registrando dónde comés, con quién y cuánto gastás.

Y esto vale para el pitch  
La versión honesta que le decís al juez es:  
"No estamos reemplazando a Mercado Pago. El restaurante cobra como siempre. Nosotros arreglamos lo que pasa después: la deuda entre amigos, que hoy se resuelve con capturas de pantalla y buena memoria — y que directamente no se resuelve si el que te debe está en otro país."  
Es más creíble, y "más creíble" es literalmente el criterio de Practicality.  
Tu idea del menú por QR  
La mencionaste y es buena, pero elegiría el ticket, no el menú, por tres motivos:

1\. El menú te dice los precios, pero no qué pidieron ustedes. Igual hay que marcar todo a mano. El ticket ya tiene lo que consumieron.  
2\. El menú por QR necesita internet para abrirse. El ticket es papel: funciona apagando el wifi, que es tu mejor momento de demo.  
3\. Leer un ticket arrugado con un modelo chico es más difícil y por lo tanto puntúa más alto en dificultad técnica. Un menú por QR es texto limpio, o sea que el modelo casi no trabaja — y si el modelo casi no trabaja, el sponsor de QVAC se da cuenta.

Guardala como plan B: si el OCR del ticket no anda a la hora 13, cambiás a cargar los ítems a mano y el producto sigue vivo."

Este planteo es clave, conservalo en el proximo documento de ideas simples y si podés agregarle más pluses, agregalos.

Coservá esto en el nuevo documento y agregá mas inspiraciones: Ganador	Qué era	La forma  
Tarkam (WDK, campeón general)	Premios de torneos de fútbol amateur en USD₮: inscripción, estado verificable, reparto	Plata real entre gente que se conoce, con un flujo simple  
Curva (Pears)	Ver un partido sincronizado entre continentes, con chat, traducción local y propinas	Sin servidores \+ las tres tecnologías juntas  
Scout (QVAC)	IA de fútbol corriendo en el dispositivo	Un dominio específico, no "un asistente"  
AutoBounty (Aleph, dos premios)	Publicás una tarea, alguien la hace, la IA verifica el trabajo y se libera el pago	La IA decide, la blockchain ejecuta  
Piggy Quiz (Aleph, Base)	Trivia que enseña finanzas con premios reales	Cosa aburrida \+ experiencia divertida  
Clever (Aleph, Fiserv)	Ayuda a comercios a cuadrar ventas, liquidaciones y extractos	Problema empresarial concreto y sin glamour  
TornadoCodes (Aleph 2024, 1°)	Dar acceso a una app sin recolectar antes las direcciones de todos	Una fricción específica, eliminada.

Desarrolla un poco más lo que eran las ideas ganadoras y la forma en que funcionaron, y a partir de esos patrones poné más ideas.  
Hacé más en el documento de ideas en simple

\# Claude — Aug 21, 2026, 11:41 PM

Tu salida de Vulkan tiene un problema que hay que resolver hoy. Te lo explico abajo. Primero verifico la instalación de las otras dos tecnologías en las páginas oficiales.

Importante: Pear pide terminal POSIX en Windows, o sea WSL. Verifico el CLI de WDK.

Verificado todo. Antes de los documentos, \*\*tenés un problema que hay que resolver esta noche\*\*: tu salida dice \`Vulkan Instance Version: 1.3.301\` y tu placa reporta \`apiVersion 1.3.302\`. QVAC en Windows pide \*\*1.4 o superior\*\*. No cumplís. Es arreglable y te lo pongo primero.

\*\*File: instalar-las-tres.md\*\*

\`\`\`\`markdown  
\# Instalar las tres tecnologías en Windows  
\#\#\# QVAC · Pear · WDK — todo desde \`cmd\`, con comandos verificados contra las páginas oficiales  
\*\*21 de agosto de 2026\*\*

\> \*\*Cómo usar este documento:\*\* pasáselo a los tres integrantes. Cada uno corre lo  
\> mismo en su máquina. Al final hay una lista de verificación: si los cuatro  
\> pueden marcar todos los casilleros, mañana arrancan con el reloj a favor.  
\>  
\> Todos los comandos salen de la documentación oficial. Donde no verifiqué algo,  
\> lo digo.

\---

\# 🔴 PRIMERO — El problema que Emi ya encontró

Tu salida de \`vulkaninfo \--summary\` dice:

\`\`\`  
Vulkan Instance Version: 1.3.301  
GPU0: AMD Radeon(TM) 880M Graphics  
      apiVersion    \= 1.3.302  
      driverInfo    \= 24.30.22.03 (LLPC)  
\`\`\`

\*\*QVAC en Windows exige Vulkan 1.4 o superior, incluso para usar solo el  
procesador.\*\* Está en la tabla de plataformas soportadas de la documentación  
oficial. Tenés 1.3. \*\*Hoy no cumplís el requisito.\*\*

La buena noticia es que casi seguro se arregla, y hay una pista en tu propia  
salida: la capa \`VK\_LAYER\_VALVE\_steam\_fossilize\` reporta \`1.4.303\`. O sea que  
\*\*algo en tu sistema ya conoce Vulkan 1.4\*\* — lo que falta es que el driver de la  
placa lo exponga.

\#\# Cómo arreglarlo, en orden

\*\*1. Actualizar el driver de AMD.\*\* El tuyo es de la serie 24.30, que es de 2024\.  
Los drivers Adrenalin nuevos traen soporte de Vulkan 1.4.

\- Andá a \`https://www.amd.com/en/support\` y buscá tu modelo (Radeon 880M  
  Graphics, que es la gráfica integrada de los Ryzen AI serie 300).  
\- \*\*No lo actualices por Windows Update\*\*, que casi siempre da versiones viejas.  
\- Si tu laptop es de una marca que trae driver propio (Lenovo, Asus, HP), probá  
  primero el de AMD; si rompe algo, volvés al del fabricante.

\*\*2. Reiniciar.\*\* Sí, en serio. Vulkan se registra al arrancar.

\*\*3. Volver a verificar:\*\*

\`\`\`cmd  
vulkaninfo \--summary  
\`\`\`

Mirá dos cosas: \`Vulkan Instance Version\` y el \`apiVersion\` de tu GPU. \*\*Las dos  
tienen que decir 1.4 o más.\*\*

\*\*4. Si el número no sube\*\*, actualizá también el Vulkan Runtime instalando el SDK  
desde \`https://vulkan.lunarg.com\` (la doc de QVAC recomienda exactamente eso para  
verificar), reiniciá y probá de nuevo.

\> El aviso \`Registry lookup failed to get layer manifest files\` que te apareció es  
\> normal y no rompe nada. Ignoralo.

\#\# Si después de todo eso sigue en 1.3

No pierdas la noche. En orden:

1\. \*\*Probá en la máquina de otro integrante.\*\* Con que QVAC ande en una sola  
   laptop alcanza para construir y demostrar. Esa persona toma el rol de Núcleo.  
2\. \*\*Cambiá de track.\*\* Portero (WDK) y las ideas de Pears no usan QVAC para nada.  
3\. \*\*Vaquita sin QVAC:\*\* los ítems se cargan a mano, apuntás a Pears \+ WDK \+  
   General. Perdés $1.000 de cuatro posibles y el proyecto sigue en pie.

\---

\# 1 · QVAC — la IA que corre en tu máquina

\#\# Lo que ya hiciste bien

Tu Node es \`v22.20.0\` y npm \`10.9.3\`. QVAC pide Node ≥ 22.17 y npm ≥ 10.9.  
\*\*Cumplís.\*\* Y ya instalaste el SDK en \`C:\\hack\\qvac-pruebas\`.

\#\# Lo que te faltó: el archivo de configuración

Preguntaste dónde está \`qvac.config.json\`. \*\*No está en ningún lado: hay que  
crearlo vos.\*\* No viene con la instalación.

Va en la carpeta del proyecto, al lado del \`package.json\`. Desde \`cmd\`, parado en  
esa carpeta:

\`\`\`cmd  
cd C:\\hack\\qvac-pruebas  
notepad qvac.config.json  
\`\`\`

Windows te va a preguntar si querés crear el archivo. Decile que sí, pegá esto,  
guardá y cerrá:

\`\`\`json  
{  
  "loggerLevel": "info",  
  "loggerConsoleOutput": true,  
  "httpDownloadConcurrency": 3,  
  "httpConnectionTimeoutMs": 10000  
}  
\`\`\`

\*\*Para qué sirve:\*\* por defecto el SDK \*\*no imprime absolutamente nada\*\*. Si algo  
falla, no ves el motivo. Este archivo enciende los mensajes. Sin él vas a estar  
depurando a ciegas.

Verificá que quedó donde va:

\`\`\`cmd  
dir  
\`\`\`

Tenés que ver \`package.json\`, \`node\_modules\` y \`qvac.config.json\`.

\#\# El diagnóstico automático

\`\`\`cmd  
npx qvac doctor  
\`\`\`

Revisa versión de Node, sistema soportado, RAM total, RAM disponible, espacio en  
disco y herramientas opcionales. Lee así:

| Resultado | Qué significa |  
|---|---|  
| \`pass\` | Bien |  
| \`warn\` | Recomendado, no obligatorio. Seguí |  
| \`fail\` | \*\*Obligatorio. Hay que arreglarlo.\*\* Te imprime la pista |  
| \`skip\` / \`info\` | Informativo, ignoralo |

\*\*Con Vulkan en 1.3, esperá un \`fail\`.\*\* Ese comando es tu forma de confirmar que  
el arreglo del driver funcionó.

\#\# La primera inferencia

\`\`\`cmd  
notepad prueba.js  
\`\`\`

Pegá esto (sale del quickstart oficial, no lo inventé):

\`\`\`javascript  
import { loadModel, LLAMA\_3\_2\_1B\_INST\_Q4\_0, completion, unloadModel } from '@qvac/sdk';

try {  
  const modelId \= await loadModel({  
    modelSrc: LLAMA\_3\_2\_1B\_INST\_Q4\_0,  
    onProgress: (p) \=\> {  
      const mb \= (n) \=\> (n / 1e6).toFixed(1);  
      process.stderr.write(\`\\rBajando p.percentage.toFixed(0)%({mb(p.downloaded)}/${mb(p.total)} MB)\`);  
      if (p.percentage \>= 100\) process.stderr.write('\\n');  
    }  
  });

  const history \= \[{ role: 'user', content: 'Explicá qué es una factura en una oración' }\];  
  const result \= completion({ modelId, history, stream: true });  
  for await (const token of result.tokenStream) {  
    process.stdout.write(token);  
  }

  await unloadModel({ modelId });  
} catch (error) {  
  console.error('✖', error);  
  process.exit(1);  
}  
\`\`\`

Corrélo. \*\*Ojo con la sintaxis de Windows:\*\* en \`cmd\` las variables de entorno se  
ponen con \`set\` en una línea aparte, no como en Linux.

\`\`\`cmd  
set QVAC\_CONFIG\_PATH=./qvac.config.json  
node prueba.js  
\`\`\`

La primera vez baja el modelo. \`LLAMA\_3\_2\_1B\_INST\_Q4\_0\` es de mil millones de  
parámetros: el más chico y el más rápido de bajar. \*\*Lo que querés verificar ahora  
no es la calidad, es que la cadena entera funciona.\*\*

Si imprime texto, QVAC anda. \*\*Ese es el gate del track y lo pasaste antes de que  
empiece el hackathon.\*\*

\#\# Lo que de verdad importa para las ideas: leer una foto

Todas las ideas de ustedes necesitan sacar texto de una imagen. Está en dos  
páginas:

\- \`https://docs.qvac.tether.io/ai-capabilities/ocr/\`  
\- \`https://docs.qvac.tether.io/ai-capabilities/multimodal/\`

\*\*No te copio código de ahí porque no lo verifiqué.\*\* Copiar de memoria es  
exactamente cómo se inventan métodos que no existen, y los tres sponsors dicen que  
eso lo descartan sin revisar.

Entrá, copiá el ejemplo tal cual, y probalo con \*\*una foto de un ticket real  
sacada con el celular, torcida y con poca luz\*\*. No con una imagen limpia.

\*\*Ese es el momento de la verdad.\*\* Si un ticket arrugado sale legible, Vaquita,  
Ventanilla y el Banco de pruebas son todas viables. Si sale ilegible, lo sabés hoy.

\#\# El atajo que puede ahorrar horas

QVAC trae un servidor HTTP \*\*compatible con la API de OpenAI\*\*:  
\`https://docs.qvac.tether.io/cli/http-server/\`

Levantás ese servidor y cualquier herramienta que ya sepa hablar con OpenAI le  
habla a tu modelo local cambiando una sola dirección. \*\*El sponsor aclara  
explícitamente que usar ese servidor cuenta como inferencia local y califica para  
el track.\*\* Para un equipo de vibecoders es probablemente el camino más rápido.

\---

\# 2 · Pear — programas que se instalan sin tienda

\#\# ⚠️ La fricción de Windows, que hay que saber antes

La página de inicio de Pear dice, en los requisitos previos, que hace falta \*\*una  
terminal estilo POSIX: macOS, Linux, o Windows con WSL\*\*.

Al mismo tiempo, la página de instalación ofrece un instalador de PowerShell para  
Windows. O sea que el CLI se instala en Windows nativo, \*\*pero el camino que la  
documentación recomienda para el desarrollo es WSL.\*\*

\*\*Mi recomendación: instalen WSL.\*\* Tres motivos:  
1\. Es el camino que la documentación asume, así que los ejemplos van a funcionar  
   sin traducciones raras.  
2\. Ahorra horas de pelear con diferencias de terminal a las 4 de la mañana.  
3\. \*\*Esta fricción es justamente la que elimina competencia.\*\* Los equipos que se  
   traben acá no van a pasar el gate. Ustedes lo resuelven hoy y quedan adentro.

\`\`\`cmd  
wsl \--install  
\`\`\`

Reiniciá cuando te lo pida. Después entrás con \`wsl\` desde \`cmd\` y ahí adentro  
tenés Ubuntu, donde corren los comandos de Linux de toda la documentación.

\#\# Instalar el CLI

\*\*En Windows nativo (PowerShell, no \`cmd\`):\*\*

\`\`\`powershell  
irm https://install.pears.com/pear.ps1 | iex  
\`\`\`

\*\*En WSL o Linux:\*\*

\`\`\`bash  
curl https://install.pears.com/pear.sh | sh  
\`\`\`

\*\*Sin instalar nada, para probar:\*\*

\`\`\`cmd  
npx pear  
\`\`\`

El instalador imprime instrucciones para agregar Pear al \`PATH\`. \*\*Seguilas\*\*, si  
no el comando \`pear\` no va a existir en una terminal nueva.

Verificá:

\`\`\`cmd  
pear \--version  
\`\`\`

\*\*Un comando que te va a ahorrar mucho:\*\*

\`\`\`cmd  
pear \--menu  
\`\`\`

Desde la versión 3.2.0 te muestra todos los comandos como una lista filtrable, con  
un formulario para las opciones. En vez de memorizar flags, elegís de una lista.  
Para vibecoders esto vale oro.

\#\# Node

Pear pide \*\*Node ≥ 22.17 y npm ≥ 10.9\*\*, igual que QVAC. Ya lo tenés.

\#\# La plantilla del track

El track pide partir de \`hello-pear-bare\`, que es la plantilla de \*\*terminal\*\*  
(la otra, \`hello-pear-electron\`, es para aplicaciones de escritorio con ventana).

\`\`\`cmd  
git clone https://github.com/holepunchto/hello-pear-bare  
cd hello-pear-bare  
npm install  
pear touch  
\`\`\`

\`pear touch\` genera tu link de actualización. \*\*Copiá lo que te imprime y pegalo  
en el campo \`upgrade\` del \`package.json\`.\*\* La aplicación no arranca sin eso: te  
va a tirar \`INVALID\_URL\`. Es el error donde se traba todo el mundo.

Después:

\`\`\`cmd  
npm start  
\`\`\`

Eso corre en modo desarrollo, con las actualizaciones deshabilitadas.

\#\# ⚠️ Detalle importante que encontré en la documentación

\*\*El tutorial oficial de Pear se llama "Build a peer-to-peer chat".\*\* Es el  
hola-mundo de la plataforma.

Esto tiene una consecuencia directa para elegir idea: \*\*si presentan un chat, el  
juez —que es el creador de Pear— va a ver el resultado de su propio tutorial.\*\*  
Es la peor nota posible en originalidad. Ver la sección de ideas.

\---

\# 3 · WDK — mover dólares digitales

\#\# ⚠️⚠️ Advertencia de seguridad, leela dos veces

\*\*La guía oficial de inicio de WDK usa Ethereum mainnet y gasta plata de verdad.\*\*  
Lo dice textualmente: crea una billetera dedicada, fondeala con lo justo, y  
verificá red, dirección y monto antes de mandar. El comando de envío \*\*transmite  
de inmediato y es irreversible\*\*, y el CLI no vuelve a pedir confirmación una vez  
que la billetera está desbloqueada.

\*\*Ustedes no van a usar mainnet.\*\* Van a usar una red de prueba con fondos  
gratuitos. Y de todos modos:

\- \*\*Billetera nueva y dedicada. Nunca una personal.\*\* Los paquetes están en beta.  
\- \*\*La frase semilla nunca va en un comando, ni en un archivo del proyecto, ni en  
  una captura, ni en el chat con un asistente de IA.\*\* La documentación lo aclara  
  explícitamente. Si le pegás la semilla a Claude o a cualquier asistente, quedó  
  registrada.  
\- Poné una contraseña real. El CLI permite dejarla vacía, pero vacía no protege  
  nada.

\#\# Instalar

\*\*Node 22.18.0 o posterior.\*\* Fijate que es más alto que el que piden QVAC y Pear.  
Tu \`v22.20.0\` cumple.

El comando exacto de la documentación:

\`\`\`cmd  
npm install \-g \--allow-scripts=@tetherto/wdk-cli @tetherto/wdk-cli@1.0.0-beta.2  
\`\`\`

\*\*Dos cosas que no son opcionales:\*\*  
\- El \`--allow-scripts\` va sí o sí, no es decorativo.  
\- El paquete es \*\*\`@tetherto/wdk-cli\` con la arroba y la barra\*\*. El \`wdk-cli\`  
  suelto en npm es un proyecto distinto de otra gente. El documento del track lo  
  advierte y es un error fácil de cometer.

La versión actual es \`1.0.0-beta.2\` y puede cambiar antes de la estable.

Verificá:

\`\`\`cmd  
wdk \--version  
wdk \--help  
\`\`\`

El paquete instala \*\*tres programas\*\*: \`wdk\` (el que usás), \`wdk-mcp\` (el que  
conecta con asistentes de IA) y \`wdk-daemon\` (el que mantiene la sesión abierta).

\#\# El flujo básico, comando por comando

\*\*Crear una billetera de 12 palabras:\*\*

\`\`\`cmd  
wdk wallet create \--name hackathon \--words 12  
\`\`\`

Te va a pedir una contraseña dos veces (no se ve mientras escribís) y después  
\*\*muestra la frase semilla una sola vez\*\*. Anotala en papel. Si es la primera  
billetera, queda como predeterminada sola.

\*\*Desbloquearla por 5 minutos:\*\*

\`\`\`cmd  
wdk wallet unlock \--name hackathon \--ttl 5  
\`\`\`

El tiempo empieza a correr al desbloquear y \*\*no se reinicia con el uso\*\*. Si se  
te vence a mitad de algo, desbloqueás de nuevo. Existe \`--ttl 0\` para que no  
venza, pero ojo: mientras esté abierta, \*\*cualquier proceso corriendo con tu mismo  
usuario del sistema puede usarla sin la contraseña.\*\* Para el hackathon, en tu  
propia máquina y con fondos de prueba, es aceptable. Sabelo igual.

\*\*Ver tu dirección:\*\*

\`\`\`cmd  
wdk get address \--network ethereum \--wallet hackathon  
\`\`\`

\*\*Ver el saldo:\*\*

\`\`\`cmd  
wdk get balance \--network ethereum \--wallet hackathon  
\`\`\`

\*\*Simular un envío sin mandar nada — usá siempre esto primero:\*\*

\`\`\`cmd  
wdk send \--network ethereum \--to DIRECCION \--amount 0.0001 \--wallet hackathon \--dry-run  
\`\`\`

El \`--dry-run\` estima la comisión y te devuelve un resumen \*\*sin transmitir\*\*. Es  
tu red de seguridad. Sacás el \`--dry-run\` solo cuando estés seguro.

\*\*Cerrar la billetera cuando terminás:\*\*

\`\`\`cmd  
wdk wallet lock \--name hackathon  
\`\`\`

O todas: \`wdk wallet lock \--all\`

\#\# Para el track: red de prueba, no mainnet

La guía de inicio usa mainnet porque está escrita para gente que va a producción.  
Ustedes necesitan una red de prueba con fondos gratis. Está acá:

\`https://docs.wdk.tether.io/cli/guides/custom-networks/\`

\*\*Recordá del documento del track:\*\* la testnet de USD₮ \*\*solo existe en Sepolia\*\*.  
Para cualquier otra cadena hay que desplegar un token de mentira propio. Si van por  
el premio de gasless, \*\*quédense en Sepolia.\*\*

\#\# Si van a conectarlo con una IA (Portero, y la parte de pagos de Vaquita)

\`https://docs.wdk.tether.io/cli/guides/use-mcp-server/\`

Y antes de desbloquear una billetera con fondos, leé el modelo de seguridad:  
\`https://docs.wdk.tether.io/cli/reference/security-model/\`

\#\# Dos páginas que encontré y que son oro para Vaquita

Estas no las conocía y cambian la conversación:

\- \*\*\`https://docs.wdk.tether.io/tools/pear-wrk-wdk/\`\*\* — "Run WDK in a Pear  
  worklet". \*\*Tether documenta oficialmente cómo correr WDK adentro de Pear.\*\*  
  Eso significa que la combinación no es un invento nuestro: está bendecida y  
  documentada. Para una idea que use los dos tracks, es lo mejor que podía pasar.  
\- \*\*\`https://docs.wdk.tether.io/tools/p2p-address-book/\`\*\* — una libreta de  
  direcciones peer-to-peer. Justo el problema de "cómo sé la dirección del que me  
  debe plata sin un servidor".

\*\*Léanlas antes de decidir la idea.\*\* Pueden ahorrar horas de construir algo que  
ya existe.

\#\# Y para móvil

\- \`https://docs.wdk.tether.io/start-building/react-native-quickstart/\`  
\- \`https://docs.wdk.tether.io/ui-kits/react-native-ui-kit/\`

Hay un kit de interfaz de React Native ya hecho. Si el proyecto termina siendo una  
app de teléfono, no arrancan de cero.

\---

\# 4 · Lista de verificación

Cada integrante marca en su máquina. \*\*El objetivo es llegar mañana con todo en  
verde.\*\*

\#\# Base  
\- \[ \] \`node \--version\` da 22.18.0 o más  
\- \[ \] \`npm \--version\` da 10.9 o más  
\- \[ \] Al menos 15 GB libres en disco  
\- \[ \] Git instalado (\`git \--version\`)

\#\# QVAC  
\- \[ \] \`vulkaninfo \--summary\` dice \*\*1.4 o más\*\* en instancia y en la GPU  
\- \[ \] Carpeta creada, \`npm i @qvac/sdk\` sin errores  
\- \[ \] \`qvac.config.json\` creado a mano en la carpeta del proyecto  
\- \[ \] \`npx qvac doctor\` sin ningún \`fail\`  
\- \[ \] \`node prueba.js\` imprime texto generado  
\- \[ \] \*\*Probado OCR con una foto fea de un ticket real\*\*

\#\# Pear  
\- \[ \] WSL instalado (recomendado) o PowerShell listo  
\- \[ \] \`pear \--version\` responde  
\- \[ \] \`pear \--menu\` abre la lista de comandos  
\- \[ \] \`hello-pear-bare\` clonado, \`npm install\` corrido  
\- \[ \] \`pear touch\` corrido y el link pegado en \`package.json\`  
\- \[ \] \`npm start\` arranca sin \`INVALID\_URL\`

\#\# WDK  
\- \[ \] \`wdk \--version\` responde  
\- \[ \] Billetera \*\*de prueba\*\* creada, semilla anotada en papel  
\- \[ \] \`wdk wallet unlock\` funciona  
\- \[ \] \`wdk get address\` devuelve una dirección  
\- \[ \] Red de prueba configurada y con fondos gratuitos  
\- \[ \] \`wdk send \--dry-run\` devuelve una estimación

\#\# Equipo  
\- \[ \] Los cuatro inscriptos y aceptados  
\- \[ \] Los cuatro con cuenta en DoraHacks  
\- \[ \] Los cuatro en el Telegram y en los topics de cada sponsor  
\- \[ \] \*\*25 tickets fotografiados feo\*\*  
\- \[ \] Roles decididos  
\- \[ \] Preguntado en el Telegram si se puede entrar a varios tracks de Tether

\---

\# 5 · Errores y qué hacer

| Síntoma | Causa | Solución |  
|---|---|---|  
| \`qvac doctor\` da \`fail\` en Vulkan | Driver viejo | Actualizar AMD desde amd.com, reiniciar |  
| QVAC no imprime nada | Falta el config o la variable | Crear \`qvac.config.json\` \+ \`set QVAC\_CONFIG\_PATH=./qvac.config.json\` |  
| \`Cannot use import outside a module\` | Falta el tipo módulo | \`npm pkg set type=module\` |  
| El modelo se cuelga al cargar | Poca RAM libre | Cerrá el navegador. Con 32 GB no debería pasar |  
| La descarga del modelo se corta | Timeout corto | Subí \`httpConnectionTimeoutMs\` |  
| \`pear\` no existe en una terminal nueva | Falta el \`PATH\` | Seguí lo que imprimió el instalador |  
| \`INVALID\_URL\` al arrancar Pear | Link de upgrade placeholder | \`pear touch\` y pegar el resultado en \`package.json\` |  
| Las actualizaciones de Pear no llegan y no hay error | En la variante \`daemon\` el error va a otro lado | Mirá \`\<storage\>/updates.log\` |  
| \`wdk\` no se instala | Falta \`--allow-scripts\` | Usá el comando exacto de arriba |  
| \`wdk\` dice que la billetera está bloqueada | Se venció el TTL | \`wdk wallet unlock\` de nuevo |

\*\*Páginas oficiales de problemas:\*\*  
\- QVAC: \`https://docs.qvac.tether.io/troubleshooting/\`  
\- Pear: \`https://docs.pears.com/how-to/troubleshooting/\`  
\- WDK: \`https://docs.wdk.tether.io/cli/guides/handle-errors/\`

\*\*Dónde está el equipo de ingeniería de cada uno:\*\*  
\- QVAC y WDK: Discord de Tether Dev  
\- WDK también: \`https://discord.gg/arYXDhHB2w\`  
\- Pear: \*\*no tiene Discord.\*\* El equipo está en una sala de Keet, y el link está  
  en el documento del track.

\---

\# 6 · Qué sé y qué no

Para que sepas cuánto confiar en cada parte de este documento.

\*\*Verificado hoy contra la documentación oficial:\*\* requisitos de sistema de QVAC,  
el quickstart de QVAC, el instalador de Pear y sus requisitos previos, la  
instalación del CLI de WDK y todo el flujo de billetera, y las advertencias de  
seguridad.

\*\*No verificado y lo digo:\*\* el código concreto de OCR y multimodal de QVAC, y la  
configuración de redes de prueba de WDK. Están linkeados para que los abran  
ustedes.

\*\*Mi límite:\*\* no usé ninguna de las tres. Puedo leer la documentación con  
ustedes, diseñar la arquitectura, y depurar errores concretos si me pegan el  
mensaje exacto. \*\*Lo que no puedo es decirles de memoria cómo se llama un método.  
Si lo hago, desconfíen y verifiquen.\*\*

Los tres workshops de mañana los dictan las mismas personas que después juzgan, y  
los tres prometen que salís con el entorno funcionando. \*\*Son la mejor forma de  
cubrir mi límite.\*\*

\`\`\`\`

Ahora amplío el documento de ideas con todo lo que pediste.

\*\*Lo primero, porque es lo único urgente:\*\* tu Vulkan es 1.3.301 y QVAC en Windows pide 1.4 o más, incluso para usar solo el procesador. \*\*Hoy no cumplís.\*\* Se arregla actualizando el driver de AMD desde amd.com — el tuyo es de la serie 24.30, que es de 2024 — y reiniciando. Hay una pista buena en tu propia salida: la capa de Steam reporta 1.4.303, así que tu sistema ya conoce Vulkan 1.4; falta que el driver de la Radeon 880M lo exponga. El aviso del registro que te apareció es normal, ignoralo.

Y sobre el \`qvac.config.json\`: \*\*no está en ningún lado porque hay que crearlo vos.\*\* No viene con la instalación. Desde tu carpeta, \`notepad qvac.config.json\`, decile que sí a crearlo, pegás el JSON y guardás. Sin ese archivo el SDK no imprime absolutamente nada y vas a depurar a ciegas.

\*\*Sobre la mensajería: sí se cae, y por un motivo más fuerte que Curva.\*\* Encontré que el tutorial oficial de Pear se llama literalmente "Build a peer-to-peer chat". Es el hola-mundo de la plataforma. Y el juez del track es dmc, el creador de Pear. Si presentás un chat, el tipo que diseñó la plataforma va a estar mirando el resultado de su propio tutorial. No hay ejecución que recupere esa nota en originalidad. Llave se salva porque no es mensajería: es un intercambiador de secretos de un solo uso.

Llamadas de voz: no en 24 horas, y además te empujan de vuelta al territorio del chat.

\*\*Vaquita en teléfono: tenías razón y la respuesta tiene una vuelta interesante.\*\* Para el hackathon tiene que ser computadora, porque el track exige que el juez instale escribiendo \`pear install pear://\` en una terminal. Pero móvil no es fantasía: QVAC corre en teléfono vía Expo y WDK tiene arranque rápido de React Native con un kit de interfaz ya hecho. Lo único que no va a teléfono es el canal de instalación. Eso se convierte en material perfecto para los últimos veinte segundos del video, donde la rúbrica premia tener un plan claro. Y en la demo, con poner el ticket arrugado al lado y que el primer plano sea la foto sacada con el celular, la objeción desaparece.

\*\*Dos hallazgos que le sacan riesgo a Vaquita.\*\* Tether documenta oficialmente cómo correr WDK adentro de Pear — o sea que la combinación no es invento nuestro, está bendecida y hay guía. Y existe una libreta de direcciones peer-to-peer ya hecha, que resuelve la parte más fea del producto: cómo sabés la dirección del que te debe sin un servidor guardando contactos. \*\*Las dos piezas que parecían más difíciles resultaron estar resueltas por el propio sponsor.\*\* Léanlas antes de decidir.

\*\*Y apareció una idea que antes no estaba y que te recomiendo mirar: Testigo.\*\* Grabás una reunión, y te dice quién se comprometió a qué y para cuándo, con el audio sin salir nunca de la máquina. Encaja exacto en lo que pidió QVAC — leer, encontrar lo importante, avisar — con la privacidad como razón de existir de verdad, porque ninguna empresa seria sube sus reuniones internas a un tercero.

Lo que la hace especial en tu situación: \*\*el material de prueba lo generás esta noche en cinco minutos\*\* juntando a tus amigos a actuar una reunión de dos minutos. Nada de conseguir tickets, nada de que el OCR lea letra manuscrita. Y usa transcripción de audio en vez de lectura de imágenes, o sea otro camino distinto dentro del mismo track. \*\*Testigo es el plan B de Vaquita que no comparte su punto de falla.\*\*

También agregué Enjambre, que reparte el modelo de IA de máquina en máquina para que cuarenta personas no bajen cada una los mismos 2,5 GB — que es literalmente el problema que va a tener el venue mañana — más Padrón, Perito, Goteo y Cofre, y expandí los siete ganadores explicando cómo funcionaba cada uno y qué patrón sale de cada forma.

\*\*Una advertencia de seguridad que no estaba y es importante:\*\* la guía oficial de WDK usa Ethereum mainnet y gasta plata de verdad. El comando de envío transmite de inmediato, es irreversible, y no vuelve a pedir confirmación una vez desbloqueada la billetera. Usen red de prueba. Y la frase semilla nunca va en un comando, ni en un archivo, ni en una captura, \*\*ni en el chat con un asistente de IA\*\* — la documentación lo aclara explícitamente.

Las tres cosas de esta noche, en orden: actualizar el driver de AMD y volver a correr \`vulkaninfo\`, grabar el audio de la reunión falsa, y juntar los tickets.

\# Human — Aug 21, 2026, 11:51 PM

\> \*\*Attachment: attachment · txt · 93.5 KB\*\*  
\>  
\> Microsoft Windows \[Versión 10.0.26200.9168\]  
\> (c) Microsoft Corporation. Todos los derechos reservados.  
\>   
\> C:\\Users\\Emi\>cd C:\\hack\\qvac-pruebas  
\>   
\> C:\\hack\\qvac-pruebas\>notepad qvac.config.json  
\>   
\> C:\\hack\\qvac-pruebas\>dir  
\>  El volumen de la unidad C es OS  
\>  El número de serie del volumen es: FCDA-F734  
\>   
\>  Directorio de C:\\hack\\qvac-pruebas  
\>   
\> 21/08/2026  11:43 p. m.    \<DIR\>          .  
\> 21/08/2026  11:14 p. m.    \<DIR\>          ..  
\> 21/08/2026  11:17 p. m.    \<DIR\>          node\_modules  
\> 21/08/2026  11:17 p. m.            95,330 package-lock.json  
\> 21/08/2026  11:17 p. m.               298 package.json  
\> 21/08/2026  11:43 p. m.               131 qvac.config.json  
\>                3 archivos         95,759 bytes  
\>                3 dirs  774,826,127,360 bytes libres  
\>   
\> C:\\hack\\qvac-pruebas\>npx qvac doctor  
\> npm error code E404  
\> npm error 404 Not Found \- GET https://registry.npmjs.org/qvac \- Not found  
\> npm error 404  
\> npm error 404  'qvac@\*' is not in this registry.  
\> npm error 404  
\> npm error 404 Note that you can also install from a  
\> npm error 404 tarball, folder, http url, or git url.  
\> npm error A complete log of this run can be found in: C:\\Users\\Emi\\AppData\\Local\\npm-cache\\\_logs\\2026-08-22T02\_44\_38\_622Z-debug-0.log  
\>   
\> C:\\hack\\qvac-pruebas\>vulkaninfo  
\> WARNING: \[Loader Message\] Code 0 : windows\_read\_data\_files\_in\_registry: Registry lookup failed to get layer manifest files.  
\> WARNING: \[Loader Message\] Code 0 : Layer VK\_LAYER\_AMD\_switchable\_graphics uses API version 1.3 which is older than the application specified API version of 1.4. May cause issues.  
\> WARNING: \[Loader Message\] Code 0 : Layer VK\_LAYER\_OBS\_HOOK uses API version 1.3 which is older than the application specified API version of 1.4. May cause issues.  
\> \==========  
\> VULKANINFO  
\> \==========  
\>   
\> Vulkan Instance Version: 1.4.341  
\>   
\>   
\> Instance Extensions: count \= 13  
\> \===============================  
\>         VK\_EXT\_debug\_report                    : extension revision 10  
\>         VK\_EXT\_debug\_utils                     : extension revision 2  
\>         VK\_EXT\_swapchain\_colorspace            : extension revision 5  
\>         VK\_KHR\_device\_group\_creation           : extension revision 1  
\>         VK\_KHR\_external\_fence\_capabilities     : extension revision 1  
\>         VK\_KHR\_external\_memory\_capabilities    : extension revision 1  
\>         VK\_KHR\_external\_semaphore\_capabilities : extension revision 1  
\>         VK\_KHR\_get\_physical\_device\_properties2 : extension revision 2  
\>         VK\_KHR\_get\_surface\_capabilities2       : extension revision 1  
\>         VK\_KHR\_portability\_enumeration         : extension revision 1  
\>         VK\_KHR\_surface                         : extension revision 25  
\>         VK\_KHR\_win32\_surface                   : extension revision 6  
\>         VK\_LUNARG\_direct\_driver\_loading        : extension revision 1  
\>   
\> Layers: count \= 4  
\> \=================  
\> VK\_LAYER\_AMD\_switchable\_graphics (AMD switchable graphics layer) Vulkan version 1.3.302, layer version 1:  
\>         Layer Extensions: count \= 0  
\>         Devices: count \= 1  
\>                 GPU id \= 0 (AMD Radeon(TM) 880M Graphics)  
\>                 Layer-Device Extensions: count \= 0  
\>   
\> VK\_LAYER\_OBS\_HOOK (Open Broadcaster Software hook) Vulkan version 1.3.216, layer version 1:  
\>         Layer Extensions: count \= 0  
\>         Devices: count \= 1  
\>                 GPU id \= 0 (AMD Radeon(TM) 880M Graphics)  
\>                 Layer-Device Extensions: count \= 0  
\>   
\> VK\_LAYER\_VALVE\_steam\_fossilize (Steam Pipeline Caching Layer) Vulkan version 1.4.303, layer version 1:  
\>         Layer Extensions: count \= 0  
\>         Devices: count \= 1  
\>                 GPU id \= 0 (AMD Radeon(TM) 880M Graphics)  
\>                 Layer-Device Extensions: count \= 0  
\>   
\> VK\_LAYER\_VALVE\_steam\_overlay (Steam Overlay Layer) Vulkan version 1.3.207, layer version 1:  
\>         Layer Extensions: count \= 0  
\>         Devices: count \= 1  
\>                 GPU id \= 0 (AMD Radeon(TM) 880M Graphics)  
\>                 Layer-Device Extensions: count \= 0  
\>   
\> Presentable Surfaces:  
\> \=====================  
\> GPU id : 0 (AMD Radeon(TM) 880M Graphics) \[VK\_KHR\_win32\_surface\]:  
\>         Surface type \= VK\_KHR\_win32\_surface  
\>         Formats: count \= 5  
\>                 SurfaceFormat\[0\]:  
\>                         format \= FORMAT\_R8G8B8A8\_UNORM  
\>                         colorSpace \= COLOR\_SPACE\_SRGB\_NONLINEAR\_KHR  
\>                 SurfaceFormat\[1\]:  
\>                         format \= FORMAT\_B8G8R8A8\_UNORM  
\>                         colorSpace \= COLOR\_SPACE\_SRGB\_NONLINEAR\_KHR  
\>                 SurfaceFormat\[2\]:  
\>                         format \= FORMAT\_A2B10G10R10\_UNORM\_PACK32  
\>                         colorSpace \= COLOR\_SPACE\_SRGB\_NONLINEAR\_KHR  
\>                 SurfaceFormat\[3\]:  
\>                         format \= FORMAT\_R8G8B8A8\_SRGB  
\>                         colorSpace \= COLOR\_SPACE\_SRGB\_NONLINEAR\_KHR  
\>                 SurfaceFormat\[4\]:  
\>                         format \= FORMAT\_B8G8R8A8\_SRGB  
\>                         colorSpace \= COLOR\_SPACE\_SRGB\_NONLINEAR\_KHR  
\>         Present Modes: count \= 3  
\>                 PRESENT\_MODE\_IMMEDIATE\_KHR  
\>                 PRESENT\_MODE\_FIFO\_KHR  
\>                 PRESENT\_MODE\_FIFO\_RELAXED\_KHR  
\>         VkSurfaceCapabilitiesKHR:  
\>         \-------------------------  
\>                 minImageCount \= 2  
\>                 maxImageCount \= 16  
\>                 currentExtent:  
\>                         width  \= 256  
\>                         height \= 256  
\>                 minImageExtent:  
\>                         width  \= 256  
\>                         height \= 256  
\>                 maxImageExtent:  
\>                         width  \= 256  
\>                         height \= 256  
\>                 maxImageArrayLayers \= 1  
\>                 supportedTransforms: count \= 1  
\>                         SURFACE\_TRANSFORM\_IDENTITY\_BIT\_KHR  
\>                 currentTransform \= SURFACE\_TRANSFORM\_IDENTITY\_BIT\_KHR  
\>                 supportedCompositeAlpha: count \= 1  
\>                         COMPOSITE\_ALPHA\_OPAQUE\_BIT\_KHR  
\>                 supportedUsageFlags: count \= 6  
\>                         IMAGE\_USAGE\_TRANSFER\_SRC\_BIT  
\>                         IMAGE\_USAGE\_TRANSFER\_DST\_BIT  
\>                         IMAGE\_USAGE\_SAMPLED\_BIT  
\>                         IMAGE\_USAGE\_STORAGE\_BIT  
\>                         IMAGE\_USAGE\_COLOR\_ATTACHMENT\_BIT  
\>                         IMAGE\_USAGE\_INPUT\_ATTACHMENT\_BIT  
\>         VkSurfaceCapabilitiesFullScreenExclusiveEXT:  
\>         \--------------------------------------------  
\>                 fullScreenExclusiveSupported \= true  
\>   
\>   
\>   
\> Device Properties and Extensions:  
\> \=================================  
\> GPU0:  
\> VkPhysicalDeviceProperties:  
\> \---------------------------  
\>         apiVersion        \= 1.3.302 (4206894)  
\>         driverVersion     \= 2.0.331 (8388939)  
\>         vendorID          \= 0x1002  
\>         deviceID          \= 0x150e  
\>         deviceType        \= PHYSICAL\_DEVICE\_TYPE\_INTEGRATED\_GPU  
\>         deviceName        \= AMD Radeon(TM) 880M Graphics  
\>         pipelineCacheUUID \= 4f03e051-a749-5640-b063-f5ff050f46e8  
\>   
\> VkPhysicalDeviceLimits:  
\> \-----------------------  
\>         maxImageDimension1D                             \= 16384  
\>         maxImageDimension2D                             \= 16384  
\>         maxImageDimension3D                             \= 8192  
\>         maxImageDimensionCube                           \= 16384  
\>         maxImageArrayLayers                             \= 8192  
\>         maxTexelBufferElements                          \= 4294967295  
\>         maxUniformBufferRange                           \= 4294967295  
\>         maxStorageBufferRange                           \= 4294967295  
\>         maxPushConstantsSize                            \= 256  
\>         maxMemoryAllocationCount                        \= 4294967295  
\>         maxSamplerAllocationCount                       \= 1048576  
\>         bufferImageGranularity                          \= 0x00000001  
\>         sparseAddressSpaceSize                          \= 0x7ffa00000000  
\>         maxBoundDescriptorSets                          \= 32  
\>         maxPerStageDescriptorSamplers                   \= 4294967295  
\>         maxPerStageDescriptorUniformBuffers             \= 4294967295  
\>         maxPerStageDescriptorStorageBuffers             \= 4294967295  
\>         maxPerStageDescriptorSampledImages              \= 4294967295  
\>         maxPerStageDescriptorStorageImages              \= 4294967295  
\>         maxPerStageDescriptorInputAttachments           \= 4294967295  
\>         maxPerStageResources                            \= 4294967295  
\>         maxDescriptorSetSamplers                        \= 4294967295  
\>         maxDescriptorSetUniformBuffers                  \= 4294967295  
\>         maxDescriptorSetUniformBuffersDynamic           \= 8  
\>         maxDescriptorSetStorageBuffers                  \= 4294967295  
\>         maxDescriptorSetStorageBuffersDynamic           \= 8  
\>         maxDescriptorSetSampledImages                   \= 4294967295  
\>         maxDescriptorSetStorageImages                   \= 4294967295  
\>         maxDescriptorSetInputAttachments                \= 4294967295  
\>         maxVertexInputAttributes                        \= 64  
\>         maxVertexInputBindings                          \= 32  
\>         maxVertexInputAttributeOffset                   \= 4294967295  
\>         maxVertexInputBindingStride                     \= 16383  
\>         maxVertexOutputComponents                       \= 128  
\>         maxTessellationGenerationLevel                  \= 64  
\>         maxTessellationPatchSize                        \= 32  
\>         maxTessellationControlPerVertexInputComponents  \= 128  
\>         maxTessellationControlPerVertexOutputComponents \= 128  
\>         maxTessellationControlPerPatchOutputComponents  \= 120  
\>         maxTessellationControlTotalOutputComponents     \= 4096  
\>         maxTessellationEvaluationInputComponents        \= 128  
\>         maxTessellationEvaluationOutputComponents       \= 128  
\>         maxGeometryShaderInvocations                    \= 126  
\>         maxGeometryInputComponents                      \= 128  
\>         maxGeometryOutputComponents                     \= 128  
\>         maxGeometryOutputVertices                       \= 256  
\>         maxGeometryTotalOutputComponents                \= 1024  
\>         maxFragmentInputComponents                      \= 128  
\>         maxFragmentOutputAttachments                    \= 8  
\>         maxFragmentDualSrcAttachments                   \= 1  
\>         maxFragmentCombinedOutputResources              \= 4294967295  
\>         maxComputeSharedMemorySize                      \= 32768  
\>         maxComputeWorkGroupCount: count \= 3  
\>                 4294967295  
\>                 65535  
\>                 65535  
\>         maxComputeWorkGroupInvocations                  \= 1024  
\>         maxComputeWorkGroupSize: count \= 3  
\>                 1024  
\>                 1024  
\>                 1024  
\>         subPixelPrecisionBits                           \= 8  
\>         subTexelPrecisionBits                           \= 8  
\>         mipmapPrecisionBits                             \= 8  
\>         maxDrawIndexedIndexValue                        \= 4294967295  
\>         maxDrawIndirectCount                            \= 4294967295  
\>         maxSamplerLodBias                               \= 15.9961  
\>         maxSamplerAnisotropy                            \= 16  
\>         maxViewports                                    \= 16  
\>         maxViewportDimensions: count \= 2  
\>                 16384  
\>                 16384  
\>         viewportBoundsRange: count \= 2  
\>                 \-32768  
\>                 32767  
\>         viewportSubPixelBits                            \= 8  
\>         minMemoryMapAlignment                           \= 64  
\>         minTexelBufferOffsetAlignment                   \= 0x00000004  
\>         minUniformBufferOffsetAlignment                 \= 0x00000010  
\>         minStorageBufferOffsetAlignment                 \= 0x00000004  
\>         minTexelOffset                                  \= \-64  
\>         maxTexelOffset                                  \= 63  
\>         minTexelGatherOffset                            \= \-32  
\>         maxTexelGatherOffset                            \= 31  
\>         minInterpolationOffset                          \= \-2  
\>         maxInterpolationOffset                          \= 1  
\>         subPixelInterpolationOffsetBits                 \= 8  
\>         maxFramebufferWidth                             \= 16384  
\>         maxFramebufferHeight                            \= 16384  
\>         maxFramebufferLayers                            \= 8192  
\>         framebufferColorSampleCounts: count \= 4  
\>                 SAMPLE\_COUNT\_1\_BIT  
\>                 SAMPLE\_COUNT\_2\_BIT  
\>                 SAMPLE\_COUNT\_4\_BIT  
\>                 SAMPLE\_COUNT\_8\_BIT  
\>         framebufferDepthSampleCounts: count \= 4  
\>                 SAMPLE\_COUNT\_1\_BIT  
\>                 SAMPLE\_COUNT\_2\_BIT  
\>                 SAMPLE\_COUNT\_4\_BIT  
\>                 SAMPLE\_COUNT\_8\_BIT  
\>         framebufferStencilSampleCounts: count \= 4  
\>                 SAMPLE\_COUNT\_1\_BIT  
\>                 SAMPLE\_COUNT\_2\_BIT  
\>                 SAMPLE\_COUNT\_4\_BIT  
\>                 SAMPLE\_COUNT\_8\_BIT  
\>         framebufferNoAttachmentsSampleCounts: count \= 4  
\>                 SAMPLE\_COUNT\_1\_BIT  
\>                 SAMPLE\_COUNT\_2\_BIT  
\>                 SAMPLE\_COUNT\_4\_BIT  
\>                 SAMPLE\_COUNT\_8\_BIT  
\>         maxColorAttachments                             \= 8  
\>         sampledImageColorSampleCounts: count \= 4  
\>                 SAMPLE\_COUNT\_1\_BIT  
\>                 SAMPLE\_COUNT\_2\_BIT  
\>                 SAMPLE\_COUNT\_4\_BIT  
\>                 SAMPLE\_COUNT\_8\_BIT  
\>         sampledImageIntegerSampleCounts: count \= 4  
\>                 SAMPLE\_COUNT\_1\_BIT  
\>                 SAMPLE\_COUNT\_2\_BIT  
\>                 SAMPLE\_COUNT\_4\_BIT  
\>                 SAMPLE\_COUNT\_8\_BIT  
\>         sampledImageDepthSampleCounts: count \= 4  
\>                 SAMPLE\_COUNT\_1\_BIT  
\>                 SAMPLE\_COUNT\_2\_BIT  
\>                 SAMPLE\_COUNT\_4\_BIT  
\>                 SAMPLE\_COUNT\_8\_BIT  
\>         sampledImageStencilSampleCounts: count \= 4  
\>                 SAMPLE\_COUNT\_1\_BIT  
\>                 SAMPLE\_COUNT\_2\_BIT  
\>                 SAMPLE\_COUNT\_4\_BIT  
\>                 SAMPLE\_COUNT\_8\_BIT  
\>         storageImageSampleCounts: count \= 4  
\>                 SAMPLE\_COUNT\_1\_BIT  
\>                 SAMPLE\_COUNT\_2\_BIT  
\>                 SAMPLE\_COUNT\_4\_BIT  
\>                 SAMPLE\_COUNT\_8\_BIT  
\>         maxSampleMaskWords                              \= 1  
\>         timestampComputeAndGraphics                     \= true  
\>         timestampPeriod                                 \= 10  
\>         maxClipDistances                                \= 8  
\>         maxCullDistances                                \= 8  
\>         maxCombinedClipAndCullDistances                 \= 8  
\>         discreteQueuePriorities                         \= 2  
\>         pointSizeRange: count \= 2  
\>                 0  
\>                 8191.88  
\>         lineWidthRange: count \= 2  
\>                 1  
\>                 8191.88  
\>         pointSizeGranularity                            \= 0.125  
\>         lineWidthGranularity                            \= 0.125  
\>         strictLines                                     \= false  
\>         standardSampleLocations                         \= true  
\>         optimalBufferCopyOffsetAlignment                \= 0x00000001  
\>         optimalBufferCopyRowPitchAlignment              \= 0x00000001  
\>         nonCoherentAtomSize                             \= 0x00000080  
\>   
\> VkPhysicalDeviceSparseProperties:  
\> \---------------------------------  
\>         residencyStandard2DBlockShape            \= true  
\>         residencyStandard2DMultisampleBlockShape \= false  
\>         residencyStandard3DBlockShape            \= true  
\>         residencyAlignedMipSize                  \= false  
\>         residencyNonResidentStrict               \= true  
\>   
\> VkPhysicalDeviceAccelerationStructurePropertiesKHR:  
\> \---------------------------------------------------  
\>         maxGeometryCount                                           \= 16777216  
\>         maxInstanceCount                                           \= 16777216  
\>         maxPrimitiveCount                                          \= 536870912  
\>         maxPerStageDescriptorAccelerationStructures                \= 1048576  
\>         maxPerStageDescriptorUpdateAfterBindAccelerationStructures \= 1048576  
\>         maxDescriptorSetAccelerationStructures                     \= 1048576  
\>         maxDescriptorSetUpdateAfterBindAccelerationStructures      \= 1048576  
\>         minAccelerationStructureScratchOffsetAlignment             \= 256  
\>   
\> VkPhysicalDeviceComputeShaderDerivativesPropertiesKHR:  
\> \------------------------------------------------------  
\>         meshAndTaskShaderDerivatives \= true  
\>   
\> VkPhysicalDeviceConservativeRasterizationPropertiesEXT:  
\> \-------------------------------------------------------  
\>         primitiveOverestimationSize                 \= 0  
\>         maxExtraPrimitiveOverestimationSize         \= 0  
\>         extraPrimitiveOverestimationSizeGranularity \= 0  
\>         primitiveUnderestimation                    \= true  
\>         conservativePointAndLineRasterization       \= false  
\>         degenerateTrianglesRasterized               \= true  
\>         degenerateLinesRasterized                   \= false  
\>         fullyCoveredFragmentShaderInputVariable     \= false  
\>         conservativeRasterizationPostDepthCoverage  \= true  
\>   
\> VkPhysicalDeviceCooperativeMatrixPropertiesKHR:  
\> \-----------------------------------------------  
\>         cooperativeMatrixSupportedStages: count \= 1  
\>                 SHADER\_STAGE\_COMPUTE\_BIT  
\>   
\> VkPhysicalDeviceCustomBorderColorPropertiesEXT:  
\> \-----------------------------------------------  
\>         maxCustomBorderColorSamplers \= 4096  
\>   
\> VkPhysicalDeviceDescriptorBufferDensityMapPropertiesEXT:  
\> \--------------------------------------------------------  
\>         combinedImageSamplerDensityMapDescriptorSize \= 0  
\>   
\> VkPhysicalDeviceDescriptorBufferPropertiesEXT:  
\> \----------------------------------------------  
\>         combinedImageSamplerDescriptorSingleArray            \= true  
\>         bufferlessPushDescriptors                            \= true  
\>         allowSamplerImageViewPostSubmitCreation              \= true  
\>         descriptorBufferOffsetAlignment                      \= 0x00000010  
\>         maxDescriptorBufferBindings                          \= 32  
\>         maxResourceDescriptorBufferBindings                  \= 32  
\>         maxSamplerDescriptorBufferBindings                   \= 32  
\>         maxEmbeddedImmutableSamplerBindings                  \= 32  
\>         maxEmbeddedImmutableSamplers                         \= 4294967295  
\>         bufferCaptureReplayDescriptorDataSize                \= 8  
\>         imageCaptureReplayDescriptorDataSize                 \= 8  
\>         imageViewCaptureReplayDescriptorDataSize             \= 4  
\>         samplerCaptureReplayDescriptorDataSize               \= 4  
\>         accelerationStructureCaptureReplayDescriptorDataSize \= 4  
\>         samplerDescriptorSize                                \= 16  
\>         combinedImageSamplerDescriptorSize                   \= 48  
\>         sampledImageDescriptorSize                           \= 32  
\>         storageImageDescriptorSize                           \= 32  
\>         uniformTexelBufferDescriptorSize                     \= 16  
\>         robustUniformTexelBufferDescriptorSize               \= 16  
\>         storageTexelBufferDescriptorSize                     \= 16  
\>         robustStorageTexelBufferDescriptorSize               \= 16  
\>         uniformBufferDescriptorSize                          \= 16  
\>         robustUniformBufferDescriptorSize                    \= 16  
\>         storageBufferDescriptorSize                          \= 16  
\>         robustStorageBufferDescriptorSize                    \= 16  
\>         inputAttachmentDescriptorSize                        \= 32  
\>         accelerationStructureDescriptorSize                  \= 16  
\>         maxSamplerDescriptorBufferRange                      \= 0xffffffff  
\>         maxResourceDescriptorBufferRange                     \= 0xffffffff  
\>         samplerDescriptorBufferAddressSpaceSize              \= 0xffffffff  
\>         resourceDescriptorBufferAddressSpaceSize             \= 0xffffffff  
\>         descriptorBufferAddressSpaceSize                     \= 0xffffffff  
\>   
\> VkPhysicalDeviceExtendedDynamicState3PropertiesEXT:  
\> \---------------------------------------------------  
\>         dynamicPrimitiveTopologyUnrestricted \= false  
\>   
\> VkPhysicalDeviceExternalMemoryHostPropertiesEXT:  
\> \------------------------------------------------  
\>         minImportedHostPointerAlignment \= 0x00001000  
\>   
\> VkPhysicalDeviceFragmentShaderBarycentricPropertiesKHR:  
\> \-------------------------------------------------------  
\>         triStripVertexOrderIndependentOfProvokingVertex \= false  
\>   
\> VkPhysicalDeviceFragmentShadingRatePropertiesKHR:  
\> \-------------------------------------------------  
\>         minFragmentShadingRateAttachmentTexelSize:  
\>                 width  \= 8  
\>                 height \= 8  
\>         maxFragmentShadingRateAttachmentTexelSize:  
\>                 width  \= 8  
\>                 height \= 8  
\>         maxFragmentShadingRateAttachmentTexelSizeAspectRatio \= 1  
\>         primitiveFragmentShadingRateWithMultipleViewports    \= true  
\>         layeredShadingRateAttachments                        \= false  
\>         fragmentShadingRateNonTrivialCombinerOps             \= true  
\>         maxFragmentSize:  
\>                 width  \= 2  
\>                 height \= 2  
\>         maxFragmentSizeAspectRatio                           \= 2  
\>         maxFragmentShadingRateCoverageSamples                \= 32  
\>         maxFragmentShadingRateRasterizationSamples           \= SAMPLE\_COUNT\_16\_BIT  
\>         fragmentShadingRateWithShaderDepthStencilWrites      \= true  
\>         fragmentShadingRateWithSampleMask                    \= true  
\>         fragmentShadingRateWithShaderSampleMask              \= true  
\>         fragmentShadingRateWithConservativeRasterization     \= true  
\>         fragmentShadingRateWithFragmentShaderInterlock       \= false  
\>         fragmentShadingRateWithCustomSampleLocations         \= true  
\>         fragmentShadingRateStrictMultiplyCombiner            \= true  
\>   
\> VkPhysicalDeviceGraphicsPipelineLibraryPropertiesEXT:  
\> \-----------------------------------------------------  
\>         graphicsPipelineLibraryFastLinking                        \= true  
\>         graphicsPipelineLibraryIndependentInterpolationDecoration \= true  
\>   
\> VkPhysicalDeviceLayeredApiPropertiesListKHR:  
\> \--------------------------------------------  
\>         layeredApiCount \= 0  
\>         pLayeredApis    \= NULL  
\>   
\> VkPhysicalDeviceLineRasterizationPropertiesKHR:  
\> \-----------------------------------------------  
\>         lineSubPixelPrecisionBits \= 4  
\>   
\> VkPhysicalDeviceMaintenance5PropertiesKHR:  
\> \------------------------------------------  
\>         earlyFragmentMultisampleCoverageAfterSampleCounting \= true  
\>         earlyFragmentSampleMaskTestBeforeSampleCounting     \= true  
\>         depthStencilSwizzleOneSupport                       \= true  
\>         polygonModePointSize                                \= true  
\>         nonStrictSinglePixelWideLinesUseParallelogram       \= true  
\>         nonStrictWideLinesUseParallelogram                  \= true  
\>   
\> VkPhysicalDeviceMaintenance6PropertiesKHR:  
\> \------------------------------------------  
\>         blockTexelViewCompatibleMultipleLayers \= true  
\>         maxCombinedImageSamplerDescriptorCount \= 3  
\>         fragmentShadingRateClampCombinerInputs \= true  
\>   
\> VkPhysicalDeviceMaintenance7PropertiesKHR:  
\> \------------------------------------------  
\>         robustFragmentShadingRateAttachmentAccess                 \= true  
\>         separateDepthStencilAttachmentAccess                      \= true  
\>         maxDescriptorSetTotalUniformBuffersDynamic                \= 8  
\>         maxDescriptorSetTotalStorageBuffersDynamic                \= 8  
\>         maxDescriptorSetTotalBuffersDynamic                       \= 16  
\>         maxDescriptorSetUpdateAfterBindTotalUniformBuffersDynamic \= 8  
\>         maxDescriptorSetUpdateAfterBindTotalStorageBuffersDynamic \= 8  
\>         maxDescriptorSetUpdateAfterBindTotalBuffersDynamic        \= 16  
\>   
\> VkPhysicalDeviceMeshShaderPropertiesEXT:  
\> \----------------------------------------  
\>         maxTaskWorkGroupTotalCount            \= 4294966272  
\>         maxTaskWorkGroupCount: count \= 3  
\>                 4294967295  
\>                 65535  
\>                 65535  
\>         maxTaskWorkGroupInvocations           \= 1024  
\>         maxTaskWorkGroupSize: count \= 3  
\>                 1024  
\>                 1024  
\>                 1024  
\>         maxTaskPayloadSize                    \= 16384  
\>         maxTaskSharedMemorySize               \= 32768  
\>         maxTaskPayloadAndSharedMemorySize     \= 49152  
\>         maxMeshWorkGroupTotalCount            \= 4294966272  
\>         maxMeshWorkGroupCount: count \= 3  
\>                 4294967295  
\>                 65535  
\>                 65535  
\>         maxMeshWorkGroupInvocations           \= 256  
\>         maxMeshWorkGroupSize: count \= 3  
\>                 256  
\>                 256  
\>                 256  
\>         maxMeshSharedMemorySize               \= 32768  
\>         maxMeshPayloadAndSharedMemorySize     \= 32768  
\>         maxMeshOutputMemorySize               \= 32768  
\>         maxMeshPayloadAndOutputMemorySize     \= 49152  
\>         maxMeshOutputComponents               \= 127  
\>         maxMeshOutputVertices                 \= 256  
\>         maxMeshOutputPrimitives               \= 256  
\>         maxMeshOutputLayers                   \= 8192  
\>         maxMeshMultiviewViewCount             \= 6  
\>         meshOutputPerVertexGranularity        \= 256  
\>         meshOutputPerPrimitiveGranularity     \= 256  
\>         maxPreferredTaskWorkGroupInvocations  \= 1024  
\>         maxPreferredMeshWorkGroupInvocations  \= 256  
\>         prefersLocalInvocationVertexOutput    \= true  
\>         prefersLocalInvocationPrimitiveOutput \= true  
\>         prefersCompactVertexOutput            \= true  
\>         prefersCompactPrimitiveOutput         \= true  
\>   
\> VkPhysicalDeviceNestedCommandBufferPropertiesEXT:  
\> \-------------------------------------------------  
\>         maxCommandBufferNestingLevel \= 1  
\>   
\> VkPhysicalDevicePipelineBinaryPropertiesKHR:  
\> \--------------------------------------------  
\>         pipelineBinaryInternalCache            \= true  
\>         pipelineBinaryInternalCacheControl     \= false  
\>         pipelineBinaryPrefersInternalCache     \= false  
\>         pipelineBinaryPrecompiledInternalCache \= false  
\>         pipelineBinaryCompressedData           \= false  
\>   
\> VkPhysicalDeviceProvokingVertexPropertiesEXT:  
\> \---------------------------------------------  
\>         provokingVertexModePerPipeline                       \= true  
\>         transformFeedbackPreservesTriangleFanProvokingVertex \= true  
\>   
\> VkPhysicalDevicePushDescriptorPropertiesKHR:  
\> \--------------------------------------------  
\>         maxPushDescriptors \= 32  
\>   
\> VkPhysicalDeviceRayTracingPipelinePropertiesKHR:  
\> \------------------------------------------------  
\>         shaderGroupHandleSize              \= 32  
\>         maxRayRecursionDepth               \= 31  
\>         maxShaderGroupStride               \= 4096  
\>         shaderGroupBaseAlignment           \= 64  
\>         shaderGroupHandleCaptureReplaySize \= 32  
\>         maxRayDispatchInvocationCount      \= 1073741824  
\>         shaderGroupHandleAlignment         \= 4  
\>         maxRayHitAttributeSize             \= 32  
\>   
\> VkPhysicalDeviceRobustness2PropertiesEXT:  
\> \-----------------------------------------  
\>         robustStorageBufferAccessSizeAlignment \= 0x00000004  
\>         robustUniformBufferAccessSizeAlignment \= 0x00000004  
\>   
\> VkPhysicalDeviceSampleLocationsPropertiesEXT:  
\> \---------------------------------------------  
\>         sampleLocationSampleCounts: count \= 4  
\>                 SAMPLE\_COUNT\_1\_BIT  
\>                 SAMPLE\_COUNT\_2\_BIT  
\>                 SAMPLE\_COUNT\_4\_BIT  
\>                 SAMPLE\_COUNT\_8\_BIT  
\>         maxSampleLocationGridSize:  
\>                 width  \= 2  
\>                 height \= 2  
\>         sampleLocationCoordinateRange: count \= 2  
\>                 0  
\>                 1  
\>         sampleLocationSubPixelBits \= 4  
\>         variableSampleLocations    \= true  
\>   
\> VkPhysicalDeviceShaderModuleIdentifierPropertiesEXT:  
\> \----------------------------------------------------  
\>         shaderModuleIdentifierAlgorithmUUID \= 414d444d-6574-726f-4861-736831323800  
\>   
\> VkPhysicalDeviceShaderObjectPropertiesEXT:  
\> \------------------------------------------  
\>         shaderBinaryUUID    \= 4f03e051-a749-5640-b063-f5ff050f46e8  
\>         shaderBinaryVersion \= 1  
\>   
\> VkPhysicalDeviceTransformFeedbackPropertiesEXT:  
\> \-----------------------------------------------  
\>         maxTransformFeedbackStreams                \= 4  
\>         maxTransformFeedbackBuffers                \= 4  
\>         maxTransformFeedbackBufferSize             \= 0xffffffff  
\>         maxTransformFeedbackStreamDataSize         \= 512  
\>         maxTransformFeedbackBufferDataSize         \= 512  
\>         maxTransformFeedbackBufferDataStride       \= 512  
\>         transformFeedbackQueries                   \= true  
\>         transformFeedbackStreamsLinesTriangles     \= true  
\>         transformFeedbackRasterizationStreamSelect \= true  
\>         transformFeedbackDraw                      \= true  
\>   
\> VkPhysicalDeviceVertexAttributeDivisorPropertiesKHR:  
\> \----------------------------------------------------  
\>         maxVertexAttribDivisor       \= 4294967295  
\>         supportsNonZeroFirstInstance \= true  
\>   
\> VkPhysicalDeviceVertexAttributeDivisorPropertiesEXT:  
\> \----------------------------------------------------  
\>         maxVertexAttribDivisor \= 4294967295  
\>   
\> VkPhysicalDeviceVulkan11Properties:  
\> \-----------------------------------  
\>         deviceUUID                        \= 00000000-6300-0000-0000-000000000000  
\>         driverUUID                        \= 414d442d-5749-4e2d-4452-560000000000  
\>         deviceLUID                        \= 5d0c7e00-00000000  
\>         deviceNodeMask                    \= 1  
\>         deviceLUIDValid                   \= true  
\>         subgroupSize                      \= 64  
\>         subgroupSupportedStages: count \= 14  
\>                 SHADER\_STAGE\_VERTEX\_BIT  
\>                 SHADER\_STAGE\_TESSELLATION\_CONTROL\_BIT  
\>                 SHADER\_STAGE\_TESSELLATION\_EVALUATION\_BIT  
\>                 SHADER\_STAGE\_GEOMETRY\_BIT  
\>                 SHADER\_STAGE\_FRAGMENT\_BIT  
\>                 SHADER\_STAGE\_COMPUTE\_BIT  
\>                 SHADER\_STAGE\_RAYGEN\_BIT\_KHR  
\>                 SHADER\_STAGE\_ANY\_HIT\_BIT\_KHR  
\>                 SHADER\_STAGE\_CLOSEST\_HIT\_BIT\_KHR  
\>                 SHADER\_STAGE\_MISS\_BIT\_KHR  
\>                 SHADER\_STAGE\_INTERSECTION\_BIT\_KHR  
\>                 SHADER\_STAGE\_CALLABLE\_BIT\_KHR  
\>                 SHADER\_STAGE\_TASK\_BIT\_EXT  
\>                 SHADER\_STAGE\_MESH\_BIT\_EXT  
\>         subgroupSupportedOperations: count \= 10  
\>                 SUBGROUP\_FEATURE\_BASIC\_BIT  
\>                 SUBGROUP\_FEATURE\_VOTE\_BIT  
\>                 SUBGROUP\_FEATURE\_ARITHMETIC\_BIT  
\>                 SUBGROUP\_FEATURE\_BALLOT\_BIT  
\>                 SUBGROUP\_FEATURE\_SHUFFLE\_BIT  
\>                 SUBGROUP\_FEATURE\_SHUFFLE\_RELATIVE\_BIT  
\>                 SUBGROUP\_FEATURE\_CLUSTERED\_BIT  
\>                 SUBGROUP\_FEATURE\_QUAD\_BIT  
\>                 SUBGROUP\_FEATURE\_ROTATE\_BIT  
\>                 SUBGROUP\_FEATURE\_ROTATE\_CLUSTERED\_BIT  
\>         subgroupQuadOperationsInAllStages \= true  
\>         pointClippingBehavior             \= POINT\_CLIPPING\_BEHAVIOR\_ALL\_CLIP\_PLANES  
\>         maxMultiviewViewCount             \= 6  
\>         maxMultiviewInstanceIndex         \= 4294967295  
\>         protectedNoFault                  \= false  
\>         maxPerSetDescriptors              \= 4294967295  
\>         maxMemoryAllocationSize           \= 0x80000000  
\>   
\> VkPhysicalDeviceVulkan12Properties:  
\> \-----------------------------------  
\>         driverID                                             \= DRIVER\_ID\_AMD\_PROPRIETARY  
\>         driverName                                           \= AMD proprietary driver  
\>         driverInfo                                           \= 24.30.22.03 (LLPC)  
\>         conformanceVersion:  
\>                 major    \= 1  
\>                 minor    \= 3  
\>                 subminor \= 9  
\>                 patch    \= 2  
\>         denormBehaviorIndependence                           \= SHADER\_FLOAT\_CONTROLS\_INDEPENDENCE\_32\_BIT\_ONLY  
\>         roundingModeIndependence                             \= SHADER\_FLOAT\_CONTROLS\_INDEPENDENCE\_32\_BIT\_ONLY  
\>         shaderSignedZeroInfNanPreserveFloat16                \= true  
\>         shaderSignedZeroInfNanPreserveFloat32                \= true  
\>         shaderSignedZeroInfNanPreserveFloat64                \= true  
\>         shaderDenormPreserveFloat16                          \= true  
\>         shaderDenormPreserveFloat32                          \= true  
\>         shaderDenormPreserveFloat64                          \= true  
\>         shaderDenormFlushToZeroFloat16                       \= true  
\>         shaderDenormFlushToZeroFloat32                       \= true  
\>         shaderDenormFlushToZeroFloat64                       \= true  
\>         shaderRoundingModeRTEFloat16                         \= true  
\>         shaderRoundingModeRTEFloat32                         \= true  
\>         shaderRoundingModeRTEFloat64                         \= true  
\>         shaderRoundingModeRTZFloat16                         \= true  
\>         shaderRoundingModeRTZFloat32                         \= true  
\>         shaderRoundingModeRTZFloat64                         \= true  
\>         maxUpdateAfterBindDescriptorsInAllPools              \= 4294967295  
\>         shaderUniformBufferArrayNonUniformIndexingNative     \= false  
\>         shaderSampledImageArrayNonUniformIndexingNative      \= false  
\>         shaderStorageBufferArrayNonUniformIndexingNative     \= false  
\>         shaderStorageImageArrayNonUniformIndexingNative      \= false  
\>         shaderInputAttachmentArrayNonUniformIndexingNative   \= false  
\>         robustBufferAccessUpdateAfterBind                    \= true  
\>         quadDivergentImplicitLod                             \= false  
\>         maxPerStageDescriptorUpdateAfterBindSamplers         \= 4294967295  
\>         maxPerStageDescriptorUpdateAfterBindUniformBuffers   \= 4294967295  
\>         maxPerStageDescriptorUpdateAfterBindStorageBuffers   \= 4294967295  
\>         maxPerStageDescriptorUpdateAfterBindSampledImages    \= 4294967295  
\>         maxPerStageDescriptorUpdateAfterBindStorageImages    \= 4294967295  
\>         maxPerStageDescriptorUpdateAfterBindInputAttachments \= 4294967295  
\>         maxPerStageUpdateAfterBindResources                  \= 4294967295  
\>         maxDescriptorSetUpdateAfterBindSamplers              \= 4294967295  
\>         maxDescriptorSetUpdateAfterBindUniformBuffers        \= 4294967295  
\>         maxDescriptorSetUpdateAfterBindUniformBuffersDynamic \= 8  
\>         maxDescriptorSetUpdateAfterBindStorageBuffers        \= 4294967295  
\>         maxDescriptorSetUpdateAfterBindStorageBuffersDynamic \= 8  
\>         maxDescriptorSetUpdateAfterBindSampledImages         \= 4294967295  
\>         maxDescriptorSetUpdateAfterBindStorageImages         \= 4294967295  
\>         maxDescriptorSetUpdateAfterBindInputAttachments      \= 4294967295  
\>         supportedDepthResolveModes: count \= 3  
\>                 RESOLVE\_MODE\_SAMPLE\_ZERO\_BIT  
\>                 RESOLVE\_MODE\_MIN\_BIT  
\>                 RESOLVE\_MODE\_MAX\_BIT  
\>         supportedStencilResolveModes: count \= 3  
\>                 RESOLVE\_MODE\_SAMPLE\_ZERO\_BIT  
\>                 RESOLVE\_MODE\_MIN\_BIT  
\>                 RESOLVE\_MODE\_MAX\_BIT  
\>         independentResolveNone                               \= true  
\>         independentResolve                                   \= true  
\>         filterMinmaxSingleComponentFormats                   \= true  
\>         filterMinmaxImageComponentMapping                    \= true  
\>         maxTimelineSemaphoreValueDifference                  \= 4294967295  
\>         framebufferIntegerColorSampleCounts: count \= 4  
\>                 SAMPLE\_COUNT\_1\_BIT  
\>                 SAMPLE\_COUNT\_2\_BIT  
\>                 SAMPLE\_COUNT\_4\_BIT  
\>                 SAMPLE\_COUNT\_8\_BIT  
\>   
\> VkPhysicalDeviceVulkan13Properties:  
\> \-----------------------------------  
\>         minSubgroupSize                                                               \= 32  
\>         maxSubgroupSize                                                               \= 64  
\>         maxComputeWorkgroupSubgroups                                                  \= 4294967295  
\>         requiredSubgroupSizeStages: count \= 1  
\>                 SHADER\_STAGE\_COMPUTE\_BIT  
\>         maxInlineUniformBlockSize                                                     \= 65536  
\>         maxPerStageDescriptorInlineUniformBlocks                                      \= 16  
\>         maxPerStageDescriptorUpdateAfterBindInlineUniformBlocks                       \= 16  
\>         maxDescriptorSetInlineUniformBlocks                                           \= 16  
\>         maxDescriptorSetUpdateAfterBindInlineUniformBlocks                            \= 16  
\>         maxInlineUniformTotalSize                                                     \= 4294967295  
\>         integerDotProduct8BitUnsignedAccelerated                                      \= true  
\>         integerDotProduct8BitSignedAccelerated                                        \= true  
\>         integerDotProduct8BitMixedSignednessAccelerated                               \= true  
\>         integerDotProduct4x8BitPackedUnsignedAccelerated                              \= true  
\>         integerDotProduct4x8BitPackedSignedAccelerated                                \= true  
\>         integerDotProduct4x8BitPackedMixedSignednessAccelerated                       \= true  
\>         integerDotProduct16BitUnsignedAccelerated                                     \= false  
\>         integerDotProduct16BitSignedAccelerated                                       \= false  
\>         integerDotProduct16BitMixedSignednessAccelerated                              \= false  
\>         integerDotProduct32BitUnsignedAccelerated                                     \= false  
\>         integerDotProduct32BitSignedAccelerated                                       \= false  
\>         integerDotProduct32BitMixedSignednessAccelerated                              \= false  
\>         integerDotProduct64BitUnsignedAccelerated                                     \= false  
\>         integerDotProduct64BitSignedAccelerated                                       \= false  
\>         integerDotProduct64BitMixedSignednessAccelerated                              \= false  
\>         integerDotProductAccumulatingSaturating8BitUnsignedAccelerated                \= true  
\>         integerDotProductAccumulatingSaturating8BitSignedAccelerated                  \= true  
\>         integerDotProductAccumulatingSaturating8BitMixedSignednessAccelerated         \= true  
\>         integerDotProductAccumulatingSaturating4x8BitPackedUnsignedAccelerated        \= true  
\>         integerDotProductAccumulatingSaturating4x8BitPackedSignedAccelerated          \= true  
\>         integerDotProductAccumulatingSaturating4x8BitPackedMixedSignednessAccelerated \= true  
\>         integerDotProductAccumulatingSaturating16BitUnsignedAccelerated               \= false  
\>         integerDotProductAccumulatingSaturating16BitSignedAccelerated                 \= false  
\>         integerDotProductAccumulatingSaturating16BitMixedSignednessAccelerated        \= false  
\>         integerDotProductAccumulatingSaturating32BitUnsignedAccelerated               \= false  
\>         integerDotProductAccumulatingSaturating32BitSignedAccelerated                 \= false  
\>         integerDotProductAccumulatingSaturating32BitMixedSignednessAccelerated        \= false  
\>         integerDotProductAccumulatingSaturating64BitUnsignedAccelerated               \= false  
\>         integerDotProductAccumulatingSaturating64BitSignedAccelerated                 \= false  
\>         integerDotProductAccumulatingSaturating64BitMixedSignednessAccelerated        \= false  
\>         storageTexelBufferOffsetAlignmentBytes                                        \= 0x00000004  
\>         storageTexelBufferOffsetSingleTexelAlignment                                  \= true  
\>         uniformTexelBufferOffsetAlignmentBytes                                        \= 0x00000004  
\>         uniformTexelBufferOffsetSingleTexelAlignment                                  \= true  
\>         maxBufferSize                                                                 \= 0x80000000  
\>   
\> Device Extensions: count \= 187  
\>         VK\_AMD\_anti\_lag                             : extension revision 1  
\>         VK\_AMD\_buffer\_marker                        : extension revision 1  
\>         VK\_AMD\_device\_coherent\_memory               : extension revision 1  
\>         VK\_AMD\_display\_native\_hdr                   : extension revision 1  
\>         VK\_AMD\_draw\_indirect\_count                  : extension revision 2  
\>         VK\_AMD\_gcn\_shader                           : extension revision 1  
\>         VK\_AMD\_gpa\_interface                        : extension revision 1  
\>         VK\_AMD\_gpu\_shader\_half\_float                : extension revision 2  
\>         VK\_AMD\_gpu\_shader\_int16                     : extension revision 2  
\>         VK\_AMD\_memory\_overallocation\_behavior       : extension revision 1  
\>         VK\_AMD\_mixed\_attachment\_samples             : extension revision 1  
\>         VK\_AMD\_shader\_ballot                        : extension revision 1  
\>         VK\_AMD\_shader\_core\_properties               : extension revision 2  
\>         VK\_AMD\_shader\_core\_properties2              : extension revision 1  
\>         VK\_AMD\_shader\_early\_and\_late\_fragment\_tests : extension revision 1  
\>         VK\_AMD\_shader\_explicit\_vertex\_parameter     : extension revision 1  
\>         VK\_AMD\_shader\_image\_load\_store\_lod          : extension revision 1  
\>         VK\_AMD\_shader\_info                          : extension revision 1  
\>         VK\_AMD\_shader\_trinary\_minmax                : extension revision 1  
\>         VK\_EXT\_4444\_formats                         : extension revision 1  
\>         VK\_EXT\_attachment\_feedback\_loop\_layout      : extension revision 2  
\>         VK\_EXT\_border\_color\_swizzle                 : extension revision 1  
\>         VK\_EXT\_calibrated\_timestamps                : extension revision 2  
\>         VK\_EXT\_color\_write\_enable                   : extension revision 1  
\>         VK\_EXT\_conditional\_rendering                : extension revision 2  
\>         VK\_EXT\_conservative\_rasterization           : extension revision 1  
\>         VK\_EXT\_custom\_border\_color                  : extension revision 12  
\>         VK\_EXT\_depth\_clamp\_control                  : extension revision 1  
\>         VK\_EXT\_depth\_clamp\_zero\_one                 : extension revision 1  
\>         VK\_EXT\_depth\_clip\_control                   : extension revision 1  
\>         VK\_EXT\_depth\_clip\_enable                    : extension revision 1  
\>         VK\_EXT\_depth\_range\_unrestricted             : extension revision 1  
\>         VK\_EXT\_descriptor\_buffer                    : extension revision 1  
\>         VK\_EXT\_descriptor\_indexing                  : extension revision 2  
\>         VK\_EXT\_device\_address\_binding\_report        : extension revision 1  
\>         VK\_EXT\_device\_fault                         : extension revision 2  
\>         VK\_EXT\_dynamic\_rendering\_unused\_attachments : extension revision 1  
\>         VK\_EXT\_extended\_dynamic\_state               : extension revision 1  
\>         VK\_EXT\_extended\_dynamic\_state2              : extension revision 1  
\>         VK\_EXT\_extended\_dynamic\_state3              : extension revision 2  
\>         VK\_EXT\_external\_memory\_host                 : extension revision 1  
\>         VK\_EXT\_fragment\_shader\_interlock            : extension revision 1  
\>         VK\_EXT\_frame\_boundary                       : extension revision 1  
\>         VK\_EXT\_full\_screen\_exclusive                : extension revision 4  
\>         VK\_EXT\_global\_priority                      : extension revision 2  
\>         VK\_EXT\_global\_priority\_query                : extension revision 1  
\>         VK\_EXT\_graphics\_pipeline\_library            : extension revision 1  
\>         VK\_EXT\_hdr\_metadata                         : extension revision 3  
\>         VK\_EXT\_host\_query\_reset                     : extension revision 1  
\>         VK\_EXT\_image\_robustness                     : extension revision 1  
\>         VK\_EXT\_image\_sliced\_view\_of\_3d              : extension revision 1  
\>         VK\_EXT\_image\_view\_min\_lod                   : extension revision 1  
\>         VK\_EXT\_index\_type\_uint8                     : extension revision 1  
\>         VK\_EXT\_inline\_uniform\_block                 : extension revision 1  
\>         VK\_EXT\_line\_rasterization                   : extension revision 1  
\>         VK\_EXT\_load\_store\_op\_none                   : extension revision 1  
\>         VK\_EXT\_memory\_budget                        : extension revision 1  
\>         VK\_EXT\_memory\_priority                      : extension revision 1  
\>         VK\_EXT\_mesh\_shader                          : extension revision 1  
\>         VK\_EXT\_mutable\_descriptor\_type              : extension revision 1  
\>         VK\_EXT\_nested\_command\_buffer                : extension revision 1  
\>         VK\_EXT\_non\_seamless\_cube\_map                : extension revision 1  
\>         VK\_EXT\_pageable\_device\_local\_memory         : extension revision 1  
\>         VK\_EXT\_pipeline\_creation\_cache\_control      : extension revision 3  
\>         VK\_EXT\_pipeline\_creation\_feedback           : extension revision 1  
\>         VK\_EXT\_pipeline\_library\_group\_handles       : extension revision 1  
\>         VK\_EXT\_post\_depth\_coverage                  : extension revision 1  
\>         VK\_EXT\_primitive\_topology\_list\_restart      : extension revision 1  
\>         VK\_EXT\_primitives\_generated\_query           : extension revision 1  
\>         VK\_EXT\_private\_data                         : extension revision 1  
\>         VK\_EXT\_provoking\_vertex                     : extension revision 1  
\>         VK\_EXT\_queue\_family\_foreign                 : extension revision 1  
\>         VK\_EXT\_robustness2                          : extension revision 1  
\>         VK\_EXT\_sample\_locations                     : extension revision 1  
\>         VK\_EXT\_sampler\_filter\_minmax                : extension revision 2  
\>         VK\_EXT\_scalar\_block\_layout                  : extension revision 1  
\>         VK\_EXT\_separate\_stencil\_usage               : extension revision 1  
\>         VK\_EXT\_shader\_atomic\_float                  : extension revision 1  
\>         VK\_EXT\_shader\_atomic\_float2                 : extension revision 1  
\>         VK\_EXT\_shader\_demote\_to\_helper\_invocation   : extension revision 1  
\>         VK\_EXT\_shader\_image\_atomic\_int64            : extension revision 1  
\>         VK\_EXT\_shader\_module\_identifier             : extension revision 1  
\>         VK\_EXT\_shader\_object                        : extension revision 1  
\>         VK\_EXT\_shader\_stencil\_export                : extension revision 1  
\>         VK\_EXT\_shader\_subgroup\_ballot               : extension revision 1  
\>         VK\_EXT\_shader\_subgroup\_vote                 : extension revision 1  
\>         VK\_EXT\_shader\_viewport\_index\_layer          : extension revision 1  
\>         VK\_EXT\_subgroup\_size\_control                : extension revision 2  
\>         VK\_EXT\_texel\_buffer\_alignment               : extension revision 1  
\>         VK\_EXT\_tooling\_info                         : extension revision 1  
\>         VK\_EXT\_transform\_feedback                   : extension revision 1  
\>         VK\_EXT\_vertex\_attribute\_divisor             : extension revision 3  
\>         VK\_EXT\_vertex\_input\_dynamic\_state           : extension revision 2  
\>         VK\_EXT\_ycbcr\_image\_arrays                   : extension revision 1  
\>         VK\_GOOGLE\_decorate\_string                   : extension revision 1  
\>         VK\_GOOGLE\_hlsl\_functionality1               : extension revision 1  
\>         VK\_GOOGLE\_user\_type                         : extension revision 1  
\>         VK\_KHR\_16bit\_storage                        : extension revision 1  
\>         VK\_KHR\_8bit\_storage                         : extension revision 1  
\>         VK\_KHR\_acceleration\_structure               : extension revision 13  
\>         VK\_KHR\_bind\_memory2                         : extension revision 1  
\>         VK\_KHR\_buffer\_device\_address                : extension revision 1  
\>         VK\_KHR\_calibrated\_timestamps                : extension revision 1  
\>         VK\_KHR\_compute\_shader\_derivatives           : extension revision 1  
\>         VK\_KHR\_cooperative\_matrix                   : extension revision 2  
\>         VK\_KHR\_copy\_commands2                       : extension revision 1  
\>         VK\_KHR\_create\_renderpass2                   : extension revision 1  
\>         VK\_KHR\_dedicated\_allocation                 : extension revision 3  
\>         VK\_KHR\_deferred\_host\_operations             : extension revision 4  
\>         VK\_KHR\_depth\_stencil\_resolve                : extension revision 1  
\>         VK\_KHR\_descriptor\_update\_template           : extension revision 1  
\>         VK\_KHR\_device\_group                         : extension revision 4  
\>         VK\_KHR\_draw\_indirect\_count                  : extension revision 1  
\>         VK\_KHR\_driver\_properties                    : extension revision 1  
\>         VK\_KHR\_dynamic\_rendering                    : extension revision 1  
\>         VK\_KHR\_dynamic\_rendering\_local\_read         : extension revision 1  
\>         VK\_KHR\_external\_fence                       : extension revision 1  
\>         VK\_KHR\_external\_fence\_win32                 : extension revision 1  
\>         VK\_KHR\_external\_memory                      : extension revision 1  
\>         VK\_KHR\_external\_memory\_win32                : extension revision 1  
\>         VK\_KHR\_external\_semaphore                   : extension revision 1  
\>         VK\_KHR\_external\_semaphore\_win32             : extension revision 1  
\>         VK\_KHR\_format\_feature\_flags2                : extension revision 2  
\>         VK\_KHR\_fragment\_shader\_barycentric          : extension revision 1  
\>         VK\_KHR\_fragment\_shading\_rate                : extension revision 2  
\>         VK\_KHR\_get\_memory\_requirements2             : extension revision 1  
\>         VK\_KHR\_global\_priority                      : extension revision 1  
\>         VK\_KHR\_image\_format\_list                    : extension revision 1  
\>         VK\_KHR\_imageless\_framebuffer                : extension revision 1  
\>         VK\_KHR\_index\_type\_uint8                     : extension revision 1  
\>         VK\_KHR\_line\_rasterization                   : extension revision 1  
\>         VK\_KHR\_load\_store\_op\_none                   : extension revision 1  
\>         VK\_KHR\_maintenance1                         : extension revision 2  
\>         VK\_KHR\_maintenance2                         : extension revision 1  
\>         VK\_KHR\_maintenance3                         : extension revision 1  
\>         VK\_KHR\_maintenance4                         : extension revision 2  
\>         VK\_KHR\_maintenance5                         : extension revision 1  
\>         VK\_KHR\_maintenance6                         : extension revision 1  
\>         VK\_KHR\_maintenance7                         : extension revision 1  
\>         VK\_KHR\_map\_memory2                          : extension revision 1  
\>         VK\_KHR\_multiview                            : extension revision 1  
\>         VK\_KHR\_pipeline\_binary                      : extension revision 1  
\>         VK\_KHR\_pipeline\_executable\_properties       : extension revision 1  
\>         VK\_KHR\_pipeline\_library                     : extension revision 1  
\>         VK\_KHR\_push\_descriptor                      : extension revision 2  
\>         VK\_KHR\_ray\_query                            : extension revision 1  
\>         VK\_KHR\_ray\_tracing\_maintenance1             : extension revision 1  
\>         VK\_KHR\_ray\_tracing\_pipeline                 : extension revision 1  
\>         VK\_KHR\_ray\_tracing\_position\_fetch           : extension revision 1  
\>         VK\_KHR\_relaxed\_block\_layout                 : extension revision 1  
\>         VK\_KHR\_sampler\_mirror\_clamp\_to\_edge         : extension revision 3  
\>         VK\_KHR\_sampler\_ycbcr\_conversion             : extension revision 14  
\>         VK\_KHR\_separate\_depth\_stencil\_layouts       : extension revision 1  
\>         VK\_KHR\_shader\_atomic\_int64                  : extension revision 1  
\>         VK\_KHR\_shader\_clock                         : extension revision 1  
\>         VK\_KHR\_shader\_draw\_parameters               : extension revision 1  
\>         VK\_KHR\_shader\_expect\_assume                 : extension revision 1  
\>         VK\_KHR\_shader\_float16\_int8                  : extension revision 1  
\>         VK\_KHR\_shader\_float\_controls                : extension revision 4  
\>         VK\_KHR\_shader\_float\_controls2               : extension revision 1  
\>         VK\_KHR\_shader\_integer\_dot\_product           : extension revision 1  
\>         VK\_KHR\_shader\_maximal\_reconvergence         : extension revision 1  
\>         VK\_KHR\_shader\_non\_semantic\_info             : extension revision 1  
\>         VK\_KHR\_shader\_quad\_control                  : extension revision 1  
\>         VK\_KHR\_shader\_subgroup\_extended\_types       : extension revision 1  
\>         VK\_KHR\_shader\_subgroup\_rotate               : extension revision 2  
\>         VK\_KHR\_shader\_subgroup\_uniform\_control\_flow : extension revision 1  
\>         VK\_KHR\_shader\_terminate\_invocation          : extension revision 1  
\>         VK\_KHR\_spirv\_1\_4                            : extension revision 1  
\>         VK\_KHR\_storage\_buffer\_storage\_class         : extension revision 1  
\>         VK\_KHR\_swapchain                            : extension revision 70  
\>         VK\_KHR\_swapchain\_mutable\_format             : extension revision 1  
\>         VK\_KHR\_synchronization2                     : extension revision 1  
\>         VK\_KHR\_timeline\_semaphore                   : extension revision 2  
\>         VK\_KHR\_uniform\_buffer\_standard\_layout       : extension revision 1  
\>         VK\_KHR\_variable\_pointers                    : extension revision 1  
\>         VK\_KHR\_vertex\_attribute\_divisor             : extension revision 1  
\>         VK\_KHR\_video\_decode\_av1                     : extension revision 1  
\>         VK\_KHR\_video\_decode\_h264                    : extension revision 9  
\>         VK\_KHR\_video\_decode\_h265                    : extension revision 8  
\>         VK\_KHR\_video\_decode\_queue                   : extension revision 8  
\>         VK\_KHR\_video\_queue                          : extension revision 8  
\>         VK\_KHR\_vulkan\_memory\_model                  : extension revision 3  
\>         VK\_KHR\_win32\_keyed\_mutex                    : extension revision 1  
\>         VK\_KHR\_workgroup\_memory\_explicit\_layout     : extension revision 1  
\>         VK\_KHR\_zero\_initialize\_workgroup\_memory     : extension revision 1  
\>         VK\_VALVE\_mutable\_descriptor\_type            : extension revision 1  
\>   
\> VkQueueFamilyProperties:  
\> \========================  
\>         queueProperties\[0\]:  
\>         \-------------------  
\>                 minImageTransferGranularity \= (1,1,1)  
\>                 queueCount                  \= 1  
\>                 queueFlags                  \= QUEUE\_GRAPHICS\_BIT | QUEUE\_COMPUTE\_BIT | QUEUE\_TRANSFER\_BIT | QUEUE\_SPARSE\_BINDING\_BIT  
\>                 timestampValidBits          \= 64  
\>                 present support             \= true  
\>                 VkQueueFamilyGlobalPriorityPropertiesKHR:  
\>                 \-----------------------------------------  
\>                         priorityCount \= 1  
\>                         priorities: count \= 1  
\>                                 QUEUE\_GLOBAL\_PRIORITY\_MEDIUM  
\>   
\>                 VkQueueFamilyQueryResultStatusPropertiesKHR:  
\>                 \--------------------------------------------  
\>                         queryResultStatusSupport \= false  
\>   
\>                 VkQueueFamilyVideoPropertiesKHR:  
\>                 \--------------------------------  
\>                         videoCodecOperations:  
\>                                 None  
\>   
\>   
\>         queueProperties\[1\]:  
\>         \-------------------  
\>                 minImageTransferGranularity \= (1,1,1)  
\>                 queueCount                  \= 1  
\>                 queueFlags                  \= QUEUE\_COMPUTE\_BIT | QUEUE\_TRANSFER\_BIT | QUEUE\_SPARSE\_BINDING\_BIT  
\>                 timestampValidBits          \= 64  
\>                 present support             \= true  
\>                 VkQueueFamilyGlobalPriorityPropertiesKHR:  
\>                 \-----------------------------------------  
\>                         priorityCount \= 2  
\>                         priorities: count \= 2  
\>                                 QUEUE\_GLOBAL\_PRIORITY\_MEDIUM  
\>                                 QUEUE\_GLOBAL\_PRIORITY\_HIGH  
\>   
\>                 VkQueueFamilyQueryResultStatusPropertiesKHR:  
\>                 \--------------------------------------------  
\>                         queryResultStatusSupport \= false  
\>   
\>                 VkQueueFamilyVideoPropertiesKHR:  
\>                 \--------------------------------  
\>                         videoCodecOperations:  
\>                                 None  
\>   
\>   
\>         queueProperties\[2\]:  
\>         \-------------------  
\>                 minImageTransferGranularity \= (16,16,8)  
\>                 queueCount                  \= 1  
\>                 queueFlags                  \= QUEUE\_TRANSFER\_BIT | QUEUE\_SPARSE\_BINDING\_BIT  
\>                 timestampValidBits          \= 64  
\>                 present support             \= false  
\>                 VkQueueFamilyGlobalPriorityPropertiesKHR:  
\>                 \-----------------------------------------  
\>                         priorityCount \= 1  
\>                         priorities: count \= 1  
\>                                 QUEUE\_GLOBAL\_PRIORITY\_MEDIUM  
\>   
\>                 VkQueueFamilyQueryResultStatusPropertiesKHR:  
\>                 \--------------------------------------------  
\>                         queryResultStatusSupport \= false  
\>   
\>                 VkQueueFamilyVideoPropertiesKHR:  
\>                 \--------------------------------  
\>                         videoCodecOperations:  
\>                                 None  
\>   
\>   
\>         queueProperties\[3\]:  
\>         \-------------------  
\>                 minImageTransferGranularity \= (0,0,0)  
\>                 queueCount                  \= 1  
\>                 queueFlags                  \=  
\>                 timestampValidBits          \= 0  
\>                 present support             \= false  
\>                 VkQueueFamilyGlobalPriorityPropertiesKHR:  
\>                 \-----------------------------------------  
\>                         priorityCount \= 1  
\>                         priorities: count \= 1  
\>                                 QUEUE\_GLOBAL\_PRIORITY\_MEDIUM  
\>   
\>                 VkQueueFamilyQueryResultStatusPropertiesKHR:  
\>                 \--------------------------------------------  
\>                         queryResultStatusSupport \= false  
\>   
\>                 VkQueueFamilyVideoPropertiesKHR:  
\>                 \--------------------------------  
\>                         videoCodecOperations:  
\>                                 None  
\>   
\>   
\>         queueProperties\[4\]:  
\>         \-------------------  
\>                 minImageTransferGranularity \= (0,0,0)  
\>                 queueCount                  \= 1  
\>                 queueFlags                  \= QUEUE\_VIDEO\_DECODE\_BIT\_KHR  
\>                 timestampValidBits          \= 0  
\>                 present support             \= false  
\>                 VkQueueFamilyGlobalPriorityPropertiesKHR:  
\>                 \-----------------------------------------  
\>                         priorityCount \= 1  
\>                         priorities: count \= 1  
\>                                 QUEUE\_GLOBAL\_PRIORITY\_MEDIUM  
\>   
\>                 VkQueueFamilyQueryResultStatusPropertiesKHR:  
\>                 \--------------------------------------------  
\>                         queryResultStatusSupport \= false  
\>   
\>                 VkQueueFamilyVideoPropertiesKHR:  
\>                 \--------------------------------  
\>                         videoCodecOperations: count \= 3  
\>                                 VIDEO\_CODEC\_OPERATION\_DECODE\_H264\_BIT\_KHR  
\>                                 VIDEO\_CODEC\_OPERATION\_DECODE\_H265\_BIT\_KHR  
\>                                 VIDEO\_CODEC\_OPERATION\_DECODE\_AV1\_BIT\_KHR  
\>   
\>   
\> VkPhysicalDeviceMemoryProperties:  
\> \=================================  
\> memoryHeaps: count \= 3  
\>         memoryHeaps\[0\]:  
\>                 size   \= 268435456 (0x10000000) (256.00 MiB)  
\>                 budget \= 255013680 (0x0f333330) (243.20 MiB)  
\>                 usage  \= 0 (0x00000000) (0.00 B)  
\>                 flags: count \= 2  
\>                         MEMORY\_HEAP\_DEVICE\_LOCAL\_BIT  
\>                         MEMORY\_HEAP\_MULTI\_INSTANCE\_BIT  
\>         memoryHeaps\[1\]:  
\>                 size   \= 16706830336 (0x3e3ce0000) (15.56 GiB)  
\>                 budget \= 15871489024 (0x3b203b400) (14.78 GiB)  
\>                 usage  \= 0 (0x00000000) (0.00 B)  
\>                 flags:  
\>                         None  
\>         memoryHeaps\[2\]:  
\>                 size   \= 268435456 (0x10000000) (256.00 MiB)  
\>                 budget \= 255013680 (0x0f333330) (243.20 MiB)  
\>                 usage  \= 0 (0x00000000) (0.00 B)  
\>                 flags: count \= 2  
\>                         MEMORY\_HEAP\_DEVICE\_LOCAL\_BIT  
\>                         MEMORY\_HEAP\_MULTI\_INSTANCE\_BIT  
\> memoryTypes: count \= 16  
\>         memoryTypes\[0\]:  
\>                 heapIndex     \= 0  
\>                 propertyFlags \= 0x0001: count \= 1  
\>                         MEMORY\_PROPERTY\_DEVICE\_LOCAL\_BIT  
\>                 usable for:  
\>                         IMAGE\_TILING\_OPTIMAL:  
\>                                 color images  
\>                                 FORMAT\_D16\_UNORM  
\>                                 FORMAT\_D32\_SFLOAT  
\>                                 FORMAT\_S8\_UINT  
\>                                 FORMAT\_D16\_UNORM\_S8\_UINT  
\>                                 FORMAT\_D32\_SFLOAT\_S8\_UINT  
\>                         IMAGE\_TILING\_LINEAR:  
\>                                 color images  
\>         memoryTypes\[1\]:  
\>                 heapIndex     \= 1  
\>                 propertyFlags \= 0x0006: count \= 2  
\>                         MEMORY\_PROPERTY\_HOST\_VISIBLE\_BIT  
\>                         MEMORY\_PROPERTY\_HOST\_COHERENT\_BIT  
\>                 usable for:  
\>                         IMAGE\_TILING\_OPTIMAL:  
\>                                 color images  
\>                                 FORMAT\_D16\_UNORM  
\>                                 FORMAT\_D32\_SFLOAT  
\>                                 FORMAT\_S8\_UINT  
\>                                 FORMAT\_D16\_UNORM\_S8\_UINT  
\>                                 FORMAT\_D32\_SFLOAT\_S8\_UINT  
\>                         IMAGE\_TILING\_LINEAR:  
\>                                 color images  
\>         memoryTypes\[2\]:  
\>                 heapIndex     \= 2  
\>                 propertyFlags \= 0x0007: count \= 3  
\>                         MEMORY\_PROPERTY\_DEVICE\_LOCAL\_BIT  
\>                         MEMORY\_PROPERTY\_HOST\_VISIBLE\_BIT  
\>                         MEMORY\_PROPERTY\_HOST\_COHERENT\_BIT  
\>                 usable for:  
\>                         IMAGE\_TILING\_OPTIMAL:  
\>                                 color images  
\>                                 FORMAT\_D16\_UNORM  
\>                                 FORMAT\_D32\_SFLOAT  
\>                                 FORMAT\_S8\_UINT  
\>                                 FORMAT\_D16\_UNORM\_S8\_UINT  
\>                                 FORMAT\_D32\_SFLOAT\_S8\_UINT  
\>                         IMAGE\_TILING\_LINEAR:  
\>                                 color images  
\>         memoryTypes\[3\]:  
\>                 heapIndex     \= 1  
\>                 propertyFlags \= 0x000e: count \= 3  
\>                         MEMORY\_PROPERTY\_HOST\_VISIBLE\_BIT  
\>                         MEMORY\_PROPERTY\_HOST\_COHERENT\_BIT  
\>                         MEMORY\_PROPERTY\_HOST\_CACHED\_BIT  
\>                 usable for:  
\>                         IMAGE\_TILING\_OPTIMAL:  
\>                                 color images  
\>                                 FORMAT\_D16\_UNORM  
\>                                 FORMAT\_D32\_SFLOAT  
\>                                 FORMAT\_S8\_UINT  
\>                                 FORMAT\_D16\_UNORM\_S8\_UINT  
\>                                 FORMAT\_D32\_SFLOAT\_S8\_UINT  
\>                         IMAGE\_TILING\_LINEAR:  
\>                                 color images  
\>         memoryTypes\[4\]:  
\>                 heapIndex     \= 0  
\>                 propertyFlags \= 0x00c1: count \= 3  
\>                         MEMORY\_PROPERTY\_DEVICE\_LOCAL\_BIT  
\>                         MEMORY\_PROPERTY\_DEVICE\_COHERENT\_BIT\_AMD  
\>                         MEMORY\_PROPERTY\_DEVICE\_UNCACHED\_BIT\_AMD  
\>                 usable for:  
\>                         IMAGE\_TILING\_OPTIMAL:  
\>                                 None  
\>                         IMAGE\_TILING\_LINEAR:  
\>                                 None  
\>         memoryTypes\[5\]:  
\>                 heapIndex     \= 1  
\>                 propertyFlags \= 0x00c6: count \= 4  
\>                         MEMORY\_PROPERTY\_HOST\_VISIBLE\_BIT  
\>                         MEMORY\_PROPERTY\_HOST\_COHERENT\_BIT  
\>                         MEMORY\_PROPERTY\_DEVICE\_COHERENT\_BIT\_AMD  
\>                         MEMORY\_PROPERTY\_DEVICE\_UNCACHED\_BIT\_AMD  
\>                 usable for:  
\>                         IMAGE\_TILING\_OPTIMAL:  
\>                                 None  
\>                         IMAGE\_TILING\_LINEAR:  
\>                                 None  
\>         memoryTypes\[6\]:  
\>                 heapIndex     \= 2  
\>                 propertyFlags \= 0x00c7: count \= 5  
\>                         MEMORY\_PROPERTY\_DEVICE\_LOCAL\_BIT  
\>                         MEMORY\_PROPERTY\_HOST\_VISIBLE\_BIT  
\>                         MEMORY\_PROPERTY\_HOST\_COHERENT\_BIT  
\>                         MEMORY\_PROPERTY\_DEVICE\_COHERENT\_BIT\_AMD  
\>                         MEMORY\_PROPERTY\_DEVICE\_UNCACHED\_BIT\_AMD  
\>                 usable for:  
\>                         IMAGE\_TILING\_OPTIMAL:  
\>                                 None  
\>                         IMAGE\_TILING\_LINEAR:  
\>                                 None  
\>         memoryTypes\[7\]:  
\>                 heapIndex     \= 1  
\>                 propertyFlags \= 0x00ce: count \= 5  
\>                         MEMORY\_PROPERTY\_HOST\_VISIBLE\_BIT  
\>                         MEMORY\_PROPERTY\_HOST\_COHERENT\_BIT  
\>                         MEMORY\_PROPERTY\_HOST\_CACHED\_BIT  
\>                         MEMORY\_PROPERTY\_DEVICE\_COHERENT\_BIT\_AMD  
\>                         MEMORY\_PROPERTY\_DEVICE\_UNCACHED\_BIT\_AMD  
\>                 usable for:  
\>                         IMAGE\_TILING\_OPTIMAL:  
\>                                 None  
\>                         IMAGE\_TILING\_LINEAR:  
\>                                 None  
\>         memoryTypes\[8\]:  
\>                 heapIndex     \= 0  
\>                 propertyFlags \= 0x0001: count \= 1  
\>                         MEMORY\_PROPERTY\_DEVICE\_LOCAL\_BIT  
\>                 usable for:  
\>                         IMAGE\_TILING\_OPTIMAL:  
\>                                 None  
\>                         IMAGE\_TILING\_LINEAR:  
\>                                 None  
\>         memoryTypes\[9\]:  
\>                 heapIndex     \= 1  
\>                 propertyFlags \= 0x0006: count \= 2  
\>                         MEMORY\_PROPERTY\_HOST\_VISIBLE\_BIT  
\>                         MEMORY\_PROPERTY\_HOST\_COHERENT\_BIT  
\>                 usable for:  
\>                         IMAGE\_TILING\_OPTIMAL:  
\>                                 None  
\>                         IMAGE\_TILING\_LINEAR:  
\>                                 None  
\>         memoryTypes\[10\]:  
\>                 heapIndex     \= 2  
\>                 propertyFlags \= 0x0007: count \= 3  
\>                         MEMORY\_PROPERTY\_DEVICE\_LOCAL\_BIT  
\>                         MEMORY\_PROPERTY\_HOST\_VISIBLE\_BIT  
\>                         MEMORY\_PROPERTY\_HOST\_COHERENT\_BIT  
\>                 usable for:  
\>                         IMAGE\_TILING\_OPTIMAL:  
\>                                 None  
\>                         IMAGE\_TILING\_LINEAR:  
\>                                 None  
\>         memoryTypes\[11\]:  
\>                 heapIndex     \= 1  
\>                 propertyFlags \= 0x000e: count \= 3  
\>                         MEMORY\_PROPERTY\_HOST\_VISIBLE\_BIT  
\>                         MEMORY\_PROPERTY\_HOST\_COHERENT\_BIT  
\>                         MEMORY\_PROPERTY\_HOST\_CACHED\_BIT  
\>                 usable for:  
\>                         IMAGE\_TILING\_OPTIMAL:  
\>                                 None  
\>                         IMAGE\_TILING\_LINEAR:  
\>                                 None  
\>         memoryTypes\[12\]:  
\>                 heapIndex     \= 0  
\>                 propertyFlags \= 0x00c1: count \= 3  
\>                         MEMORY\_PROPERTY\_DEVICE\_LOCAL\_BIT  
\>                         MEMORY\_PROPERTY\_DEVICE\_COHERENT\_BIT\_AMD  
\>                         MEMORY\_PROPERTY\_DEVICE\_UNCACHED\_BIT\_AMD  
\>                 usable for:  
\>                         IMAGE\_TILING\_OPTIMAL:  
\>                                 None  
\>                         IMAGE\_TILING\_LINEAR:  
\>                                 None  
\>         memoryTypes\[13\]:  
\>                 heapIndex     \= 1  
\>                 propertyFlags \= 0x00c6: count \= 4  
\>                         MEMORY\_PROPERTY\_HOST\_VISIBLE\_BIT  
\>                         MEMORY\_PROPERTY\_HOST\_COHERENT\_BIT  
\>                         MEMORY\_PROPERTY\_DEVICE\_COHERENT\_BIT\_AMD  
\>                         MEMORY\_PROPERTY\_DEVICE\_UNCACHED\_BIT\_AMD  
\>                 usable for:  
\>                         IMAGE\_TILING\_OPTIMAL:  
\>                                 None  
\>                         IMAGE\_TILING\_LINEAR:  
\>                                 None  
\>         memoryTypes\[14\]:  
\>                 heapIndex     \= 2  
\>                 propertyFlags \= 0x00c7: count \= 5  
\>                         MEMORY\_PROPERTY\_DEVICE\_LOCAL\_BIT  
\>                         MEMORY\_PROPERTY\_HOST\_VISIBLE\_BIT  
\>                         MEMORY\_PROPERTY\_HOST\_COHERENT\_BIT  
\>                         MEMORY\_PROPERTY\_DEVICE\_COHERENT\_BIT\_AMD  
\>                         MEMORY\_PROPERTY\_DEVICE\_UNCACHED\_BIT\_AMD  
\>                 usable for:  
\>                         IMAGE\_TILING\_OPTIMAL:  
\>                                 None  
\>                         IMAGE\_TILING\_LINEAR:  
\>                                 None  
\>         memoryTypes\[15\]:  
\>                 heapIndex     \= 1  
\>                 propertyFlags \= 0x00ce: count \= 5  
\>                         MEMORY\_PROPERTY\_HOST\_VISIBLE\_BIT  
\>                         MEMORY\_PROPERTY\_HOST\_COHERENT\_BIT  
\>                         MEMORY\_PROPERTY\_HOST\_CACHED\_BIT  
\>                         MEMORY\_PROPERTY\_DEVICE\_COHERENT\_BIT\_AMD  
\>                         MEMORY\_PROPERTY\_DEVICE\_UNCACHED\_BIT\_AMD  
\>                 usable for:  
\>                         IMAGE\_TILING\_OPTIMAL:  
\>                                 None  
\>                         IMAGE\_TILING\_LINEAR:  
\>                                 None  
\>   
\> VkPhysicalDeviceFeatures:  
\> \=========================  
\>         robustBufferAccess                      \= true  
\>         fullDrawIndexUint32                     \= true  
\>         imageCubeArray                          \= true  
\>         independentBlend                        \= true  
\>         geometryShader                          \= true  
\>         tessellationShader                      \= true  
\>         sampleRateShading                       \= true  
\>         dualSrcBlend                            \= true  
\>         logicOp                                 \= true  
\>         multiDrawIndirect                       \= true  
\>         drawIndirectFirstInstance               \= true  
\>         depthClamp                              \= true  
\>         depthBiasClamp                          \= true  
\>         fillModeNonSolid                        \= true  
\>         depthBounds                             \= true  
\>         wideLines                               \= true  
\>         largePoints                             \= true  
\>         alphaToOne                              \= false  
\>         multiViewport                           \= true  
\>         samplerAnisotropy                       \= true  
\>         textureCompressionETC2                  \= false  
\>         textureCompressionASTC\_LDR              \= false  
\>         textureCompressionBC                    \= true  
\>         occlusionQueryPrecise                   \= true  
\>         pipelineStatisticsQuery                 \= true  
\>         vertexPipelineStoresAndAtomics          \= true  
\>         fragmentStoresAndAtomics                \= true  
\>         shaderTessellationAndGeometryPointSize  \= true  
\>         shaderImageGatherExtended               \= true  
\>         shaderStorageImageExtendedFormats       \= true  
\>         shaderStorageImageMultisample           \= true  
\>         shaderStorageImageReadWithoutFormat     \= true  
\>         shaderStorageImageWriteWithoutFormat    \= true  
\>         shaderUniformBufferArrayDynamicIndexing \= true  
\>         shaderSampledImageArrayDynamicIndexing  \= true  
\>         shaderStorageBufferArrayDynamicIndexing \= true  
\>         shaderStorageImageArrayDynamicIndexing  \= true  
\>         shaderClipDistance                      \= true  
\>         shaderCullDistance                      \= true  
\>         shaderFloat64                           \= true  
\>         shaderInt64                             \= true  
\>         shaderInt16                             \= true  
\>         shaderResourceResidency                 \= true  
\>         shaderResourceMinLod                    \= true  
\>         sparseBinding                           \= true  
\>         sparseResidencyBuffer                   \= true  
\>         sparseResidencyImage2D                  \= true  
\>         sparseResidencyImage3D                  \= true  
\>         sparseResidency2Samples                 \= false  
\>         sparseResidency4Samples                 \= false  
\>         sparseResidency8Samples                 \= false  
\>         sparseResidency16Samples                \= false  
\>         sparseResidencyAliased                  \= true  
\>         variableMultisampleRate                 \= true  
\>         inheritedQueries                        \= true  
\>   
\> VkPhysicalDevice4444FormatsFeaturesEXT:  
\> \---------------------------------------  
\>         formatA4R4G4B4 \= true  
\>         formatA4B4G4R4 \= true  
\>   
\> VkPhysicalDeviceAccelerationStructureFeaturesKHR:  
\> \-------------------------------------------------  
\>         accelerationStructure                                 \= true  
\>         accelerationStructureCaptureReplay                    \= true  
\>         accelerationStructureIndirectBuild                    \= true  
\>         accelerationStructureHostCommands                     \= false  
\>         descriptorBindingAccelerationStructureUpdateAfterBind \= true  
\>   
\> VkPhysicalDeviceAddressBindingReportFeaturesEXT:  
\> \------------------------------------------------  
\>         reportAddressBinding \= true  
\>   
\> VkPhysicalDeviceAttachmentFeedbackLoopLayoutFeaturesEXT:  
\> \--------------------------------------------------------  
\>         attachmentFeedbackLoopLayout \= true  
\>   
\> VkPhysicalDeviceBorderColorSwizzleFeaturesEXT:  
\> \----------------------------------------------  
\>         borderColorSwizzle          \= true  
\>         borderColorSwizzleFromImage \= true  
\>   
\> VkPhysicalDeviceColorWriteEnableFeaturesEXT:  
\> \--------------------------------------------  
\>         colorWriteEnable \= true  
\>   
\> VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR:  
\> \----------------------------------------------------  
\>         computeDerivativeGroupQuads  \= true  
\>         computeDerivativeGroupLinear \= true  
\>   
\> VkPhysicalDeviceConditionalRenderingFeaturesEXT:  
\> \------------------------------------------------  
\>         conditionalRendering          \= true  
\>         inheritedConditionalRendering \= true  
\>   
\> VkPhysicalDeviceCooperativeMatrixFeaturesKHR:  
\> \---------------------------------------------  
\>         cooperativeMatrix                   \= true  
\>         cooperativeMatrixRobustBufferAccess \= true  
\>   
\> VkPhysicalDeviceCustomBorderColorFeaturesEXT:  
\> \---------------------------------------------  
\>         customBorderColors             \= true  
\>         customBorderColorWithoutFormat \= true  
\>   
\> VkPhysicalDeviceDepthClampControlFeaturesEXT:  
\> \---------------------------------------------  
\>         depthClampControl \= true  
\>   
\> VkPhysicalDeviceDepthClampZeroOneFeaturesEXT:  
\> \---------------------------------------------  
\>         depthClampZeroOne \= true  
\>   
\> VkPhysicalDeviceDepthClipControlFeaturesEXT:  
\> \--------------------------------------------  
\>         depthClipControl \= true  
\>   
\> VkPhysicalDeviceDepthClipEnableFeaturesEXT:  
\> \-------------------------------------------  
\>         depthClipEnable \= true  
\>   
\> VkPhysicalDeviceDescriptorBufferFeaturesEXT:  
\> \--------------------------------------------  
\>         descriptorBuffer                   \= true  
\>         descriptorBufferCaptureReplay      \= false  
\>         descriptorBufferImageLayoutIgnored \= false  
\>         descriptorBufferPushDescriptors    \= true  
\>   
\> VkPhysicalDeviceDynamicRenderingLocalReadFeaturesKHR:  
\> \-----------------------------------------------------  
\>         dynamicRenderingLocalRead \= true  
\>   
\> VkPhysicalDeviceDynamicRenderingUnusedAttachmentsFeaturesEXT:  
\> \-------------------------------------------------------------  
\>         dynamicRenderingUnusedAttachments \= true  
\>   
\> VkPhysicalDeviceExtendedDynamicState2FeaturesEXT:  
\> \-------------------------------------------------  
\>         extendedDynamicState2                   \= true  
\>         extendedDynamicState2LogicOp            \= false  
\>         extendedDynamicState2PatchControlPoints \= false  
\>   
\> VkPhysicalDeviceExtendedDynamicState3FeaturesEXT:  
\> \-------------------------------------------------  
\>         extendedDynamicState3TessellationDomainOrigin         \= true  
\>         extendedDynamicState3DepthClampEnable                 \= true  
\>         extendedDynamicState3PolygonMode                      \= true  
\>         extendedDynamicState3RasterizationSamples             \= true  
\>         extendedDynamicState3SampleMask                       \= true  
\>         extendedDynamicState3AlphaToCoverageEnable            \= true  
\>         extendedDynamicState3AlphaToOneEnable                 \= false  
\>         extendedDynamicState3LogicOpEnable                    \= true  
\>         extendedDynamicState3ColorBlendEnable                 \= true  
\>         extendedDynamicState3ColorBlendEquation               \= true  
\>         extendedDynamicState3ColorWriteMask                   \= true  
\>         extendedDynamicState3RasterizationStream              \= false  
\>         extendedDynamicState3ConservativeRasterizationMode    \= true  
\>         extendedDynamicState3ExtraPrimitiveOverestimationSize \= true  
\>         extendedDynamicState3DepthClipEnable                  \= true  
\>         extendedDynamicState3SampleLocationsEnable            \= true  
\>         extendedDynamicState3ColorBlendAdvanced               \= false  
\>         extendedDynamicState3ProvokingVertexMode              \= true  
\>         extendedDynamicState3LineRasterizationMode            \= true  
\>         extendedDynamicState3LineStippleEnable                \= true  
\>         extendedDynamicState3DepthClipNegativeOneToOne        \= true  
\>         extendedDynamicState3ViewportWScalingEnable           \= false  
\>         extendedDynamicState3ViewportSwizzle                  \= false  
\>         extendedDynamicState3CoverageToColorEnable            \= false  
\>         extendedDynamicState3CoverageToColorLocation          \= false  
\>         extendedDynamicState3CoverageModulationMode           \= false  
\>         extendedDynamicState3CoverageModulationTableEnable    \= false  
\>         extendedDynamicState3CoverageModulationTable          \= false  
\>         extendedDynamicState3CoverageReductionMode            \= false  
\>         extendedDynamicState3RepresentativeFragmentTestEnable \= false  
\>         extendedDynamicState3ShadingRateImageEnable           \= false  
\>   
\> VkPhysicalDeviceExtendedDynamicStateFeaturesEXT:  
\> \------------------------------------------------  
\>         extendedDynamicState \= true  
\>   
\> VkPhysicalDeviceFaultFeaturesEXT:  
\> \---------------------------------  
\>         deviceFault             \= true  
\>         deviceFaultVendorBinary \= false  
\>   
\> VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR:  
\> \-----------------------------------------------------  
\>         fragmentShaderBarycentric \= true  
\>   
\> VkPhysicalDeviceFragmentShaderInterlockFeaturesEXT:  
\> \---------------------------------------------------  
\>         fragmentShaderSampleInterlock      \= true  
\>         fragmentShaderPixelInterlock       \= true  
\>         fragmentShaderShadingRateInterlock \= false  
\>   
\> VkPhysicalDeviceFragmentShadingRateFeaturesKHR:  
\> \-----------------------------------------------  
\>         pipelineFragmentShadingRate   \= true  
\>         primitiveFragmentShadingRate  \= true  
\>         attachmentFragmentShadingRate \= true  
\>   
\> VkPhysicalDeviceFrameBoundaryFeaturesEXT:  
\> \-----------------------------------------  
\>         frameBoundary \= true  
\>   
\> VkPhysicalDeviceGlobalPriorityQueryFeaturesKHR:  
\> \-----------------------------------------------  
\>         globalPriorityQuery \= true  
\>   
\> VkPhysicalDeviceGraphicsPipelineLibraryFeaturesEXT:  
\> \---------------------------------------------------  
\>         graphicsPipelineLibrary \= true  
\>   
\> VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT:  
\> \-----------------------------------------------  
\>         imageSlicedViewOf3D \= true  
\>   
\> VkPhysicalDeviceImageViewMinLodFeaturesEXT:  
\> \-------------------------------------------  
\>         minLod \= true  
\>   
\> VkPhysicalDeviceIndexTypeUint8FeaturesKHR:  
\> \------------------------------------------  
\>         indexTypeUint8 \= true  
\>   
\> VkPhysicalDeviceLineRasterizationFeaturesKHR:  
\> \---------------------------------------------  
\>         rectangularLines         \= false  
\>         bresenhamLines           \= true  
\>         smoothLines              \= false  
\>         stippledRectangularLines \= false  
\>         stippledBresenhamLines   \= true  
\>         stippledSmoothLines      \= false  
\>   
\> VkPhysicalDeviceMaintenance5FeaturesKHR:  
\> \----------------------------------------  
\>         maintenance5 \= true  
\>   
\> VkPhysicalDeviceMaintenance6FeaturesKHR:  
\> \----------------------------------------  
\>         maintenance6 \= true  
\>   
\> VkPhysicalDeviceMaintenance7FeaturesKHR:  
\> \----------------------------------------  
\>         maintenance7 \= true  
\>   
\> VkPhysicalDeviceMemoryPriorityFeaturesEXT:  
\> \------------------------------------------  
\>         memoryPriority \= true  
\>   
\> VkPhysicalDeviceMeshShaderFeaturesEXT:  
\> \--------------------------------------  
\>         taskShader                             \= true  
\>         meshShader                             \= true  
\>         multiviewMeshShader                    \= true  
\>         primitiveFragmentShadingRateMeshShader \= true  
\>         meshShaderQueries                      \= false  
\>   
\> VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT:  
\> \-------------------------------------------------  
\>         mutableDescriptorType \= true  
\>   
\> VkPhysicalDeviceNestedCommandBufferFeaturesEXT:  
\> \-----------------------------------------------  
\>         nestedCommandBuffer                \= true  
\>         nestedCommandBufferRendering       \= true  
\>         nestedCommandBufferSimultaneousUse \= false  
\>   
\> VkPhysicalDeviceNonSeamlessCubeMapFeaturesEXT:  
\> \----------------------------------------------  
\>         nonSeamlessCubeMap \= true  
\>   
\> VkPhysicalDevicePageableDeviceLocalMemoryFeaturesEXT:  
\> \-----------------------------------------------------  
\>         pageableDeviceLocalMemory \= true  
\>   
\> VkPhysicalDevicePipelineBinaryFeaturesKHR:  
\> \------------------------------------------  
\>         pipelineBinaries \= true  
\>   
\> VkPhysicalDevicePipelineExecutablePropertiesFeaturesKHR:  
\> \--------------------------------------------------------  
\>         pipelineExecutableInfo \= true  
\>   
\> VkPhysicalDevicePipelineLibraryGroupHandlesFeaturesEXT:  
\> \-------------------------------------------------------  
\>         pipelineLibraryGroupHandles \= true  
\>   
\> VkPhysicalDevicePrimitiveTopologyListRestartFeaturesEXT:  
\> \--------------------------------------------------------  
\>         primitiveTopologyListRestart      \= true  
\>         primitiveTopologyPatchListRestart \= false  
\>   
\> VkPhysicalDevicePrimitivesGeneratedQueryFeaturesEXT:  
\> \----------------------------------------------------  
\>         primitivesGeneratedQuery                      \= true  
\>         primitivesGeneratedQueryWithRasterizerDiscard \= true  
\>         primitivesGeneratedQueryWithNonZeroStreams    \= true  
\>   
\> VkPhysicalDeviceProvokingVertexFeaturesEXT:  
\> \-------------------------------------------  
\>         provokingVertexLast                       \= true  
\>         transformFeedbackPreservesProvokingVertex \= true  
\>   
\> VkPhysicalDeviceRayQueryFeaturesKHR:  
\> \------------------------------------  
\>         rayQuery \= true  
\>   
\> VkPhysicalDeviceRayTracingMaintenance1FeaturesKHR:  
\> \--------------------------------------------------  
\>         rayTracingMaintenance1               \= true  
\>         rayTracingPipelineTraceRaysIndirect2 \= true  
\>   
\> VkPhysicalDeviceRayTracingPipelineFeaturesKHR:  
\> \----------------------------------------------  
\>         rayTracingPipeline                                    \= true  
\>         rayTracingPipelineShaderGroupHandleCaptureReplay      \= true  
\>         rayTracingPipelineShaderGroupHandleCaptureReplayMixed \= false  
\>         rayTracingPipelineTraceRaysIndirect                   \= true  
\>         rayTraversalPrimitiveCulling                          \= true  
\>   
\> VkPhysicalDeviceRayTracingPositionFetchFeaturesKHR:  
\> \---------------------------------------------------  
\>         rayTracingPositionFetch \= true  
\>   
\> VkPhysicalDeviceRobustness2FeaturesEXT:  
\> \---------------------------------------  
\>         robustBufferAccess2 \= true  
\>         robustImageAccess2  \= true  
\>         nullDescriptor      \= true  
\>   
\> VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT:  
\> \----------------------------------------------  
\>         shaderBufferFloat16Atomics      \= false  
\>         shaderBufferFloat16AtomicAdd    \= false  
\>         shaderBufferFloat16AtomicMinMax \= false  
\>         shaderBufferFloat32AtomicMinMax \= true  
\>         shaderBufferFloat64AtomicMinMax \= false  
\>         shaderSharedFloat16Atomics      \= false  
\>         shaderSharedFloat16AtomicAdd    \= false  
\>         shaderSharedFloat16AtomicMinMax \= false  
\>         shaderSharedFloat32AtomicMinMax \= true  
\>         shaderSharedFloat64AtomicMinMax \= false  
\>         shaderImageFloat32AtomicMinMax  \= false  
\>         sparseImageFloat32AtomicMinMax  \= false  
\>   
\> VkPhysicalDeviceShaderAtomicFloatFeaturesEXT:  
\> \---------------------------------------------  
\>         shaderBufferFloat32Atomics   \= true  
\>         shaderBufferFloat32AtomicAdd \= true  
\>         shaderBufferFloat64Atomics   \= true  
\>         shaderBufferFloat64AtomicAdd \= false  
\>         shaderSharedFloat32Atomics   \= true  
\>         shaderSharedFloat32AtomicAdd \= true  
\>         shaderSharedFloat64Atomics   \= true  
\>         shaderSharedFloat64AtomicAdd \= false  
\>         shaderImageFloat32Atomics    \= true  
\>         shaderImageFloat32AtomicAdd  \= false  
\>         sparseImageFloat32Atomics    \= true  
\>         sparseImageFloat32AtomicAdd  \= false  
\>   
\> VkPhysicalDeviceShaderClockFeaturesKHR:  
\> \---------------------------------------  
\>         shaderSubgroupClock \= true  
\>         shaderDeviceClock   \= true  
\>   
\> VkPhysicalDeviceShaderExpectAssumeFeaturesKHR:  
\> \----------------------------------------------  
\>         shaderExpectAssume \= true  
\>   
\> VkPhysicalDeviceShaderFloatControls2FeaturesKHR:  
\> \------------------------------------------------  
\>         shaderFloatControls2 \= true  
\>   
\> VkPhysicalDeviceShaderImageAtomicInt64FeaturesEXT:  
\> \--------------------------------------------------  
\>         shaderImageInt64Atomics \= true  
\>         sparseImageInt64Atomics \= true  
\>   
\> VkPhysicalDeviceShaderMaximalReconvergenceFeaturesKHR:  
\> \------------------------------------------------------  
\>         shaderMaximalReconvergence \= true  
\>   
\> VkPhysicalDeviceShaderModuleIdentifierFeaturesEXT:  
\> \--------------------------------------------------  
\>         shaderModuleIdentifier \= true  
\>   
\> VkPhysicalDeviceShaderObjectFeaturesEXT:  
\> \----------------------------------------  
\>         shaderObject \= true  
\>   
\> VkPhysicalDeviceShaderQuadControlFeaturesKHR:  
\> \---------------------------------------------  
\>         shaderQuadControl \= true  
\>   
\> VkPhysicalDeviceShaderSubgroupRotateFeaturesKHR:  
\> \------------------------------------------------  
\>         shaderSubgroupRotate          \= true  
\>         shaderSubgroupRotateClustered \= true  
\>   
\> VkPhysicalDeviceShaderSubgroupUniformControlFlowFeaturesKHR:  
\> \------------------------------------------------------------  
\>         shaderSubgroupUniformControlFlow \= true  
\>   
\> VkPhysicalDeviceTexelBufferAlignmentFeaturesEXT:  
\> \------------------------------------------------  
\>         texelBufferAlignment \= true  
\>   
\> VkPhysicalDeviceTransformFeedbackFeaturesEXT:  
\> \---------------------------------------------  
\>         transformFeedback \= true  
\>         geometryStreams   \= true  
\>   
\> VkPhysicalDeviceVertexAttributeDivisorFeaturesKHR:  
\> \--------------------------------------------------  
\>         vertexAttributeInstanceRateDivisor     \= true  
\>         vertexAttributeInstanceRateZeroDivisor \= true  
\>   
\> VkPhysicalDeviceVertexInputDynamicStateFeaturesEXT:  
\> \---------------------------------------------------  
\>         vertexInputDynamicState \= true  
\>   
\> VkPhysicalDeviceVulkan11Features:  
\> \---------------------------------  
\>         storageBuffer16BitAccess           \= true  
\>         uniformAndStorageBuffer16BitAccess \= true  
\>         storagePushConstant16              \= false  
\>         storageInputOutput16               \= true  
\>         multiview                          \= true  
\>         multiviewGeometryShader            \= true  
\>         multiviewTessellationShader        \= true  
\>         variablePointersStorageBuffer      \= true  
\>         variablePointers                   \= true  
\>         protectedMemory                    \= false  
\>         samplerYcbcrConversion             \= true  
\>         shaderDrawParameters               \= true  
\>   
\> VkPhysicalDeviceVulkan12Features:  
\> \---------------------------------  
\>         samplerMirrorClampToEdge                           \= true  
\>         drawIndirectCount                                  \= true  
\>         storageBuffer8BitAccess                            \= true  
\>         uniformAndStorageBuffer8BitAccess                  \= true  
\>         storagePushConstant8                               \= false  
\>         shaderBufferInt64Atomics                           \= true  
\>         shaderSharedInt64Atomics                           \= true  
\>         shaderFloat16                                      \= true  
\>         shaderInt8                                         \= true  
\>         descriptorIndexing                                 \= true  
\>         shaderInputAttachmentArrayDynamicIndexing          \= true  
\>         shaderUniformTexelBufferArrayDynamicIndexing       \= true  
\>         shaderStorageTexelBufferArrayDynamicIndexing       \= true  
\>         shaderUniformBufferArrayNonUniformIndexing         \= true  
\>         shaderSampledImageArrayNonUniformIndexing          \= true  
\>         shaderStorageBufferArrayNonUniformIndexing         \= true  
\>         shaderStorageImageArrayNonUniformIndexing          \= true  
\>         shaderInputAttachmentArrayNonUniformIndexing       \= true  
\>         shaderUniformTexelBufferArrayNonUniformIndexing    \= true  
\>         shaderStorageTexelBufferArrayNonUniformIndexing    \= true  
\>         descriptorBindingUniformBufferUpdateAfterBind      \= true  
\>         descriptorBindingSampledImageUpdateAfterBind       \= true  
\>         descriptorBindingStorageImageUpdateAfterBind       \= true  
\>         descriptorBindingStorageBufferUpdateAfterBind      \= true  
\>         descriptorBindingUniformTexelBufferUpdateAfterBind \= true  
\>         descriptorBindingStorageTexelBufferUpdateAfterBind \= true  
\>         descriptorBindingUpdateUnusedWhilePending          \= true  
\>         descriptorBindingPartiallyBound                    \= true  
\>         descriptorBindingVariableDescriptorCount           \= true  
\>         runtimeDescriptorArray                             \= true  
\>         samplerFilterMinmax                                \= true  
\>         scalarBlockLayout                                  \= true  
\>         imagelessFramebuffer                               \= true  
\>         uniformBufferStandardLayout                        \= true  
\>         shaderSubgroupExtendedTypes                        \= true  
\>         separateDepthStencilLayouts                        \= true  
\>         hostQueryReset                                     \= true  
\>         timelineSemaphore                                  \= true  
\>         bufferDeviceAddress                                \= true  
\>         bufferDeviceAddressCaptureReplay                   \= true  
\>         bufferDeviceAddressMultiDevice                     \= true  
\>         vulkanMemoryModel                                  \= true  
\>         vulkanMemoryModelDeviceScope                       \= true  
\>         vulkanMemoryModelAvailabilityVisibilityChains      \= false  
\>         shaderOutputViewportIndex                          \= true  
\>         shaderOutputLayer                                  \= true  
\>         subgroupBroadcastDynamicId                         \= true  
\>   
\> VkPhysicalDeviceVulkan13Features:  
\> \---------------------------------  
\>         robustImageAccess                                  \= true  
\>         inlineUniformBlock                                 \= true  
\>         descriptorBindingInlineUniformBlockUpdateAfterBind \= true  
\>         pipelineCreationCacheControl                       \= true  
\>         privateData                                        \= true  
\>         shaderDemoteToHelperInvocation                     \= true  
\>         shaderTerminateInvocation                          \= true  
\>         subgroupSizeControl                                \= true  
\>         computeFullSubgroups                               \= true  
\>         synchronization2                                   \= true  
\>         textureCompressionASTC\_HDR                         \= false  
\>         shaderZeroInitializeWorkgroupMemory                \= true  
\>         dynamicRendering                                   \= true  
\>         shaderIntegerDotProduct                            \= true  
\>         maintenance4                                       \= true  
\>   
\> VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR:  
\> \---------------------------------------------------------  
\>         workgroupMemoryExplicitLayout                  \= true  
\>         workgroupMemoryExplicitLayoutScalarBlockLayout \= true  
\>         workgroupMemoryExplicitLayout8BitAccess        \= true  
\>         workgroupMemoryExplicitLayout16BitAccess       \= true  
\>   
\> VkPhysicalDeviceYcbcrImageArraysFeaturesEXT:  
\> \--------------------------------------------  
\>         ycbcrImageArrays \= true  
\>   
\> Video Profiles: count \= 22  
\> \==========================  
\> placeholder \= H.264 Decode (4:2:0 8-bit) Baseline progressive  
\> placeholder \= H.264 Decode (4:2:0 8-bit) Main progressive  
\> placeholder \= H.264 Decode (4:2:0 8-bit) High progressive  
\> placeholder \= H.264 Decode (4:2:0 8-bit) Baseline interlaced (interleaved lines)  
\> placeholder \= H.264 Decode (4:2:0 8-bit) Main interlaced (interleaved lines)  
\> placeholder \= H.264 Decode (4:2:0 8-bit) High interlaced (interleaved lines)  
\> placeholder \= H.265 Decode (4:2:0 8-bit) Main  
\> placeholder \= H.265 Decode (4:2:0 8-bit) Main 10  
\> placeholder \= H.265 Decode (4:2:0 8-bit) Main Still Picture  
\> placeholder \= H.265 Decode (4:2:0 10-bit) Main 10  
\> placeholder \= AV1 Decode (4:2:0 8-bit) Main with film grain support  
\> placeholder \= AV1 Decode (4:2:0 8-bit) High with film grain support  
\> placeholder \= AV1 Decode (4:2:0 8-bit) Professional with film grain support  
\> placeholder \= AV1 Decode (4:2:0 8-bit) Main without film grain support  
\> placeholder \= AV1 Decode (4:2:0 8-bit) High without film grain support  
\> placeholder \= AV1 Decode (4:2:0 8-bit) Professional without film grain support  
\> placeholder \= AV1 Decode (4:2:0 10-bit) Main with film grain support  
\> placeholder \= AV1 Decode (4:2:0 10-bit) High with film grain support  
\> placeholder \= AV1 Decode (4:2:0 10-bit) Professional with film grain support  
\> placeholder \= AV1 Decode (4:2:0 10-bit) Main without film grain support  
\> placeholder \= AV1 Decode (4:2:0 10-bit) High without film grain support  
\> placeholder \= AV1 Decode (4:2:0 10-bit) Professional without film grain support  
\>   
\>   
\>   
\> C:\\hack\\qvac-pruebas\>npm install \-g \--allow-scripts=@tetherto/wdk-cli @tetherto/wdk-cli@1.0.0-beta.2  
\>   
\> added 253 packages in 2m  
\>   
\> 64 packages are looking for funding  
\>   run \`npm fund\` for details  
\>   
\> C:\\hack\\qvac-pruebas\>npx qvac doctor  
\> npm error code E404  
\> npm error 404 Not Found \- GET https://registry.npmjs.org/qvac \- Not found  
\> npm error 404  
\> npm error 404  'qvac@\*' is not in this registry.  
\> npm error 404  
\> npm error 404 Note that you can also install from a  
\> npm error 404 tarball, folder, http url, or git url.  
\> npm error A complete log of this run can be found in: C:\\Users\\Emi\\AppData\\Local\\npm-cache\\\_logs\\2026-08-22T02\_50\_44\_825Z-debug-0.log  
\>   
\> C:\\hack\\qvac-pruebas\>

Windows PowerShell  
Copyright (C) Microsoft Corporation. All rights reserved.  
PS C:\\WINDOWS\\system32\> irm https://install.pears.com/pear.ps1 | iex  
Installing pear  
Checksum OK  
Added C:\\Users\\Emi\\AppData\\Local\\Programs\\pear to User PATH \- restart your shell.  
Installed pear to C:\\Users\\Emi\\AppData\\Local\\Programs\\pear\\pear.exe  
PS C:\\WINDOWS\\system32\> npx pear  
Need to install the following packages:  
pear@3.0.0  
Ok to proceed? (y) y  
node:internal/child\_process:420  
    throw new ErrnoException(err, 'spawn');  
          ^  
Error: spawn UNKNOWN  
    at ChildProcess.spawn (node:internal/child\_process:420:11)  
    at Object.spawn (node:child\_process:787:9)  
    at C:\\Users\\Emi\\AppData\\Local\\npm-cache\\\_npx\\0feb729ea2a1d6c7\\node\_modules\\pear\\pear.js:29:8  
    at new Promise (\<anonymous\>)  
    at Object.\<anonymous\> (C:\\Users\\Emi\\AppData\\Local\\npm-cache\\\_npx\\0feb729ea2a1d6c7\\node\_modules\\pear\\pear.js:27:28)  
    at Module.\_compile (node:internal/modules/cjs/loader:1706:14)  
    at Object..js (node:internal/modules/cjs/loader:1839:10)  
    at Module.load (node:internal/modules/cjs/loader:1441:32)  
    at Function.\_load (node:internal/modules/cjs/loader:1263:12)  
    at TracingChannel.traceSync (node:diagnostics\_channel:322:14) {  
  errno: \-4094,  
  code: 'UNKNOWN',  
  syscall: 'spawn'  
}  
Node.js v22.20.0  
PS C:\\WINDOWS\\system32\> pear \--menu  
pear : El término 'pear' no se reconoce como nombre de un cmdlet, función, archivo de script o programa ejecutable.  
Compruebe si escribió correctamente el nombre o, si incluyó una ruta de acceso, compruebe que dicha ruta es correcta e  
inténtelo de nuevo.  
En línea: 1 Carácter: 1  
\+ pear \--menu  
\+ \~\~\~\~  
    \+ CategoryInfo          : ObjectNotFound: (pear:String) \[\], ParentContainsErrorRecordException  
    \+ FullyQualifiedErrorId : CommandNotFoundException  
PS C:\\WINDOWS\\system32\> npx pear  
node:internal/child\_process:420  
    throw new ErrnoException(err, 'spawn');  
          ^  
Error: spawn UNKNOWN  
    at ChildProcess.spawn (node:internal/child\_process:420:11)  
    at Object.spawn (node:child\_process:787:9)  
    at C:\\Users\\Emi\\AppData\\Local\\npm-cache\\\_npx\\0feb729ea2a1d6c7\\node\_modules\\pear\\pear.js:29:8  
    at new Promise (\<anonymous\>)  
    at Object.\<anonymous\> (C:\\Users\\Emi\\AppData\\Local\\npm-cache\\\_npx\\0feb729ea2a1d6c7\\node\_modules\\pear\\pear.js:27:28)  
    at Module.\_compile (node:internal/modules/cjs/loader:1706:14)  
    at Object..js (node:internal/modules/cjs/loader:1839:10)  
    at Module.load (node:internal/modules/cjs/loader:1441:32)  
    at Function.\_load (node:internal/modules/cjs/loader:1263:12)  
    at TracingChannel.traceSync (node:diagnostics\_channel:322:14) {  
  errno: \-4094,  
  code: 'UNKNOWN',  
  syscall: 'spawn'  
}  
Node.js v22.20.0

Como continúo con las instalaciones según como me fue yendo, uso powershell o wsl y me había salido justo un mensaje del antivirus y por eso no me dejó con pear, seguro reinicio la pc, pongo el comando con el antivirus desactivado y funcionará.  
Creo que intenté instalar lo de la billetera en el directorio que no era, ayudame

\# Claude — Aug 21, 2026, 11:52 PM

Antes de nada: la instalación de WDK con \`-g\` es global, así que \*\*el directorio no importaba\*\* — eso probablemente no era el problema real. Y el error de \`qvac doctor\` tiene una causa distinta a la que parece. Dejame verificar antes de decirte nada mal.

Encontré el bug real. No es un problema de directorio de WDK, y Vulkan ya está bien. El problema de QVAC es otro: \*\*te faltó instalar el paquete de la CLI.\*\*

\#\# 1\. \`npx qvac doctor\` — el error real

\`npm error 404 'qvac@\*' is not in this registry\` pasa porque \*\*no existe ningún paquete que se llame simplemente \`qvac\`\*\* en npm. Vos instalaste \`@qvac/sdk\` (la librería), pero el comando \`qvac doctor\` vive en un paquete \*\*separado\*\*: \`@qvac/cli\`. Instalarlo:

\`\`\`cmd  
npm install \-g @qvac/cli  
\`\`\`

Eso te instala el binario \`qvac\` en el PATH y trae \`@qvac/sdk\` como dependencia de arrastre, así que no rompe nada de lo que ya tenías. Después:

\`\`\`cmd  
qvac doctor  
\`\`\`

Ahí sí vas a ver el diagnóstico real, incluyendo si Vulkan pasa.

\#\# 2\. Vulkan — mejoró, y probablemente ya estás bien

Tu segunda corrida dice \`Vulkan Instance Version: 1.4.341\`. Eso es lo que importa: es la versión del \*\*loader del sistema\*\*, que es lo que la doc de QVAC pide en 1.4+. El \`apiVersion \= 1.3.302\` que sigue apareciendo es lo que el \*\*driver de la GPU\*\* reporta puntualmente en esa estructura, y no tengo forma de confirmarte con certeza si eso hace que \`qvac doctor\` marque \`fail\` o no — no lo voy a inventar. \*\*Con \`@qvac/cli\` instalado, corré \`qvac doctor\` y fijate qué dice esa línea específica.\*\* Si tira \`fail\` en Vulkan, ahí sí hay que seguir peleando el driver; si no, ya está resuelto y podés avanzar.

\#\# 3\. WDK — no era el directorio

\`npm install \-g\` instala \*\*global\*\*, sin importar desde qué carpeta lo corriste. Tu instalación salió bien (\`added 253 packages\`). Probablemente lo que te confundió es que después de instalar global, el comando \`wdk\` se usa \*\*desde cualquier carpeta\*\*, no hace falta estar parado en ninguna en particular. Verificalo:

\`\`\`cmd  
wdk \--version  
wdk \--help  
\`\`\`

Si eso responde, WDK está instalado correctamente y no hay nada que arreglar.

\#\# 4\. Pear — el antivirus tiene sentido como causa

\`Error: spawn UNKNOWN\` al ejecutar algo que Node lanza como subproceso es un patrón clásico de que Windows Defender (u otro antivirus) bloqueó silenciosamente la creación del proceso hijo, sobre todo con un binario recién bajado. Tu diagnóstico es razonable. Al reiniciar además se resuelve lo otro que viste (\`pear no se reconoce\`): el instalador te avisó \*"restart your shell"\* porque agregó la carpeta al PATH, y PowerShell ya abierto no relee esa variable hasta que abrís una consola nueva.

\*\*Orden sugerido:\*\* reiniciá la PC (así entran los dos cambios: PATH y cualquier ajuste de Vulkan), agregá una exclusión en el antivirus para \`C:\\Users\\Emi\\AppData\\Local\\Programs\\pear\` en vez de desactivarlo del todo si podés —es más seguro dejarlo prendido para el resto—, y probá de nuevo:

\`\`\`powershell  
pear \--version  
\`\`\`

Si eso responde, seguís con \`pear \--menu\` y de ahí a clonar \`hello-pear-bare\`.

Avisame qué dice \`qvac doctor\` completo cuando lo corras con \`@qvac/cli\` instalado — con eso sabemos si quedó algo pendiente de Vulkan o si ya pueden pasar a la primera inferencia.

\# Human — Aug 21, 2026, 11:54 PM

\> \*\*Attachment: attachment · txt · 19.3 KB\*\*  
\>  
\> \# Instalar las tres tecnologías en Windows  
\> \#\#\# QVAC · Pear · WDK — todo desde \`cmd\`, con comandos verificados contra las páginas oficiales  
\> \*\*21 de agosto de 2026\*\*  
\>   
\> \> \*\*Cómo usar este documento:\*\* pasáselo a los tres integrantes. Cada uno corre lo  
\> \> mismo en su máquina. Al final hay una lista de verificación: si los cuatro  
\> \> pueden marcar todos los casilleros, mañana arrancan con el reloj a favor.  
\> \>  
\> \> Todos los comandos salen de la documentación oficial. Donde no verifiqué algo,  
\> \> lo digo.  
\>   
\> \---  
\>   
\> \# 🔴 PRIMERO — El problema que Emi ya encontró  
\>   
\> Tu salida de \`vulkaninfo \--summary\` dice:  
\>   
\> \`\`\`  
\> Vulkan Instance Version: 1.3.301  
\> GPU0: AMD Radeon(TM) 880M Graphics  
\>       apiVersion    \= 1.3.302  
\>       driverInfo    \= 24.30.22.03 (LLPC)  
\> \`\`\`  
\>   
\> \*\*QVAC en Windows exige Vulkan 1.4 o superior, incluso para usar solo el  
\> procesador.\*\* Está en la tabla de plataformas soportadas de la documentación  
\> oficial. Tenés 1.3. \*\*Hoy no cumplís el requisito.\*\*  
\>   
\> La buena noticia es que casi seguro se arregla, y hay una pista en tu propia  
\> salida: la capa \`VK\_LAYER\_VALVE\_steam\_fossilize\` reporta \`1.4.303\`. O sea que  
\> \*\*algo en tu sistema ya conoce Vulkan 1.4\*\* — lo que falta es que el driver de la  
\> placa lo exponga.  
\>   
\> \#\# Cómo arreglarlo, en orden  
\>   
\> \*\*1. Actualizar el driver de AMD.\*\* El tuyo es de la serie 24.30, que es de 2024\.  
\> Los drivers Adrenalin nuevos traen soporte de Vulkan 1.4.  
\>   
\> \- Andá a \`https://www.amd.com/en/support\` y buscá tu modelo (Radeon 880M  
\>   Graphics, que es la gráfica integrada de los Ryzen AI serie 300).  
\> \- \*\*No lo actualices por Windows Update\*\*, que casi siempre da versiones viejas.  
\> \- Si tu laptop es de una marca que trae driver propio (Lenovo, Asus, HP), probá  
\>   primero el de AMD; si rompe algo, volvés al del fabricante.  
\>   
\> \*\*2. Reiniciar.\*\* Sí, en serio. Vulkan se registra al arrancar.  
\>   
\> \*\*3. Volver a verificar:\*\*  
\>   
\> \`\`\`cmd  
\> vulkaninfo \--summary  
\> \`\`\`  
\>   
\> Mirá dos cosas: \`Vulkan Instance Version\` y el \`apiVersion\` de tu GPU. \*\*Las dos  
\> tienen que decir 1.4 o más.\*\*  
\>   
\> \*\*4. Si el número no sube\*\*, actualizá también el Vulkan Runtime instalando el SDK  
\> desde \`https://vulkan.lunarg.com\` (la doc de QVAC recomienda exactamente eso para  
\> verificar), reiniciá y probá de nuevo.  
\>   
\> \> El aviso \`Registry lookup failed to get layer manifest files\` que te apareció es  
\> \> normal y no rompe nada. Ignoralo.  
\>   
\> \#\# Si después de todo eso sigue en 1.3  
\>   
\> No pierdas la noche. En orden:  
\>   
\> 1\. \*\*Probá en la máquina de otro integrante.\*\* Con que QVAC ande en una sola  
\>    laptop alcanza para construir y demostrar. Esa persona toma el rol de Núcleo.  
\> 2\. \*\*Cambiá de track.\*\* Portero (WDK) y las ideas de Pears no usan QVAC para nada.  
\> 3\. \*\*Vaquita sin QVAC:\*\* los ítems se cargan a mano, apuntás a Pears \+ WDK \+  
\>    General. Perdés $1.000 de cuatro posibles y el proyecto sigue en pie.  
\>   
\> \---  
\>   
\> \# 1 · QVAC — la IA que corre en tu máquina  
\>   
\> \#\# Lo que ya hiciste bien  
\>   
\> Tu Node es \`v22.20.0\` y npm \`10.9.3\`. QVAC pide Node ≥ 22.17 y npm ≥ 10.9.  
\> \*\*Cumplís.\*\* Y ya instalaste el SDK en \`C:\\hack\\qvac-pruebas\`.  
\>   
\> \#\# Lo que te faltó: el archivo de configuración  
\>   
\> Preguntaste dónde está \`qvac.config.json\`. \*\*No está en ningún lado: hay que  
\> crearlo vos.\*\* No viene con la instalación.  
\>   
\> Va en la carpeta del proyecto, al lado del \`package.json\`. Desde \`cmd\`, parado en  
\> esa carpeta:  
\>   
\> \`\`\`cmd  
\> cd C:\\hack\\qvac-pruebas  
\> notepad qvac.config.json  
\> \`\`\`  
\>   
\> Windows te va a preguntar si querés crear el archivo. Decile que sí, pegá esto,  
\> guardá y cerrá:  
\>   
\> \`\`\`json  
\> {  
\>   "loggerLevel": "info",  
\>   "loggerConsoleOutput": true,  
\>   "httpDownloadConcurrency": 3,  
\>   "httpConnectionTimeoutMs": 10000  
\> }  
\> \`\`\`  
\>   
\> \*\*Para qué sirve:\*\* por defecto el SDK \*\*no imprime absolutamente nada\*\*. Si algo  
\> falla, no ves el motivo. Este archivo enciende los mensajes. Sin él vas a estar  
\> depurando a ciegas.  
\>   
\> Verificá que quedó donde va:  
\>   
\> \`\`\`cmd  
\> dir  
\> \`\`\`  
\>   
\> Tenés que ver \`package.json\`, \`node\_modules\` y \`qvac.config.json\`.  
\>   
\> \#\# El diagnóstico automático  
\>   
\> \`\`\`cmd  
\> npx qvac doctor  
\> \`\`\`  
\>   
\> Revisa versión de Node, sistema soportado, RAM total, RAM disponible, espacio en  
\> disco y herramientas opcionales. Lee así:  
\>   
\> | Resultado | Qué significa |  
\> |---|---|  
\> | \`pass\` | Bien |  
\> | \`warn\` | Recomendado, no obligatorio. Seguí |  
\> | \`fail\` | \*\*Obligatorio. Hay que arreglarlo.\*\* Te imprime la pista |  
\> | \`skip\` / \`info\` | Informativo, ignoralo |  
\>   
\> \*\*Con Vulkan en 1.3, esperá un \`fail\`.\*\* Ese comando es tu forma de confirmar que  
\> el arreglo del driver funcionó.  
\>   
\> \#\# La primera inferencia  
\>   
\> \`\`\`cmd  
\> notepad prueba.js  
\> \`\`\`  
\>   
\> Pegá esto (sale del quickstart oficial, no lo inventé):  
\>   
\> \`\`\`javascript  
\> import { loadModel, LLAMA\_3\_2\_1B\_INST\_Q4\_0, completion, unloadModel } from '@qvac/sdk';  
\>   
\> try {  
\>   const modelId \= await loadModel({  
\>     modelSrc: LLAMA\_3\_2\_1B\_INST\_Q4\_0,  
\>     onProgress: (p) \=\> {  
\>       const mb \= (n) \=\> (n / 1e6).toFixed(1);  
\>       process.stderr.write(\`\\rBajando p.percentage.toFixed(0)%({mb(p.downloaded)}/${mb(p.total)} MB)\`);  
\>       if (p.percentage \>= 100\) process.stderr.write('\\n');  
\>     }  
\>   });  
\>   
\>   const history \= \[{ role: 'user', content: 'Explicá qué es una factura en una oración' }\];  
\>   const result \= completion({ modelId, history, stream: true });  
\>   for await (const token of result.tokenStream) {  
\>     process.stdout.write(token);  
\>   }  
\>   
\>   await unloadModel({ modelId });  
\> } catch (error) {  
\>   console.error('✖', error);  
\>   process.exit(1);  
\> }  
\> \`\`\`  
\>   
\> Corrélo. \*\*Ojo con la sintaxis de Windows:\*\* en \`cmd\` las variables de entorno se  
\> ponen con \`set\` en una línea aparte, no como en Linux.  
\>   
\> \`\`\`cmd  
\> set QVAC\_CONFIG\_PATH=./qvac.config.json  
\> node prueba.js  
\> \`\`\`  
\>   
\> La primera vez baja el modelo. \`LLAMA\_3\_2\_1B\_INST\_Q4\_0\` es de mil millones de  
\> parámetros: el más chico y el más rápido de bajar. \*\*Lo que querés verificar ahora  
\> no es la calidad, es que la cadena entera funciona.\*\*  
\>   
\> Si imprime texto, QVAC anda. \*\*Ese es el gate del track y lo pasaste antes de que  
\> empiece el hackathon.\*\*  
\>   
\> \#\# Lo que de verdad importa para las ideas: leer una foto  
\>   
\> Todas las ideas de ustedes necesitan sacar texto de una imagen. Está en dos  
\> páginas:  
\>   
\> \- \`https://docs.qvac.tether.io/ai-capabilities/ocr/\`  
\> \- \`https://docs.qvac.tether.io/ai-capabilities/multimodal/\`  
\>   
\> \*\*No te copio código de ahí porque no lo verifiqué.\*\* Copiar de memoria es  
\> exactamente cómo se inventan métodos que no existen, y los tres sponsors dicen que  
\> eso lo descartan sin revisar.  
\>   
\> Entrá, copiá el ejemplo tal cual, y probalo con \*\*una foto de un ticket real  
\> sacada con el celular, torcida y con poca luz\*\*. No con una imagen limpia.  
\>   
\> \*\*Ese es el momento de la verdad.\*\* Si un ticket arrugado sale legible, Vaquita,  
\> Ventanilla y el Banco de pruebas son todas viables. Si sale ilegible, lo sabés hoy.  
\>   
\> \#\# El atajo que puede ahorrar horas  
\>   
\> QVAC trae un servidor HTTP \*\*compatible con la API de OpenAI\*\*:  
\> \`https://docs.qvac.tether.io/cli/http-server/\`  
\>   
\> Levantás ese servidor y cualquier herramienta que ya sepa hablar con OpenAI le  
\> habla a tu modelo local cambiando una sola dirección. \*\*El sponsor aclara  
\> explícitamente que usar ese servidor cuenta como inferencia local y califica para  
\> el track.\*\* Para un equipo de vibecoders es probablemente el camino más rápido.  
\>   
\> \---  
\>   
\> \# 2 · Pear — programas que se instalan sin tienda  
\>   
\> \#\# ⚠️ La fricción de Windows, que hay que saber antes  
\>   
\> La página de inicio de Pear dice, en los requisitos previos, que hace falta \*\*una  
\> terminal estilo POSIX: macOS, Linux, o Windows con WSL\*\*.  
\>   
\> Al mismo tiempo, la página de instalación ofrece un instalador de PowerShell para  
\> Windows. O sea que el CLI se instala en Windows nativo, \*\*pero el camino que la  
\> documentación recomienda para el desarrollo es WSL.\*\*  
\>   
\> \*\*Mi recomendación: instalen WSL.\*\* Tres motivos:  
\> 1\. Es el camino que la documentación asume, así que los ejemplos van a funcionar  
\>    sin traducciones raras.  
\> 2\. Ahorra horas de pelear con diferencias de terminal a las 4 de la mañana.  
\> 3\. \*\*Esta fricción es justamente la que elimina competencia.\*\* Los equipos que se  
\>    traben acá no van a pasar el gate. Ustedes lo resuelven hoy y quedan adentro.  
\>   
\> \`\`\`cmd  
\> wsl \--install  
\> \`\`\`  
\>   
\> Reiniciá cuando te lo pida. Después entrás con \`wsl\` desde \`cmd\` y ahí adentro  
\> tenés Ubuntu, donde corren los comandos de Linux de toda la documentación.  
\>   
\> \#\# Instalar el CLI  
\>   
\> \*\*En Windows nativo (PowerShell, no \`cmd\`):\*\*  
\>   
\> \`\`\`powershell  
\> irm https://install.pears.com/pear.ps1 | iex  
\> \`\`\`  
\>   
\> \*\*En WSL o Linux:\*\*  
\>   
\> \`\`\`bash  
\> curl https://install.pears.com/pear.sh | sh  
\> \`\`\`  
\>   
\> \*\*Sin instalar nada, para probar:\*\*  
\>   
\> \`\`\`cmd  
\> npx pear  
\> \`\`\`  
\>   
\> El instalador imprime instrucciones para agregar Pear al \`PATH\`. \*\*Seguilas\*\*, si  
\> no el comando \`pear\` no va a existir en una terminal nueva.  
\>   
\> Verificá:  
\>   
\> \`\`\`cmd  
\> pear \--version  
\> \`\`\`  
\>   
\> \*\*Un comando que te va a ahorrar mucho:\*\*  
\>   
\> \`\`\`cmd  
\> pear \--menu  
\> \`\`\`  
\>   
\> Desde la versión 3.2.0 te muestra todos los comandos como una lista filtrable, con  
\> un formulario para las opciones. En vez de memorizar flags, elegís de una lista.  
\> Para vibecoders esto vale oro.  
\>   
\> \#\# Node  
\>   
\> Pear pide \*\*Node ≥ 22.17 y npm ≥ 10.9\*\*, igual que QVAC. Ya lo tenés.  
\>   
\> \#\# La plantilla del track  
\>   
\> El track pide partir de \`hello-pear-bare\`, que es la plantilla de \*\*terminal\*\*  
\> (la otra, \`hello-pear-electron\`, es para aplicaciones de escritorio con ventana).  
\>   
\> \`\`\`cmd  
\> git clone https://github.com/holepunchto/hello-pear-bare  
\> cd hello-pear-bare  
\> npm install  
\> pear touch  
\> \`\`\`  
\>   
\> \`pear touch\` genera tu link de actualización. \*\*Copiá lo que te imprime y pegalo  
\> en el campo \`upgrade\` del \`package.json\`.\*\* La aplicación no arranca sin eso: te  
\> va a tirar \`INVALID\_URL\`. Es el error donde se traba todo el mundo.  
\>   
\> Después:  
\>   
\> \`\`\`cmd  
\> npm start  
\> \`\`\`  
\>   
\> Eso corre en modo desarrollo, con las actualizaciones deshabilitadas.  
\>   
\> \#\# ⚠️ Detalle importante que encontré en la documentación  
\>   
\> \*\*El tutorial oficial de Pear se llama "Build a peer-to-peer chat".\*\* Es el  
\> hola-mundo de la plataforma.  
\>   
\> Esto tiene una consecuencia directa para elegir idea: \*\*si presentan un chat, el  
\> juez —que es el creador de Pear— va a ver el resultado de su propio tutorial.\*\*  
\> Es la peor nota posible en originalidad. Ver la sección de ideas.  
\>   
\> \---  
\>   
\> \# 3 · WDK — mover dólares digitales  
\>   
\> \#\# ⚠️⚠️ Advertencia de seguridad, leela dos veces  
\>   
\> \*\*La guía oficial de inicio de WDK usa Ethereum mainnet y gasta plata de verdad.\*\*  
\> Lo dice textualmente: crea una billetera dedicada, fondeala con lo justo, y  
\> verificá red, dirección y monto antes de mandar. El comando de envío \*\*transmite  
\> de inmediato y es irreversible\*\*, y el CLI no vuelve a pedir confirmación una vez  
\> que la billetera está desbloqueada.  
\>   
\> \*\*Ustedes no van a usar mainnet.\*\* Van a usar una red de prueba con fondos  
\> gratuitos. Y de todos modos:  
\>   
\> \- \*\*Billetera nueva y dedicada. Nunca una personal.\*\* Los paquetes están en beta.  
\> \- \*\*La frase semilla nunca va en un comando, ni en un archivo del proyecto, ni en  
\>   una captura, ni en el chat con un asistente de IA.\*\* La documentación lo aclara  
\>   explícitamente. Si le pegás la semilla a Claude o a cualquier asistente, quedó  
\>   registrada.  
\> \- Poné una contraseña real. El CLI permite dejarla vacía, pero vacía no protege  
\>   nada.  
\>   
\> \#\# Instalar  
\>   
\> \*\*Node 22.18.0 o posterior.\*\* Fijate que es más alto que el que piden QVAC y Pear.  
\> Tu \`v22.20.0\` cumple.  
\>   
\> El comando exacto de la documentación:  
\>   
\> \`\`\`cmd  
\> npm install \-g \--allow-scripts=@tetherto/wdk-cli @tetherto/wdk-cli@1.0.0-beta.2  
\> \`\`\`  
\>   
\> \*\*Dos cosas que no son opcionales:\*\*  
\> \- El \`--allow-scripts\` va sí o sí, no es decorativo.  
\> \- El paquete es \*\*\`@tetherto/wdk-cli\` con la arroba y la barra\*\*. El \`wdk-cli\`  
\>   suelto en npm es un proyecto distinto de otra gente. El documento del track lo  
\>   advierte y es un error fácil de cometer.  
\>   
\> La versión actual es \`1.0.0-beta.2\` y puede cambiar antes de la estable.  
\>   
\> Verificá:  
\>   
\> \`\`\`cmd  
\> wdk \--version  
\> wdk \--help  
\> \`\`\`  
\>   
\> El paquete instala \*\*tres programas\*\*: \`wdk\` (el que usás), \`wdk-mcp\` (el que  
\> conecta con asistentes de IA) y \`wdk-daemon\` (el que mantiene la sesión abierta).  
\>   
\> \#\# El flujo básico, comando por comando  
\>   
\> \*\*Crear una billetera de 12 palabras:\*\*  
\>   
\> \`\`\`cmd  
\> wdk wallet create \--name hackathon \--words 12  
\> \`\`\`  
\>   
\> Te va a pedir una contraseña dos veces (no se ve mientras escribís) y después  
\> \*\*muestra la frase semilla una sola vez\*\*. Anotala en papel. Si es la primera  
\> billetera, queda como predeterminada sola.  
\>   
\> \*\*Desbloquearla por 5 minutos:\*\*  
\>   
\> \`\`\`cmd  
\> wdk wallet unlock \--name hackathon \--ttl 5  
\> \`\`\`  
\>   
\> El tiempo empieza a correr al desbloquear y \*\*no se reinicia con el uso\*\*. Si se  
\> te vence a mitad de algo, desbloqueás de nuevo. Existe \`--ttl 0\` para que no  
\> venza, pero ojo: mientras esté abierta, \*\*cualquier proceso corriendo con tu mismo  
\> usuario del sistema puede usarla sin la contraseña.\*\* Para el hackathon, en tu  
\> propia máquina y con fondos de prueba, es aceptable. Sabelo igual.  
\>   
\> \*\*Ver tu dirección:\*\*  
\>   
\> \`\`\`cmd  
\> wdk get address \--network ethereum \--wallet hackathon  
\> \`\`\`  
\>   
\> \*\*Ver el saldo:\*\*  
\>   
\> \`\`\`cmd  
\> wdk get balance \--network ethereum \--wallet hackathon  
\> \`\`\`  
\>   
\> \*\*Simular un envío sin mandar nada — usá siempre esto primero:\*\*  
\>   
\> \`\`\`cmd  
\> wdk send \--network ethereum \--to DIRECCION \--amount 0.0001 \--wallet hackathon \--dry-run  
\> \`\`\`  
\>   
\> El \`--dry-run\` estima la comisión y te devuelve un resumen \*\*sin transmitir\*\*. Es  
\> tu red de seguridad. Sacás el \`--dry-run\` solo cuando estés seguro.  
\>   
\> \*\*Cerrar la billetera cuando terminás:\*\*  
\>   
\> \`\`\`cmd  
\> wdk wallet lock \--name hackathon  
\> \`\`\`  
\>   
\> O todas: \`wdk wallet lock \--all\`  
\>   
\> \#\# Para el track: red de prueba, no mainnet  
\>   
\> La guía de inicio usa mainnet porque está escrita para gente que va a producción.  
\> Ustedes necesitan una red de prueba con fondos gratis. Está acá:  
\>   
\> \`https://docs.wdk.tether.io/cli/guides/custom-networks/\`  
\>   
\> \*\*Recordá del documento del track:\*\* la testnet de USD₮ \*\*solo existe en Sepolia\*\*.  
\> Para cualquier otra cadena hay que desplegar un token de mentira propio. Si van por  
\> el premio de gasless, \*\*quédense en Sepolia.\*\*  
\>   
\> \#\# Si van a conectarlo con una IA (Portero, y la parte de pagos de Vaquita)  
\>   
\> \`https://docs.wdk.tether.io/cli/guides/use-mcp-server/\`  
\>   
\> Y antes de desbloquear una billetera con fondos, leé el modelo de seguridad:  
\> \`https://docs.wdk.tether.io/cli/reference/security-model/\`  
\>   
\> \#\# Dos páginas que encontré y que son oro para Vaquita  
\>   
\> Estas no las conocía y cambian la conversación:  
\>   
\> \- \*\*\`https://docs.wdk.tether.io/tools/pear-wrk-wdk/\`\*\* — "Run WDK in a Pear  
\>   worklet". \*\*Tether documenta oficialmente cómo correr WDK adentro de Pear.\*\*  
\>   Eso significa que la combinación no es un invento nuestro: está bendecida y  
\>   documentada. Para una idea que use los dos tracks, es lo mejor que podía pasar.  
\> \- \*\*\`https://docs.wdk.tether.io/tools/p2p-address-book/\`\*\* — una libreta de  
\>   direcciones peer-to-peer. Justo el problema de "cómo sé la dirección del que me  
\>   debe plata sin un servidor".  
\>   
\> \*\*Léanlas antes de decidir la idea.\*\* Pueden ahorrar horas de construir algo que  
\> ya existe.  
\>   
\> \#\# Y para móvil  
\>   
\> \- \`https://docs.wdk.tether.io/start-building/react-native-quickstart/\`  
\> \- \`https://docs.wdk.tether.io/ui-kits/react-native-ui-kit/\`  
\>   
\> Hay un kit de interfaz de React Native ya hecho. Si el proyecto termina siendo una  
\> app de teléfono, no arrancan de cero.  
\>   
\> \---  
\>   
\> \# 4 · Lista de verificación  
\>   
\> Cada integrante marca en su máquina. \*\*El objetivo es llegar mañana con todo en  
\> verde.\*\*  
\>   
\> \#\# Base  
\> \- \[ \] \`node \--version\` da 22.18.0 o más  
\> \- \[ \] \`npm \--version\` da 10.9 o más  
\> \- \[ \] Al menos 15 GB libres en disco  
\> \- \[ \] Git instalado (\`git \--version\`)  
\>   
\> \#\# QVAC  
\> \- \[ \] \`vulkaninfo \--summary\` dice \*\*1.4 o más\*\* en instancia y en la GPU  
\> \- \[ \] Carpeta creada, \`npm i @qvac/sdk\` sin errores  
\> \- \[ \] \`qvac.config.json\` creado a mano en la carpeta del proyecto  
\> \- \[ \] \`npx qvac doctor\` sin ningún \`fail\`  
\> \- \[ \] \`node prueba.js\` imprime texto generado  
\> \- \[ \] \*\*Probado OCR con una foto fea de un ticket real\*\*  
\>   
\> \#\# Pear  
\> \- \[ \] WSL instalado (recomendado) o PowerShell listo  
\> \- \[ \] \`pear \--version\` responde  
\> \- \[ \] \`pear \--menu\` abre la lista de comandos  
\> \- \[ \] \`hello-pear-bare\` clonado, \`npm install\` corrido  
\> \- \[ \] \`pear touch\` corrido y el link pegado en \`package.json\`  
\> \- \[ \] \`npm start\` arranca sin \`INVALID\_URL\`  
\>   
\> \#\# WDK  
\> \- \[ \] \`wdk \--version\` responde  
\> \- \[ \] Billetera \*\*de prueba\*\* creada, semilla anotada en papel  
\> \- \[ \] \`wdk wallet unlock\` funciona  
\> \- \[ \] \`wdk get address\` devuelve una dirección  
\> \- \[ \] Red de prueba configurada y con fondos gratuitos  
\> \- \[ \] \`wdk send \--dry-run\` devuelve una estimación  
\>   
\> \#\# Equipo  
\> \- \[ \] Los cuatro inscriptos y aceptados  
\> \- \[ \] Los cuatro con cuenta en DoraHacks  
\> \- \[ \] Los cuatro en el Telegram y en los topics de cada sponsor  
\> \- \[ \] \*\*25 tickets fotografiados feo\*\*  
\> \- \[ \] Roles decididos  
\> \- \[ \] Preguntado en el Telegram si se puede entrar a varios tracks de Tether  
\>   
\> \---  
\>   
\> \# 5 · Errores y qué hacer  
\>   
\> | Síntoma | Causa | Solución |  
\> |---|---|---|  
\> | \`qvac doctor\` da \`fail\` en Vulkan | Driver viejo | Actualizar AMD desde amd.com, reiniciar |  
\> | QVAC no imprime nada | Falta el config o la variable | Crear \`qvac.config.json\` \+ \`set QVAC\_CONFIG\_PATH=./qvac.config.json\` |  
\> | \`Cannot use import outside a module\` | Falta el tipo módulo | \`npm pkg set type=module\` |  
\> | El modelo se cuelga al cargar | Poca RAM libre | Cerrá el navegador. Con 32 GB no debería pasar |  
\> | La descarga del modelo se corta | Timeout corto | Subí \`httpConnectionTimeoutMs\` |  
\> | \`pear\` no existe en una terminal nueva | Falta el \`PATH\` | Seguí lo que imprimió el instalador |  
\> | \`INVALID\_URL\` al arrancar Pear | Link de upgrade placeholder | \`pear touch\` y pegar el resultado en \`package.json\` |  
\> | Las actualizaciones de Pear no llegan y no hay error | En la variante \`daemon\` el error va a otro lado | Mirá \`\<storage\>/updates.log\` |  
\> | \`wdk\` no se instala | Falta \`--allow-scripts\` | Usá el comando exacto de arriba |  
\> | \`wdk\` dice que la billetera está bloqueada | Se venció el TTL | \`wdk wallet unlock\` de nuevo |  
\>   
\> \*\*Páginas oficiales de problemas:\*\*  
\> \- QVAC: \`https://docs.qvac.tether.io/troubleshooting/\`  
\> \- Pear: \`https://docs.pears.com/how-to/troubleshooting/\`  
\> \- WDK: \`https://docs.wdk.tether.io/cli/guides/handle-errors/\`  
\>   
\> \*\*Dónde está el equipo de ingeniería de cada uno:\*\*  
\> \- QVAC y WDK: Discord de Tether Dev  
\> \- WDK también: \`https://discord.gg/arYXDhHB2w\`  
\> \- Pear: \*\*no tiene Discord.\*\* El equipo está en una sala de Keet, y el link está  
\>   en el documento del track.  
\>   
\> \---  
\>   
\> \# 6 · Qué sé y qué no  
\>   
\> Para que sepas cuánto confiar en cada parte de este documento.  
\>   
\> \*\*Verificado hoy contra la documentación oficial:\*\* requisitos de sistema de QVAC,  
\> el quickstart de QVAC, el instalador de Pear y sus requisitos previos, la  
\> instalación del CLI de WDK y todo el flujo de billetera, y las advertencias de  
\> seguridad.  
\>   
\> \*\*No verificado y lo digo:\*\* el código concreto de OCR y multimodal de QVAC, y la  
\> configuración de redes de prueba de WDK. Están linkeados para que los abran  
\> ustedes.  
\>   
\> \*\*Mi límite:\*\* no usé ninguna de las tres. Puedo leer la documentación con  
\> ustedes, diseñar la arquitectura, y depurar errores concretos si me pegan el  
\> mensaje exacto. \*\*Lo que no puedo es decirles de memoria cómo se llama un método.  
\> Si lo hago, desconfíen y verifiquen.\*\*  
\>   
\> Los tres workshops de mañana los dictan las mismas personas que después juzgan, y  
\> los tres prometen que salís con el entorno funcionando. \*\*Son la mejor forma de  
\> cubrir mi límite.\*\*

1\. \`npx qvac doctor\` — el error real  
\`npm error 404 'qvac@\*' is not in this registry\` pasa porque no existe ningún paquete que se llame simplemente \`qvac\` en npm. Vos instalaste \`@qvac/sdk\` (la librería), pero el comando \`qvac doctor\` vive en un paquete separado: \`@qvac/cli\`. Instalarlo:  
cmd

\`\`\`cmd  
npm install \-g @qvac/cli

Donde tengo que ejecutar esto, parado en qué directorio. lo mismo con el de doctor, despues actualicé lo de vulkan ahora tengo la 1.4.

Haceme la guía de instalación de las 3\. Porfaaa  
\`\`\`

Así como estoy ahora

\# Claude — Aug 21, 2026, 11:57 PM

Perfecto, tenés casi todo. La regla que te falta es simple y la pongo al principio del documento.

\*\*File: instalar-las-tres-v2.md\*\*

\`\`\`\`markdown  
\# Guía de instalación — desde donde estás ahora  
\#\#\# QVAC · Pear · WDK en Windows 11  
\*\*Corregida el 22 de agosto de 2026, 00:00\*\*

\> Esta versión reemplaza a la anterior. Corrige dos errores que tenía el documento  
\> viejo y arranca desde el estado real de tu máquina.

\---

\# ⭐ La regla de oro: dónde pararse

Es lo único confuso de todo esto, y una vez que lo entendés no te equivocás más.

| Tipo de comando | Cómo se reconoce | Dónde pararse |  
|---|---|---|  
| \*\*Instalación global\*\* | Tiene \`-g\` | \*\*Donde sea.\*\* No importa. Se instala para toda la máquina |  
| \*\*Comando de proyecto\*\* | Lee o escribe archivos del proyecto | \*\*Adentro de la carpeta del proyecto\*\* |  
| \*\*Instalación local\*\* | \`npm i\` sin \`-g\` | \*\*Adentro de la carpeta del proyecto\*\* |

Aplicado a lo tuyo:

\- \`npm install \-g @qvac/cli\` → \*\*desde donde sea\*\*. Es global.  
\- \`qvac doctor\` → \*\*desde \`C:\\hack\\qvac-pruebas\`\*\*, porque revisa si el proyecto  
  tiene el SDK instalado y busca el \`qvac.config.json\` ahí.  
\- \`wdk\` → \*\*desde donde sea\*\*. Es global y guarda la billetera en tu perfil de  
  usuario, no en una carpeta de proyecto.  
\- \`pear\` → \*\*desde donde sea\*\* para comandos generales; \*\*adentro de la carpeta de  
  la app\*\* para \`pear touch\`, \`npm start\`, etc.

\*\*Regla corta:\*\* si el comando toca tu proyecto, parate en tu proyecto.

\---

\# 📍 Dónde estás parado ahora

Lo que ya resolviste:

\- ✅ Node \`v22.20.0\` y npm \`10.9.3\` — cumple los tres requisitos  
\- ✅ \`C:\\hack\\qvac-pruebas\` creada, \`@qvac/sdk\` instalado  
\- ✅ \`qvac.config.json\` creado a mano en esa carpeta  
\- ✅ \*\*Vulkan actualizado a 1.4\*\* — el bloqueante grande, resuelto  
\- ✅ WDK CLI instalado global (\`added 253 packages\`)  
\- ⚠️ Pear instalado en \`C:\\Users\\Emi\\AppData\\Local\\Programs\\pear\`, pero \*\*falta  
  reiniciar la consola\*\* y el antivirus bloqueó \`npx pear\`

Lo que falta:

\- ❌ \`@qvac/cli\` (el paquete que trae el comando \`qvac\`)  
\- ❌ Correr \`qvac doctor\`  
\- ❌ La primera inferencia  
\- ❌ Verificar Pear después de reiniciar  
\- ❌ Verificar que \`wdk\` responde

\#\# Los dos errores del documento anterior

\*\*Error 1: te dije \`npx qvac doctor\`.\*\* Está mal. No existe ningún paquete llamado  
\`qvac\` a secas en npm — por eso el 404\. El comando \`qvac\` viene en \*\*\`@qvac/cli\`\*\*,  
que es un paquete distinto de \`@qvac/sdk\`. Hay que instalarlo aparte.

\*\*Error 2: creíste que WDK se instaló en el directorio equivocado.\*\* No pasó eso.  
\`npm install \-g\` instala global sin importar desde dónde lo corras. Tu instalación  
salió bien.

\---

\# 1 · QVAC — completar lo que falta

\#\# Paso 1.1 — Instalar la CLI

Abrí \`cmd\`. \*\*No importa dónde estés parado.\*\*

\`\`\`cmd  
npm install \-g @qvac/cli  
\`\`\`

Esto instala el comando \`qvac\` en tu PATH y trae \`@qvac/sdk\` como dependencia de  
arrastre, así que no rompe lo que ya tenías.

\> Si después te dice que \`qvac\` no se reconoce, es lo mismo que te pasó con Pear:  
\> \*\*cerrá y abrí una consola nueva.\*\* El PATH no se relee en consolas ya abiertas.

\#\# Paso 1.2 — El diagnóstico, parado en tu proyecto

\`\`\`cmd  
cd C:\\hack\\qvac-pruebas  
qvac doctor  
\`\`\`

\*\*Acá sí importa el directorio.\*\* El chequeo de "¿el proyecto tiene el SDK?" se  
hace desde donde estás parado. Si lo corrés desde \`C:\\Users\\Emi\`, te va a decir  
que falta el SDK aunque esté instalado.

Fijate que ahora es \`qvac doctor\`, sin el \`npx\`.

Cómo leer el resultado:

| Resultado | Qué hacer |  
|---|---|  
| \`pass\` | Nada |  
| \`warn\` | Nada. Es recomendado, no obligatorio |  
| \`fail\` | \*\*Arreglarlo.\*\* Te imprime la pista de cómo |  
| \`skip\` / \`info\` | Nada |

\*\*Lo que más te interesa mirar: la línea de Vulkan.\*\* Actualizaste el driver y el  
loader dice 1.4.341, así que debería pasar. Si igual tira \`fail\`, pegame la salida  
completa y lo vemos.

Si querés el detalle crudo: \`qvac doctor \--json\`

\#\# Paso 1.3 — La primera inferencia

Parado en \`C:\\hack\\qvac-pruebas\`:

\`\`\`cmd  
notepad prueba.js  
\`\`\`

Pegá esto (del quickstart oficial), guardá y cerrá:

\`\`\`javascript  
import { loadModel, LLAMA\_3\_2\_1B\_INST\_Q4\_0, completion, unloadModel } from '@qvac/sdk';

try {  
  const modelId \= await loadModel({  
    modelSrc: LLAMA\_3\_2\_1B\_INST\_Q4\_0,  
    onProgress: (p) \=\> {  
      const mb \= (n) \=\> (n / 1e6).toFixed(1);  
      process.stderr.write(\`\\rBajando p.percentage.toFixed(0)%({mb(p.downloaded)}/${mb(p.total)} MB)\`);  
      if (p.percentage \>= 100\) process.stderr.write('\\n');  
    }  
  });

  const history \= \[{ role: 'user', content: 'Explicá qué es una factura en una oración' }\];  
  const result \= completion({ modelId, history, stream: true });  
  for await (const token of result.tokenStream) {  
    process.stdout.write(token);  
  }

  await unloadModel({ modelId });  
} catch (error) {  
  console.error('✖', error);  
  process.exit(1);  
}  
\`\`\`

Corrélo, siempre desde \`C:\\hack\\qvac-pruebas\`:

\`\`\`cmd  
set QVAC\_CONFIG\_PATH=./qvac.config.json  
node prueba.js  
\`\`\`

En \`cmd\` la variable va en su propia línea con \`set\`. Si abrís una consola nueva,  
hay que volver a ponerla.

La primera vez baja el modelo. Es el más chico de todos, así que es rápido.  
\*\*Si imprime texto, QVAC funciona y pasaste el gate del track.\*\*

\#\# Paso 1.4 — El servidor compatible con OpenAI (opcional pero muy recomendado)

Este atajo puede ahorrarles horas mañana. Con \`@qvac/cli\` ya instalado:

Creá una carpeta nueva y un \`qvac.config.json\` que declare qué modelo servir —  
la estructura está en \`https://docs.qvac.tether.io/cli/http-server/\`. Después:

\`\`\`cmd  
qvac serve openai  
\`\`\`

Levanta un servidor local que habla el mismo idioma que la API de OpenAI. Cualquier  
herramienta que ya sepa usar OpenAI le habla a tu modelo local \*\*cambiando una  
sola dirección\*\*. El sponsor aclara que esto \*\*cuenta como inferencia local\*\* y  
califica para el track.

\#\# Paso 1.5 — El momento de la verdad: leer una foto

Todas las ideas necesitan sacar texto de una imagen. Está en:

\- \`https://docs.qvac.tether.io/ai-capabilities/ocr/\`  
\- \`https://docs.qvac.tether.io/ai-capabilities/multimodal/\`

\*\*No te copio código porque no lo verifiqué.\*\* Entrá, copiá el ejemplo tal cual, y  
probalo con \*\*una foto de un ticket real sacada con el celular, torcida y con poca  
luz\*\*. No con una imagen limpia.

Si un ticket arrugado sale legible, Vaquita, Ventanilla y el Banco de pruebas son  
viables. Si sale ilegible, lo sabés esta noche y no mañana a las dos de la tarde.

\---

\# 2 · Pear — destrabarlo

\#\# Paso 2.1 — Reiniciar

Los dos problemas que tuviste se resuelven con lo mismo:

\- \`pear no se reconoce\` → el instalador te dijo \*"restart your shell"\* porque  
  agregó la carpeta al PATH. PowerShell ya abierto no relee esa variable.  
\- \`Error: spawn UNKNOWN\` en \`npx pear\` → tu diagnóstico es razonable: ese error  
  aparece cuando algo bloquea la creación de un proceso hijo, y te saltó el aviso  
  del antivirus justo ahí.

\*\*Reiniciá la PC.\*\* Entran los dos cambios de una: el PATH y lo que haya quedado  
pendiente del driver de Vulkan.

\#\# Paso 2.2 — El antivirus

En vez de desactivarlo entero, \*\*agregá una exclusión\*\* para:

\`\`\`  
C:\\Users\\Emi\\AppData\\Local\\Programs\\pear  
\`\`\`

En Seguridad de Windows → Protección antivirus → Administrar la configuración →  
Exclusiones → Agregar una exclusión → Carpeta.

Es más seguro que apagarlo, y mañana vas a estar bajando y ejecutando cosas todo  
el día.

\#\# Paso 2.3 — Verificar

Consola nueva, \*\*desde donde sea\*\*:

\`\`\`cmd  
pear \--version  
\`\`\`

Si responde, ya está. Usá el \`pear\` instalado, \*\*no \`npx pear\`\*\* — el que  
instalaste es un ejecutable propio y no necesita npm en el medio.

Y probá esto, que te va a ahorrar mucho:

\`\`\`cmd  
pear \--menu  
\`\`\`

Te muestra todos los comandos como lista filtrable con formulario para las  
opciones, en vez de tener que memorizar flags. Para vibecoders vale oro.

\#\# Paso 2.4 — Sobre WSL: ahora mismo, no

La documentación de Pear dice en sus requisitos previos que hace falta una terminal  
estilo POSIX —macOS, Linux o Windows con WSL—, y por eso te lo recomendé antes.  
\*\*Pero ya tenés el ejecutable de Windows instalado y funcionando.\*\*

Mi consejo ahora: \*\*probá con Windows nativo primero.\*\* Instalar WSL, configurarlo  
y reinstalar todo adentro son horas que no tenés. Dejá WSL como plan B: si algo de  
Pear se comporta raro mañana, ahí sí lo instalás.

\#\# Paso 2.5 — La plantilla del track

Cuando \`pear \--version\` responda:

\`\`\`cmd  
cd C:\\hack  
git clone https://github.com/holepunchto/hello-pear-bare  
cd hello-pear-bare  
npm install  
pear touch  
\`\`\`

\`pear touch\` te imprime un link de actualización. \*\*Copialo y pegalo en el campo  
\`upgrade\` del \`package.json\`\*\* de esa carpeta:

\`\`\`cmd  
notepad package.json  
\`\`\`

Sin eso, la app no arranca: tira \`INVALID\_URL\`. Es el error donde se traba todo el  
mundo, y los propios docs lo avisan.

Después, siempre parado en \`C:\\hack\\hello-pear-bare\`:

\`\`\`cmd  
npm start  
\`\`\`

Eso corre en modo desarrollo, con las actualizaciones deshabilitadas.

\---

\# 3 · WDK — verificar lo que ya instalaste

\#\# Paso 3.1 — Comprobar

\*\*Desde donde sea:\*\*

\`\`\`cmd  
wdk \--version  
wdk \--help  
\`\`\`

Si responden, está todo bien y no hay nada que reinstalar. Tu \`added 253 packages\`  
indica que la instalación salió limpia.

El paquete te dejó tres programas: \`wdk\` (el que vas a usar), \`wdk-mcp\` (para  
conectar asistentes de IA) y \`wdk-daemon\` (mantiene la sesión de la billetera).

\#\# Paso 3.2 — ⚠️ Leé esto antes de crear la billetera

\*\*La guía oficial de inicio usa Ethereum mainnet y gasta plata de verdad.\*\* El  
comando de envío transmite de inmediato, es irreversible, y el CLI \*\*no vuelve a  
pedir confirmación\*\* una vez que la billetera está desbloqueada.

Reglas para ustedes:

\- \*\*Billetera nueva y dedicada.\*\* Nunca una personal. Los paquetes están en beta.  
\- \*\*La frase semilla va en papel.\*\* Nunca en un comando, ni en un archivo del  
  proyecto, ni en una captura, \*\*ni en el chat con un asistente de IA\*\* — si me la  
  pegás a mí o a cualquier otro, quedó registrada. La documentación lo aclara  
  explícitamente.  
\- \*\*Contraseña real.\*\* El CLI te deja dejarla vacía, pero vacía no protege nada.  
\- \*\*Usá siempre \`--dry-run\` primero.\*\*

\#\# Paso 3.3 — Crear la billetera

\*\*Desde donde sea\*\* (se guarda en tu perfil de usuario, no en una carpeta de  
proyecto):

\`\`\`cmd  
wdk wallet create \--name hackathon \--words 12  
\`\`\`

Te pide contraseña dos veces —no se ve mientras escribís— y después \*\*muestra la  
frase semilla una sola vez\*\*. Anotala en papel ahí mismo.

\#\# Paso 3.4 — El flujo básico

\`\`\`cmd  
wdk wallet unlock \--name hackathon \--ttl 5  
\`\`\`

Se desbloquea por 5 minutos. El tiempo \*\*no se reinicia con el uso\*\*: si se vence  
a mitad de algo, volvés a desbloquear.

\`\`\`cmd  
wdk get address \--network ethereum \--wallet hackathon  
wdk get balance \--network ethereum \--wallet hackathon  
\`\`\`

\*\*Simular un envío sin mandar nada — hacé esto siempre antes de mandar:\*\*

\`\`\`cmd  
wdk send \--network ethereum \--to DIRECCION \--amount 0.0001 \--wallet hackathon \--dry-run  
\`\`\`

Estima la comisión y devuelve un resumen \*\*sin transmitir nada\*\*. Sacás el  
\`--dry-run\` solo cuando estés completamente seguro.

\*\*Cerrar cuando terminás:\*\*

\`\`\`cmd  
wdk wallet lock \--name hackathon  
\`\`\`

\#\# Paso 3.5 — Red de prueba

Para el hackathon necesitás una red de prueba con fondos gratis, no mainnet:

\`https://docs.wdk.tether.io/cli/guides/custom-networks/\`

\*\*Recordá:\*\* la testnet de USD₮ \*\*solo existe en Sepolia\*\*. Si van por el premio  
de gasless, quédense ahí.

\#\# Paso 3.6 — Dos páginas que valen oro para Vaquita

\- \`https://docs.wdk.tether.io/tools/pear-wrk-wdk/\` — \*\*Tether documenta  
  oficialmente cómo correr WDK adentro de Pear.\*\* La combinación no es un invento  
  nuestro: está bendecida y hay guía.  
\- \`https://docs.wdk.tether.io/tools/p2p-address-book/\` — libreta de direcciones  
  peer-to-peer, que resuelve el "¿cómo sé la dirección del que me debe plata sin  
  un servidor?".

\---

\# 4 · Mapa de carpetas

Para que no te pierdas entre las tres:

\`\`\`  
C:\\hack\\  
├── qvac-pruebas\\          ← QVAC. Acá corrés qvac doctor y node prueba.js  
│   ├── package.json  
│   ├── qvac.config.json  
│   ├── prueba.js  
│   └── node\_modules\\  
│  
├── hello-pear-bare\\       ← Pear. Acá corrés pear touch y npm start  
│   ├── package.json       ← acá va el link de pear touch  
│   └── node\_modules\\  
│  
└── (WDK no tiene carpeta: es global y guarda todo en tu perfil de usuario)  
\`\`\`

\---

\# 5 · Los comandos, en orden, con su directorio

Copiá esto tal cual. \*\*Reiniciá la PC antes de empezar.\*\*

\`\`\`cmd  
:: \--- QVAC \---  
npm install \-g @qvac/cli  
cd C:\\hack\\qvac-pruebas  
qvac doctor  
set QVAC\_CONFIG\_PATH=./qvac.config.json  
node prueba.js

:: \--- Pear (después del reinicio y la exclusión del antivirus) \---  
pear \--version  
cd C:\\hack  
git clone https://github.com/holepunchto/hello-pear-bare  
cd hello-pear-bare  
npm install  
pear touch  
:: pegar el link en el campo "upgrade" del package.json  
npm start

:: \--- WDK \---  
wdk \--version  
wdk wallet create \--name hackathon \--words 12  
wdk wallet unlock \--name hackathon \--ttl 5  
wdk get address \--network ethereum \--wallet hackathon  
\`\`\`

\---

\# 6 · Lista de verificación

\#\# Base  
\- \[x\] \`node \--version\` ≥ 22.18 — tenés 22.20.0  
\- \[x\] \`npm \--version\` ≥ 10.9 — tenés 10.9.3  
\- \[x\] Espacio en disco — tenés 774 GB  
\- \[ \] \`git \--version\` responde

\#\# QVAC  
\- \[x\] Vulkan 1.4 o más  
\- \[x\] \`@qvac/sdk\` instalado en el proyecto  
\- \[x\] \`qvac.config.json\` creado  
\- \[ \] \`npm install \-g @qvac/cli\`  
\- \[ \] \`qvac doctor\` sin ningún \`fail\`, \*\*parado en el proyecto\*\*  
\- \[ \] \`node prueba.js\` imprime texto  
\- \[ \] \*\*OCR probado con una foto fea de un ticket real\*\*

\#\# Pear  
\- \[ \] PC reiniciada  
\- \[ \] Exclusión del antivirus para la carpeta de pear  
\- \[ \] \`pear \--version\` responde  
\- \[ \] \`hello-pear-bare\` clonado e instalado  
\- \[ \] \`pear touch\` corrido y link pegado en \`package.json\`  
\- \[ \] \`npm start\` arranca sin \`INVALID\_URL\`

\#\# WDK  
\- \[x\] Instalado global  
\- \[ \] \`wdk \--version\` responde  
\- \[ \] Billetera de prueba creada, semilla \*\*en papel\*\*  
\- \[ \] \`wdk get address\` devuelve una dirección  
\- \[ \] Red de prueba configurada  
\- \[ \] \`wdk send \--dry-run\` devuelve una estimación

\#\# Equipo  
\- \[ \] Los cuatro inscriptos y aceptados  
\- \[ \] Los cuatro con cuenta en DoraHacks  
\- \[ \] Los cuatro en el Telegram y en los topics de cada sponsor  
\- \[ \] \*\*25 tickets fotografiados feo\*\*  
\- \[ \] Audio de una reunión falsa grabado (si van por Testigo)  
\- \[ \] Roles decididos  
\- \[ \] Preguntado en el Telegram si se puede entrar a varios tracks de Tether

\---

\# 7 · Errores y qué hacer

| Síntoma | Causa | Solución |  
|---|---|---|  
| \`404 'qvac@\*' is not in this registry\` | Falta \`@qvac/cli\` | \`npm install \-g @qvac/cli\` |  
| \`qvac\` no se reconoce después de instalarlo | PATH no releído | Cerrá y abrí la consola |  
| \`qvac doctor\` dice que falta el SDK | Estás parado en la carpeta equivocada | \`cd C:\\hack\\qvac-pruebas\` |  
| QVAC no imprime nada | Falta la variable | \`set QVAC\_CONFIG\_PATH=./qvac.config.json\` |  
| \`Cannot use import outside a module\` | Falta el tipo módulo | \`npm pkg set type=module\` |  
| \`spawn UNKNOWN\` | Antivirus bloqueando el proceso hijo | Exclusión de carpeta \+ reiniciar |  
| \`pear\` no se reconoce | PATH no releído | Consola nueva, o reiniciar |  
| \`INVALID\_URL\` al arrancar Pear | Link placeholder | \`pear touch\` y pegar en \`package.json\` |  
| Actualizaciones de Pear que no llegan, sin error visible | En la variante \`daemon\` el error va a otro archivo | Mirá \`\<storage\>/updates.log\` |  
| \`wdk\` dice que la billetera está bloqueada | Se venció el TTL | \`wdk wallet unlock\` de nuevo |

\*\*Páginas oficiales de problemas:\*\*  
\- QVAC: \`https://docs.qvac.tether.io/troubleshooting/\`  
\- Pear: \`https://docs.pears.com/how-to/troubleshooting/\`  
\- WDK: \`https://docs.wdk.tether.io/cli/guides/handle-errors/\`

\*\*Dónde está el equipo de ingeniería:\*\*  
\- QVAC y WDK: Discord de Tether Dev · WDK también en \`https://discord.gg/arYXDhHB2w\`  
\- Pear: \*\*no tiene Discord.\*\* El equipo está en una sala de Keet, link en el  
  documento del track

\---

\# 8 · Qué está verificado y qué no

\*\*Verificado hoy contra la documentación oficial:\*\* requisitos de sistema de QVAC,  
que el comando \`qvac\` viene en \`@qvac/cli\` y que se instala global, que \`qvac  
doctor\` resuelve el SDK desde el directorio de trabajo, el quickstart de QVAC, el  
instalador de Pear, la instalación del CLI de WDK y todo el flujo de billetera,  
y las advertencias de seguridad de WDK.

\*\*No verificado, y lo digo:\*\* el código concreto de OCR y multimodal de QVAC, la  
configuración exacta de redes de prueba de WDK, y la estructura del  
\`qvac.config.json\` para el servidor OpenAI. Los tres están linkeados.

\*\*Mi límite:\*\* no usé ninguna de las tres. Puedo leer la documentación con ustedes,  
diseñar la arquitectura y depurar errores concretos si me pegan el mensaje exacto.  
\*\*Lo que no puedo es decirles de memoria cómo se llama un método. Si lo hago,  
desconfíen.\*\*

Los tres workshops de mañana los dictan las mismas personas que después juzgan, y  
prometen que salís con el entorno funcionando.

\`\`\`\`

Ahí está la guía corregida, arrancando desde tu estado real.

\*\*La respuesta directa a tu pregunta:\*\*

\`npm install \-g @qvac/cli\` → \*\*desde donde sea.\*\* El \`-g\` significa global: se instala para toda la máquina, no para una carpeta. Podés estar en \`C:\\Users\\Emi\` o donde estés parado.

\`qvac doctor\` → \*\*desde \`C:\\hack\\qvac-pruebas\`.\*\* Acá sí importa, y este es el detalle que casi nadie sabe: uno de los chequeos que hace es "¿este proyecto tiene el SDK instalado?", y lo busca desde el directorio donde estás parado. Si lo corrés desde otro lado te va a decir que falta el SDK aunque esté perfectamente instalado.

\*\*La regla corta, que sirve para las tres tecnologías:\*\* si el comando toca tu proyecto, parate en tu proyecto. Si tiene \`-g\`, da igual dónde estés.

Y ojo con un detalle: ahora es \`qvac doctor\` a secas, \*\*sin el \`npx\`\*\*. El \`npx\` era justamente lo que causaba el 404, porque intentaba bajar un paquete llamado \`qvac\` que no existe.

Dos cosas más que corregí del documento anterior. Primero, lo de WDK: \*\*no te equivocaste de directorio\*\*, tu instalación salió bien. Lo único que falta es verificar con \`wdk \--version\` desde cualquier lado. Segundo, cambié la recomendación sobre WSL: te lo había sugerido porque la documentación de Pear lo pide, pero \*\*ya tenés el ejecutable de Windows instalado\*\*. Instalar WSL y reconfigurar todo adentro son horas que no tenés. Probá con Windows nativo y dejá WSL como plan B si algo se comporta raro mañana.

Para el antivirus, en vez de apagarlo entero agregá una exclusión de carpeta para \`C:\\Users\\Emi\\AppData\\Local\\Programs\\pear\`. Mañana vas a estar bajando y ejecutando cosas todo el día, conviene tenerlo prendido.

El orden que te conviene: \*\*reiniciá la PC primero\*\* — entran de una el PATH de Pear y lo que haya quedado pendiente del driver de Vulkan — y después seguís la lista de comandos de la sección 5, que está en orden y con el directorio de cada uno.

Cuando corras \`qvac doctor\`, pegame la salida completa. Con eso confirmamos si Vulkan quedó del todo resuelto y si podés pasar a la primera inferencia.

\# Human — Aug 22, 2026, 12:14 AM

\> \*\*Attachment: attachment · txt · 7.3 KB\*\*  
\>  
\> Microsoft Windows \[Versión 10.0.26200.9168\]  
\> (c) Microsoft Corporation. Todos los derechos reservados.  
\>   
\> C:\\Users\\Emi\>npm install \-g @qvac/cli  
\>   
\> added 280 packages in 1m  
\>   
\> 39 packages are looking for funding  
\>   run \`npm fund\` for details  
\>   
\> C:\\Users\\Emi\>cd C:\\hack\\qvac-pruebas  
\>   
\> C:\\hack\\qvac-pruebas\>qvac doctor  
\> 🩺 QVAC doctor  
\>   
\>   Host: win32-x64, Node 22.20.0  
\>   
\> Runtime:  
\>   ✅ Node.js version — v22.20.0  
\>   ✅ CLI host — win32-x64  
\>   
\> Hardware:  
\>   ✅ Total RAM — 31.12 GB  
\>   ✅ Available RAM — 17.05 GB  
\>   ✅ GPU acceleration — Vulkan: AMD Radeon(TM) 880M Graphics  
\>   ✅ Free disk space (C:\\hack\\qvac-pruebas) — 713.25 GB  
\>   
\> Deploy targets (SDK):  
\>   ✅ Desktop — darwin-arm64, darwin-x64, linux-arm64, linux-x64, win32-x64 (native)  
\>   ⚠️  Android (android-arm64) — adb not found  
\>       Install Android platform tools to deploy QVAC apps to Android devices: https://developer.android.com/tools/releases/platform-tools  
\>   ℹ️  iOS (ios-arm64 \+ simulators) — requires macOS host  
\>       iOS apps can only be built/deployed from a macOS host with Xcode installed.  
\>   
\> Optional tools:  
\>   ⚠️  ffmpeg — not found  
\>       Install ffmpeg to use transcription / microphone examples (https://ffmpeg.org/download.html).  
\>   ⚠️  Bare runtime — not found  
\>       Install bare-runtime only if you target the Bare runtime directly (npm i \-g bare-runtime).  
\>   ⚠️  Bun — not found  
\>       Install Bun only if you build the SDK from source (https://bun.sh).  
\>   
\> Project:  
\>   ✅ @qvac/sdk resolvable from project — v0.17.1  
\>   
\> ✅ All required checks passed.  
\>   
\> C:\\hack\\qvac-pruebas\>notepad prueba.js  
\>   
\> C:\\hack\\qvac-pruebas\>set QVAC\_CONFIG\_PATH=./qvac.config.json  
\>   
\> C:\\hack\\qvac-pruebas\>node prueba.js  
\> ✖ Error: spawn UNKNOWN  
\>     at ChildProcess.spawn (node:internal/child\_process:420:11)  
\>     at Object.spawn (node:child\_process:787:9)  
\>     at spawn (C:\\hack\\qvac-pruebas\\node\_modules\\bare-runtime\\lib\\spawn.js:31:28)  
\>     at Server.\<anonymous\> (file:///C:/hack/qvac-pruebas/node\_modules/@qvac/sdk/dist/client/rpc/node-rpc-client.js:342:34)  
\>     at Object.onceWrapper (node:events:633:28)  
\>     at Server.emit (node:events:519:28)  
\>     at emitListeningNT (node:net:1983:10)  
\>     at process.processTicksAndRejections (node:internal/process/task\_queues:89:21) {  
\>   errno: \-4094,  
\>   code: 'UNKNOWN',  
\>   syscall: 'spawn'  
\> }  
\>   
\> C:\\hack\\qvac-pruebas\>node prueba.js  
\> \[sdk:client\] 📦 Initializing SDK config  
\> \[sdk:client\] 📱 Runtime context: { runtime: 'node', platform: 'win32' }  
\> \[sdk:server\] Console output enabled  
\> \[sdk:server\] HTTP download concurrency set to: 3  
\> \[sdk:client\] ✅ Initialization complete  
\> \[sdk:server\] \[request-lifecycle\] begin requestId=c41783f6-6941-4d34-9e37-1255b56647d5 kind=loadModel modelId=- state=running  
\> \[sdk:server\] Loading from registry: unsloth/Llama-3.2-1B-Instruct-GGUF/blob/b69aef112e9f895e6f98d7ae0949f72ff09aa401/Llama-3.2-1B-Instruct-Q4\_0.gguf  
\> \[sdk:server\] ­ƒöù Creating new registry client...  
\> \[sdk:server\] Ô£à Registry client ready  
\> \[sdk:server\] ­ƒôÑ Downloading blob directly: Llama-3.2-1B-Instruct-Q4\_0.gguf  
\> \[QVACRegistryClient\] \[INFO\] Downloading blob directly {  
\>   coreKey: '4035e6638834...',  
\>   blockOffset: 168716,  
\>   blockLength: 11796,  
\>   byteLength: 773025824  
\> }  
\> Bajando 100% (773.0/773.0 MB)  
\> Bajando 100% (773.0/773.0 MB)  
\> Bajando 100% (773.0/773.0 MB)  
\> Bajando 100% (773.0/773.0 MB)  
\> Bajando 100% (773.0/773.0 MB)  
\> \[QVACRegistryClient\] \[INFO\] Cleared blob blocks from corestore { start: 168716, end: 180512, blocks: 0 }  
\> \[QVACRegistryClient\] \[INFO\] Blob download complete (direct)  
\> \[sdk:server\] Ô£à Downloaded to C:\\Users\\Emi\\.qvac\\models\\f2bade0bc5cd4a8c\_Llama-3.2-1B-Instruct-Q4\_0.gguf  
\> \[sdk:server\] Ô£à Checksum validated for Llama-3.2-1B-Instruct-Q4\_0.gguf  
\> \[sdk:server\] Loaded Model to C:\\Users\\Emi\\.qvac\\models\\f2bade0bc5cd4a8c\_Llama-3.2-1B-Instruct-Q4\_0.gguf  
\> Bajando 100% (773.0/773.0 MB)  
\> \[sdk:server\] llamacpp-completion: Loading model bd4db59fb4120b52...  
\> \[llamacpp-completion\] Starting model load  
\> \[llamacpp-completion\] Creating addon with configuration: {  
\>   path: 'C:\\\\Users\\\\Emi\\\\.qvac\\\\models\\\\f2bade0bc5cd4a8c\_Llama-3.2-1B-Instruct-Q4\_0.gguf',  
\>   projectionPath: '',  
\>   config: {  
\>     ctx\_size: '1024',  
\>     gpu\_layers: '99',  
\>     device: 'gpu',  
\>     image\_tile\_mode: 'sequential'  
\>   }  
\> }  
\> \[llamacpp-completion\] Activating addon  
\> \[sdk:client\] 🪦 Bare worker exited post-handshake (code=3221225477, signal=null)  
\> ✖ WORKER\_CRASHED: Bare worker exited mid-request (code=3221225477, signal=null) — in-flight calls were aborted  
\>     at handlePostHandshakeExit (file:///C:/hack/qvac-pruebas/node\_modules/@qvac/sdk/dist/client/rpc/node-rpc-client.js:268:28)  
\>     at ChildProcess.\<anonymous\> (file:///C:/hack/qvac-pruebas/node\_modules/@qvac/sdk/dist/client/rpc/node-rpc-client.js:382:25)  
\>     at ChildProcess.emit (node:events:519:28)  
\>     at ChildProcess.\_handle.onexit (node:internal/child\_process:293:12) {  
\>   code: 50205,  
\>   cause: undefined,  
\>   exitCode: 3221225477,  
\>   exitSignal: null  
\> }  
\>   
\> C:\\hack\\qvac-pruebas\>qvac serve openai  
\> ffmpeg not on PATH — /v1/videos/{id}/content defaults to video/avi and /v1/audio/speech rejects mp3/opus/aac/flac. Install ffmpeg to serve those. See: qvac doctor  
\> (node:22624) \[FSTDEP023\] FastifyDeprecation: disableRequestLogging option is deprecated. Use the logController option with disableRequestLogging or isLogDisabled override instead. The disableRequestLogging top-level option will be removed in \`fastify@6\`.  
\> (Use \`node \--trace-warnings ...\` to show where the warning was created)  
\> No models configured for preload.  
\> responses: in-memory only — IDs expire on restart, max 256 entries, 60m TTL  
\> videos: in-memory only — job IDs and rendered bytes are lost on restart, max 256 entries  
\> QVAC API server listening on http://127.0.0.1:11434  
\>   
\> Endpoints:  
\>   ├── /openapi.json (GET, HEAD)  
\>   ├── /v1/audio/transcriptions (POST)  
\>   ├── /v1/audio/translations (POST)  
\>   ├── /v1/audio/speech (POST)  
\>   ├── /v1/audio/voices (GET, HEAD)  
\>   ├── /v1/audio/models (GET, HEAD)  
\>   ├── /v1/chat/completions (POST)  
\>   ├── /v1/completions (POST)  
\>   ├── /v1/embeddings (POST)  
\>   ├── /v1/files (POST, GET, HEAD)  
\>   │   └── /:id (GET, HEAD)  
\>   │       └── /content (GET, HEAD)  
\>   ├── /v1/images/generations (POST)  
\>   ├── /v1/images/edits (POST)  
\>   ├── /v1/models (GET, HEAD)  
\>   │   └── /:id (GET, HEAD, DELETE)  
\>   ├── /v1/responses (POST)  
\>   │   └── /:id (GET, HEAD, DELETE)  
\>   │       └── /input\_items (GET, HEAD)  
\>   ├── /v1/vector\_stores (GET, HEAD, POST)  
\>   │   └── /:id (GET, HEAD, POST, DELETE)  
\>   │       ├── /search (POST)  
\>   │       └── /files (POST)  
\>   └── /v1/videos (POST, GET, HEAD)  
\>       └── /:id (GET, HEAD, DELETE)  
\>           └── /content (GET, HEAD)  
\>   
\>   
\> C:\\hack\\qvac-pruebas\>npm i \-g bare-runtime  
\>   
\> added 33 packages in 29s  
\>   
\> C:\\hack\\qvac-pruebas\>node prueba.js  
\> ✖ RPC\_INIT\_TIMEOUT: RPC initialization timed out after 30000ms — the worker process may have failed to start  
\>     at Timeout.\_onTimeout (file:///C:/hack/qvac-pruebas/node\_modules/@qvac/sdk/dist/client/rpc/node-rpc-client.js:317:20)  
\>     at listOnTimeout (node:internal/timers:588:17)  
\>     at process.processTimers (node:internal/timers:523:7) {  
\>   code: 50204,  
\>   cause: undefined  
\> }  
\>   
\> C:\\hack\\qvac-pruebas\>

\> \*\*Attachment: attachment · txt · 5.4 KB\*\*  
\>  
\> Microsoft Windows \[Versión 10.0.26200.9168\]  
\> (c) Microsoft Corporation. Todos los derechos reservados.  
\>   
\> C:\\Users\\Emi\>pear \--version  
\> x Unrecognized Flag: \--version  
\>   
\> pear \[flags\] \[command\]  
\>   
\> Flags:  
\>   \-v                       Print version  
\>   \--log-level|-L \<level\>   Verbosity to log at ÔÇö 0=off, 1=error, 2=info, or 3=trace  
\>   \--help|-h                Show help  
\>   
\> Commands:  
\>   touch                    Generate a project link  
\>   seed                     Seed or reseed a project  
\>   stage                    Sync disk changes into project  
\>   build                    Create project deployment folder  
\>   provision                Block-sync source & production  
\>   multisig                 Production signing coordination  
\>   info                     View project information  
\>   dump                     Synchronize files from a link to a directory  
\>   install                  Install applications from peers  
\>   data                     Explore platform database  
\>   changelog                View project changelog  
\>   sidecar                  Advanced. Run sidecar in terminal  
\>   gc                       Advanced. Clear dangling resources  
\>   cores                    List platform cores  
\>   versions                 View dependency versions  
\>   help                     View help for command  
\>   
\>   
\> C:\\Users\\Emi\>pear \--menu  
\>   
\> C:\\Users\\Emi\>cd C:\\hack  
\>   
\> C:\\hack\>git clone https://github.com/holepunchto/hello-pear-bare  
\> Cloning into 'hello-pear-bare'...  
\> remote: Enumerating objects: 447, done.  
\> remote: Counting objects: 100% (160/160), done.  
\> remote: Compressing objects: 100% (72/72), done.  
\> remote: Total 447 (delta 124), reused 104 (delta 88), pack-reused 287 (from 1\)  
\> Receiving objects: 100% (447/447), 243.99 KiB | 2.10 MiB/s, done.  
\> Resolving deltas: 100% (209/209), done.  
\>   
\> C:\\hack\>cd hello-pear-bare  
\>   
\> C:\\hack\\hello-pear-bare\>npm install  
\>   
\> added 199 packages, and audited 200 packages in 41s  
\>   
\> 2 packages are looking for funding  
\>   run \`npm fund\` for details  
\>   
\> found 0 vulnerabilities  
\>   
\> C:\\hack\\hello-pear-bare\>pear touch  
\> pear://3mtqyaui5ew6mormjiruzfimr3we7dm1n5cfeoufxfo5egyar5ay  
\>   
\> C:\\hack\\hello-pear-bare\>notepad package.json  
\>   
\> C:\\hack\\hello-pear-bare\>npm start  
\>   
\> \> hello-pear-bare@0.0.0-rc.0 start  
\> \> bare bin.mjs \--no-updates  
\>   
\> Updates: disabled  
\>   
\> CLI ready. Press Ctrl+C to stop.  
\>   
\> Application storage: C:\\Users\\Emi\\AppData\\Local\\Temp\\pear\\hello-pear-bare\\app-storage  
\> Hello from worker  
\> ¿Desea terminar el trabajo por lotes (S/N)? s  
\>   
\> C:\\hack\\hello-pear-bare\>wdk \--version  
\> @tetherto/wdk-cli                        v1.0.0-beta.2  
\>   @tetherto/wdk                          v1.0.0-beta.6  
\>   @tetherto/wdk-asset-registry           v1.0.0-beta.2  
\>   @tetherto/wdk-protocol-fiat-moonpay    v1.0.0-beta.2  
\>   @tetherto/wdk-utils                    v1.0.0-beta.11  
\>   @tetherto/wdk-wallet                   v1.0.0-beta.7  
\>   @tetherto/wdk-wallet-btc               v1.0.0-beta.8  
\>   @tetherto/wdk-wallet-evm               v1.0.0-beta.11  
\>   @tetherto/wdk-wallet-evm-erc-4337      v1.0.0-beta.6  
\>   @tetherto/wdk-wallet-solana            v1.0.0-beta.7  
\>   @tetherto/wdk-wallet-spark             v1.0.0-beta.17  
\>   @tetherto/wdk-wallet-tron              v1.0.0-beta.9  
\>   
\> C:\\hack\\hello-pear-bare\>wdk \--help  
\> Usage: wdk \[options\] \[command\]  
\>   
\> CLI tool for Wallet Development Kit (WDK)  
\>   
\> Options:  
\>   \-V, \--version     output the version number  
\>   \--json            Output as JSON  
\>   \--verbose         Show error stack traces  
\>   \-h, \--help        display help for command  
\>   
\> Commands:  
\>   wallet            Manage wallets, keys, and sessions  
\>   get               Query wallet address, balance, and transaction history  
\>   send \[options\]    Send tokens (native, ERC-20, SPL, TRC-20, ...)  
\>   buy \[options\]     Buy crypto with fiat via on-ramp provider  
\>   sell \[options\]    Sell crypto for fiat via off-ramp provider  
\>   config \[options\]  Manage CLI configuration  
\>   network           Manage blockchain networks  
\>   token             Manage token registry entries  
\>   mcp               Manage WDK MCP server  
\>   help \[command\]    display help for command  
\>   
\> C:\\hack\\hello-pear-bare\>wdk wallet create \--name hackathon \--words 12  
\> Enter a passphrase to encrypt your seed phrase. Remember the passphrase to unlock this wallet in the future.  
\>   
\> √ Passphrase (empty for none):  
\> √ Confirm passphrase:  
\> √ Seed phrase encrypted and stored as 'hackathon'.  
\>   
\> WARNING: Store this seed phrase safely. Do not share it with anyone.  
\>   
\> Seed phrase:  
\>   
\>   tissue diesel goat actress airport daring record wet rocket copper resist canal  
\>   
\>   Set as default wallet.  
\>   
\> C:\\hack\\hello-pear-bare\>wdk wallet unlock \--name hackathon \--ttl 5  
\> √ Enter passphrase of 'hackathon' wallet to unlock:  
\> √ Wallet 'hackathon' unlocked  
\>   
\>   Session locks after 5 minutes  
\>   Run \`wdk wallet lock \--name hackathon\` to end session  
\>   
\>   
\> C:\\hack\\hello-pear-bare\>wdk get address \--network ethereum \--wallet hackathon  
\>   
\>   Network: Ethereum (ETH)  
\>   Index:   0  
\>   Address: 0x46Af95b8D54334b76140Ce9B9C27B1f80F0b1736  
\>   
\>   
\> C:\\hack\\hello-pear-bare\>wdk get balance \--network ethereum \--wallet hackathon  
\>   
\>   Ethereum (ETH) (index: 0\)  
\>   Balance: 0 ETH  
\>   
\>   
\> C:\\hack\\hello-pear-bare\>wdk send \--network ethereum \--to DIRECCION \--amount 0.0001 \--wallet hackathon \--dry-run  
\> Error: Invalid recipient address for 'ethereum' (INVALID\_FORMAT).  
\> Hint: Double-check the address and the selected \--network.  
\>   
\> C:\\hack\\hello-pear-bare\>wdk wallet lock \--name hackathon  
\>   
\>   Wallet 'hackathon' locked  
\>   
\>   
\> C:\\hack\\hello-pear-bare\>

Porfa copiá el código que tengas a partir de una cita de la página oficial sobre lo de leer una foto, me voy a encargar de llevar para la hackaton el ejemplo de un ticket o recibo para ver como funciona. 

Esto es clave: Paso 3.6 — Dos páginas que valen oro para Vaquita

\* \`https://docs.wdk.tether.io/tools/pear-wrk-wdk/\` — Tether documenta oficialmente cómo correr WDK adentro de Pear. La combinación no es un invento nuestro: está bendecida y hay guía.  
\* \`https://docs.wdk.tether.io/tools/p2p-address-book/\` — libreta de direcciones peer-to-peer, que resuelve el "¿cómo sé la dirección del que me debe plata sin un servidor?".

Paso 1.5 — El momento de la verdad: leer una foto  
Todas las ideas necesitan sacar texto de una imagen. Está en:

\* \`https://docs.qvac.tether.io/ai-capabilities/ocr/\`  
\* \`https://docs.qvac.tether.io/ai-capabilities/multimodal/\`

No te copio código porque no lo verifiqué. Entrá, copiá el ejemplo tal cual, y probalo con una foto de un ticket real sacada con el celular, torcida y con poca luz. No con una imagen limpia.  
Si un ticket arrugado sale legible, Vaquita, Ventanilla y el Banco de pruebas son viables. Si sale ilegible, lo sabés esta noche y no mañana a las dos de la tarde.

Acá no me falles.

Y luego así quedaron las instalaciones: Aramame el documento uniendo la v1 y la v2 de instalar las 3, con una versión en windows y otra en mac, todo con comandos de la terminal. Para que mis amigos en sus computadoras puedan instalarlo si quieren hacer las pruebas. Fijate que problema me sale con el motor de ia local de qvac

\# Claude — Aug 22, 2026, 12:17 AM

Antes que nada, algo urgente.

\*\*Pegaste tu frase semilla en el chat.\*\* Esas doce palabras están ahora en un registro de conversación. Esa billetera hay que darla por comprometida: no le mandes fondos reales nunca, ni la reutilices después del hackathon. Creá otra con \`wdk wallet create \--name hack2 \--words 12\` y \*\*esa semilla no la escribas en ningún lado digital\*\*. Para fondos de prueba la actual sirve igual, pero que quede claro cuál es cuál.

Ahora voy a buscar el código de OCR y la causa del crash.

Tengo el código de OCR. Ahora la causa del crash, que es lo que te está frenando.

El troubleshooting oficial no cubre tu crash. Busco la configuración para forzar CPU, que es mi hipótesis.

Encontré la causa. Te la explico y después te dejo el documento unificado.

\#\# El crash de QVAC: está intentando usar la GPU

Mirá esta línea de tu log, es la clave:

\`\`\`  
config: { ctx\_size: '1024', gpu\_layers: '99', device: 'gpu', ... }  
\[llamacpp-completion\] Activating addon  
🪦 Bare worker exited post-handshake (code=3221225477)  
\`\`\`

El código \`3221225477\` es \`0xC0000005\` en hexadecimal: \*\*violación de acceso a memoria\*\* en Windows. Un segfault. Y ocurre exactamente al activar el addon con \`device: 'gpu'\` y \`gpu\_layers: '99'\` — o sea, mandando las 99 capas del modelo a tu Radeon 880M por Vulkan.

\`qvac doctor\` te dio verde en GPU porque Vulkan \*\*existe\*\* y responde. Pero que exista no garantiza que la ruta de inferencia funcione en una gráfica integrada. Es un crash del backend, no un problema de tu instalación.

\*\*La solución es forzar CPU.\*\* Con Ryzen 9 y 32 GB, para un modelo de 1B ni vas a notar la diferencia.

Ojo con un camino que parece la solución y no lo es: la opción \`deviceDefaults\` del \`qvac.config.json\` \*\*solo acepta \`platform: "android" | "ios"\`\*\* según la tabla oficial. No sirve para Windows. Hay que pasarlo por código.

\`\`\`javascript  
const modelId \= await loadModel({  
  modelSrc: LLAMA\_3\_2\_1B\_INST\_Q4\_0,  
  modelConfig: { device: 'cpu' },  
  onProgress: (p) \=\> { /\* ... \*/ }  
});  
\`\`\`

Que \`device: "cpu"\` es un campo válido de configuración para modelos \`llm\` está confirmado en la documentación de configuración, donde aparece textualmente como \`"llm": { "device": "cpu", "ctx\_size": 1024 }\`. Lo que \*\*no\*\* verifiqué es que \`modelConfig\` en \`loadModel()\` acepte exactamente esa forma — confirmalo en \`https://docs.qvac.tether.io/reference/api/\#loadmodel\` antes de pelearte si falla.

\*\*Y desinstalá \`bare-runtime\`.\*\* Fijate que después de instalarlo el error cambió de crash a \`RPC\_INIT\_TIMEOUT\`: eso huele a choque de versiones con el Bare que el SDK ya trae. El propio \`doctor\` lo lista como opcional, solo para quien apunta a Bare directamente. No es tu caso.

\`\`\`cmd  
npm uninstall \-g bare-runtime  
\`\`\`

\*\*Lo bueno:\*\* el modelo ya se descargó y validó (773 MB en \`C:\\Users\\Emi\\.qvac\\models\\\`), y \`qvac serve openai\` \*\*arrancó perfecto\*\* en el puerto 11434\. Eso último es importante: el servidor levantó sin tocar la ruta que crashea.

\#\# El código de OCR, de la página oficial

Acá está, tal cual la documentación. Este es el que te importa:

\`\`\`javascript  
import { close, loadModel, ocr, OCR\_LATIN, unloadModel } from '@qvac/sdk';  
import path from 'path';  
import { fileURLToPath } from 'url';

const \_\_dirname \= path.dirname(fileURLToPath(import.meta.url));  
const imagePath \= process.argv\[2\] || path.join(\_\_dirname, 'image/basic\_test.bmp');

try {  
    console.log('▸ Loading OCR model...');  
    const modelId \= await loadModel({  
        modelSrc: OCR\_LATIN,  
        modelConfig: {  
            langList: \['en'\],  
            magRatio: 1.5,  
            defaultRotationAngles: \[90, 180, 270\],  
            contrastRetry: false,  
            lowConfidenceThreshold: 0.5,  
            recognizerBatchSize: 1  
        }  
    });  
    console.log(\`▸ Model loaded successfully\! Model ID: ${modelId}\`);

    console.log(\`\\n▸ Running OCR on: ${imagePath}\`);  
    const { blocks } \= ocr({  
        modelId,  
        image: imagePath,  
        options: { paragraph: false }  
    });  
    const result \= await blocks;

    console.log('\\n▸ OCR Results:');  
    for (const block of result) {  
        console.log(block.text);  
        if (block.bbox) console.log(\`▸ BBox: \[${block.bbox.join(', ')}\]\`);  
        if (block.confidence \!== undefined) console.log(\`▸ Confidence: ${block.confidence}\`);  
    }

    await unloadModel({ modelId, clearStorage: false });  
    process.exit(0);  
} catch (error) {  
    console.error('✖', error);  
    await close();  
}  
\`\`\`

Tres cosas que hacen la diferencia y que salen de la misma página:

\*\*OCR no usa llamacpp, usa ONNX runtime.\*\* Es un motor distinto del que te está crasheando. Puede que el OCR funcione aunque el modelo de texto siga fallando — \*\*probalo aunque el otro no ande.\*\*

\*\*Devuelve \`confidence\` por bloque.\*\* Ese campo es directamente el "mostrá incertidumbre" que el sponsor premia. Si un ítem del ticket viene con confianza baja, lo pintás en amarillo y pedís confirmación. Es la Parte 4 del documento de ideas, resuelta por la librería.

\*\*Ese \`defaultRotationAngles: \[90, 180, 270\]\` es para tickets torcidos.\*\* Y \`magRatio\` y \`contrastRetry\` son las perillas para fotos con poca luz. Si tu ticket sale mal, esos tres parámetros son lo primero que hay que tocar. \`langList: \['en'\]\` probablemente lo quieras en \`\['es'\]\` o \`\['en','es'\]\` — el modelo es \`OCR\_LATIN\`, alfabeto latino.

Se corre pasándole la imagen como argumento: \`node ocr.js C:\\hack\\tickets\\ticket1.jpg\`

Ahora armo el documento unificado con Windows y Mac.

\*\*File: instalar-qvac-pear-wdk.md\*\*

\`\`\`\`markdown  
\# Instalar QVAC · Pear · WDK  
\#\#\# Guía unificada — Windows 11 y macOS  
\*\*22 de agosto de 2026 · reemplaza a las versiones anteriores\*\*

\> Para pasarle a todo el equipo. Cada uno corre lo de su sistema operativo.  
\> Todos los comandos salen de la documentación oficial. Lo que no verifiqué, lo digo.

\---

\# ⭐ La regla de oro: dónde pararse

| Tipo de comando | Cómo se reconoce | Dónde pararse |  
|---|---|---|  
| \*\*Instalación global\*\* | Tiene \`-g\` | \*\*Donde sea\*\* |  
| \*\*Comando de proyecto\*\* | Lee o escribe archivos del proyecto | \*\*Adentro de la carpeta del proyecto\*\* |  
| \*\*Instalación local\*\* | \`npm i\` sin \`-g\` | \*\*Adentro de la carpeta del proyecto\*\* |

\*\*Regla corta: si el comando toca tu proyecto, parate en tu proyecto.\*\*

Casos concretos:  
\- \`npm install \-g @qvac/cli\` → donde sea  
\- \`qvac doctor\` → \*\*en la carpeta del proyecto\*\* (chequea si el SDK está resuelto desde ahí)  
\- \`wdk\` → donde sea (guarda la billetera en tu perfil de usuario)  
\- \`pear touch\`, \`npm start\` → en la carpeta de la app

\#\# Mapa de carpetas

\`\`\`  
Windows                          macOS  
C:\\hack\\                         \~/hack/  
├── qvac-pruebas\\                ├── qvac-pruebas/  
│   ├── package.json             │   ├── package.json  
│   ├── qvac.config.json         │   ├── qvac.config.json  
│   ├── prueba.js                │   ├── prueba.js  
│   ├── ocr.js                   │   ├── ocr.js  
│   └── tickets\\                 │   └── tickets/  
├── hello-pear-bare\\             ├── hello-pear-bare/  
└── (WDK es global, sin carpeta) └── (WDK es global)  
\`\`\`

\---

\# 🔴 El problema que ya encontramos: QVAC crashea con la GPU

\*\*Si te pasa esto, la causa está identificada.\*\* Síntoma:

\`\`\`  
config: { ctx\_size: '1024', gpu\_layers: '99', device: 'gpu', ... }  
\[llamacpp-completion\] Activating addon  
🪦 Bare worker exited post-handshake (code=3221225477)  
✖ WORKER\_CRASHED  
\`\`\`

\*\*Qué significa:\*\* \`3221225477\` es \`0xC0000005\`, violación de acceso a memoria en  
Windows. Crashea justo al activar el addon mandando 99 capas a la GPU por Vulkan.  
En una gráfica \*\*integrada\*\* (Radeon 880M y similares) esa ruta puede romper aunque  
\`qvac doctor\` diga que Vulkan está bien: que Vulkan exista no garantiza que la  
inferencia por GPU funcione.

\#\# La solución: forzar CPU

En la llamada a \`loadModel()\`, agregá \`modelConfig: { device: 'cpu' }\`.

Con un Ryzen 9 o un Apple Silicon y un modelo de 1B, la diferencia de velocidad es  
despreciable.

\> ⚠️ \*\*Un camino que parece la solución y no lo es:\*\* la opción \`deviceDefaults\`  
\> del \`qvac.config.json\` \*\*solo acepta \`platform: "android" | "ios"\`\*\* según la  
\> tabla oficial de \`DeviceMatch\`. No sirve para forzar CPU en Windows ni en Mac.  
\> Va por código.  
\>  
\> Que \`device: "cpu"\` es válido para modelos \`llm\` está confirmado: la doc de  
\> configuración lo muestra como \`"llm": { "device": "cpu", "ctx\_size": 1024 }\`.  
\> Lo que \*\*no verifiqué\*\* es la forma exacta de \`modelConfig\` en \`loadModel()\`.  
\> Si falla, mirá \`https://docs.qvac.tether.io/reference/api/\#loadmodel\`.

\#\# Y desinstalá \`bare-runtime\` si lo instalaste

Si lo instalaste global y el error cambió de crash a \`RPC\_INIT\_TIMEOUT\`, es choque  
de versiones con el Bare que el SDK ya trae. \`qvac doctor\` lo lista como  
\*\*opcional\*\*, solo para quien apunta a Bare directamente.

\`\`\`  
npm uninstall \-g bare-runtime  
\`\`\`

\---

\# 🪟 WINDOWS 11

\#\# W1 · Requisitos previos

\`\`\`cmd  
node \--version  
npm \--version  
git \--version  
\`\`\`

Necesitás \*\*Node ≥ 22.18\*\* (es el más alto de los tres: WDK lo pide) y \*\*npm ≥ 10.9\*\*.  
Si falta: \`winget install OpenJS.NodeJS.LTS\` y \*\*abrí una consola nueva\*\*.

Espacio en disco: dejá 15 GB libres.

\#\# W2 · Vulkan — obligatorio, incluso para CPU

\*\*En Windows, QVAC exige Vulkan ≥ 1.4 aunque uses solo el procesador.\*\* Está en la  
tabla de plataformas soportadas.

\`\`\`cmd  
vulkaninfo \--summary  
\`\`\`

Si el comando no existe, instalá el Vulkan SDK desde \`https://vulkan.lunarg.com\` y  
reintentá. Mirá \`Vulkan Instance Version\`: tiene que decir \*\*1.4 o más\*\*.

\*\*Si dice 1.3:\*\* actualizá el driver de la placa desde la web del fabricante  
(AMD: \`https://www.amd.com/en/support\`) — \*\*no por Windows Update\*\*, que trae  
versiones viejas — y reiniciá.

\> El aviso \`Registry lookup failed to get layer manifest files\` es normal, ignoralo.

\#\# W3 · QVAC

\`\`\`cmd  
:: 1\. La CLI, global — desde donde sea  
npm install \-g @qvac/cli

:: 2\. El proyecto  
mkdir C:\\hack\\qvac-pruebas  
cd C:\\hack\\qvac-pruebas  
npm init \-y  
npm pkg set type=module  
npm i @qvac/sdk  
\`\`\`

\*\*El archivo de configuración hay que crearlo a mano.\*\* No viene con la instalación:

\`\`\`cmd  
notepad qvac.config.json  
\`\`\`

Decile que sí a crear el archivo, pegá esto, guardá y cerrá:

\`\`\`json  
{  
  "loggerLevel": "info",  
  "loggerConsoleOutput": true,  
  "httpDownloadConcurrency": 3,  
  "httpConnectionTimeoutMs": 10000  
}  
\`\`\`

Sin esto \*\*el SDK no imprime absolutamente nada\*\* y depurás a ciegas.

\*\*El diagnóstico, parado en el proyecto:\*\*

\`\`\`cmd  
qvac doctor  
\`\`\`

\`pass\` bien · \`warn\` ignorá · \`fail\` arreglar · \`skip\`/\`info\` ignorá.  
Es \`qvac doctor\`, \*\*sin \`npx\`\*\* — con \`npx\` da 404 porque no existe un paquete  
llamado \`qvac\` a secas.

\*\*La primera inferencia:\*\*

\`\`\`cmd  
notepad prueba.js  
\`\`\`

\`\`\`javascript  
import { loadModel, LLAMA\_3\_2\_1B\_INST\_Q4\_0, completion, unloadModel } from '@qvac/sdk';

try {  
  const modelId \= await loadModel({  
    modelSrc: LLAMA\_3\_2\_1B\_INST\_Q4\_0,  
    modelConfig: { device: 'cpu' },        // \<-- evita el crash de GPU integrada  
    onProgress: (p) \=\> {  
      const mb \= (n) \=\> (n / 1e6).toFixed(1);  
      process.stderr.write(\`\\rBajando p.percentage.toFixed(0)%({mb(p.downloaded)}/${mb(p.total)} MB)\`);  
      if (p.percentage \>= 100\) process.stderr.write('\\n');  
    }  
  });

  const history \= \[{ role: 'user', content: 'Explicá qué es una factura en una oración' }\];  
  const result \= completion({ modelId, history, stream: true });  
  for await (const token of result.tokenStream) process.stdout.write(token);

  await unloadModel({ modelId });  
} catch (error) {  
  console.error('✖', error);  
  process.exit(1);  
}  
\`\`\`

\`\`\`cmd  
set QVAC\_CONFIG\_PATH=./qvac.config.json  
node prueba.js  
\`\`\`

En \`cmd\` la variable va en línea aparte con \`set\`, y se pierde al cerrar la consola.

El modelo se guarda en \`C:\\Users\\\<vos\>\\.qvac\\models\\\` — se baja una sola vez.

\#\# W4 · Pear

\`\`\`powershell  
:: En PowerShell, no en cmd  
irm https://install.pears.com/pear.ps1 | iex  
\`\`\`

\*\*Después de instalar, reiniciá la consola\*\* — el instalador agrega la carpeta al  
PATH y las consolas abiertas no lo releen.

⚠️ \*\*Si te sale \`Error: spawn UNKNOWN\`, es el antivirus\*\* bloqueando la creación  
del proceso hijo. En vez de desactivarlo, agregá una \*\*exclusión de carpeta\*\* para  
\`C:\\Users\\\<vos\>\\AppData\\Local\\Programs\\pear\` en Seguridad de Windows → Protección  
antivirus → Exclusiones.

\`\`\`cmd  
pear \-v  
pear \--menu  
\`\`\`

⚠️ \*\*Es \`pear \-v\`, no \`pear \--version\`.\*\* El flag largo no existe: te devuelve  
\`Unrecognized Flag\`. Y usá el \`pear\` instalado, \*\*no \`npx pear\`\*\*.

\`pear \--menu\` (3.2.0+) te muestra todos los comandos como lista filtrable con  
formulario para las opciones. Para vibecoders vale oro.

\*\*La plantilla del track:\*\*

\`\`\`cmd  
cd C:\\hack  
git clone https://github.com/holepunchto/hello-pear-bare  
cd hello-pear-bare  
npm install  
pear touch  
\`\`\`

\`pear touch\` imprime algo como \`pear://3mtqyaui5ew6...\`. \*\*Copialo y pegalo en el  
campo \`upgrade\` del \`package.json\`:\*\*

\`\`\`cmd  
notepad package.json  
\`\`\`

Sin eso la app no arranca: tira \`INVALID\_URL\`. Es donde se traba todo el mundo.

\`\`\`cmd  
npm start  
\`\`\`

Tiene que imprimir \`CLI ready\` y \`Hello from worker\`. Para salir, \`Ctrl+C\` y  
después \`s\` cuando pregunte si terminar el trabajo por lotes.

\> \*\*Sobre WSL:\*\* la doc de Pear pide terminal POSIX y recomienda WSL. Pero si el  
\> ejecutable de Windows te funciona, \*\*no pierdas horas instalando WSL\*\*. Dejalo  
\> como plan B.

\#\# W5 · WDK

⚠️ \*\*Antes de nada: la guía oficial de WDK usa Ethereum mainnet y gasta plata de  
verdad.\*\* El envío es irreversible y el CLI no vuelve a confirmar una vez que la  
billetera está desbloqueada. Ustedes usan red de prueba.

\*\*Reglas que no se negocian:\*\*  
\- Billetera nueva y dedicada. Nunca una personal. Los paquetes están en beta.  
\- \*\*La frase semilla va en papel.\*\* Nunca en un comando, un archivo, una captura,  
  \*\*ni en el chat con un asistente de IA\*\* — si la pegás ahí, quedó registrada.  
\- Contraseña real. El CLI te deja dejarla vacía, pero vacía no protege nada.  
\- \`--dry-run\` siempre antes de mandar.

\`\`\`cmd  
npm install \-g \--allow-scripts=@tetherto/wdk-cli @tetherto/wdk-cli@1.0.0-beta.2  
\`\`\`

El \`--allow-scripts\` no es decorativo. Y el paquete es \*\*\`@tetherto/wdk-cli\` con  
scope\*\* — el \`wdk-cli\` suelto en npm es otro proyecto distinto.

\`\`\`cmd  
wdk \--version  
wdk \--help  
\`\`\`

Instala tres binarios: \`wdk\`, \`wdk-mcp\` y \`wdk-daemon\`.

\*\*El flujo básico — desde donde sea:\*\*

\`\`\`cmd  
wdk wallet create \--name hackathon \--words 12  
wdk wallet unlock \--name hackathon \--ttl 5  
wdk get address \--network ethereum \--wallet hackathon  
wdk get balance \--network ethereum \--wallet hackathon  
wdk wallet lock \--name hackathon  
\`\`\`

El \`--ttl 5\` son 5 minutos y \*\*no se reinicia con el uso\*\*.

\*\*Simular sin mandar — hacelo siempre primero.\*\* Reemplazá \`0xTU\_DIRECCION\` por  
una dirección real; con el texto \`DIRECCION\` da \`INVALID\_FORMAT\`:

\`\`\`cmd  
wdk send \--network ethereum \--to 0xTU\_DIRECCION \--amount 0.0001 \--wallet hackathon \--dry-run  
\`\`\`

\*\*Red de prueba:\*\* \`https://docs.wdk.tether.io/cli/guides/custom-networks/\`  
La testnet de USD₮ \*\*solo existe en Sepolia\*\*.

\---

\# 🍎 macOS

\#\# M1 · Requisitos previos

QVAC pide \*\*macOS 14.0+ en arm64\*\* (Apple Silicon). En Mac la aceleración es Metal  
y viene siempre: \*\*no hay que instalar Vulkan ni nada.\*\* Es el camino más limpio de  
los dos sistemas.

\> En Mac Intel (x64) solo hay inferencia por CPU, y la aceleración por gráficos  
\> Intel no está soportada. Funciona, pero más lento.

\`\`\`bash  
node \--version  
npm \--version  
git \--version  
\`\`\`

Si falta Node:

\`\`\`bash  
brew install node  
\`\`\`

Sin Homebrew: \`/bin/bash \-c "$(curl \-fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"\`

\#\# M2 · QVAC

\`\`\`bash  
\# 1\. La CLI, global — desde donde sea  
npm install \-g @qvac/cli

\# 2\. El proyecto  
mkdir \-p \~/hack/qvac-pruebas  
cd \~/hack/qvac-pruebas  
npm init \-y  
npm pkg set type=module  
npm i @qvac/sdk  
\`\`\`

\*\*El archivo de configuración, a mano:\*\*

\`\`\`bash  
cat \> qvac.config.json \<\< 'EOF'  
{  
  "loggerLevel": "info",  
  "loggerConsoleOutput": true,  
  "httpDownloadConcurrency": 3,  
  "httpConnectionTimeoutMs": 10000  
}  
EOF  
\`\`\`

\`\`\`bash  
qvac doctor  
\`\`\`

\*\*La primera inferencia:\*\* creá \`prueba.js\` con el mismo código de la sección W3.

En Mac \*\*probá primero sin\*\* \`modelConfig: { device: 'cpu' }\` — Metal suele  
funcionar bien y vas a tener el modelo acelerado. Si crashea, agregalo.

\`\`\`bash  
QVAC\_CONFIG\_PATH=./qvac.config.json node prueba.js  
\`\`\`

En Mac la variable va \*\*en la misma línea\*\*, no con \`set\`.

Modelo en \`\~/.qvac/models/\`.

\*\*Herramienta opcional que conviene:\*\* si van por transcripción de audio (idea  
Testigo), \`brew install ffmpeg\`. \`qvac doctor\` lo marca como faltante si no está.

\#\# M3 · Pear

\`\`\`bash  
curl https://install.pears.com/pear.sh | sh  
\`\`\`

Seguí las instrucciones de \`PATH\` que imprime el instalador, después:

\`\`\`bash  
source \~/.zshrc    \# o abrí una terminal nueva  
pear \-v  
pear \--menu  
\`\`\`

En Mac no hay problema de antivirus. Si macOS bloquea el binario por Gatekeeper,  
va a aparecer en Configuración → Privacidad y seguridad, con un botón para  
permitirlo.

\`\`\`bash  
cd \~/hack  
git clone https://github.com/holepunchto/hello-pear-bare  
cd hello-pear-bare  
npm install  
pear touch  
\# pegar el link en el campo "upgrade" del package.json  
nano package.json  
npm start  
\`\`\`

\#\# M4 · WDK

Las mismas advertencias de seguridad de la sección W5. Leelas.

\`\`\`bash  
npm install \-g \--allow-scripts=@tetherto/wdk-cli @tetherto/wdk-cli@1.0.0-beta.2  
wdk \--version  
\`\`\`

Los comandos de billetera son idénticos a Windows.

\---

\# 📸 OCR — leer un ticket

\*\*Esto es lo que decide si Vaquita, Ventanilla y el Banco de pruebas son viables.\*\*

\#\# Dos cosas importantes antes de correrlo

\*\*OCR usa ONNX runtime, no llamacpp.\*\* Es un motor distinto del que crashea con la  
GPU. \*\*Probá el OCR aunque el modelo de texto te esté fallando\*\* — puede andar  
igual.

\*\*Devuelve \`confidence\` por bloque.\*\* Ese campo es directamente el "mostrá  
incertidumbre" que el sponsor premia. Si un ítem del ticket viene con confianza  
baja, lo pintás en amarillo y pedís confirmación humana.

\#\# El código, de la documentación oficial

Creá \`ocr.js\` en la carpeta del proyecto:

\`\`\`javascript  
import { close, loadModel, ocr, OCR\_LATIN, unloadModel } from '@qvac/sdk';  
import path from 'path';  
import { fileURLToPath } from 'url';

const \_\_dirname \= path.dirname(fileURLToPath(import.meta.url));  
const imagePath \= process.argv\[2\] || path.join(\_\_dirname, 'image/basic\_test.bmp');

try {  
    console.log('▸ Loading OCR model...');  
    const modelId \= await loadModel({  
        modelSrc: OCR\_LATIN,  
        modelConfig: {  
            langList: \['en'\],  
            magRatio: 1.5,  
            defaultRotationAngles: \[90, 180, 270\],  
            contrastRetry: false,  
            lowConfidenceThreshold: 0.5,  
            recognizerBatchSize: 1  
        }  
    });  
    console.log(\`▸ Model loaded successfully\! Model ID: ${modelId}\`);

    console.log(\`\\n▸ Running OCR on: ${imagePath}\`);  
    const { blocks } \= ocr({  
        modelId,  
        image: imagePath,  
        options: {  
            paragraph: false  
        }  
    });  
    const result \= await blocks;

    console.log('\\n▸ OCR Results:');  
    console.log('▸ \================================');  
    for (const block of result) {  
        console.log(block.text);  
        if (block.bbox) {  
            console.log(\`▸ BBox: \[${block.bbox.join(', ')}\]\`);  
        }  
        if (block.confidence \!== undefined) {  
            console.log(\`▸ Confidence: ${block.confidence}\`);  
        }  
    }  
    console.log('\\n▸ \================================');

    await unloadModel({ modelId, clearStorage: false });  
    process.exit(0);  
}  
catch (error) {  
    console.error('✖', error);  
    await close();  
}  
\`\`\`

\#\# Cómo correrlo con tu ticket

\`\`\`cmd  
:: Windows  
mkdir C:\\hack\\qvac-pruebas\\tickets  
node ocr.js C:\\hack\\qvac-pruebas\\tickets\\ticket1.jpg  
\`\`\`

\`\`\`bash  
\# Mac  
mkdir \-p \~/hack/qvac-pruebas/tickets  
node ocr.js \~/hack/qvac-pruebas/tickets/ticket1.jpg  
\`\`\`

\#\# Las perillas para tickets feos

Si el ticket sale mal leído, estos son los tres parámetros a tocar, en orden:

| Parámetro | Para qué | Qué probar |  
|---|---|---|  
| \`langList\` | Idioma del texto | Cambiá a \`\['es'\]\` o \`\['en','es'\]\`. El modelo \`OCR\_LATIN\` es alfabeto latino |  
| \`defaultRotationAngles\` | Tickets torcidos | Ya está en \`\[90, 180, 270\]\`. Es lo que salva las fotos mal encuadradas |  
| \`magRatio\` | Ampliación antes de leer | Subilo a \`2\` o \`2.5\` para letra chica o fotos de lejos |  
| \`contrastRetry\` | Reintento con más contraste | Ponelo en \`true\` para fotos con poca luz |  
| \`lowConfidenceThreshold\` | Umbral de "no estoy seguro" | Bajalo a \`0.3\` para que devuelva más texto dudoso, subilo a \`0.7\` para solo lo confiable |

\#\# El protocolo de prueba de esta noche

1\. Juntá 25 tickets: billetera, cajón de la cocina, pedile a tu familia.  
2\. Sacales fotos \*\*malas a propósito\*\*: torcidas, con poca luz, arrugadas, con el  
   pulgar tapando una esquina.  
3\. Corré \`ocr.js\` sobre 5 de las peores.  
4\. \*\*Anotá qué porcentaje de ítems y precios sale bien.\*\*

\*\*Si sale legible:\*\* Vaquita, Ventanilla y el Banco de pruebas son todas viables.  
\*\*Si sale ilegible:\*\* lo sabés esta noche y no mañana a las dos de la tarde. Cambiás  
a Portero (WDK) o a Testigo (transcripción de audio, que es otro camino dentro del  
mismo track).

\---

\# ✅ Lista de verificación

\#\# Base  
\- \[ \] Node ≥ 22.18 · npm ≥ 10.9 · git  
\- \[ \] 15 GB libres

\#\# QVAC  
\- \[ \] \*\*Windows:\*\* \`vulkaninfo \--summary\` dice 1.4 o más  
\- \[ \] \*\*Mac:\*\* nada que hacer, Metal viene incluido  
\- \[ \] \`npm install \-g @qvac/cli\`  
\- \[ \] Proyecto creado con \`type=module\` y \`@qvac/sdk\`  
\- \[ \] \`qvac.config.json\` creado \*\*a mano\*\*  
\- \[ \] \`qvac doctor\` sin ningún \`fail\`, \*\*parado en el proyecto\*\*  
\- \[ \] \`node prueba.js\` imprime texto (con \`device: 'cpu'\` si crashea)  
\- \[ \] \*\*\`node ocr.js\` sobre 5 fotos feas de tickets reales\*\*

\#\# Pear  
\- \[ \] \`pear \-v\` responde (¡\`-v\`, no \`--version\`\!)  
\- \[ \] Windows: exclusión del antivirus si dio \`spawn UNKNOWN\`  
\- \[ \] \`hello-pear-bare\` clonado e instalado  
\- \[ \] \`pear touch\` corrido y link pegado en \`package.json\`  
\- \[ \] \`npm start\` imprime \`CLI ready\` sin \`INVALID\_URL\`

\#\# WDK  
\- \[ \] \`wdk \--version\` responde  
\- \[ \] Billetera de prueba creada, \*\*semilla en papel\*\*  
\- \[ \] \`wdk get address\` devuelve una dirección  
\- \[ \] \`wdk send \--dry-run\` con una dirección real devuelve estimación  
\- \[ \] Red de prueba configurada

\#\# Equipo  
\- \[ \] Los cuatro inscriptos, aceptados y con cuenta en DoraHacks  
\- \[ \] Los cuatro en el Telegram y en los topics de cada sponsor  
\- \[ \] \*\*25 tickets fotografiados feo\*\*  
\- \[ \] Audio de una reunión falsa grabado (si van por Testigo)  
\- \[ \] Roles decididos  
\- \[ \] Preguntado si se puede entrar a varios tracks de Tether

\---

\# 🔧 Errores y qué hacer

| Síntoma | Causa | Solución |  
|---|---|---|  
| \`404 'qvac@\*' is not in this registry\` | Falta \`@qvac/cli\` | \`npm install \-g @qvac/cli\` (sin \`npx\`) |  
| \`qvac\` no se reconoce tras instalarlo | PATH no releído | Consola nueva |  
| \`qvac doctor\` dice que falta el SDK | Parado en la carpeta equivocada | \`cd\` al proyecto |  
| \*\*\`WORKER\_CRASHED code=3221225477\`\*\* | \*\*GPU integrada \+ Vulkan\*\* | \*\*\`modelConfig: { device: 'cpu' }\`\*\* |  
| \`RPC\_INIT\_TIMEOUT\` después de instalar bare-runtime | Choque de versiones | \`npm uninstall \-g bare-runtime\` |  
| QVAC no imprime nada | Falta la variable de config | \`set QVAC\_CONFIG\_PATH=...\` (Win) o inline (Mac) |  
| \`Cannot use import outside a module\` | Falta el tipo módulo | \`npm pkg set type=module\` |  
| \`spawn UNKNOWN\` | Antivirus (Windows) | Exclusión de carpeta \+ reiniciar |  
| \`pear \--version\` → \`Unrecognized Flag\` | El flag largo no existe | \`pear \-v\` |  
| \`INVALID\_URL\` al arrancar Pear | Link placeholder | \`pear touch\` y pegar en \`package.json\` |  
| Actualizaciones de Pear que no llegan, sin error | En la variante \`daemon\` el error va a otro archivo | \`\<storage\>/updates.log\` |  
| \`wdk send\` → \`INVALID\_FORMAT\` | Dirección de ejemplo, no real | Poné una dirección \`0x...\` verdadera |  
| Billetera bloqueada | Se venció el TTL | \`wdk wallet unlock\` de nuevo |

\*\*Páginas oficiales:\*\*  
\- QVAC: \`https://docs.qvac.tether.io/troubleshooting/\`  
\- Pear: \`https://docs.pears.com/how-to/troubleshooting/\`  
\- WDK: \`https://docs.wdk.tether.io/cli/guides/handle-errors/\`

\*\*Equipos de ingeniería:\*\* QVAC y WDK en el Discord de Tether Dev  
(\`https://discord.gg/arYXDhHB2w\` para WDK) · Pear \*\*no tiene Discord\*\*, está en una  
sala de Keet cuyo link figura en el documento del track.

\---

\# 📚 Páginas que valen oro para las ideas

\- \`https://docs.wdk.tether.io/tools/pear-wrk-wdk/\` — \*\*Tether documenta  
  oficialmente cómo correr WDK adentro de Pear.\*\* La combinación no es un invento  
  nuestro: está bendecida y hay guía.  
\- \`https://docs.wdk.tether.io/tools/p2p-address-book/\` — libreta de direcciones  
  peer-to-peer. Resuelve el "¿cómo sé la dirección del que me debe plata sin un  
  servidor?".  
\- \`https://docs.qvac.tether.io/cli/http-server/\` — servidor compatible con OpenAI.  
  Cualquier herramienta que ya sepa hablar con OpenAI le habla a tu modelo local  
  cambiando una dirección. \*\*El sponsor aclara que cuenta como inferencia local.\*\*  
\- \`https://docs.qvac.tether.io/ai-capabilities/transcription/\` — transcripción,  
  para la idea Testigo.  
\- \`https://docs.wdk.tether.io/start-building/react-native-quickstart/\` y  
  \`https://docs.wdk.tether.io/ui-kits/react-native-ui-kit/\` — si el producto  
  termina siendo una app de teléfono.

\---

\# ℹ️ Qué está verificado y qué no

\*\*Verificado hoy contra la documentación oficial:\*\* requisitos de sistema de QVAC  
para Windows, Mac, Linux y móvil; que \`qvac\` viene en \`@qvac/cli\` y se instala  
global; que \`qvac doctor\` resuelve el SDK desde el directorio de trabajo; el  
quickstart de QVAC; \*\*el ejemplo completo de OCR\*\*; el esquema de configuración y  
que \`deviceDefaults\` solo matchea Android e iOS; el instalador de Pear y sus  
requisitos; la instalación del CLI de WDK y el flujo completo de billetera.

\*\*No verificado, y lo digo:\*\* que \`modelConfig: { device: 'cpu' }\` sea la forma  
exacta aceptada por \`loadModel()\` — confirmalo en la referencia de API. Y la  
configuración de redes de prueba de WDK.

\*\*Mi límite:\*\* no usé ninguna de las tres. Leo la documentación con ustedes, diseño  
la arquitectura y depuro errores concretos si me pegan el mensaje exacto. \*\*Lo que  
no puedo es decirles de memoria cómo se llama un método. Si lo hago, desconfíen.\*\*

Los tres workshops de mañana los dictan las mismas personas que después juzgan, y  
prometen que salís con el entorno funcionando.

\`\`\`\`

Ahí está el documento unificado, con Windows y Mac, borré las versiones viejas para que no se confundan.

\*\*Tres correcciones que salieron de tus salidas reales:\*\*

\`pear \--version\` no existe — el flag es \`pear \-v\`. El largo te devuelve \`Unrecognized Flag\`. Ese error estaba en mi documento anterior y ya lo arreglé.

\`wdk send\` con el texto literal \`DIRECCION\` da \`INVALID\_FORMAT\`. Es esperable: hay que poner una dirección \`0x...\` real. Podés usar la tuya misma como destino para probar el \`--dry-run\`.

Y lo que ya viste: \`qvac doctor\` es sin \`npx\`.

\*\*Lo que salió bien y no es menor:\*\* el modelo de 773 MB ya está descargado y con checksum validado en \`C:\\Users\\Emi\\.qvac\\models\\\`, \`qvac serve openai\` levantó perfecto en el puerto 11434, y Pear te generó el link \`pear://3mtqyaui5ew6...\` y arrancó con \`CLI ready\`. \*\*Ya pasaste el gate de Pear\*\* — que era el más difícil de los tres. Eso solo ya te pone adelante de buena parte del campo.

\*\*El orden para esta noche:\*\*

Primero \`npm uninstall \-g bare-runtime\`, después agregá \`modelConfig: { device: 'cpu' }\` al \`prueba.js\` y corrélo de nuevo. Si imprime texto, QVAC está resuelto.

Después, aunque el paso anterior falle, \*\*probá el OCR igual\*\*. Usa ONNX runtime, que es un motor completamente distinto del que te crashea. Es perfectamente posible que el OCR ande aunque el modelo de texto no. Y el OCR es lo que decide si Vaquita y Ventanilla son viables.

Una nota sobre \`qvac serve openai\`: te levantó pero dijo \`No models configured for preload\`. Para que sirva de verdad hay que agregarle la sección \`serve.models\` al \`qvac.config.json\`, declarando qué modelo servir. Está documentado en la página del servidor HTTP, y puede ser el camino más rápido para el equipo mañana si ya saben usar la API de OpenAI.

Cuando corras el OCR sobre un ticket, pegame la salida. Con los valores de \`confidence\` que devuelva sabemos si conviene apretar el acelerador con Vaquita o replegarse a Portero.

\# Human — Aug 22, 2026, 12:24 AM

\`\`\`javascript  
import { loadModel, LLAMA\_3\_2\_1B\_INST\_Q4\_0, completion, unloadModel } from '@qvac/sdk';

try {  
  const modelId \= await loadModel({  
    modelSrc: LLAMA\_3\_2\_1B\_INST\_Q4\_0,  
    onProgress: (p) \=\> {  
      const mb \= (n) \=\> (n / 1e6).toFixed(1);  
      process.stderr.write(\`\\rBajando p.percentage.toFixed(0)%({mb(p.downloaded)}/${mb(p.total)} MB)\`);  
      if (p.percentage \>= 100\) process.stderr.write('\\n');  
    }  
  });

  const history \= \[{ role: 'user', content: 'Explicá qué es una factura en una oración' }\];  
  const result \= completion({ modelId, history, stream: true });  
  for await (const token of result.tokenStream) {  
    process.stdout.write(token);  
  }

  await unloadModel({ modelId });  
} catch (error) {  
  console.error('✖', error);  
  process.exit(1);  
}

Ese es mi prueba.js, decime donde agrego lo de cpu para que funcione vía cpu y verificá bien en la documentación como debería de ser y quedar para este tipo de alternativa.  
\`\`\`

\# Claude — Aug 22, 2026, 12:24 AM

Antes de decirte dónde ponerlo, verifico la forma exacta que acepta \`loadModel()\` para no inventar un parámetro que no exista.

Confirmé lo que necesitaba. La firma de \`loadModel()\` en la referencia de API muestra \`modelConfig\` como el lugar correcto: \`loadModel({ modelSrc: LLAMA\_3\_2\_1B\_INST\_Q4\_0, modelConfig: { ctx\_size: 2048 } })\`. Y la página de configuración muestra \`device: "cpu"\` exactamente como campo del bloque \`llm\` dentro de esa misma estructura. Es el lugar correcto.

Tu \`prueba.js\` con el cambio:

\`\`\`javascript  
import { loadModel, LLAMA\_3\_2\_1B\_INST\_Q4\_0, completion, unloadModel } from '@qvac/sdk';

try {  
  const modelId \= await loadModel({  
    modelSrc: LLAMA\_3\_2\_1B\_INST\_Q4\_0,  
    modelConfig: {  
      device: 'cpu',  
      ctx\_size: 1024  
    },  
    onProgress: (p) \=\> {  
      const mb \= (n) \=\> (n / 1e6).toFixed(1);  
      process.stderr.write(\`\\rBajando p.percentage.toFixed(0)%({mb(p.downloaded)}/${mb(p.total)} MB)\`);  
      if (p.percentage \>= 100\) process.stderr.write('\\n');  
    }  
  });

  const history \= \[{ role: 'user', content: 'Explicá qué es una factura en una oración' }\];  
  const result \= completion({ modelId, history, stream: true });  
  for await (const token of result.tokenStream) {  
    process.stdout.write(token);  
  }

  await unloadModel({ modelId });  
} catch (error) {  
  console.error('✖', error);  
  process.exit(1);  
}  
\`\`\`

Solo agregué el objeto \`modelConfig\` con \`device: 'cpu'\`, que reemplaza al \`gpu\_layers: '99', device: 'gpu'\` que tu log mostraba por defecto y que era justo lo que crasheaba. Dejé \`ctx\_size: 1024\` porque era el valor que ya venía usando el default — no cambia nada, solo lo hago explícito.

\*\*Nivel de certeza, para que sepas cuánto confiar:\*\* la forma \`loadModel({ modelSrc, modelConfig })\` está confirmada en la referencia de API oficial, palabra por palabra. Que \`device: "cpu"\` sea un campo válido dentro de \`modelConfig\` para modelos \`llm\` lo vi confirmado en el contexto de \`deviceDefaults\` (\`"llm": { "device": "cpu", "ctx\_size": 1024 }\`), que usa la misma forma de objeto. No encontré una tabla exhaustiva de \`modelConfig\` para \`llm\` que lo liste aparte, así que hay un pequeño margen de que el nombre del campo difiera. Si corriéndolo te tira un error de configuración inválida en vez de crashear, pegame ese mensaje — sería la confirmación definitiva o la corrección exacta que falta, no una excusa para inventar otro nombre.

Corré \`node prueba.js\` así y contame qué pasa.

\# Human — Aug 22, 2026, 12:40 AM

Funcionó el modelo utilizando la CPU\! Como hago ahora para testear si la lectura de facturas y recibos funciona, tengo diferentes imágenes, tengo fotos de Super.jpg

\* Ropa.jpg  
\* Cena.jpg  
\* Cine.jpg  
\* Super\_malaluz.jpg  
\* Ropa\_malaluz.jpg  
\* Cena\_malaluz.jpg  
\* Cine\_malaluz.jpg

Y son todos tickets lo ideal sería que los entienda y si hay mala luz los identifique o trate de ver tras ella, otra pregunta, esto podría funcionar para teléfono? O el teléfono no va a correr esta i.a, porque me parece poco serio usar la notebook o la camara de la misma, lo que pasa es que la vamos a necesitar para pears y para acceder a la foto de la camara del celu, otra pregunta, donde guardo las imágenes para ejecutar las pruebas y ver los resultados. Porbemos YA el modelo OCR

\# Claude — Aug 22, 2026, 12:41 AM

¡Buenísimo, ya tenés el gate resuelto\! Vamos con las tres cosas.

\#\# Dónde guardar las imágenes

Metelas en una carpeta nueva \*\*dentro del proyecto de QVAC\*\*, no en otro lado — así los paths relativos funcionan sin líos:

\`\`\`cmd  
mkdir C:\\hack\\qvac-pruebas\\tickets  
\`\`\`

Copiá ahí las 8 fotos con esos mismos nombres. Quedaría:

\`\`\`  
C:\\hack\\qvac-pruebas\\  
├── prueba.js  
├── qvac.config.json  
└── tickets\\  
    ├── Super.jpg  
    ├── Ropa.jpg  
    ├── Cena.jpg  
    ├── Cine.jpg  
    ├── Super\_malaluz.jpg  
    ├── Ropa\_malaluz.jpg  
    ├── Cena\_malaluz.jpg  
    └── Cine\_malaluz.jpg  
\`\`\`

\#\# El script para testear las 8 de una

En vez de correr \`ocr.js\` ocho veces a mano, este script las procesa todas y te arma una tabla comparativa al final — exactamente el tipo de evidencia que el sponsor de QVAC pide para el premio de fiabilidad.

\*\*File: batch-ocr.js\*\*

\`\`\`javascript  
/\*\*  
 \* batch-ocr.js — corre OCR sobre todas las imágenes de una carpeta y arma  
 \* un resumen comparativo. Basado en el ejemplo oficial de la documentación  
 \* de QVAC (ai-capabilities/ocr), extendido acá para procesar un lote y  
 \* calcular confianza promedio por imagen.  
 \*  
 \* Uso:  
 \*   node batch-ocr.js               (usa ./tickets por defecto)  
 \*   node batch-ocr.js ./otra-carpeta  
 \*/  
import { close, loadModel, ocr, OCR\_LATIN, unloadModel } from '@qvac/sdk';  
import fs from 'fs';  
import path from 'path';

const carpeta \= process.argv\[2\] || './tickets';

if (\!fs.existsSync(carpeta)) {  
  console.error(\`✖ No existe la carpeta: ${carpeta}\`);  
  process.exit(1);  
}

const archivos \= fs.readdirSync(carpeta)  
  .filter(f \=\> /\\.(jpg|jpeg|png|bmp)$/i.test(f))  
  .sort();

if (archivos.length \=== 0\) {  
  console.error(\`✖ No encontré imágenes (.jpg/.png/.bmp) en ${carpeta}\`);  
  process.exit(1);  
}

console.log(\`▸ Encontré ${archivos.length} imágenes en ${carpeta}\\n\`);

try {  
  console.log('▸ Cargando modelo OCR (OCR\_LATIN)...');  
  const modelId \= await loadModel({  
    modelSrc: OCR\_LATIN,  
    modelConfig: {  
      langList: \['es'\],  
      magRatio: 1.5,  
      defaultRotationAngles: \[90, 180, 270\],  
      contrastRetry: true,          // reintenta con más contraste — útil para malaluz  
      lowConfidenceThreshold: 0.5,  
      recognizerBatchSize: 1  
    }  
  });  
  console.log(\`▸ Modelo cargado. ID: ${modelId}\\n\`);

  const resumen \= \[\];

  for (const archivo of archivos) {  
    const imagePath \= path.join(carpeta, archivo);  
    console.log(\`\\n${'='.repeat(50)}\`);  
    console.log(\`  ${archivo}\`);  
    console.log('='.repeat(50));

    const inicio \= Date.now();  
    const { blocks } \= ocr({ modelId, image: imagePath, options: { paragraph: false } });  
    const result \= await blocks;  
    const ms \= Date.now() \- inicio;

    let sumaConf \= 0, conConf \= 0;  
    for (const block of result) {  
      const conf \= block.confidence \!== undefined ? block.confidence.toFixed(2) : '—';  
      console.log(\`  \[${conf}\] ${block.text}\`);  
      if (block.confidence \!== undefined) { sumaConf \+= block.confidence; conConf++; }  
    }

    const promedio \= conConf ? sumaConf / conConf : null;  
    const bajaConf \= result.filter(b \=\> (b.confidence ?? 1\) \< 0.5).length;

    resumen.push({  
      archivo,  
      bloques: result.length,  
      confianzaPromedio: promedio,  
      bloquesBajaConfianza: bajaConf,  
      ms  
    });

    console.log(\`  → ${result.length} bloques · confianza promedio: ${promedio \!== null ? promedio.toFixed(2) : '—'} · ${ms} ms\`);  
  }

  console.log(\`\\n\\n${'='.repeat(70)}\`);  
  console.log('  RESUMEN COMPARATIVO');  
  console.log('='.repeat(70));  
  console.log(  
    'archivo'.padEnd(22) \+  
    'bloques'.padEnd(10) \+  
    'confianza'.padEnd(12) \+  
    'baja conf.'.padEnd(12) \+  
    'tiempo'  
  );  
  console.log('-'.repeat(70));  
  for (const r of resumen) {  
    console.log(  
      r.archivo.padEnd(22) \+  
      String(r.bloques).padEnd(10) \+  
      (r.confianzaPromedio \!== null ? r.confianzaPromedio.toFixed(2) : '—').padEnd(12) \+  
      String(r.bloquesBajaConfianza).padEnd(12) \+  
      \`${r.ms} ms\`  
    );  
  }

  // Comparación directa: normal vs mala luz, por par de nombre  
  console.log(\`\\n${'='.repeat(70)}\`);  
  console.log('  IMPACTO DE LA MALA LUZ (por par)');  
  console.log('='.repeat(70));  
  for (const r of resumen) {  
    if (r.archivo.includes('\_malaluz')) continue;  
    const base \= r.archivo.replace(/\\.(jpg|jpeg|png|bmp)$/i, '');  
    const par \= resumen.find(x \=\> x.archivo.startsWith(base \+ '\_malaluz'));  
    if (\!par) continue;  
    const delta \= par.confianzaPromedio \!== null && r.confianzaPromedio \!== null  
      ? (par.confianzaPromedio \- r.confianzaPromedio).toFixed(2)  
      : '—';  
    console.log(\`${base}: normal ${r.confianzaPromedio?.toFixed(2) ?? '—'} → mala luz ${par.confianzaPromedio?.toFixed(2) ?? '—'}  (Δ ${delta})\`);  
  }

  await unloadModel({ modelId, clearStorage: false });  
  process.exit(0);  
} catch (error) {  
  console.error('\\n✖', error);  
  await close();  
}

\`\`\`

Guardá el script como \`batch-ocr.js\` \*\*al lado\*\* de tu \`prueba.js\`, en \`C:\\hack\\qvac-pruebas\\\`. Corrélo así:

\`\`\`cmd  
cd C:\\hack\\qvac-pruebas  
node batch-ocr.js  
\`\`\`

Va a leer todo lo que haya en \`tickets\\\`, procesar las 8 fotos una por una, y al final te tira dos tablas: el resumen general y una comparación directa normal vs mala luz para cada par (Super, Ropa, Cena, Cine). Esa segunda tabla es oro puro — es literalmente el harness de la idea "Banco de pruebas" hecho realidad con tus propios datos.

Puse \`contrastRetry: true\` a diferencia del ejemplo original de la documentación (que lo tenía en \`false\`), justo para ayudar en los casos de mala luz. Y \`langList: \['es'\]\` en vez de \`\['en'\]\`, porque tus tickets van a estar en español.

\#\# Sobre el teléfono — respuesta honesta

Lo que verifiqué de la documentación: QVAC en móvil corre vía Expo, pero \*\*solo en un dispositivo físico\*\*, nunca en emulador, y armar esa integración es construir una app de Expo aparte — no es correr el mismo script en el celular. Con las horas que quedan, no es realista meterse en eso esta noche.

Pero fijate que tu preocupación puede estar mezclando dos cosas distintas. Para el video de demo, \*\*nadie espera que saques la foto en vivo con la cámara del celular en cámara\*\*. Lo normal en un hackathon es tener las fotos ya cargadas de antes — es lo que estás haciendo ahora mismo con estos 8 tickets. Usar la notebook para eso no es "poco serio", es el estándar. La cámara del celular en vivo suma un punto de falla extra (enfoque, luz del momento, que ande el wifi si hace falta) que no te conviene tener en medio de una demo de 3 minutos.

Así que mi sugerencia: \*\*para el hackathon, cargá las fotos de antemano en la carpeta \`tickets\\\`\*\* y mostrá el flujo desde ahí. Guardá lo del celular como la frase de cierre del video — "hoy lo mostramos así porque así se instala con Pear; en producción esto lee directo de la cámara del teléfono, QVAC soporta Expo en dispositivo físico" — que es exactamente el tipo de plan claro que la rúbrica de \*Technicality\* premia.

Corré el \`batch-ocr.js\` y pegame la salida completa — con esos números confirmamos si el ticket con mala luz te mata la idea o no, y decidimos entre Vaquita/Ventanilla o el repliegue a Portero.

\# Human — Aug 22, 2026, 8:05 AM

C:\\hack\\qvac-pruebas\>mkdir C:\\hack\\qvac-pruebas\\tickets  
C:\\hack\\qvac-pruebas\>node batch-ocr.js  
▸ Encontré 8 imágenes en ./tickets  
▸ Cargando modelo OCR (OCR\_LATIN)...  
\[sdk:client\] 📦 Initializing SDK config  
\[sdk:client\] 📱 Runtime context: { runtime: 'node', platform: 'win32' }  
\[sdk:server\] Console output enabled  
\[sdk:server\] HTTP download concurrency set to: 3  
\[sdk:client\] ✅ Initialization complete  
\[sdk:server\] \[request-lifecycle\] begin requestId=8b2a6c5a-c6fd-44f2-a364-4736e8bf1a03 kind=loadModel modelId=- state=running  
\[sdk:server\] Loading from registry: qvac\_models\_compiled/ocr/gguf/easyocr/2026-05-14/latin\_g2.gguf  
\[sdk:server\] Loading from registry: qvac\_models\_compiled/ocr/gguf/easyocr/2026-05-14/craft\_mlt\_25k.gguf  
\[sdk:server\] ­ƒöù Creating new registry client...  
\[sdk:server\] Ô£à Registry client ready  
\[sdk:server\] ­ƒôÑ Downloading blob directly: latin\_g2.gguf  
\[QVACRegistryClient\] \[INFO\] Downloading blob directly {  
  coreKey: 'd90c02630333...',  
  blockOffset: 2109431,  
  blockLength: 235,  
  byteLength: 15396512  
}  
\[sdk:server\] ­ƒôÑ Downloading blob directly: craft\_mlt\_25k.gguf  
\[QVACRegistryClient\] \[INFO\] Downloading blob directly {  
  coreKey: 'd90c02630333...',  
  blockOffset: 2108162,  
  blockLength: 1269,  
  byteLength: 83133856  
}  
\[QVACRegistryClient\] \[INFO\] Cleared blob blocks from corestore { start: 2109431, end: 2109666, blocks: 0 }  
\[QVACRegistryClient\] \[INFO\] Blob download complete (direct)  
\[sdk:server\] Ô£à Downloaded to C:\\Users\\Emi\\.qvac\\models\\1bd09b23f28caa7e\_latin\_g2.gguf  
\[sdk:server\] Ô£à Checksum validated for latin\_g2.gguf  
\[sdk:server\] Loaded Model to C:\\Users\\Emi\\.qvac\\models\\1bd09b23f28caa7e\_latin\_g2.gguf  
\[QVACRegistryClient\] \[INFO\] Cleared blob blocks from corestore { start: 2108162, end: 2109431, blocks: 0 }  
\[QVACRegistryClient\] \[INFO\] Blob download complete (direct)  
\[sdk:server\] Ô£à Downloaded to C:\\Users\\Emi\\.qvac\\models\\bb5d57baeb6ae9e7\_craft\_mlt\_25k.gguf  
\[sdk:server\] Ô£à Checksum validated for craft\_mlt\_25k.gguf  
\[sdk:server\] Loaded Model to C:\\Users\\Emi\\.qvac\\models\\bb5d57baeb6ae9e7\_craft\_mlt\_25k.gguf  
\[sdk:server\] ggml-ocr: Loading model f7b1fec52cdcc166...  
\[sdk:server\] \[request-lifecycle\] end requestId=8b2a6c5a-c6fd-44f2-a364-4736e8bf1a03 kind=loadModel modelId=- state=completed durationMs=12272  
✖ MODEL\_LOAD\_FAILED: Failed to load model: Unsupported language(s): none of the requested languages are supported: es  
    at runLoadModel (file:///C:/hack/qvac-pruebas/node\_modules/@qvac/sdk/dist/client/api/load-model.js:118:15)  
    at process.processTicksAndRejections (node:internal/process/task\_queues:105:5)  
    at async file:///C:/hack/qvac-pruebas/batch-ocr.js:35:19 {  
  code: 52200,  
  cause: undefined  
}  
\[sdk:client\] 🧹 Closing RPC client  
\[sdk:client\] 🐻🔫 Killing bare worker process  
\[sdk:client\] 🔌 Closing IPC server  
C:\\hack\\qvac-pruebas\>

Chequeá bien la documentación y decime cual es el error en esto, y preaprame bien el guión y toda la explicación en la parte de ideas simples para defender bien esta idea de que con expo se puede pasar a teléfono

\# Claude — Aug 22, 2026, 8:07 AM

Es un error mío: cambié \`langList\` a \`\['es'\]\` y el modelo lo rechazó. Voy a verificar qué códigos acepta realmente en vez de adivinar.

Encontré el problema y es mío. \*\*La documentación usa \`langList: \['en'\]\`\*\* y yo lo cambié a \`\['es'\]\` pensando que era mejor para tickets argentinos. El modelo \`latin\_g2\` lo rechazó.

\#\# El arreglo, una línea

En \`batch-ocr.js\`, cambiá:

\`\`\`javascript  
langList: \['es'\],     // ← esto falla  
\`\`\`

por:

\`\`\`javascript  
langList: \['en'\],     // ← el valor de la documentación  
\`\`\`

\*\*Y no te preocupes de que diga "en" para tickets en español.\*\* El modelo se llama \`OCR\_LATIN\` y el archivo que bajó es \`latin\_g2\`: es un reconocedor de \*\*alfabeto latino\*\*, no un traductor. Lee las formas de las letras, no entiende idiomas. "MILANESA" y "COCA COLA" las va a leer igual de bien. Lo único que puede fallar son los acentos y la ñ, y en un ticket lo que más importa son los \*\*números\*\*, que son idénticos en los dos idiomas.

De hecho eso te da material para el video: \*"el reconocedor de alfabeto latino a veces se come los acentos; para producción se entrena un reconocedor específico de español"\* — es exactamente el tipo de limitación honesta con plan de solución que la rúbrica premia.

\*\*Un aviso sobre otro cambio que hice:\*\* puse \`contrastRetry: true\` cuando la documentación tiene \`false\`. Lo hice a propósito para ayudar con las fotos de mala luz, y no lo verifiqué. Si te tira otro error de configuración, poné \`false\` y corré igual — la comparación normal vs mala luz sigue siendo válida.

Corré de nuevo y pegame la salida. Mientras tanto, te preparo la defensa del teléfono.

Bajé el \`batch-ocr.js\` corregido — reemplazalo por el que tenías y corré de nuevo.

Y la Parte 15 del documento de ideas ya tiene la defensa del teléfono completa. Lo importante de esa sección es el reencuadre, que va más allá de una excusa:

\*\*La versión de computadora no es un parche tuyo, es el requisito del sponsor.\*\* El track de Pears exige que el juez instale escribiendo \`pear install pear://\` en una terminal. Si presentás una app de teléfono, quedás afuera del bounty de $1.000. Cuando lo decís así, dejás de estar justificándote y pasás a estar explicando una decisión correcta.

El guion está en dos momentos. En el segundo 25, apenas termina la demo, diez segundos al pasar: \*"lo mostramos en computadoras porque así se instala con Pear, y así lo pueden probar ustedes; en la vida real esto vive en el teléfono"\*. Cortás la objeción antes de que se forme. Y en los últimos 20 segundos va la versión larga con el plan de migración —Expo para QVAC, React Native para WDK, qué migra y qué no, con estimación de días— que es literalmente lo que la rúbrica de \*Technicality\* premia cuando pregunta si tenés un plan claro de cómo terminarías.

También puse tres trucos de filmación. El más útil: \*\*sacá la foto con el celular en cámara\*\*, aunque el procesamiento después ocurra en la notebook. El gesto que el juez tiene en la cabeza es ese, y si lo ve, el cerebro completa el resto solo.

Y si alguien te aprieta en las preguntas, la respuesta corta reencuadra el momento de uso: \*"el problema que resolvemos no pasa en la mesa, pasa a las dos horas cuando nadie se acuerda quién debe qué — ahí sí estás con la compu"\*. Eso además calza perfecto con la corrección de Mercado Pago: la foto se saca en la mesa, el reparto y el pago pasan después.

Pegame la salida del OCR cuando corra. Con la tabla de normal vs mala luz decidimos si Vaquita va o si nos replegamos.

