import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {ScreenSizeType, BreakpointType, DeviceType, OrientationType} from 'src/app/enums/responsive';

@Injectable({
  providedIn: 'root'
})

//Resourced from https://github.com/8Tesla8/angular-responsive-design

export class ResponsiveService {
  constructor(breakpointObserver: BreakpointObserver) {
    this.checkScreenSize(breakpointObserver);

    this.checkDeviceTypeAndOrientation(breakpointObserver);
  }

  private _screenSize = ScreenSizeType.Unknown;
  public get screenSize(): ScreenSizeType {
    return this._screenSize;
  }

  private readonly screenSizeBreakpoints = new Map([
    [Breakpoints.XSmall, ScreenSizeType.XSmall],
    [Breakpoints.Small, ScreenSizeType.Small],
    [Breakpoints.Medium, ScreenSizeType.Medium],
    [Breakpoints.Large, ScreenSizeType.Large],
    [Breakpoints.XLarge, ScreenSizeType.XLarge],
  ]);

  private checkScreenSize(breakpointObserver: BreakpointObserver): void {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result:any) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this._screenSize =
              this.screenSizeBreakpoints.get(query) ??
              ScreenSizeType.Unknown;
          }
        }
      });
  }

  public orientationPortrait(): boolean {
    return this._orientation === OrientationType.Portrait;
  }
  public orientationLandscape(): boolean {
    return this._orientation === OrientationType.Landscape;
  }

  public deviceDesktop(): boolean {
    return this._deviceType === DeviceType.Web;
  }
  public deviceTablet(): boolean {
    return this._deviceType === DeviceType.Tablet;
  }
  public deviceMobile(): boolean {
    return this._deviceType === DeviceType.Handset;
  }

  private _deviceType = DeviceType.Unknown;
  public get deviceType(): DeviceType {
    return this._deviceType;
  }

  private _orientation = OrientationType.Unknown;
  public get orientation(): OrientationType {
    return this._orientation;
  }

  private readonly deviceAndOrientation = new Map([
    [Breakpoints.HandsetLandscape, BreakpointType.HandsetLandscape],
    [Breakpoints.HandsetPortrait, BreakpointType.HandsetPortrait],
    [Breakpoints.TabletLandscape, BreakpointType.TabletLandscape],
    [Breakpoints.TabletPortrait, BreakpointType.TabletPortrait],
    [Breakpoints.WebLandscape, BreakpointType.WebLandscape],
    [Breakpoints.WebPortrait, BreakpointType.WebPortrait],
  ]);

  private checkDeviceTypeAndOrientation(breakpointObserver: BreakpointObserver): void {
    breakpointObserver
      .observe([
        Breakpoints.HandsetLandscape,Breakpoints.HandsetPortrait,
        Breakpoints.WebLandscape,Breakpoints.WebPortrait,
        Breakpoints.TabletLandscape,Breakpoints.TabletPortrait,
      ])
      .subscribe((result:any) => {
        let orientationTypes = Object.keys(OrientationType).map((key) => key);

        let deviceTypes = Object.keys(DeviceType).map((key) => key);

        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            let type = this.deviceAndOrientation.get(query) ?? BreakpointType.Unknown;

            orientationTypes.forEach((element) => {
              if (type.indexOf(element) !== -1)
                this._orientation = element as OrientationType;
            });

            deviceTypes.forEach((element) => {
              if (type.indexOf(element) !== -1)
                this._deviceType = element as DeviceType;
            });
          }
        }
      });
  }
}
