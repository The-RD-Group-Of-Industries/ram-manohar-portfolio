/**
 * Defines the skills data for the application, including data science, data analytics, visualization, data management, and qualitative data analysis skills.
 * 
 * The `Skills` array contains objects with the following properties:
 * - `icons`: an array of image imports representing the skill icons
 * - `type`: an array of skill levels (e.g. "advance", "intermediate", "beginner")
 * - `title`: the title of the skill category
 * 
 * The `RA` array contains objects with the following properties:
 * - `title`: the title of the research and evaluation design
 * - `desc`: a description of the research and evaluation design
 */
import { DA, DM, DS1 ,DS2,DS3,DV1,DV2,DV3,DV4,DV5, Q,} from "@/resourse/images/skills/skillsExport";

export const Skills =[
    {
        icons: [DS1,DS2,DS3],
        type:["advance","advance","beginner"],
        title : "Data Science Skills"
    },
    {
        icons: [DV1,DV2,DV3,DV4,DV5],
        type:["advance","advance","advance","intermediate","beginner"],
        title : "Data Analytics, Visualization & Dissemination"
    },
    {
        icons: [DM],
        type:["advance"],
        title : "Data Managment skills"
    },
    {
        icons: [DA],
        type:["intermediate"],
        title : "Qualitative Data Analysis"
    },
    {
        icons: [Q],
        type:["intermediate"],
        title : "Geographic Information System"
    }
]

export const RA =[
    {
        title: "Research & Evaluation Designs",
        desc : "Qualitative and Quantitative methods, experimental and non-experimental designs"
    },
    {
        title: "Sampling Theory & Applications",
        desc : "Sample design, sample size estimation, sample weights"
    },
    {
        title: "Statistical Analysis",
        desc : "Correlational, regression and time-series models, test of statistical significance"
    },
    {
        title: "Mathematical Modelling",
        desc : "Empirical, Deterministic, and stochastic models"
    },
]