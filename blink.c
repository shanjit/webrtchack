#include "em_device.h"
#include "em_system.h"
#include "em_chip.h"
#include "em_cmu.h"
#include "em_gpio.h"

#define BUTTON_PORT gpioPortC
#define BUTTON_PIN_1  8
#define BUTTON_PIN_2  9
#define LED_PORT    gpioPortC
#define LED0_PIN    10
#define LED1_PIN    11

int main () {

  CHIP_Init();

  CMU_ClockEnable(cmuClock_GPIO, true);                           // enable GPIO peripheral clock

  GPIO_PinModeSet(LED_PORT, LED0_PIN, gpioModePushPull, 0);       // configure LED0 pin as push-pull output with standard drive strength
  GPIO_PinModeSet(LED_PORT, LED1_PIN, gpioModePushPullDrive, 1);  // configure LED1 pin as push-pull output with alternate drive strength
  GPIO_DriveModeSet(LED_PORT, gpioDriveModeLowest);               // set alternate drive strength to lowest setting (0.5mA)
  GPIO_PinOutSet(LED_PORT, LED0_PIN);                             // turn on LED0
  GPIO_PinOutSet(LED_PORT, LED1_PIN);                             // turn on LED1

  GPIO_PinModeSet(BUTTON_PORT, BUTTON_PIN_1, gpioModeInputPull, 1); // configure BUTTON_PIN as input with pull-up enabled

  while(1) {
    if(!(GPIO_PinInGet(BUTTON_PORT, BUTTON_PIN_1))) { // if button is pressed
      GPIO_PinOutClear(LED_PORT, LED0_PIN);         // turn off LED0
    }else{                                          // if button is released
      GPIO_PinOutSet(LED_PORT, LED0_PIN);           // turn on LED0
    }
  }
}