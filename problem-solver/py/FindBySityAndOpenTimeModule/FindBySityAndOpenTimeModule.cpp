/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/
// Меняем везде Example на свое
#include "FindBySityAndOpenTimeModule.hpp"

SC_IMPLEMENT_MODULE(FindBySityAndOpenTimeModule)

sc_result FindBySityAndOpenTimeModule::InitializeImpl()
{
  m_FindBySityAndOpenTimeService.reset(new FindBySityAndOpenTimePythonService("FindBySityAndOpenTimeModule/FindBySityAndOpenTimeModule.py")); // тут указывается путь к модулю на python от папки problem-solver/py/services
  m_FindBySityAndOpenTimeService->Run();
  return SC_RESULT_OK;
}

sc_result FindBySityAndOpenTimeModule::ShutdownImpl()
{
  m_FindBySityAndOpenTimeService->Stop();
  m_FindBySityAndOpenTimeService.reset();
  return SC_RESULT_OK;
}
