/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/
// меняем везде Example на свое

#pragma once

#include "sc-memory/sc_module.hpp"
#include "FindBySityAndOpenTimeService.hpp"
#include "FindBySityAndOpenTimeModule.generated.hpp"


class FindBySityAndOpenTimeModule : public ScModule
{
  SC_CLASS(LoadOrder(1000))
  SC_GENERATED_BODY()

  virtual sc_result InitializeImpl() override;
  virtual sc_result ShutdownImpl() override;

private:
  std::unique_ptr<FindBySityAndOpenTimePythonService> m_FindBySityAndOpenTimeService;
};
