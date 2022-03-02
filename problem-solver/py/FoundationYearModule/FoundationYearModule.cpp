/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/
// Меняем везде Example на свое
#include "FoundationYearModule.hpp"

SC_IMPLEMENT_MODULE(FoundationYearModule)

sc_result FoundationYearModule::InitializeImpl()
{
  m_FoundationYearService.reset(new FoundationYearPythonService("FoundationYearModule/FoundationYearModule.py")); // тут указывается путь к модулю на python от папки problem-solver/py/services
  m_FoundationYearService->Run();
  return SC_RESULT_OK;
}

sc_result FoundationYearModule::ShutdownImpl()
{
  m_FoundationYearService->Stop();
  m_FoundationYearService.reset();
  return SC_RESULT_OK;
}
