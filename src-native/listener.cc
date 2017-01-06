/*
The MIT License (MIT)

Copyright (c) 2016 Bryan Hughes <bryan@nebri.us>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

#include <unistd.h>
#include <node.h>
#include <nan.h>
#include <wiringPi.h>
#include "./listener.h"

class ListenWorker : public Nan::AsyncProgressWorker {
  public:

    ListenWorker(Nan::Callback *callback, Nan::Callback *progress): Nan::AsyncProgressWorker(callback), progress(progress) {}

    ~ListenWorker() {}

    void Execute(const Nan::AsyncProgressWorker::ExecutionProgress& progress) {
      executionProcess = (Nan::AsyncProgressWorker::ExecutionProgress*)(&progress);
      for (;;) {
        usleep(1000000);
      }
    }

    void EmitNewPinValue(int pin, int value) {
      const char data[2] = { (char)pin, (char)value };
      executionProcess->Send(data, 2);
    }

    void HandleProgressCallback(const char *data, size_t size) {
      Nan::HandleScope scope;

      v8::Local<v8::Value> argv[] = {
        Nan::New<v8::Number>(data[0]),
        Nan::New<v8::Number>(data[1])
      };

      progress->Call(2, argv);
    }

  private:

    Nan::Callback *progress;

    Nan::AsyncProgressWorker::ExecutionProgress* executionProcess;

};

ListenWorker* listenWorker;

void interruptHandler(int pin) {
  int value = digitalRead(pin);
  listenWorker->EmitNewPinValue(pin, value);
}

void interruptHandler0() { interruptHandler(0); }
void interruptHandler1() { interruptHandler(1); }
void interruptHandler2() { interruptHandler(2); }
void interruptHandler3() { interruptHandler(3); }
void interruptHandler4() { interruptHandler(4); }
void interruptHandler5() { interruptHandler(5); }
void interruptHandler6() { interruptHandler(6); }
void interruptHandler7() { interruptHandler(7); }
void interruptHandler8() { interruptHandler(8); }
void interruptHandler9() { interruptHandler(9); }
void interruptHandler10() { interruptHandler(10); }
void interruptHandler11() { interruptHandler(11); }
void interruptHandler12() { interruptHandler(12); }
void interruptHandler13() { interruptHandler(13); }
void interruptHandler14() { interruptHandler(14); }
void interruptHandler15() { interruptHandler(15); }
void interruptHandler16() { interruptHandler(16); }
void interruptHandler17() { interruptHandler(17); }
void interruptHandler18() { interruptHandler(18); }
void interruptHandler19() { interruptHandler(19); }
void interruptHandler20() { interruptHandler(20); }
void interruptHandler21() { interruptHandler(21); }
void interruptHandler22() { interruptHandler(22); }
void interruptHandler23() { interruptHandler(23); }
void interruptHandler24() { interruptHandler(24); }
void interruptHandler25() { interruptHandler(25); }
void interruptHandler26() { interruptHandler(26); }
void interruptHandler27() { interruptHandler(27); }
void interruptHandler28() { interruptHandler(28); }
void interruptHandler29() { interruptHandler(29); }

void enableInterrupt(int pin) {
  switch(pin) {
    case 0: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler0); break;
    case 1: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler1); break;
    case 2: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler2); break;
    case 3: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler3); break;
    case 4: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler4); break;
    case 5: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler5); break;
    case 6: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler6); break;
    case 7: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler7); break;
    case 8: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler8); break;
    case 9: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler9); break;
    case 10: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler10); break;
    case 11: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler11); break;
    case 12: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler12); break;
    case 13: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler13); break;
    case 14: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler14); break;
    case 15: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler15); break;
    case 16: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler16); break;
    case 17: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler17); break;
    case 18: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler18); break;
    case 19: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler19); break;
    case 20: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler20); break;
    case 21: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler21); break;
    case 22: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler22); break;
    case 23: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler23); break;
    case 24: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler24); break;
    case 25: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler25); break;
    case 26: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler26); break;
    case 27: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler27); break;
    case 28: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler28); break;
    case 29: wiringPiISR(pin, INT_EDGE_BOTH, &interruptHandler29); break;
  }
}

NAN_METHOD(setListener) {
  Nan::Callback *progress = new Nan::Callback(info[0].As<v8::Function>());
  Nan::Callback *callback = new Nan::Callback(info[1].As<v8::Function>());
  listenWorker = new ListenWorker(callback, progress);
  Nan::AsyncQueueWorker(listenWorker);
}

NAN_METHOD(enableListenerPin) {
  int pin = info[0]->Int32Value();
  enableInterrupt(pin);
}
