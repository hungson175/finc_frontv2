'use server'

export async function streamingResponse(message: string): Promise<ReadableStream<Uint8Array>> {
  return new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const prefix = "REPLY: ";
      
      // Function to simulate typing delay
      const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      
      // Write the prefix character by character
      for (const char of prefix) {
        await wait(100);
        controller.enqueue(encoder.encode(char));
      }
      
      if (message === "long") {
        const longResponse = `Here's a very long response that will test the scrolling functionality of our chat window. 

This response includes multiple paragraphs to ensure we have enough content to trigger scrolling.

Let's talk about some interesting topics:

1. First, we'll discuss how streaming responses work in modern chat applications.
2. Then, we'll explore the importance of proper UI/UX design in chat interfaces.
3. Following that, we'll look at performance optimization techniques.
4. Finally, we'll examine how auto-scrolling enhances user experience.

Each of these topics deserves careful consideration and implementation. When building chat applications, we need to ensure that the interface remains responsive and user-friendly, even when handling large amounts of text.

The auto-scroll feature is particularly important as it helps users follow the conversation naturally, much like they would in a real-time chat application.

Thank you for testing this long response feature!`;

        // Stream the long response character by character
        for (const char of longResponse) {
          await wait(50);
          controller.enqueue(encoder.encode(char));
        }
      } else {
        // Stream the regular message character by character
        for (const char of message) {
          await wait(100);
          controller.enqueue(encoder.encode(char));
        }
      }
      
      controller.close();
    }
  });
}

