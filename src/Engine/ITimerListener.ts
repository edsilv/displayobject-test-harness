module etch.engine{
    export interface ITimerListener {
        OnTicked(lastTime: number, nowTime: number);
    }
}