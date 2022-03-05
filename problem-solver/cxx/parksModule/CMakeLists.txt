set(SOURCES
        "ParksModule.cpp"
        "keynodes/ParksKeynodes.cpp"
        "agent/SearchParksByAreaAgent.cpp"
        "agent/SearchParksByFoundingYearAgent.cpp"
        "agent/SearchParksByDistanceToUndergroundAgent.cpp"
        "search/ParksByPropertyInNumericalRangeFinder.cpp"
        )

set(HEADERS
        "ParksModule.hpp"
        "keynodes/ParksKeynodes.hpp"
        "agent/SearchParksByAreaAgent.hpp"
        "agent/SearchParksByFoundingYearAgent.hpp"
        "agent/SearchParksByDistanceToUndergroundAgent.hpp"
        "search/ParksByPropertyInNumericalRangeFinder.hpp"
        )

set(PARKS_MODULE_GENERATED_DIR ${CMAKE_CURRENT_LIST_DIR}/generated)
include_directories(${CMAKE_CURRENT_LIST_DIR} ${SC_MEMORY_SRC} ${SC_KPM_SRC} ${PARKS_MODULE_GENERATED_DIR})

add_library(parksModule SHARED ${SOURCES} ${HEADERS})
target_link_libraries(parksModule sc-memory sc-agents-common)

sc_codegen_ex(parksModule ${CMAKE_CURRENT_LIST_DIR} ${CMAKE_CURRENT_LIST_DIR}/generated)
