import {ClockTimer} from '../Engine/ClockTimer';
import {DisplayList} from './DisplayList';
import {DisplayObjectCollection} from './DisplayObjectCollection';
import {IDisplayObject} from './IDisplayObject';
import {IDisplayContext} from './IDisplayContext';
import {Point} from './../Primitives/Point';

var MAX_FPS: number = 100;
var MAX_MSPF: number = 1000 / MAX_FPS;

export class DisplayObject implements IDisplayObject {

    private _DisplayList: DisplayList;
    public FrameCount: number = 0;
    public Height: number;
    public Initialised: boolean = false;
    public IsPaused: boolean = false;
    public IsVisible: boolean = true;
    public LastVisualTick: number = new Date(0).getTime();
    public Position: Point;
    public Sketch: any;
    public Timer: ClockTimer;
    public Width: number;
    public ZIndex: number;

    Init(sketch: IDisplayContext): void {
        this.Sketch = sketch;
        this.DisplayList = new DisplayList();
        this.Setup();
        this.DisplayList.Setup();

        this.Timer = new ClockTimer();
        this.Timer.RegisterTimer(this);

        this.Initialised = true;
    }

    OnTicked(lastTime: number, nowTime: number) {
        var now = new Date().getTime();
        if (now - this.LastVisualTick < MAX_MSPF) return;

        this.LastVisualTick = now;

        //TWEEN.update(nowTime);

        if (!this.IsPaused){
            this.Update();
            this.DisplayList.Update();
        }

        if (!this.IsPaused && this.IsVisible){
            this.Draw();
            this.DisplayList.Draw();
        }
    }

    get Ctx(): CanvasRenderingContext2D{
        return this.Sketch.Ctx;
    }

    get DisplayList(): DisplayList {
        return this._DisplayList;
    }

    set DisplayList(value: DisplayList) {
        this._DisplayList = value;
    }

    public Setup(): void {

    }

    Update(): void {

    }

    public Draw(): void {
        this.FrameCount++;
        console.log("draw ", this);
    }

    public Dispose(): void {

    }

    public Play(): void {
        this.IsPaused = false;
    }

    public Pause(): void {
        this.IsPaused = true;
    }

    public Show(): void {
        this.IsVisible = true;
    }

    public Hide(): void {
        this.IsVisible = false;
    }

    //HitRect(x, y, w, h, mx, my): boolean {
        //return Utils.Measurements.Dimensions.HitRect(x, y, w, h, mx, my);
    //}
}
