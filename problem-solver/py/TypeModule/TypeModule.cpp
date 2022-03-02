/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/
// Меняем везде Example на свое
#include "TypeModule.hpp"

SC_IMPLEMENT_MODULE(TypeModule)

sc_result TypeModule::InitializeImpl()
{
  m_TypeService.reset(new TypePythonService("TypeModule/TypeModule.py")); // тут указывается путь к модулю на python от папки problem-solver/py/services
  m_TypeService->Run();
  return SC_RESULT_OK;
}

sc_result TypeModule::ShutdownImpl()
{
  m_TypeService->Stop();
  m_TypeService.reset();
  return SC_RESULT_OK;
}
