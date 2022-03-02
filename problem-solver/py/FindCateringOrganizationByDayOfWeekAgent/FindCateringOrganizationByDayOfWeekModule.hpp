#pragma once

#include "sc-memory/sc_module.hpp"
#include "FindCateringOrganizationByDayOfWeekService.hpp"
#include "FindCateringOrganizationByDayOfWeekModule.generated.hpp"


class FindCateringOrganizationByDayOfWeekAgentModule : public ScModule
{
  SC_CLASS(LoadOrder(1000))
  SC_GENERATED_BODY()

  virtual sc_result InitializeImpl() override;
  virtual sc_result ShutdownImpl() override;

private:
  std::unique_ptr<FindCateringOrganizationByDayOfWeekAgentPythonService> m_FindCateringOrganizationByDayOfWeekService;
};
