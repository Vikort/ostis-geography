/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "ParksByPropertyInNumericalRangeFinder.hpp"
#include "keynodes/ParksKeynodes.hpp"
#include <sc-agents-common/utils/IteratorUtils.hpp>

namespace parks
{
  ScAddr ParksByPropertyInNumericalRangeFinder::findParksByPropertyInNumericalRange(
      ScMemoryContext * ms_context, ScAddr questionNode,
      ScAddr valueConcept, ScAddr propertyNrel) const {
    ScAddr rangeBottom;
    ScAddr rangeTop;

    ScIterator3Ptr arguments = ms_context->Iterator3(
        questionNode,
        ScType::EdgeAccessConstPosPerm,
        ScType::NodeConst
    );

    while (arguments->Next()) {
      ScAddr value = arguments->Get(2);
      if (ms_context->HelperCheckEdge(
          valueConcept,
          value,
          ScType::EdgeAccessConstPosPerm)) {
        (!rangeBottom.IsValid() ? rangeBottom : rangeTop) = value;
      }
    }

    if (!rangeBottom.IsValid() || !rangeTop.IsValid()) {
      return {};
    }

    long long bottom = std::stoll(ms_context->HelperGetSystemIdtf(rangeBottom));
    long long top = std::stoll(ms_context->HelperGetSystemIdtf(rangeTop));

    if (bottom > top) {
      std::swap(bottom, top);
    }

    ScIterator3Ptr parks = ms_context->Iterator3(
        ParksKeynodes::concept_park,
        ScType::EdgeAccessConstPosPerm,
        ScType::NodeConst
    );

    ScAddr solution = ms_context->CreateNode(ScType::NodeConst);
    ScAddr set = ms_context->CreateNode(ScType::NodeConst);
    ms_context->CreateEdge(ScType::EdgeAccessConstPosPerm, solution, set);

    while (parks->Next()) {
      ScAddr park = parks->Get(2);

      ScIterator5Ptr property = ms_context->Iterator5(
          park,
          ScType::EdgeDCommon,
          ScType::NodeConst,
          ScType::EdgeAccessConstPosPerm,
          propertyNrel
      );

      if (property->Next()) {
        ScAddr propertyValue = property->Get(2);

        long long value = std::stoll(ms_context->HelperGetSystemIdtf(propertyValue));

        if (value >= bottom && value <= top) {
          SC_LOG_DEBUG(
              std::to_string(value) + ": >="
              + std::to_string(bottom) + ", <="
              + std::to_string(top)
          )

          ScAddr edge = ms_context->CreateEdge(ScType::EdgeAccessConstPosPerm, set, park);
          ms_context->CreateEdge(ScType::EdgeAccessConstPosPerm, solution, edge);
          ms_context->CreateEdge(ScType::EdgeAccessConstPosPerm, solution, park);
        }
      }
    }

    ms_context->CreateEdge(
        ScType::EdgeAccessConstPosPerm,
        ParksKeynodes::concept_success_solution,
        solution
    );

    return solution;
  }
}
