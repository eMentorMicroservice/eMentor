import { DialogStyles } from './enums';

export class DialogModel {
    style: DialogStyles;
    title: string;
    content: string;
    hint: string;
    typeOfInput: string;
    HTML?: string;
    mainActionButtonText: string;
    subActionButtonText: string;
    mainActionButton: (string) => void;
    subActionButton: () => void;
    closeButton?: () => void;
}