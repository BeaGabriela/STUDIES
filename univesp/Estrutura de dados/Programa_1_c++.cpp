#include <iostream>

int main(){
	std::cout <<"Hello World!" << "\n";
	return 0;
}



//Operações matematicas
 
 //Declarando variaveis
 int number1;
 int number2;
 
 //Declarando com std::cout o que vai  aparecer para o usuario
 std::cout <<"Digite o primeiro numero:";
 //Declarando a variavel e atrivuindo a ela o que foi difitado pelo cliente.
 std::cin >> number1;
 
  //Declarando com std::cout o que vai  aparecer para o usuario
 std::cout <<"Digite o segundo numero:";
 //Declarando a variavel e atrivuindo a ela o que foi difitado pelo cliente.
 std::cin >> number2;
 
 int sum = number1 + number2;  //Soma entre os dois
 int sub = number1 - number2;  //Subtração
 int mul = number1 * number2;  //Muktiplicação
 int div = number1 / number2;  // Divisão
 float  fdiv = (float)number1 // (float)number2; //Divisão e resultado em numero inteiro
 int res = number % number2;  //Resto da divisão
 
 
 
 
 //Operações condicionais
  int number1;
  int number2;
  
 
  cout << "Digite o primeiro número: ";
  std::cin >> number1;
  
  cout << "Digite o segundo número: ";
  std::cin >> number2;
  
  if(number1 == number2)
	  cout << number1 << " == " << number2 << std::endl;
 
 