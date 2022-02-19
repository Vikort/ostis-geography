/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/
// Меняем везде kindergartens на свое
#include "kindergartensModule.hpp"

SC_IMPLEMENT_MODULE(kindergartensModule)

sc_result kindergartensModule::InitializeImpl()
{
  m_kindergartensService.reset(new kindergartensPythonService("kindergartensModule/kindergartensModule.py")); // тут указывается путь к модулю на python от папки problem-solver/py/services
  m_kindergartensService->Run();
  return SC_RESULT_OK;
}

sc_result kindergartensModule::ShutdownImpl()
{
  m_kindergartensService->Stop();
  m_kindergartensService.reset();
  return SC_RESULT_OK;
}
