export interface ApiResponse {
    respuesta: boolean;
}
export interface datosPersonales {
    body?: Body;
    resultado: Resultado;
    success?: boolean;
    message?: string;
}

export interface Body {
    sede: string;
    facultad: string;
    programa: string;
    rectoria: string;
    idBanner: string;
    modalidad: string;
    nivel: string;
}

export interface Resultado {
    codigo: string;
    descripcion: string;
}
export interface detalleUsuario {
    telephoneNumber: string;
    mail: string;
    pager: string;
    givenName: string;
    sAMAccountName: string;
    userAccountControl: string;
    physicalDeliveryOfficeName: string;
    distinguishedName: string;
    "msDS-cloudExtensionAttribute2": string;
    name: string;
    homePhone: string;
    description: string;
    title: string;
    company: string;
    sn: string;
    department: string;
    cn: string;
    l: string;
    o: string;
    st: string;
    street: string;
    displayName: string;
}

export interface orquestarDatos {
    personales: datosPersonales,
    detalleUsuario: detalleUsuario
}