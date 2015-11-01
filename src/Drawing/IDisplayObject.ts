import DisplayObjectCollection = etch.drawing.DisplayObjectCollection;
import IDisplayContext = etch.drawing.IDisplayContext;
import Vector = etch.primitives.Vector;

module etch.drawing{
    export interface IDisplayObject extends IDisplayContext{
        CanvasHeight: number;
        CanvasWidth: number;
        Ctx: CanvasRenderingContext2D;
        DisplayList: DisplayObjectCollection<IDisplayObject>;
        Draw(): void;
        DrawFrom: IDisplayContext;
        DrawTo: IDisplayContext;
        Height: number;
        Hide(): void;
        Init(drawTo: IDisplayContext, drawFrom?: IDisplayContext): void;
        IsInitialised: boolean;
        IsPaused: boolean;
        IsVisible: boolean;
        Pause(): void;
        Play(): void;
        Position: Vector;
        Setup(): void;
        Show(): void;
        Update(): void;
        Width: number;
        ZIndex: number;
    }
}