file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (SearchOpenedCinemasModule SHARED ${SOURCES})

target_include_directories(SearchOpenedCinemasModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(SearchOpenedCinemasModule sc-memory)

add_dependencies(SearchOpenedCinemasModule sc-memory)

sc_codegen(SearchOpenedCinemasModule ${CMAKE_CURRENT_LIST_DIR})
