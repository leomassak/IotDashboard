const mqtt = require('mqtt');

class MqttHandler {
  constructor() {
    this.mqttClient = null;
    this.host = 'mqtt://tailor.cloudmqtt.com';
    this.port = '16966';
    this.username = 'zacyzcip'; // mqtt credentials if these are needed to connect
    this.password = 'WSotZ6hML7Ew';
    this.topic = 'teste';
    this.ultimaMensagem = null;
  }
  
  connect() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = mqtt.connect(this.host, { port: this.port, username: this.username, password: this.password });

    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log('Cliente MQTT Conectado!');
    });

    // mqtt subscriptions
    this.mqttClient.subscribe(this.topic, {qos: 0});

    // When a message arrives, console.log it
    this.mqttClient.on('message', function (topic, message) {
      this.ultimaMensagem = message.toString();
      console.log(message.toString());
    });

    this.mqttClient.on('close', () => {
      console.log('Cliente MQTT Desconectado!');
    });
  }

  // Sends a mqtt message to topic
  sendMessage(message) {
    this.mqttClient.publish(this.topic, message);
  }

  getTopico() {
    return this.topic;
  }
}

module.exports = MqttHandler;