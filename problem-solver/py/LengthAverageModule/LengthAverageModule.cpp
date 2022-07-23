/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/
// Меняем везде Example на свое
#include "LengthAverageModule.hpp"

SC_IMPLEMENT_MODULE(LengthAverageModule)

sc_result LengthAverageModule::InitializeImpl()
{
  m_LengthAverageService.reset(new LengthAveragePythonService("LengthAverageModule/LengthAverageModule.py")); // тут указывается путь к модулю на python от папки problem-solver/py/services
  m_LengthAverageService->Run();
  return SC_RESULT_OK;
}

sc_result LengthAverageModule::ShutdownImpl()
{
  m_LengthAverageService->Stop();
  m_LengthAverageService.reset();
  return SC_RESULT_OK;
}
