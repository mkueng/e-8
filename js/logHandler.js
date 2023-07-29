class Log {

  static error = function(message){
    console.error('%c'+message,'font-size: larger; color:#f11');
  }

  static info = function(message){
    console.info('%c'+message,'font-size: larger; color:#1f1');
  }

  static warn = function(message){
    console.warn('%c'+message,'font-size: larger; color:#ff1');
  }

}