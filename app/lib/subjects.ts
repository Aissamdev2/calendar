const SUBJECTS_11: string[] = [
  'Álgebra Lineal',
  'Análisis Matemático I',
  'Física I',
  'Programación Científica'
]
 
const SUBJECTS_12: string[] = [
  'Análisis Matemático II',
  'Ecuaciones Diferenciales I',
  'Física II',
  'Geometría'
]

const SUBJECTS_21: string[] = [
  'Combinatoria y Probabilidad',
  'Computación algebraica',
  'Electromagnetismo',
  'Ecuaciones Diferenciales II',
  'Mecánica Clásica'
]

const SUBJECTS_22: string[] = [
  'Estadística',
  'Física Cuántica',
  'Métodos Numéricos',
  'Teoría de Grafos',
  'Termodinámica'
]

const SUBJECTS_31: string[] = [
  'Análisis Complejo',
  'Biofísica',
  'Física de Fluidos',
  'Física del Estado Sólido y Superfícies',
  'Mecánica Estatística'
]

const SUBJECTS_32: string[] = [
  'Electrónica Física',
  'Estructuras Algebraicas',
  'Geometría Diferencial y Aplicaciones',
  'Sistemas Dinámicos'
]

const SUBJECTS_41: string[] = [
  'Electrónica Aplicada',
  'Óptica y Fotónica',
  'Proyectos de Ingeniería'
]

const SUBJECTS_42: string[] = [
  'Trabajo de Fin de Grado'
]



const SUBJECTS_1: string[][] = [SUBJECTS_11, SUBJECTS_12]

const SUBJECTS_2: string[][] = [SUBJECTS_21, SUBJECTS_22]

const SUBJECTS_3: string[][] = [SUBJECTS_31, SUBJECTS_32]

const SUBJECTS_4: string[][] = [SUBJECTS_41, SUBJECTS_42]

export const SUBJECTS: string[][][] = [SUBJECTS_1, SUBJECTS_2, SUBJECTS_3, SUBJECTS_4]
export const OPTATIVES: string[] = [
  "Algorítmica",
  "Arquitectura de Computadores",
  "Ciencia de Materiales",
  "Electrónica Analógica",
  "Estudios en el Marco de Convenios de Movilidad I",
  "Fenómenos de Transporte",
  "Modelado de Sistemas y Control de Procesos",
  "Modelización y Visualización",
  "Nucleación y Crecimiento de Cristales",
  "Nuevos Materiales y Nanociencia",
  "Programación",
  "Revoluciones en Física y Matemáticas",
  "Aprendizaje Automático y Minería de Datos",
  "Computación Paralela y Masiva",
  "Control Automático",
  "Economía y Organización de Empresas",
  "Estructuras de Datos",
  "Estudios en el Marco de Convenios de Movilidad II",
  "Fundamentos de Sistemas Operativos",
  "Infraestructuras para el Big Data",
  "Inteligencia Artificial",
  "Introducción a la Astrofísica",
  "Seguridad en Redes",
  "Teoría de la Codificación",
  "Prácticas Externas I",
  "Prácticas Externas II"
];

export const OPTATIVES_COLORS_OBJ: Record<string, string> = {
  "Algorítmica": "#1d4a73",
  "Arquitectura de Computadores": "#5a1d73",
  "Ciencia de Materiales": "#1d7340",
  "Electrónica Analógica": "#734b1d",
  "Estudios en el Marco de Convenios de Movilidad I": "#73401d",
  "Fenómenos de Transporte": "#73661d",
  "Modelado de Sistemas y Control de Procesos": "#404d73",
  "Modelización y Visualización": "#1d4a73",
  "Nucleación y Crecimiento de Cristales": "#1d7340",
  "Nuevos Materiales y Nanociencia": "#733f1d",
  "Programación": "#734d1d",
  "Revoluciones en Física y Matemáticas": "#5a1d73",
  "Aprendizaje Automático y Minería de Datos": "#1d7340",
  "Computación Paralela y Masiva": "#73401d",
  "Control Automático": "#1d4a73",
  "Economía y Organización de Empresas": "#734d1d",
  "Estructuras de Datos": "#5a1d73",
  "Estudios en el Marco de Convenios de Movilidad II": "#1d7340",
  "Fundamentos de Sistemas Operativos": "#734b1d",
  "Infraestructuras para el Big Data": "#1d4a73",
  "Inteligencia Artificial": "#5a1d73",
  "Introducción a la Astrofísica": "#1d4a73",
  "Seguridad en Redes": "#1d7340",
  "Teoría de la Codificación": "#5a1d73",
  "Prácticas Externas I": "#734b1d",
  "Prácticas Externas II": "#733f1d"
};

