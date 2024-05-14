import React, { useState } from 'react';
import { Box, Button, Input, Textarea, VStack } from '@chakra-ui/react';
import { create } from 'lib/openai';

const Index = () => {
  const [jsCode, setJsCode] = useState('');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleCodeChange = (e) => {
    setJsCode(e.target.value);
  };

  const handleExecuteCode = () => {
    try {
      // eslint-disable-next-line no-eval
      eval(jsCode);
    } catch (error) {
      console.error('Error executing JavaScript:', error);
    }
  };

  const handleSendToGPT4 = async () => {
    const response = await create({
      messages: [{ role: 'user', content: inputText }],
      model: 'gpt-4'
    });
    if (response.choices && response.choices.length > 0) {
      setOutputText(response.choices[0].message.content);
    }
  };

  return (
    <VStack spacing={4} p={5}>
      <Textarea
        placeholder="Enter JavaScript code here"
        value={jsCode}
        onChange={handleCodeChange}
        size="lg"
      />
      <Button colorScheme="blue" onClick={handleExecuteCode}>
        Execute JavaScript
      </Button>
      <Textarea
        placeholder="Enter text for GPT-4"
        value={inputText}
        onChange={handleInputChange}
        size="lg"
      />
      <Button colorScheme="teal" onClick={handleSendToGPT4}>
        Send to GPT-4
      </Button>
      <Box>
        <p>Response from GPT-4:</p>
        <Textarea isReadOnly value={outputText} />
      </Box>
    </VStack>
  );
};

export default Index;