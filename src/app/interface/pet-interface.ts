export interface petInterface {
        data: pets[]
        links: Links
        meta: Meta
}
  
  export interface pets {
    id: number
    nombre: string
    tipo: string
    color: string
    edad: string
    estado: string
    genero: string
    desc_fisica: string
    desc_personalidad: string
    desc_adicional: string
    esterilizado: number
    vacunas: number
    imagen: string
    equipo: string
    region: string
    comuna: string
    url: string
  }
  
  export interface Links {
    first: string
    last: string
    prev: any
    next: any
  }
  
  export interface Meta {
    current_page: number
    from: number
    last_page: number
    links: Link[]
    path: string
    per_page: number
    to: number
    total: number
  }
  
  export interface Link {
    url?: string
    label: string
    active: boolean
  }
  