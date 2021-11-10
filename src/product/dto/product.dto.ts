export class CreateProductDTO {
    readonly name: string;
    readonly descripcion: string;
    readonly imageURL: string;
    readonly price: number;
    readonly createdAt: Date;
}