export const OPTATIVES_BORDER_COLORS_OBJ: Record<string, string> = {
  "Algorítmica": "#5297cb",
  "Arquitectura de Computadores": "#a052cb",
  "Ciencia de Materiales": "#52cb86",
  "Electrónica Analógica": "#cb9762",
  "Estudios en el Marco de Convenios de Movilidad I": "#cb8052",
  "Fenómenos de Transporte": "#cbab52",
  "Modelado de Sistemas y Control de Procesos": "#7381cb",
  "Modelización y Visualización": "#5297cb",
  "Nucleación y Crecimiento de Cristales": "#52cb86",
  "Nuevos Materiales y Nanociencia": "#cb7f52",
  "Programación": "#cba152",
  "Revoluciones en Física y Matemáticas": "#a052cb",
  "Aprendizaje Automático y Minería de Datos": "#52cb86",
  "Computación Paralela y Masiva": "#cb8052",
  "Control Automático": "#5297cb",
  "Economía y Organización de Empresas": "#cba152",
  "Estructuras de Datos": "#a052cb",
  "Estudios en el Marco de Convenios de Movilidad II": "#52cb86",
  "Fundamentos de Sistemas Operativos": "#cb9762",
  "Infraestructuras para el Big Data": "#5297cb",
  "Inteligencia Artificial": "#a052cb",
  "Introducción a la Astrofísica": "#5297cb",
  "Seguridad en Redes": "#52cb86",
  "Teoría de la Codificación": "#a052cb",
  "Prácticas Externas I": "#cb9762",
  "Prácticas Externas II": "#cb7f52"
};

export const OPTATIVES_BG_COLORS_OBJ: Record<string, string> = {
  "Algorítmica": "#eaf4ff",
  "Arquitectura de Computadores": "#fbeaff",
  "Ciencia de Materiales": "#eafff4",
  "Electrónica Analógica": "#fffae9",
  "Estudios en el Marco de Convenios de Movilidad I": "#ffece9",
  "Fenómenos de Transporte": "#fff8e9",
  "Modelado de Sistemas y Control de Procesos": "#f0f4ff",
  "Modelización y Visualización": "#eaf4ff",
  "Nucleación y Crecimiento de Cristales": "#eafff4",
  "Nuevos Materiales y Nanociencia": "#ffece9",
  "Programación": "#fff4e9",
  "Revoluciones en Física y Matemáticas": "#fbeaff",
  "Aprendizaje Automático y Minería de Datos": "#eafff4",
  "Computación Paralela y Masiva": "#ffece9",
  "Control Automático": "#eaf4ff",
  "Economía y Organización de Empresas": "#fff4e9",
  "Estructuras de Datos": "#fbeaff",
  "Estudios en el Marco de Convenios de Movilidad II": "#eafff4",
  "Fundamentos de Sistemas Operativos": "#fffae9",
  "Infraestructuras para el Big Data": "#eaf4ff",
  "Inteligencia Artificial": "#fbeaff",
  "Introducción a la Astrofísica": "#eaf4ff",
  "Seguridad en Redes": "#eafff4",
  "Teoría de la Codificación": "#fbeaff",
  "Prácticas Externas I": "#fffae9",
  "Prácticas Externas II": "#ffece9"
};


export const OPTATIVES_COLORS = Object.values(OPTATIVES_BORDER_COLORS_OBJ)
export const OPTATIVES_BG_COLORS = Object.values(OPTATIVES_BG_COLORS_OBJ)
export const OPTATIVES_BORDER_COLORS = Object.values(OPTATIVES_BORDER_COLORS_OBJ)


export const SUBJECTS_PLAIN: string[] = [
  "Otros",
  ...SUBJECTS.flat(2),
  ...OPTATIVES
]

export const SUBJECTS_PLAIN_WITHOUT_OTHERS: string[] = [
  ...SUBJECTS.flat(2),
  ...OPTATIVES
]

