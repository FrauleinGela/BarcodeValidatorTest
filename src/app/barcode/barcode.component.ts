import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {BarcodeApiService} from '../services/barcode-api.service';
declare var Quagga: any;

/**
 * Component that validates a barcode by input, Web-cam and by adding a file.
 * I am using Quagga to detect codes in images and Video stream.
 * I use detectChanges() because Quagga is an external library that does not refresh the scope of angular2 on its callback
 */

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.css'],
  providers: [BarcodeApiService]
})
export class BarcodeComponent {

  barcode: String;
  showResult: any = '';
  errorResult: any = '';
  camIsPlaying: boolean;
  dataBarCodeObject: any = '';
  imgBarcodeSource: any;
  resultImageBarcode: any = '';
  currentBarcode: any;
  isProcessing: boolean = false;
  fileImageValid: boolean = true;


  constructor(private barcodeService: BarcodeApiService, private cdr: ChangeDetectorRef) {
  }

  /**
   * Validate a normal string code through the api
   *
   * @param code, string code
   */
  public validateStringBarcode(code) {
    this.showResult = '';
    this.errorResult = '';
    this.currentBarcode = code;
    this.barcodeService.validateBarcode(code).subscribe(res => {
      this.showResult = res;
      this.cdr.detectChanges();
    }, err => {
      this.errorResult = err.error;
      this.cdr.detectChanges();
    });
  }

  /**
   * Launch the web-cam and start looking for codes
   */
  public playWebcam() {
    this.camIsPlaying = true;
    this.quaggaScannerDetection();
    this.quaggaScannerOnProcess();
    this.quaggaOnProcessOff();
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        constraints: {
          width: '100%',
          height: '100%',
          facingMode: "environment",
        },
        area: { // defines rectangle of the detection/localization area
          top: "20%",    // top offset
          right: "20%",  // right offset
          left: "20%",   // left offset
          bottom: "20%"  // bottom offset
        },
        target: document.querySelector('#div-reader-barcode')    // Or '#yourElement' (optional)
      },
      locate: false,
      decoder: {
        debug: {
          drawBoundingBox: true,
          showFrequency: true,
          drawScanline: true,
          showPattern: true
        },
        multiple: false,
        readers: [
          "code_128_reader",
          "ean_reader",
          "ean_8_reader",
          "code_39_reader",
          "code_39_vin_reader",
          "codabar_reader",
          "upc_reader",
          "upc_e_reader",
          "i2of5_reader"
        ]
      },
      locator: {
        halfSample: true,
        patchSize: "large", // x-small, small, medium, large, x-large
        debug: {
          showCanvas: true,
          showPatches: true,
          drawBoundingBox: true,
          showFrequency: true,
          drawScanline: true,
          showPattern: true,
          showFoundPatches: false,
          showSkeleton: true,
          showLabels: true,
          showPatchLabels: false,
          showRemainingPatchLabels: false,
          boxFromPatches: {
            showTransformed: false,
            showTransformedBox: false,
            showBB: false
          }
        }
      }
    }, function (err) {
      if (err) {
        console.log(err);
        return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();

    });

  }

  /**
   * Stop the web-cam
   */
  public stopWebcam() {
    this.camIsPlaying = false;
    Quagga.stop();
  }

  /**
   *When the process of detecting barcode with a Web-cam is finished
   */
  public quaggaOnProcessOff() {
    Quagga.offProcessed(handler => {
      this.isProcessing = false;
    })
  }

  /**
   * When the Scanner has detected a barcode
   */
  public quaggaScannerDetection() {
    Quagga.onDetected(data => {
      console.log('data', data);
      this.dataBarCodeObject = data.codeResult.code;
      this.cdr.detectChanges();
    })
  }

  /**
   * When the Scanner is on process
   */
  public quaggaScannerOnProcess() {
    Quagga.onProcessed(data => {
      data['box'] ? this.isProcessing = true : this.isProcessing = false;
      this.cdr.detectChanges();
    });
  }

  /**
   * Set the image after adding an image to the input file
   * @param img, image
   */
  public quaggaSourceDetection(img) {
    Quagga.decodeSingle({
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "upc_reader",
            "upc_e_reader",
            "i2of5_reader"
          ] // List of active readers
        },
        locate: true, // try to locate the barcode in the image
        src: img
      }, result => {
        if (result && result.codeResult) {
          this.resultImageBarcode = result.codeResult.code;
          this.validateStringBarcode(this.resultImageBarcode);
          this.cdr.detectChanges();

          console.log("result", result.codeResult.code);
        } else {
          console.log("not detected");
        }
      }
    );
  }

  /**
   * Get the event after an images has been uploaded
   * @param event
   */
  public fileChangeEvent(event) {
    this.fileImageValid = true;
    this.resultImageBarcode = '';
    this.imgBarcodeSource = {};
    if (event.target.files[0] && event.target.files[0].type.match(/image-*/)) {
      if (event.target.files) {
        var reader = new FileReader();

        reader.onload = (e: any) => {
          this.imgBarcodeSource = e.target.result;
          this.quaggaSourceDetection(this.imgBarcodeSource);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    } else {
      this.fileImageValid = false;
    }
  }
}
