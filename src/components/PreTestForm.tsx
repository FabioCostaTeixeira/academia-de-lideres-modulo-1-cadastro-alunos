
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const PreTestForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    idade: "",
    uf: "",
    telefone: "",
    email: "",
    cpf: "",
    cidadeResidencia: "",
    empresa: "",
    cidadeTreinamento: "",
    estadoTreinamento: "",
    escolaridade: "",
    funcao: "",
    funcaoOutros: "",
    estadoEmocional: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      'nomeCompleto', 'idade', 'uf', 'telefone', 'email', 'cpf', 
      'cidadeResidencia', 'empresa', 'cidadeTreinamento', 'estadoTreinamento', 
      'escolaridade', 'funcao', 'estadoEmocional'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData] || formData[field as keyof typeof formData] === "") {
        return false;
      }
    }

    // Se função for "Outros", verificar se funcaoOutros foi preenchido
    if (formData.funcao === "Outros" && (!formData.funcaoOutros || formData.funcaoOutros.trim() === "")) {
      toast({
        title: "Campo Obrigatório",
        description: "Por favor, especifique sua função.",
        variant: "destructive"
      });
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email Inválido",
        description: "Digite um email válido no formato: seu@email.com",
        variant: "destructive"
      });
      return false;
    }

    // Validate CPF format (only numbers)
    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(formData.cpf.replace(/\D/g, ''))) {
      toast({
        title: "CPF Inválido",
        description: "Digite o CPF no formato XXX.XXX.XXX-XX",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Formulário Incompleto",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log("Form data to submit:", formData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Formulário Enviado com Sucesso!",
        description: "Seus dados foram salvos com sucesso."
      });

      // Reset form
      setFormData({
        nomeCompleto: "",
        idade: "",
        uf: "",
        telefone: "",
        email: "",
        cpf: "",
        cidadeResidencia: "",
        empresa: "",
        cidadeTreinamento: "",
        estadoTreinamento: "",
        escolaridade: "",
        funcao: "",
        funcaoOutros: "",
        estadoEmocional: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erro ao Enviar",
        description: "Ocorreu um erro ao enviar o formulário. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="mb-6">
          <img 
            src="https://fomrs-acad-lider.lovable.app/lovable-uploads/cd5b5d51-f39e-4ded-9d8a-686459ccc11b.png" 
            alt="Academia de Líderes Logo" 
            className="mx-auto h-20 md:h-24 mb-4" 
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Academia de Líderes Módulo l</h1>
        <h2 className="text-xl md:text-2xl font-semibold text-yellow-400 mb-3">Cadastro Alunos</h2>
        <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
          Preencha seus dados abaixo e inicie sua jornada na Academia de Líderes
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Dados Pessoais */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-xl">Dados do Aluno</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="nomeCompleto" className="text-gray-300">Nome Completo *</Label>
              <Input 
                id="nomeCompleto" 
                value={formData.nomeCompleto}
                onChange={(e) => handleInputChange('nomeCompleto', e.target.value)}
                placeholder="Digite seu nome completo"
                className="bg-slate-700 border-slate-600 text-white" 
                required 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="idade" className="text-gray-300">Idade *</Label>
                <Input 
                  id="idade" 
                  value={formData.idade}
                  onChange={(e) => handleInputChange('idade', e.target.value)}
                  placeholder="Idade"
                  className="bg-slate-700 border-slate-600 text-white" 
                  required 
                />
              </div>

              <div>
                <Label htmlFor="uf" className="text-gray-300">UF *</Label>
                <Input 
                  id="uf" 
                  value={formData.uf}
                  onChange={(e) => handleInputChange('uf', e.target.value)}
                  placeholder="SP"
                  className="bg-slate-700 border-slate-600 text-white" 
                  required 
                />
              </div>
            </div>

            <div>
              <Label htmlFor="telefone" className="text-gray-300">Telefone *</Label>
              <Input 
                id="telefone" 
                value={formData.telefone}
                onChange={(e) => handleInputChange('telefone', e.target.value)}
                placeholder="(XX) XXXX-XXXX"
                className="bg-slate-700 border-slate-600 text-white" 
                required 
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-300">Qual seu melhor email? *</Label>
              <Input 
                id="email" 
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="seu@email.com"
                className="bg-slate-700 border-slate-600 text-white" 
                required 
              />
            </div>

            <div>
              <Label htmlFor="cpf" className="text-gray-300">CPF *</Label>
              <Input 
                id="cpf" 
                value={formData.cpf}
                onChange={(e) => handleInputChange('cpf', e.target.value)}
                placeholder="XXX.XXX.XXX-XX"
                className="bg-slate-700 border-slate-600 text-white" 
                required 
              />
            </div>

            <div>
              <Label htmlFor="cidadeResidencia" className="text-gray-300">Cidade de sua residência *</Label>
              <Input 
                id="cidadeResidencia" 
                value={formData.cidadeResidencia}
                onChange={(e) => handleInputChange('cidadeResidencia', e.target.value)}
                placeholder="Digite sua cidade"
                className="bg-slate-700 border-slate-600 text-white" 
                required 
              />
            </div>

            <div>
              <Label htmlFor="empresa" className="text-gray-300">Empresa onde trabalha *</Label>
              <Input 
                id="empresa" 
                value={formData.empresa}
                onChange={(e) => handleInputChange('empresa', e.target.value)}
                placeholder="Digite o nome da empresa"
                className="bg-slate-700 border-slate-600 text-white" 
                required 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cidadeTreinamento" className="text-gray-300">Cidade onde está realizando o treinamento *</Label>
                <Input 
                  id="cidadeTreinamento" 
                  value={formData.cidadeTreinamento}
                  onChange={(e) => handleInputChange('cidadeTreinamento', e.target.value)}
                  placeholder="Digite a cidade do treinamento"
                  className="bg-slate-700 border-slate-600 text-white" 
                  required 
                />
              </div>

              <div>
                <Label htmlFor="estadoTreinamento" className="text-gray-300">Estado onde está realizando o treinamento *</Label>
                <Input 
                  id="estadoTreinamento" 
                  value={formData.estadoTreinamento}
                  onChange={(e) => handleInputChange('estadoTreinamento', e.target.value)}
                  placeholder="Digite o estado do treinamento"
                  className="bg-slate-700 border-slate-600 text-white" 
                  required 
                />
              </div>
            </div>

            <div>
              <Label htmlFor="escolaridade" className="text-gray-300">Escolaridade *</Label>
              <Select value={formData.escolaridade} onValueChange={(value) => handleInputChange('escolaridade', value)}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Selecione sua escolaridade" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="fundamental-incompleto" className="text-white">Fundamental Incompleto</SelectItem>
                  <SelectItem value="fundamental-completo" className="text-white">Fundamental Completo</SelectItem>
                  <SelectItem value="ensino-medio-incompleto" className="text-white">Ensino Médio Incompleto</SelectItem>
                  <SelectItem value="ensino-medio-completo" className="text-white">Ensino Médio Completo</SelectItem>
                  <SelectItem value="ensino-tecnico" className="text-white">Ensino Técnico</SelectItem>
                  <SelectItem value="superior-incompleto" className="text-white">Superior Incompleto</SelectItem>
                  <SelectItem value="superior-completo" className="text-white">Superior Completo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="funcao" className="text-gray-300">Função *</Label>
              <Select value={formData.funcao} onValueChange={(value) => handleInputChange('funcao', value)}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Selecione sua função" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="lider-percebido" className="text-white">Líder Percebido</SelectItem>
                  <SelectItem value="encarregado" className="text-white">Encarregado</SelectItem>
                  <SelectItem value="supervisor" className="text-white">Supervisor</SelectItem>
                  <SelectItem value="gerente" className="text-white">Gerente</SelectItem>
                  <SelectItem value="diretor" className="text-white">Diretor</SelectItem>
                  <SelectItem value="Outros" className="text-white">Outros</SelectItem>
                </SelectContent>
              </Select>
              
              {formData.funcao === "Outros" && (
                <div className="mt-3">
                  <Input 
                    value={formData.funcaoOutros}
                    onChange={(e) => handleInputChange('funcaoOutros', e.target.value)}
                    placeholder="Especifique sua função"
                    className="bg-slate-700 border-slate-600 text-white" 
                    required 
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Estado Emocional */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-xl">Estado Emocional *</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={formData.estadoEmocional} 
              onValueChange={(value) => handleInputChange('estadoEmocional', value)}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="flex flex-col items-center space-y-3 p-4 bg-slate-600/30 rounded-lg">
                <img 
                  src="data:image/jpeg;base64,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" 
                  alt="Triste" 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <RadioGroupItem value="triste" id="triste" className="border-white text-white" />
                <Label htmlFor="triste" className="text-gray-300 cursor-pointer">Triste</Label>
              </div>

              <div className="flex flex-col items-center space-y-3 p-4 bg-slate-600/30 rounded-lg">
                <img 
                  src="https://rlv.zcache.com.br/etiqueta_engracada_do_emoji_da_expressao_neutra-rcc2643c446fc469c8c15c0d630585e2e_0ugmp_8byvr_644.webp" 
                  alt="Normal" 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <RadioGroupItem value="normal" id="normal" className="border-white text-white" />
                <Label htmlFor="normal" className="text-gray-300 cursor-pointer">Normal</Label>
              </div>

              <div className="flex flex-col items-center space-y-3 p-4 bg-slate-600/30 rounded-lg">
                <img 
                  src="https://img.freepik.com/vetores-premium/emoticon-de-emoji-feliz-mostrando-dois-polegares-para-cima-sinal-como-um-gesto-de-mao_1303870-1082.jpg?semt=ais_hybrid&w=740" 
                  alt="Alegre" 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <RadioGroupItem value="alegre" id="alegre" className="border-white text-white" />
                <Label htmlFor="alegre" className="text-gray-300 cursor-pointer">Alegre</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 text-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              'Enviar Formulário'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PreTestForm;
