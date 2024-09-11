import { Blog, Published, TD } from "@prisma/client";

export interface Banner{
    id: string
    imageUrl : string
  imageKey  :string 
}

interface BlogPageProps {
  data: Blog[] | { error: string };
}
interface WorksExp {
  data: Works[] | { error: string };
}
interface T4DProps {
  dataRsearch: TD[] | { error: string };
  dataWeb: TD[] | { error: string };
}

interface PusblishProps {
  data: Published[] | { error: any };
}

