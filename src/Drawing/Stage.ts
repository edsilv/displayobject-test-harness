import ClockTimer = etch.engine.ClockTimer;
import DisplayObject = etch.drawing.DisplayObject;
import IDisplayObject = etch.drawing.IDisplayObject;

var MAX_FPS: number = 100;
var MAX_MSPF: number = 1000 / MAX_FPS;

module etch.drawing{
    export class Stage extends DisplayObject implements ITimerListener {

        public DeltaTime: number = new Date(0).getTime();
        public LastVisualTick: number = new Date(0).getTime();
        public Timer: ClockTimer;
        Updated = new nullstone.Event<number>();
        Drawn = new nullstone.Event<number>();

        Init(drawTo: IDisplayContext): void {
            super.Init(drawTo);

            this.Timer = new ClockTimer();
            this.Timer.RegisterTimer(this);
        }

        OnTicked(lastTime: number, nowTime: number) {
            // if the number of milliseconds elapsed since the last
            // frame is less than the max per second, return.
            if (nowTime - this.LastVisualTick < MAX_MSPF) return;

            this.DeltaTime = nowTime - this.LastVisualTick;
            this.LastVisualTick = nowTime;

            // todo: make this configurable
            this.Ctx.clearRect(0, 0, this.Ctx.canvas.width, this.Ctx.canvas.height);

            this.UpdateDisplayList(this.DisplayList);
            this.Updated.raise(this, this.LastVisualTick);

            this.DrawDisplayList(this.DisplayList);
            this.Drawn.raise(this, this.LastVisualTick);
        }

        UpdateDisplayList(displayList: DisplayObjectCollection<IDisplayObject>): void {
            for (var i = 0; i < displayList.Count; i++){
                var displayObject: IDisplayObject = displayList.GetValueAt(i);
                displayObject.FrameCount++;
                displayObject.DeltaTime = this.DeltaTime;
                displayObject.LastVisualTick = this.LastVisualTick;
                if (!displayObject.IsPaused) {
                    displayObject.Update();
                }
                this.UpdateDisplayList(displayObject.DisplayList);
            }
        }

        DrawDisplayList(displayList: DisplayObjectCollection<IDisplayObject>): void {
            for (var i = 0; i < displayList.Count; i++){
                var displayObject: IDisplayObject = displayList.GetValueAt(i);
                if (displayObject.IsVisible) {
                    displayObject.Draw();
                }
                this.DrawDisplayList(displayObject.DisplayList);
            }
        }

        ResizeDisplayList(displayList: DisplayObjectCollection<IDisplayObject>): void {
            for (var i = 0; i < displayList.Count; i++){
                var displayObject: IDisplayObject = displayList.GetValueAt(i);
                displayObject.Resize();
                this.ResizeDisplayList(displayObject.DisplayList);
            }
        }

        Resize(): void {
            super.Resize();
            this.ResizeDisplayList(this.DisplayList);
        }
    }
}
