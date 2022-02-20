/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/
// Меняем везде Example на свое
#include "CountAverageModule.hpp"

SC_IMPLEMENT_MODULE(CountAverageModule)

sc_result CountAverageModule::InitializeImpl()
{
  m_CountAverageService.reset(new CountAveragePythonService("CountAverageModule/CountAverageModule.py")); // тут указывается путь к модулю на python от папки problem-solver/py/services
  m_CountAverageService->Run();
  return SC_RESULT_OK;
}

sc_result CountAverageModule::ShutdownImpl()
{
  m_CountAverageService->Stop();
  m_CountAverageService.reset();
  return SC_RESULT_OK;
}
