
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SuccessPopup from "./SuccessPopup";

const formatCpf = (value: string) => {
  // Limita a entrada a somente números e até 11 dígitos.
  const onlyNums = value.replace(/\D/g, "").slice(0, 11);
  // Aplica a máscara xxx.xxx.xxx-xx
  if (onlyNums.length <= 3) return onlyNums;
  if (onlyNums.length <= 6) return `${onlyNums.slice(0,3)}.${onlyNums.slice(3)}`;
  if (onlyNums.length <= 9) return `${onlyNums.slice(0,3)}.${onlyNums.slice(3,6)}.${onlyNums.slice(6)}`;
  return `${onlyNums.slice(0,3)}.${onlyNums.slice(3,6)}.${onlyNums.slice(6,9)}-${onlyNums.slice(9)}`;
};

const unmaskCpf = (value: string) => value.replace(/\D/g, "").slice(0, 11);

const PreTestForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false); // controla exibição do popup

  const [formData, setFormData] = useState({
    nomeCompleto: "",
    telefone: "",
    email: "",
    cpf: "",
    idade: "",
    cidadeResidencia: "",
    uf: "",
    escolaridade: "",
    funcao: "",
    funcaoOutros: "",
    empresa: "",
    cidadeTreinamento: "",
    estadoTreinamento: "",
    estadoEmocional: ""
  });

  const handleInputChange = (field: string, value: string) => {
    if (field === "cpf") {
      // Aceita só números e aplica a máscara ao formatar para o input
      value = formatCpf(value);
    }
    if (field === "estadoTreinamento") {
      value = value.toUpperCase().slice(0,2);
    }
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "nomeCompleto", "telefone", "email", "cpf", "idade", "cidadeResidencia", "uf",
      "escolaridade", "funcao", "empresa", "cidadeTreinamento", "estadoTreinamento", "estadoEmocional"
    ];
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData] || formData[field as keyof typeof formData] === "") {
        return false;
      }
    }
    if (
      formData.funcao === "Outros" &&
      (!formData.funcaoOutros || formData.funcaoOutros.trim() === "")
    ) {
      toast({
        title: "Campo Obrigatório",
        description: "Por favor, especifique sua função.",
        variant: "destructive"
      });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email Inválido",
        description: "Digite um email válido no formato: seu@email.com",
        variant: "destructive"
      });
      return false;
    }
    // Valida se o CPF são 11 dígitos numéricos
    if (unmaskCpf(formData.cpf).length !== 11) {
      toast({
        title: "CPF Inválido",
        description: "O CPF deve conter 11 dígitos numéricos.",
        variant: "destructive"
      });
      return false;
    }
    const cpfOnly = unmaskCpf(formData.cpf);
    if (!/^\d{11}$/.test(cpfOnly)) {
      toast({
        title: "CPF Inválido",
        description: "Digite somente números no CPF.",
        variant: "destructive"
      });
      return false;
    }
    if (formData.estadoTreinamento.length !== 2) {
      toast({
        title: "UF Inválida",
        description: "Digite a UF do estado com exatamente 2 caracteres (ex: ES, SP, RJ)",
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
      // mapeia campos do frontend para os campos do banco Supabase
      const payload = {
        nome_completo: formData.nomeCompleto,
        telefone: formData.telefone,
        email: formData.email,
        cpf: unmaskCpf(formData.cpf),
        idade: formData.idade,
        cidade_residencia: formData.cidadeResidencia,
        estado_residencia: formData.uf,
        escolaridade: formData.escolaridade,
        funcao: formData.funcao === "Outros" ? formData.funcaoOutros : formData.funcao,
        empresa: formData.empresa,
        cidade_treinamento: formData.cidadeTreinamento,
        estado_treinamento: formData.estadoTreinamento,
        estado_emocional: formData.estadoEmocional
        // treinamento_id NÃO será preenchido aqui!
      };

      const { error } = await supabase
        .from("Cadastro_Alunos")
        .insert([payload]);

      if (error) {
        console.error("Erro ao salvar no Supabase:", error);
        toast({
          title: "Erro ao Enviar",
          description: "Ocorreu um erro ao salvar no banco de dados. Tente novamente.",
          variant: "destructive"
        });
      } else {
        setSuccessOpen(true); // Abre o popup de sucesso!
        setFormData({
          nomeCompleto: "",
          telefone: "",
          email: "",
          cpf: "",
          idade: "",
          cidadeResidencia: "",
          uf: "",
          escolaridade: "",
          funcao: "",
          funcaoOutros: "",
          empresa: "",
          cidadeTreinamento: "",
          estadoTreinamento: "",
          estadoEmocional: ""
        });
      }
    } catch (error) {
      console.error("Erro ao submeter formulário:", error);
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
      {/* Popup Sucesso */}
      <SuccessPopup open={successOpen} onClose={() => setSuccessOpen(false)} />

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
            {/* 1. Nome Completo */}
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

            {/* 2. Telefone */}
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

            {/* 3. Email */}
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

            {/* 4. CPF */}
            <div>
              <Label htmlFor="cpf" className="text-gray-300">CPF *</Label>
              <Input 
                id="cpf" 
                value={formData.cpf}
                onChange={(e) => handleInputChange('cpf', e.target.value)}
                placeholder="XXX.XXX.XXX-XX"
                className="bg-slate-700 border-slate-600 text-white"
                inputMode="numeric"
                maxLength={14} // máscara com pontuação = máx 14 chars
                required
              />
              <p className="text-xs text-gray-400 mt-1">Digite apenas números; será aplicado o formato xxx.xxx.xxx-xx</p>
            </div>

            {/* 5. Idade */}
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

            {/* 6. Cidade de Residência */}
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

            {/* 7. Estado/UF */}
            <div>
              <Label htmlFor="uf" className="text-gray-300">Estado/UF *</Label>
              <Input 
                id="uf" 
                value={formData.uf} 
                onChange={(e) => handleInputChange('uf', e.target.value)} 
                placeholder="SP" 
                className="bg-slate-700 border-slate-600 text-white" 
                required 
              />
            </div>

            {/* 8. Escolaridade */}
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

            {/* 9. Função */}
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

            {/* 10. Empresa */}
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

            {/* 11. Cidade do Treinamento */}
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

            {/* 12. Estado/UF do Treinamento */}
            <div>
              <Label htmlFor="estadoTreinamento" className="text-gray-300">Estado/UF onde está realizando o treinamento *</Label>
              <Input 
                id="estadoTreinamento" 
                value={formData.estadoTreinamento} 
                onChange={(e) => handleInputChange('estadoTreinamento', e.target.value)} 
                placeholder="ES (apenas 2 caracteres)" 
                className="bg-slate-700 border-slate-600 text-white" 
                maxLength={2}
                required 
              />
              <p className="text-xs text-gray-400 mt-1">Digite apenas 2 caracteres representando a UF (ex: ES, SP, RJ)</p>
            </div>
          </CardContent>
        </Card>

        {/* 13. Estado Emocional */}
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
                  alt="Triste" 
                  src="https://static4.depositphotos.com/1016045/328/i/950/depositphotos_3282479-stock-illustration-sad-emoticon.jpg" 
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
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ki1JJpE1TsjrZyDhXkLQLg57gSveTHhDqQ&s" 
                  alt="Alegre" 
                  className="w-16 h-16 rounded-full object-contain" 
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
