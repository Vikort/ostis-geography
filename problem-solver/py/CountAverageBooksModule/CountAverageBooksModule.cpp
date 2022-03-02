/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/
// Меняем везде Example на свое
#include "CountAverageBooksModule.hpp"

SC_IMPLEMENT_MODULE(CountAverageBooksModule)

sc_result CountAverageBooksModule::InitializeImpl()
{
  m_CountAverageBooksService.reset(new CountAverageBooksPythonService("CountAverageBooksModule/CountAverageBooksModule.py")); // тут указывается путь к модулю на python от папки problem-solver/py/services
  m_CountAverageBooksService->Run();
  return SC_RESULT_OK;
}

sc_result CountAverageBooksModule::ShutdownImpl()
{
  m_CountAverageBooksService->Stop();
  m_CountAverageBooksService.reset();
  return SC_RESULT_OK;
}
