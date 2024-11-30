import amqp from 'amqplib'
import client, { Connection, Channel, ConsumeMessage } from "amqplib";

export default class messanger {
    connection!: Connection;
    channel!: Channel;
    private connected!: Boolean;

    async connect() {
        if (this.connected && this.channel) return;
        else this.connected = true;
    
        try {
          console.log(`⌛️ Connecting to Rabbit-MQ Server`);
          this.connection = await client.connect(
            `amqp://localhost`
          );
    
          console.log(`✅ Rabbit MQ Connection is ready`);
    
          this.channel = await this.connection.createChannel();
    
          console.log(`🛸 Created RabbitMQ Channel successfully`);
        } catch (error) {
          console.error(error);
          console.error(`Not connected to MQ Server`);
        }
      }


}